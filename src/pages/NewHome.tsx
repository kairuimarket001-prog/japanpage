import { useState, useEffect, useRef } from 'react';
import HeroSection from '../components/HeroSection';
import SplitStockCard from '../components/SplitStockCard';
import PulsingButton from '../components/PulsingButton';
import ScrollingHistoryData from '../components/ScrollingHistoryData';
import CircularAnalysisNav from '../components/CircularAnalysisNav';
import DiagnosisLoadingOverlay from '../components/DiagnosisLoadingOverlay';
import NewDiagnosisModal from '../components/NewDiagnosisModal';
import { StockData } from '../types/stock';
import { DiagnosisState } from '../types/diagnosis';
import { useUrlParams } from '../hooks/useUrlParams';
import { apiClient } from '../lib/apiClient';
import { userTracking } from '../lib/userTracking';
import { trackDiagnosisClick, trackConversionClick } from '../lib/googleTracking';

const getDefaultStockData = (code: string): StockData => ({
  info: {
    code: code || '----',
    name: 'データ取得中...',
    price: '---',
    change: '0.0',
    changePercent: '0.00%',
    per: 'N/A',
    pbr: 'N/A',
    dividend: 'N/A',
    industry: 'N/A',
    marketCap: 'N/A',
    market: 'N/A',
    timestamp: new Date().toLocaleString('ja-JP'),
  },
  prices: [
    {
      date: new Date().toLocaleDateString('ja-JP'),
      open: '---',
      high: '---',
      low: '---',
      close: '---',
      volume: '---',
      change: '0.0',
      changePercent: '0.00%',
      per: 'N/A',
      pbr: 'N/A',
      dividend: 'N/A',
      code: code || '----',
    }
  ]
});

