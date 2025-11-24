interface GradientButtonProps {
  children: React.ReactNode;
  className?: string;
}

export default function GradientButton({ children, className = "" }: GradientButtonProps) {
  return (
    <div
      className={`relative ${className}`}
      style={{
        background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 25%, #60a5fa 50%, #3b82f6 75%, #1e40af 100%)',
        backgroundSize: '200% 100%',
        borderRadius: '12px',
        border: '3px solid #3b82f6',
        boxShadow: '0 4px 14px 0 rgba(59, 130, 246, 0.5), 0 0 20px rgba(96, 165, 250, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.2)',
        willChange: 'box-shadow'
      }}
    >
      <div
        className="absolute inset-0 rounded-lg pointer-events-none"
        style={{
          border: '2px solid rgba(147, 197, 253, 0.3)',
          borderRadius: '10px',
          margin: '2px'
        }}
      />
      {children}
    </div>
  );
}
