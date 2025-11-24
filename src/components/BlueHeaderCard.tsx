interface BlueHeaderCardProps {
  children: React.ReactNode;
  headerText?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function BlueHeaderCard({ children, headerText = "三井金″株式″会社診断開始 ≫≫≫", className = "", style }: BlueHeaderCardProps) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.4) 0%, rgba(29, 78, 216, 0.35) 100%)',
        backdropFilter: 'blur(10px)',
        border: '2px solid rgba(59, 130, 246, 0.5)',
        borderRadius: '12px',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37), inset 0 0 30px rgba(59, 130, 246, 0.1)',
        ...style
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          border: '1px solid rgba(96, 165, 250, 0.2)',
          borderRadius: '11px',
          margin: '4px'
        }}
      />

      <div
        className="relative z-10"
        style={{
          background: 'linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)',
          padding: '12px 20px',
          borderBottom: '3px solid #1e40af'
        }}
      >
        <h2 className="text-white font-bold text-lg md:text-xl text-center tracking-wide">
          {headerText}
        </h2>
      </div>

      {children}
    </div>
  );
}
