import { X, ExternalLink, Brain } from 'lucide-react';
import { useEffect } from 'react';

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

interface FormattedTextSegment {
  text: string;
  isHighlight: boolean;
}

const parseLineSegments = (line: string): FormattedTextSegment[] => {
  const segments: FormattedTextSegment[] = [];
  const regex = /(\d+\.?\d*%?|\d+円|[+-]\d+\.?\d*)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ text: line.substring(lastIndex, match.index), isHighlight: false });
    }
    segments.push({ text: match[0], isHighlight: true });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < line.length) {
    segments.push({ text: line.substring(lastIndex), isHighlight: false });
  }

  return segments.length > 0 ? segments : [{ text: line, isHighlight: false }];
};

const renderAnalysisLine = (line: string, index: number) => {
  const isBold = line.includes('###') || line.includes('**') || line.match(/^[\d]+\./);
  const cleanLine = line.replace(/###|\*\*/g, '');
  const segments = parseLineSegments(cleanLine);

  if (isBold) {
    return (
      <div key={index} className="font-bold text-gray-900 mt-4 mb-2">
        {segments.map((seg, i) =>
          seg.isHighlight ? (
            <span key={i} style={{ color: '#8B4513' }} className="font-semibold text-lg">
              {seg.text}
            </span>
          ) : (
            <span key={i}>{seg.text}</span>
          )
        )}
      </div>
    );
  }

  return (
    <div key={index} className="text-gray-700">
      {segments.map((seg, i) =>
        seg.isHighlight ? (
          <span key={i} style={{ color: '#8B4513' }} className="font-semibold text-lg">
            {seg.text}
          </span>
        ) : (
          <span key={i}>{seg.text}</span>
        )
      )}
    </div>
  );
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
        background: 'linear-gradient(135deg, rgba(6, 78, 59, 0.90) 0%, rgba(16, 185, 129, 0.90) 50%, rgba(52, 211, 153, 0.90) 100%)'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-3xl max-h-[95vh] z-[9999]" onClick={(e) => e.stopPropagation()}>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-[50%] z-[10000] pointer-events-none">
          <div className="bg-growth-green p-4 rounded-full shadow-lg">
            <Brain className="w-12 h-12 text-white" strokeWidth={2} />
          </div>
        </div>

        <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden pt-8 sm:pt-12">
          <div className="relative sticky top-0 px-3 py-3 sm:px-5 sm:py-4 flex items-center justify-between border-b-2 bg-white z-10 shadow-md" style={{ borderColor: '#e5e7eb' }}>
          <div className="flex-1 text-center pr-8">
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">
              {stockName}（{stockCode}）智能市場分析レポート（参考資料）
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="閉じる"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
          </button>
        </div>

        <div className="relative overflow-y-auto max-h-[calc(95vh-180px)] sm:max-h-[calc(95vh-200px)] px-3 py-3 sm:px-5 sm:py-4 space-y-3 sm:space-y-4 bg-gray-50">

          <div className="relative bg-white rounded-lg sm:rounded-xl p-4 sm:p-5 shadow-card">
            <div className="relative space-y-2 sm:space-y-3">
              <div className="bg-white rounded-lg p-3 sm:p-4">
                <div className="text-xs sm:text-sm text-gray-700 leading-relaxed space-y-2">
                  {isConnecting ? (
                    <div className="text-center py-4">
                      <p className="font-bold text-growth-green">市場データ分析中...</p>
                    </div>
                  ) : (
                    <>
                      <div>
                        {analysis.split('\n').map((line, index) => renderAnalysisLine(line, index))}
                      </div>
                      {isStreaming && (
                        <span className="inline-block w-2 h-4 bg-growth-green animate-pulse ml-1"></span>
                      )}
                    </>
                  )}
                </div>
              </div>

              {onLineConversion && (
                <>
                  <button
                    onClick={onLineConversion}
                    className="w-full bg-growth-green text-white font-bold py-4 px-6 rounded-lg hover:bg-growth-green-dark transition-all shadow-button hover:shadow-lg flex items-center justify-center gap-3 text-sm mt-6"
                  >
                    <ExternalLink className="w-6 h-6" />
                    <span>市場分析情報をLINEで受け取る（参考情報）</span>
                  </button>

                  <div className="mt-3 p-3 bg-growth-green/10 rounded-lg border border-growth-green/30">
                    <p className="text-xs text-gray-700 leading-relaxed">
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
