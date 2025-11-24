import { useState, useEffect } from 'react';
import { StockPrice } from '../types/stock';

interface StockCarouselProps {
  prices: StockPrice[];
  stockName: string;
}

export default function StockCarousel({ prices, stockName }: StockCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (prices.length > 1) {
      const interval = setInterval(() => {
        setSelectedIndex((prev) => (prev + 1) % prices.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [prices.length]);

  if (prices.length === 0) {
    return null;
  }

  const visiblePrices = prices.slice(0, Math.min(prices.length, 5));

  const generateMiniChart = () => {
    return Array.from({ length: 10 }, (_, i) => {
      return 30 + Math.sin(i * 0.5) * 10 + Math.random() * 10;
    });
  };

  return (
    <div className="px-4 py-6">
      <div className="max-w-lg mx-auto">
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {visiblePrices.map((_, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`flex-shrink-0 px-4 py-2 rounded-lg font-medium transition-all ${
                selectedIndex === index
                  ? 'bg-gray-900 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {new Date(visiblePrices[index].date).toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' })}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-card p-4 space-y-3">
          {visiblePrices.map((price, index) => {
            const isPositive = !price.change.startsWith('-');
            const chartPoints = generateMiniChart();
            const maxValue = Math.max(...chartPoints);

            return (
              <div
                key={`${price.date}-${index}`}
                className={`p-3 rounded-lg transition-all ${
                  selectedIndex === index ? 'bg-gray-50 border-2 border-growth-green' : 'bg-white'
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-gray-900">{price.code}</span>
                      <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
                        {stockName.slice(0, 4)}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-gray-900">{price.close}</span>
                      <span className={`text-sm font-semibold ${isPositive ? 'text-growth-green' : 'text-red-500'}`}>
                        {isPositive ? '+' : ''}{price.changePercent}
                      </span>
                    </div>
                  </div>

                  <div className="relative w-24 h-12">
                    <svg className="w-full h-full" preserveAspectRatio="none">
                      <path
                        d={`M 0,${50 - (chartPoints[0] / maxValue) * 40} ${chartPoints.map((value, i) => {
                          const x = (i / (chartPoints.length - 1)) * 100;
                          const y = 50 - (value / maxValue) * 40;
                          return `L ${x},${y}`;
                        }).join(' ')} L 100,50 L 0,50 Z`}
                        fill="rgba(34, 197, 94, 0.2)"
                      />
                      <path
                        d={`M 0,${50 - (chartPoints[0] / maxValue) * 40} ${chartPoints.map((value, i) => {
                          const x = (i / (chartPoints.length - 1)) * 100;
                          const y = 50 - (value / maxValue) * 40;
                          return `L ${x},${y}`;
                        }).join(' ')}`}
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="2"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="text-xs font-semibold text-white px-2 py-0.5 rounded bg-growth-green/90 shadow-sm">
                        {new Date(price.date).toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            ※ 過去のデータは将来の結果を保証するものではありません
          </p>
        </div>
      </div>
    </div>
  );
}
