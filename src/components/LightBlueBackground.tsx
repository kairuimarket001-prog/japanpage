interface LightBlueBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export default function LightBlueBackground({ children, className = "" }: LightBlueBackgroundProps) {
  return (
    <div
      className={`min-h-screen relative ${className}`}
      style={{
        background: 'linear-gradient(180deg, #e0f2fe 0%, #bae6fd 50%, #e0f2fe 100%)',
        backgroundAttachment: 'fixed'
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 35px,
              rgba(255, 255, 255, 0.1) 35px,
              rgba(255, 255, 255, 0.1) 70px
            ),
            repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 35px,
              rgba(255, 255, 255, 0.1) 35px,
              rgba(255, 255, 255, 0.1) 70px
            )
          `
        }}
      />

      <svg
        className="absolute top-2 left-2 opacity-20"
        width="60"
        height="60"
        viewBox="0 0 60 60"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 10 10 L 15 5 L 20 10 L 15 15 Z M 40 10 L 45 5 L 50 10 L 45 15 Z"
          fill="#ef4444"
          opacity="0.6"
        />
        <rect x="25" y="8" width="10" height="4" fill="#ef4444" opacity="0.6" />
      </svg>

      <svg
        className="absolute top-2 right-2 opacity-20"
        width="60"
        height="60"
        viewBox="0 0 60 60"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 10 10 L 15 5 L 20 10 L 15 15 Z M 40 10 L 45 5 L 50 10 L 45 15 Z"
          fill="#ef4444"
          opacity="0.6"
        />
        <rect x="25" y="8" width="10" height="4" fill="#ef4444" opacity="0.6" />
      </svg>

      <svg
        className="absolute bottom-20 left-4 opacity-15"
        width="80"
        height="80"
        viewBox="0 0 80 80"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="10" y1="40" x2="30" y2="40" stroke="#1e40af" strokeWidth="3" />
        <line x1="50" y1="40" x2="70" y2="40" stroke="#1e40af" strokeWidth="3" />
        <line x1="40" y1="10" x2="40" y2="30" stroke="#1e40af" strokeWidth="3" />
      </svg>

      <svg
        className="absolute bottom-20 right-4 opacity-15"
        width="80"
        height="80"
        viewBox="0 0 80 80"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="10" y1="40" x2="30" y2="40" stroke="#1e40af" strokeWidth="3" />
        <line x1="50" y1="40" x2="70" y2="40" stroke="#1e40af" strokeWidth="3" />
        <line x1="40" y1="10" x2="40" y2="30" stroke="#1e40af" strokeWidth="3" />
      </svg>

      {children}
    </div>
  );
}
