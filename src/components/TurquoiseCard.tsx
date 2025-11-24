interface TurquoiseCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function TurquoiseCard({ children, className = "" }: TurquoiseCardProps) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.4) 0%, rgba(29, 78, 216, 0.35) 100%)',
        backdropFilter: 'blur(10px)',
        border: '2px solid rgba(59, 130, 246, 0.4)',
        borderRadius: '12px',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37), inset 0 0 30px rgba(59, 130, 246, 0.1)'
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
      {children}
    </div>
  );
}
