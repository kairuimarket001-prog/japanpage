interface ModernBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export default function ModernBackground({ children, className = "" }: ModernBackgroundProps) {
  return (
    <div
      className={`min-h-screen relative ${className}`}
      style={{
        backgroundImage: 'url(/back.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'bottom',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'scroll'
      }}
    >
      {children}
    </div>
  );
}
