import { useState, useEffect, useRef } from 'react';
import { StockPrice } from '../types/stock';

interface StockCarouselProps {
  prices: StockPrice[];
  stockName: string;
}

const formatStockDate = (dateString: string): string => {
  try {
    if (!dateString) return '日付不明';

    let date: Date;

    if (dateString.includes('-')) {
      date = new Date(dateString);
    } else if (dateString.includes('/')) {
      date = new Date(dateString);
    } else if (!isNaN(Number(dateString))) {
      date = new Date(Number(dateString));
    } else {
      date = new Date(dateString);
    }

    if (isNaN(date.getTime())) {
      return '日付不明';
    }

    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}月${day}日`;
  } catch (error) {
    console.error('Date parsing error:', error, dateString);
    return '日付不明';
  }
};

export default function StockCarousel({ prices, stockName }: StockCarouselProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prices.length === 0) return;

    const scrollInterval = setInterval(() => {
      setScrollPosition((prev) => {
        const nextPosition = prev + 1;
        if (nextPosition >= prices.length) {
          return 0;
        }
        return nextPosition;
      });
    }, 3000);

    return () => clearInterval(scrollInterval);
  }, [prices.length]);

  if (prices.length === 0) {
    return null;
  }

  const displayPrices = prices.length >= 3 ? [...prices, ...prices.slice(0, 3)] : prices;

  const generateMiniChart = () => {
    return Array.from({ length: 10 }, (_, i) => {
      return 30 + Math.sin(i * 0.5) * 10 + Math.random() * 10;
    });
  };

  const itemHeight = 88;
  const translateY = -(scrollPosition * itemHeight);

  return (
    <div className="px-4 py-6">
      <div className="max-w-lg mx-auto">
        <div
          className="bg-white rounded-xl shadow-card overflow-hidden"
          style={{ height: `${itemHeight * 3}px` }}
        >
          <div
            ref={scrollContainerRef}
            className="transition-transform duration-700 ease-in-out"
            style={{ transform: `translateY(${translateY}px)` }}
          >
            {displayPrices.map((price, index) => {
              const isPositive = !price.change.startsWith('-');
              const chartPoints = generateMiniChart();
              const maxValue = Math.max(...chartPoints);

              return (
                <div
                  key={`${price.date}-${index}`}
                  className="p-3 border-b border-gray-100 last:border-b-0"
                  style={{ height: `${itemHeight}px` }}
                >
                  <div className="flex items-center justify-between gap-4 h-full">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-gray-900">{price.code || stockName}</span>
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
                          {formatStockDate(price.date)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
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
