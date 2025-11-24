import { StockPrice } from '../types/stock';
import { useState, useEffect } from 'react';

interface ScrollingHistoryDataProps {
  prices: StockPrice[];
  stockName: string;
}

export default function ScrollingHistoryData({ prices, stockName }: ScrollingHistoryDataProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (prices.length <= 1) return;

    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % prices.length);
        setIsAnimating(false);
      }, 600);
    }, 2500);

    return () => clearInterval(interval);
  }, [prices.length]);

  if (prices.length === 0) {
    return null;
  }

  const visiblePrices = [
    prices[currentIndex % prices.length],
    prices[(currentIndex + 1) % prices.length],
    prices[(currentIndex + 2) % prices.length]
  ];

  const formatDate = (dateString: string) => {
    if (!dateString) return '';

    const slashMatch = dateString.match(/^(\d+)\/(\d+)/);
    if (slashMatch) {
      return `${slashMatch[1]}/${slashMatch[2]}`;
    }

    const japaneseMatch = dateString.match(/(\d+)月(\d+)日/);
    if (japaneseMatch) {
      return `${japaneseMatch[1]}/${japaneseMatch[2]}`;
    }

    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${month}/${day}`;
    }

    return dateString;
  };

  const renderPriceItem = (price: StockPrice, index: number) => {
    return (
      <div key={`${price.date}-${index}`} className="mb-2 last:mb-0">
        <div className="text-sm text-black pl-3">
          {price.code} {formatDate(price.date)}
        </div>
        <div
          className="flex items-center gap-2 text-sm"
          style={{
            backgroundImage: 'url(/slider.png)',
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            padding: '8px 12px'
          }}
        >
          <span className="text-black">終値：</span>
          <span className="text-red-600">{price.close}</span>
          <span className="text-black">{stockName.slice(0, 4)}</span>
          <span className="text-black">前日比：</span>
          <span className="text-red-600">{price.change}</span>
          <span className="text-red-600">{price.changePercent}%</span>
        </div>
      </div>
    );
  };

  return (
    <div className="px-4 py-6">
      <div className="max-w-lg mx-auto">
        <div className="relative w-full overflow-hidden" style={{ height: '210px' }}>
          <div
            className="absolute inset-0 transition-transform duration-600 ease-in-out"
            style={{
              transform: `translateY(-${(currentIndex % prices.length) * 70}px)`
            }}
          >
            {prices.concat(prices.slice(0, 2)).map((price, idx) => (
              <div key={`${price.date}-${idx}`} style={{ height: '70px' }}>
                {renderPriceItem(price, idx)}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 text-center">
          <p className="text-xs text-blue-900">
            データ出典: 公開市場情報 | 更新: 準リアルタイム
          </p>
          <p className="text-xs text-blue-900 mt-1">
            ※過去のデータは将来の結果を保証するものではありません
          </p>
        </div>
      </div>
    </div>
  );
}
