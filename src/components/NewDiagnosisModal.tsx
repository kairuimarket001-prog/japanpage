import { X, ExternalLink } from 'lucide-react';
import { useEffect } from 'react';
import RobotScholarIcon from './RobotScholarIcon';

interface NewDiagnosisModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysis: string;
  stockCode: string;
  stockName: string;
  stockPrice: string;
  priceChange: string;
  isStreaming?: boolean;
  isConnecting?: boolean;
  onLineConversion?: () => void;
}

const formatAnalysisText = (text: string) => {
  const lines = text.split('\n');
  return lines.map((line, index) => {
    const formattedLine = line.replace(/(\d+\.?\d*%?|\d+円|[+-]\d+\.?\d*)/g, (match) => {
      return `<span style="color: #8B4513;" class="font-semibold text-lg">${match}</span>`;
    });

    const isBold = line.includes('###') || line.includes('**') || line.match(/^[\d]+\./);
    const cleanLine = formattedLine.replace(/###|\*\*/g, '');

    if (isBold) {
      return `<div key="${index}" class="font-bold text-gray-900 mt-4 mb-2">${cleanLine}</div>`;
    }

    return `<div key="${index}" class="text-gray-700">${cleanLine}</div>`;
  }).join('');
};

export default function NewDiagnosisModal({
  isOpen,
  onClose,
  analysis,
  stockCode,
  stockName,
  stockPrice,
  priceChange,
  isStreaming = false,
  isConnecting = false,
  onLineConversion,
}: NewDiagnosisModalProps) {
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      document.body.setAttribute('data-modal-open', 'true');

      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        document.body.removeAttribute('data-modal-open');
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center p-2 sm:p-4 backdrop-blur-md"
      style={{
        background: 'linear-gradient(135deg, rgba(60, 8, 0, 0.90) 0%, rgba(92, 42, 20, 0.90) 50%, rgba(139, 69, 19, 0.90) 100%)'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-3xl max-h-[95vh] z-[9999]" onClick={(e) => e.stopPropagation()}>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-[60%] z-[10000] scale-75 sm:scale-100 pointer-events-none">
          <RobotScholarIcon />
        </div>

        <div className="relative bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden border-4 border-white pt-0 sm:pt-16">
          <div className="relative sticky top-0 px-3 py-2 sm:px-5 sm:py-3 flex items-center justify-between border-b-4 backdrop-blur-sm z-10 shadow-lg" style={{ background: 'linear-gradient(to right, #3c0800, #8B4513)', borderColor: '#2a0600' }}>
          <div className="flex-1 text-center pr-8">
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-white drop-shadow-lg">
              {stockName}（{stockCode}）AI市場分析レポート（参考資料）
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 sm:p-2 hover:bg-white/30 rounded-lg transition-colors backdrop-blur-sm hover:shadow-lg"
            aria-label="閉じる"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </button>
        </div>

        <div className="relative overflow-y-auto max-h-[calc(95vh-180px)] sm:max-h-[calc(95vh-200px)] px-3 py-3 sm:px-5 sm:py-4 space-y-3 sm:space-y-4" style={{ background: 'linear-gradient(to bottom right, #f5e6d3, #e8d4bf)' }}>

          <div className="relative bg-white/80 backdrop-blur-xl rounded-lg sm:rounded-xl p-4 sm:p-5 border-2 overflow-hidden shadow-xl" style={{ borderColor: '#d4a574' }}>
            <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 rounded-full blur-3xl pointer-events-none" style={{ background: 'linear-gradient(to bottom right, rgba(139, 69, 19, 0.15), rgba(210, 105, 30, 0.15))' }}></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-36 sm:h-36 rounded-full blur-3xl pointer-events-none" style={{ background: 'linear-gradient(to top right, rgba(139, 69, 19, 0.15), rgba(210, 105, 30, 0.15))' }}></div>

            <div className="relative space-y-2 sm:space-y-3">
              <div className="bg-white rounded-lg p-3 sm:p-4 border-2 backdrop-blur-sm shadow-lg" style={{ borderColor: '#d4a574' }}>
                <div className="text-xs sm:text-sm text-gray-700 leading-relaxed space-y-2">
                  {isConnecting ? (
                    <div className="text-center py-4">
                      <p className="font-bold" style={{ color: '#8B4513' }}>市場データ分析中...</p>
                    </div>
                  ) : (
                    <>
                      <div dangerouslySetInnerHTML={{ __html: formatAnalysisText(analysis) }} />
                      {isStreaming && (
                        <span className="inline-block w-2 h-4 animate-pulse ml-1" style={{ background: 'linear-gradient(to right, #3c0800, #8B4513)' }}></span>
                      )}
                    </>
                  )}
                </div>
              </div>

              {onLineConversion && (
                <>
                  <button
                    onClick={onLineConversion}
                    className="relative overflow-hidden w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-4 px-6 rounded-lg hover:from-green-700 hover:to-green-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 text-sm mt-6 animate-button-pulse animate-glow-ring-green group"
                    style={{ willChange: 'transform' }}
                  >
                    <div
                      className="absolute inset-0 opacity-20 animate-gradient-shift"
                      style={{
                        background: 'linear-gradient(90deg, rgba(34,197,94,0.3) 0%, rgba(74,222,128,0.5) 50%, rgba(34,197,94,0.3) 100%)',
                        backgroundSize: '200% 100%'
                      }}
                    />

                    <div
                      className="absolute inset-0 w-[30%] h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:animate-[shimmer-sweep_2s_ease-in-out]"
                      style={{
                        animation: 'shimmer-sweep 5s ease-in-out infinite',
                        animationDelay: '1.5s'
                      }}
                    />

                    <ExternalLink className="relative w-6 h-6 animate-icon-bounce" />
                    <span className="relative">市場分析情報をLINEで受け取る（参考情報）</span>
                  </button>

                  <div className="mt-3 p-3 bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-lg border border-green-600/30">
                    <p className="text-xs text-green-200 leading-relaxed">
                      LINEで登録すると、参考情報として市場分析レポートをお届けします。※投資助言ではありません
                    </p>
                  </div>
                </>
              )}

            </div>
          </div>
        </div>

        </div>
      </div>
    </div>
  );
}