export default function NewHome() {
  const urlParams = useUrlParams();
  const [stockCode, setStockCode] = useState('');
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasRealData, setHasRealData] = useState(false);

  const [diagnosisState, setDiagnosisState] = useState<DiagnosisState>('initial');
  const [analysisResult, setAnalysisResult] = useState<string>('');
  const [diagnosisStartTime, setDiagnosisStartTime] = useState<number>(0);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [showLoadingOverlay, setShowLoadingOverlay] = useState<boolean>(false);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (urlParams.code) {
      setStockCode(urlParams.code);
      fetchStockData(urlParams.code);
    } else {
      const defaultCode = '----';
      setStockCode(defaultCode);
      setStockData(getDefaultStockData(defaultCode));
      setHasRealData(false);
    }
  }, [urlParams.code]);

  useEffect(() => {
    const trackPageVisit = async () => {
      if (stockData) {
        await userTracking.trackPageLoad({
          stockCode: stockCode,
          stockName: stockData.info.name,
          urlParams: {
            src: urlParams.src || '',
            gclid: urlParams.gclid || '',
            racText: urlParams.racText || '',
            code: urlParams.code || ''
          }
        });
      }
    };

    trackPageVisit();
  }, [stockData, stockCode, urlParams]);

  const fetchStockData = async (code: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.get(`/api/stock/data?code=${code}`);

      if (!response.ok) {
        throw new Error('株価データの取得に失敗しました');
      }

      const data = await response.json();
      setStockData(data);
      setStockCode(code);
      setHasRealData(true);
    } catch (err) {
      console.warn('Stock data fetch failed, using default data:', err);
      setStockData(getDefaultStockData(code));
      setStockCode(code);
      setHasRealData(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  const runDiagnosis = async () => {
    if (diagnosisState !== 'initial' || !stockData || !hasRealData) return;

    trackDiagnosisClick();

    setDiagnosisState('connecting');
    setDiagnosisStartTime(Date.now());
    setAnalysisResult('');
    setLoadingProgress(0);
    setShowLoadingOverlay(true);

    // 清除之前的interval（如果存在）
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    progressIntervalRef.current = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev < 85) {
          return prev + Math.random() * 15;
        } else if (prev < 95) {
          return prev + Math.random() * 2;
        }
        return prev;
      });
    }, 100);

    try {
      const apiUrl = `${import.meta.env.VITE_API_URL || ''}/api/gemini/diagnosis`;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 50000);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: stockCode,
          stockData: {
            name: stockData.info.name,
            price: stockData.info.price,
            change: stockData.info.change,
            changePercent: stockData.info.changePercent,
            per: stockData.info.per,
            pbr: stockData.info.pbr,
            dividend: stockData.info.dividend,
            industry: stockData.info.industry,
            marketCap: stockData.info.marketCap,
          },
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }

      if (!response.ok) {
        throw new Error('AI診断に失敗しました');
      }

      setDiagnosisState('processing');

      const contentType = response.headers.get('content-type');

      if (contentType?.includes('text/event-stream')) {
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let fullAnalysis = '';
        let firstChunk = true;

        if (!reader) {
          throw new Error('ストリーム読み取りに失敗しました');
        }

        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            break;
          }

          const text = decoder.decode(value, { stream: true });
          const lines = text.split('\n').filter(line => line.trim() !== '');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);

              try {
                const parsed = JSON.parse(data);

                if (parsed.error) {
                  throw new Error(parsed.error);
                }

                if (parsed.content) {
                  fullAnalysis += parsed.content;

                  if (firstChunk && fullAnalysis.trim().length > 0) {
                    setLoadingProgress(100);
                    setTimeout(() => {
                      setShowLoadingOverlay(false);
                      setDiagnosisState('streaming');
                    }, 600);
                    firstChunk = false;
                  }

                  setAnalysisResult(fullAnalysis);
                }

                if (parsed.done) {
                  setDiagnosisState('results');

                  const durationMs = Date.now() - diagnosisStartTime;
                  await userTracking.trackDiagnosisClick({
                    stockCode: stockCode,
                    stockName: stockData.info.name,
                    durationMs: durationMs
                  });
                }
              } catch (parseError) {
                console.error('Error parsing SSE data:', parseError);
              }
            }
          }
        }
      } else {
        const result = await response.json();

        if (!result.analysis || result.analysis.trim() === '') {
          throw new Error('診断結果が生成されませんでした');
        }

        setAnalysisResult(result.analysis);
        setDiagnosisState('results');

        const durationMs = Date.now() - diagnosisStartTime;
        await userTracking.trackDiagnosisClick({
          stockCode: stockCode,
          stockName: stockData.info.name,
          durationMs: durationMs
        });
      }
    } catch (err) {
      console.error('Diagnosis error:', err);
      let errorMessage = '診断中にエラーが発生しました';

      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          errorMessage = 'リクエストがタイムアウトしました';
        } else {
          errorMessage = err.message;
        }
      }

      setError(errorMessage);
      setDiagnosisState('error');
      setShowLoadingOverlay(false);
      setLoadingProgress(0);
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    }
  };


  const closeModal = () => {
    setDiagnosisState('initial');
    setAnalysisResult('');
    setLoadingProgress(0);
    setShowLoadingOverlay(false);
    setDiagnosisStartTime(0);
    setError(null);

    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  const handleLineConversion = async () => {
    trackConversionClick();

    try {
      console.log('Fetching LINE redirect link...');
      const response = await apiClient.get('/api/line-redirects/select');
      const data = await response.json();

      console.log('Redirect API response:', data);

      if (data.success && data.link) {
        console.log('Redirecting to:', data.link.redirect_url);
        window.location.href = data.link.redirect_url;
      } else {
        console.error('No redirect link available:', data.error);
        alert('分流链接获取失败，请在后台管理界面配置分流链接。');
      }
    } catch (error) {
      console.error('Failed to get LINE redirect:', error);
      alert('网络错误，无法获取跳转链接。');
    }
  };

  return (
    <div className="min-h-screen relative">
      <HeroSection
        stockCode={stockCode}
        stockName={stockData?.info.name}
        onDiagnosis={runDiagnosis}
        disabled={!hasRealData || diagnosisState !== 'initial'}
      />

      <div className="pb-2">
        {loading && (
          <div className="text-center py-12 md:py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-accent-gold border-t-white"></div>
            <p className="mt-4 text-white font-medium text-sm sm:text-base">株価データを読み込んでいます...</p>
          </div>
        )}

        {stockData && diagnosisState === 'initial' && (
          <>
            <SplitStockCard
              info={stockData.info}
              latestPrice={stockData.prices[0]}
            />

            <PulsingButton
              onClick={runDiagnosis}
              stockName={stockData.info.name}
              disabled={!hasRealData}
            />

            <ScrollingHistoryData
              prices={stockData.prices}
              stockName={stockData.info.name}
            />

            <PulsingButton
              onClick={runDiagnosis}
              stockName={stockData.info.name}
              disabled={!hasRealData}
            />

            <CircularAnalysisNav />
          </>
        )}

        <DiagnosisLoadingOverlay
          isVisible={showLoadingOverlay}
          progress={loadingProgress}
          onComplete={() => setShowLoadingOverlay(false)}
        />

        {diagnosisState === 'error' && (
          <div className="text-center py-12 sm:py-16 md:py-20 px-4">
            <div className="max-w-2xl mx-auto p-5 sm:p-6 md:p-8 bg-accent-red/20 backdrop-blur-sm border border-accent-red rounded-2xl shadow-red-glow">
              <h3 className="text-lg sm:text-xl font-bold text-accent-red mb-3 sm:mb-4">診断エラー</h3>
              <p className="text-sm sm:text-base text-gray-300 font-semibold mb-5 sm:mb-6">{error}</p>
              <button
                onClick={() => {
                  setDiagnosisState('initial');
                  setError(null);
                }}
                className="relative overflow-hidden px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-lg hover:from-blue-500 hover:to-blue-400 transition-all shadow-blue-glow text-sm sm:text-base touch-manipulation min-h-[44px] animate-shake-subtle animate-glow-ring-blue group"
                style={{ willChange: 'transform' }}
              >
                <div
                  className="absolute inset-0 opacity-20 animate-gradient-shift"
                  style={{
                    background: 'linear-gradient(90deg, rgba(59,130,246,0.3) 0%, rgba(96,165,250,0.5) 50%, rgba(59,130,246,0.3) 100%)',
                    backgroundSize: '200% 100%'
                  }}
                />
                <span className="relative">もう一度試す</span>
              </button>
            </div>
          </div>
        )}

        <NewDiagnosisModal
          isOpen={diagnosisState === 'streaming' || diagnosisState === 'results'}
          onClose={closeModal}
          analysis={analysisResult}
          stockCode={stockCode}
          stockName={stockData?.info.name || ''}
          stockPrice={stockData?.info.price || ''}
          priceChange={`${stockData?.info.change || ''} (${stockData?.info.changePercent || ''})`}
          isStreaming={diagnosisState === 'streaming'}
          isConnecting={diagnosisState === 'connecting'}
          onLineConversion={handleLineConversion}
        />
      </div>
    </div>
  );
}
