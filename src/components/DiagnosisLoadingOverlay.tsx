import { useEffect, useState } from 'react';
import RobotScholarIcon from './RobotScholarIcon';

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
        background: 'linear-gradient(135deg, rgba(60, 8, 0, 0.95) 0%, rgba(92, 42, 20, 0.95) 50%, rgba(139, 69, 19, 0.95) 100%)'
      }}
    >
      <div className={`w-full max-w-lg transition-transform duration-500 ${
        isExiting ? 'scale-95' : 'scale-100'
      }`}>
        <div className="relative bg-white/95 backdrop-blur-sm border-4 border-white rounded-2xl shadow-2xl p-8 overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              background: 'linear-gradient(135deg, rgba(60,8,0,0.3) 0%, rgba(92,42,20,0.2) 50%, rgba(139,69,19,0.3) 100%)'
            }}
          />

          <div className="relative">
            <RobotScholarIcon />

            <div className="mb-6">
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r mb-2 text-center" style={{ backgroundImage: 'linear-gradient(to right, #3c0800, #8B4513)' }}>市場データ分析中</h3>
              <p className="text-sm font-semibold text-center" style={{ color: '#5a2a14' }}>参考情報を生成しています...</p>
            </div>

            <div className="relative w-full h-4 rounded-full overflow-hidden mb-3 border-2 shadow-inner" style={{ background: 'linear-gradient(to right, #f5e6d3, #e8d4bf)', borderColor: '#8B4513' }}>
              <div
                className="absolute top-0 left-0 h-full transition-all duration-300 ease-out animate-gradient-shift shadow-lg"
                style={{
                  width: `${Math.min(progress, 100)}%`,
                  background: 'linear-gradient(to right, #3c0800, #8B4513, #5a2a14)',
                  backgroundSize: '200% 100%'
                }}
              />
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_1.5s_ease-in-out_infinite]"
              />
            </div>

            <div className="mb-6 text-center">
              <span className="text-2xl font-bold text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(to right, #3c0800, #8B4513)' }}>
                {Math.floor(Math.min(progress, 100))}%
              </span>
            </div>

            <div className="border-3 rounded-xl p-6 shadow-lg" style={{ background: 'linear-gradient(to bottom right, #f5e6d3, #e8d4bf)', borderColor: '#8B4513' }}>
              <div className="space-y-3 text-sm">
                <p className="font-bold text-center text-base" style={{ color: '#3c0800' }}>
                  AIによる情報分析中（参考資料作成）
                </p>
                <p className="font-semibold text-center" style={{ color: '#5a2a14' }}>
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
