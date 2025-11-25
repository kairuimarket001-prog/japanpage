import { useEffect, useState } from 'react';
import { Brain } from 'lucide-react';

interface DiagnosisLoadingOverlayProps {
  isVisible: boolean;
  progress: number;
  onComplete?: () => void;
}

export default function DiagnosisLoadingOverlay({
  isVisible,
  progress,
  onComplete
}: DiagnosisLoadingOverlayProps) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (progress >= 100 && isVisible) {
      setIsExiting(true);
      const timer = setTimeout(() => {
        if (onComplete) {
          onComplete();
        }
      }, 500);
      return () => clearTimeout(timer);
    } else if (!isVisible) {
      setIsExiting(false);
    }
  }, [progress, isVisible, onComplete]);

  useEffect(() => {
    if (isVisible) {
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
  }, [isVisible]);

  if (!isVisible && !isExiting) return null;

  return (
    <div
      className={`fixed inset-0 z-[9997] flex items-center justify-center p-4 backdrop-blur-md transition-opacity duration-500 ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        touchAction: 'none',
        background: 'linear-gradient(135deg, rgba(6, 78, 59, 0.95) 0%, rgba(16, 185, 129, 0.95) 50%, rgba(52, 211, 153, 0.95) 100%)'
      }}
    >
      <div className={`w-full max-w-lg transition-transform duration-500 ${
        isExiting ? 'scale-95' : 'scale-100'
      }`}>
        <div className="relative bg-white rounded-2xl shadow-2xl p-8 overflow-hidden">
          <div className="relative">
            <div className="flex justify-center mb-6">
              <div className="bg-growth-green p-6 rounded-full animate-pulse-gentle">
                <Brain className="w-16 h-16 text-white" strokeWidth={2} />
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">市場データ分析中</h3>
              <p className="text-sm text-gray-600 text-center">参考情報を生成しています...</p>
            </div>

            <div className="relative w-full h-3 rounded-full overflow-hidden mb-3 bg-gray-200">
              <div
                className="absolute top-0 left-0 h-full transition-all duration-300 ease-out bg-growth-green"
                style={{
                  width: `${Math.min(progress, 100)}%`
                }}
              />
            </div>

            <div className="mb-6 text-center">
              <span className="text-2xl font-bold text-growth-green">
                {Math.floor(Math.min(progress, 100))}%
              </span>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <div className="space-y-3 text-sm">
                <p className="font-bold text-center text-base text-gray-900">
                  智能による情報分析中（参考資料作成）
                </p>
                <p className="font-semibold text-center text-gray-600">
                  しばらくお待ちください
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
