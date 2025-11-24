interface HeroSectionProps {
  stockCode?: string;
  stockName?: string;
  onDiagnosis?: () => void;
  disabled?: boolean;
}

export default function HeroSection({ stockCode = '----', stockName = '', onDiagnosis, disabled = false }: HeroSectionProps) {
  const hasStockData = stockCode !== '----' && stockName;

  return (
    <div className="relative w-full">
      <div className="w-full px-4 py-0 flex flex-col items-center">
        <div className="w-full max-w-4xl mx-auto mb-2">
          <div className="text-center mb-1" style={{ marginTop: '100px' }}>
            <h1 className="inline-block" style={{ height: '1.5rem' }}>
            </h1>
          </div>

          <div className="text-center" style={{ marginTop: '100px' }}>
            <h2 className="font-bold whitespace-nowrap" style={{ height: '1.5rem' }}>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
