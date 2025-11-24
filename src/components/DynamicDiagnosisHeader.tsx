interface DynamicDiagnosisHeaderProps {
  stockName: string;
  stockCode: string;
}

export default function DynamicDiagnosisHeader({ stockName, stockCode }: DynamicDiagnosisHeaderProps) {
  return (
    <div className="px-4 py-6">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-center mb-3">
          <h2 className="text-white text-xl font-bold text-center">
            株|{stockCode} {stockName}診断開始
          </h2>
        </div>
        <div className="h-1 bg-gradient-to-r from-accent-orange via-accent-gold to-transparent rounded-full"></div>
      </div>
    </div>
  );
}
