
interface CTAButtonProps {
  onClick: () => void;
  stockName?: string;
  disabled?: boolean;
}

export default function CTAButton({ onClick, stockName = '', disabled = false }: CTAButtonProps) {
  const displayName = stockName || '銘柄';

  return (
    <div className="px-4 py-6">
      <div className="max-w-lg mx-auto bg-gradient-to-br from-cta-purple to-cta-purple-dark rounded-2xl p-8 shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)'
          }} />
        </div>

        <div className="absolute right-4 bottom-4 w-32 h-32 opacity-80">
          <svg viewBox="0 0 100 150" className="w-full h-full drop-shadow-2xl animate-bounce-slow">
            <defs>
              <linearGradient id="rocketGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#86efac" />
                <stop offset="50%" stopColor="#4ade80" />
                <stop offset="100%" stopColor="#22c55e" />
              </linearGradient>
              <linearGradient id="windowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="100%" stopColor="#fde047" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <ellipse cx="50" cy="130" rx="20" ry="8" fill="#ef4444" opacity="0.6" className="animate-pulse">
              <animate attributeName="ry" values="8;12;8" dur="0.5s" repeatCount="indefinite" />
            </ellipse>
            <ellipse cx="50" cy="135" rx="15" ry="6" fill="#fbbf24" opacity="0.5" className="animate-pulse">
              <animate attributeName="ry" values="6;10;6" dur="0.6s" repeatCount="indefinite" />
            </ellipse>
            <path d="M 35 100 L 20 130 L 35 125 Z" fill="#16a34a" opacity="0.8" />
            <path d="M 65 100 L 80 130 L 65 125 Z" fill="#16a34a" opacity="0.8" />
            <ellipse cx="50" cy="70" rx="18" ry="50" fill="url(#rocketGradient)" filter="url(#glow)" />
            <ellipse cx="50" cy="45" rx="12" ry="15" fill="url(#windowGradient)" opacity="0.9" />
            <ellipse cx="50" cy="40" rx="8" ry="10" fill="#fef3c7" opacity="0.7" />
            <circle cx="47" cy="38" r="2" fill="#ffffff" opacity="0.9" />
            <path d="M 50 20 Q 55 25 50 30 Q 45 25 50 20" fill="#ef4444" />
          </svg>
        </div>

        <div className="relative z-10">
          <h3 className="text-white text-left text-xl font-bold mb-2">
            {displayName}の情報獲取
          </h3>

          <p className="text-white/90 text-left text-sm mb-6">
            AI技術による詳細な株式分析
          </p>

          <button
            onClick={onClick}
            disabled={disabled}
            className="w-full bg-gradient-to-r from-fluorescent-yellow to-fluorescent-green text-gray-900 font-bold text-lg py-4 px-8 rounded-xl shadow-button hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            AI分析ツールを使う
          </button>
        </div>
      </div>
    </div>
  );
}
