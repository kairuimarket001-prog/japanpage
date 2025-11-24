interface AIChipLogoProps {
  className?: string;
}

export default function AIChipLogo({ className = "w-32 h-32" }: AIChipLogoProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="chipGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1e40af" />
        </linearGradient>
        <filter id="shadow">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.3" />
        </filter>
      </defs>

      <rect
        x="40"
        y="40"
        width="120"
        height="120"
        rx="20"
        fill="url(#chipGradient)"
        filter="url(#shadow)"
      />

      <circle cx="15" cy="15" r="6" fill="#3b82f6" stroke="white" strokeWidth="2" />
      <line x1="15" y1="21" x2="15" y2="60" stroke="white" strokeWidth="3" />
      <rect x="12" y="60" width="6" height="8" fill="white" />

      <circle cx="100" cy="10" r="6" fill="#3b82f6" stroke="white" strokeWidth="2" />
      <line x1="100" y1="16" x2="100" y2="40" stroke="white" strokeWidth="3" />
      <rect x="97" y="40" width="6" height="8" fill="white" />

      <circle cx="185" cy="15" r="6" fill="#3b82f6" stroke="white" strokeWidth="2" />
      <line x1="185" y1="21" x2="185" y2="60" stroke="white" strokeWidth="3" />
      <rect x="182" y="60" width="6" height="8" fill="white" />

      <circle cx="10" cy="70" r="6" fill="#3b82f6" stroke="white" strokeWidth="2" />
      <line x1="16" y1="70" x2="40" y2="70" stroke="white" strokeWidth="3" />
      <rect x="32" y="67" width="8" height="6" fill="white" />

      <circle cx="190" cy="70" r="6" fill="#3b82f6" stroke="white" strokeWidth="2" />
      <line x1="184" y1="70" x2="160" y2="70" stroke="white" strokeWidth="3" />
      <rect x="160" y="67" width="8" height="6" fill="white" />

      <circle cx="10" cy="130" r="6" fill="#3b82f6" stroke="white" strokeWidth="2" />
      <line x1="16" y1="130" x2="40" y2="130" stroke="white" strokeWidth="3" />
      <rect x="32" y="127" width="8" height="6" fill="white" />

      <circle cx="190" cy="130" r="6" fill="#3b82f6" stroke="white" strokeWidth="2" />
      <line x1="184" y1="130" x2="160" y2="130" stroke="white" strokeWidth="3" />
      <rect x="160" y="127" width="8" height="6" fill="white" />

      <circle cx="15" cy="185" r="6" fill="#3b82f6" stroke="white" strokeWidth="2" />
      <line x1="15" y1="179" x2="15" y2="160" stroke="white" strokeWidth="3" />
      <rect x="12" y="152" width="6" height="8" fill="white" />

      <circle cx="100" cy="190" r="6" fill="#3b82f6" stroke="white" strokeWidth="2" />
      <line x1="100" y1="184" x2="100" y2="160" stroke="white" strokeWidth="3" />
      <rect x="97" y="152" width="6" height="8" fill="white" />

      <circle cx="185" cy="185" r="6" fill="#3b82f6" stroke="white" strokeWidth="2" />
      <line x1="185" y1="179" x2="185" y2="160" stroke="white" strokeWidth="3" />
      <rect x="182" y="152" width="6" height="8" fill="white" />

      <text
        x="100"
        y="115"
        fontSize="60"
        fontWeight="bold"
        fill="white"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
      >
        AI
      </text>
    </svg>
  );
}
