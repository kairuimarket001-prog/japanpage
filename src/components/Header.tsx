export default function Header() {
  return (
    <header className="relative">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-center items-center">
          <h1 className="relative text-5xl font-black tracking-tight">
            <span className="relative inline-block bg-gradient-to-r from-growth-green via-emerald-400 to-growth-green bg-clip-text text-transparent animate-gradient-shine" style={{
              fontFamily: '"クラフト明朝", "Zen Old Mincho", serif',
              backgroundSize: '200% auto',
              textShadow: '0 0 30px rgba(16, 185, 129, 0.5), 0 0 60px rgba(16, 185, 129, 0.3)',
              filter: 'drop-shadow(0 4px 6px rgba(16, 185, 129, 0.3))'
            }}>
              智能株
            </span>
          </h1>
        </div>
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Zen+Old+Mincho:wght@700;900&display=swap');

        @keyframes gradient-shine {
          0% {
            background-position: 0% center;
          }
          50% {
            background-position: 100% center;
          }
          100% {
            background-position: 0% center;
          }
        }
        .animate-gradient-shine {
          animation: gradient-shine 3s ease infinite;
        }
      `}</style>
    </header>
  );
}
