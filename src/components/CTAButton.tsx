import { Rocket } from 'lucide-react';

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

        <div className="relative z-10">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-neon-cyan p-4 rounded-full shadow-lg animate-pulse-gentle">
              <Rocket className="w-12 h-12 text-white" strokeWidth={2} />
            </div>
          </div>

          <h3 className="text-white text-center text-xl font-bold mb-2">
            {displayName}の情報獲取
          </h3>

          <p className="text-white/90 text-center text-sm mb-6">
            AI技術による詳細な株式分析
          </p>

          <button
            onClick={onClick}
            disabled={disabled}
            className="w-full bg-gradient-to-r from-fluorescent-yellow to-fluorescent-green text-gray-900 font-bold text-lg py-4 px-8 rounded-xl shadow-button hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            今すぐ診断する
          </button>
        </div>
      </div>
    </div>
  );
}
