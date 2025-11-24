import { useState, useEffect, useRef } from 'react';
import { StockPrice } from '../types/stock';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface StockCarouselProps {
  prices: StockPrice[];
  stockName: string;
}

const formatStockDate = (dateString: string): string => {
  try {
    if (!dateString) return '日付不明';

    let date: Date;

    if (dateString.includes('/')) {
      const parts = dateString.split('/');
      if (parts.length === 3) {
        let year = parseInt(parts[0]);
        const month = parseInt(parts[1]);
        const day = parseInt(parts[2]);

        if (year < 100) {
          year += 2000;
        }

        date = new Date(year, month - 1, day);
      } else {
        date = new Date(dateString);
      }
    } else if (dateString.includes('-')) {
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

const formatChartDate = (dateString: string): string => {
  try {
    if (!dateString) return '';

    let date: Date;

    if (dateString.includes('/')) {
      const parts = dateString.split('/');
      if (parts.length === 3) {
        let year = parseInt(parts[0]);
        const month = parseInt(parts[1]);
        const day = parseInt(parts[2]);

        if (year < 100) {
          year += 2000;
        }

        date = new Date(year, month - 1, day);
      } else {
        date = new Date(dateString);
      }
    } else {
      date = new Date(dateString);
    }

    if (isNaN(date.getTime())) {
      return '';
    }

    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}/${day}`;
  } catch (error) {
    return '';
  }
};

const parsePrice = (priceString: string): number => {
  if (!priceString) return 0;
  return parseFloat(priceString.replace(/,/g, ''));
};

export default function StockCarousel({ prices, stockName }: StockCarouselProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeTab, setActiveTab] = useState<'carousel' | 'chart'>('carousel');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prices.length === 0 || activeTab !== 'carousel') return;

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
  }, [prices.length, activeTab]);

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

  const chartData = prices.map(price => ({
    date: formatChartDate(price.date),
    fullDate: formatStockDate(price.date),
    close: parsePrice(price.close),
    open: parsePrice(price.open),
    high: parsePrice(price.high),
    low: parsePrice(price.low),
    volume: price.volume,
    change: price.change,
    changePercent: price.changePercent,
  })).reverse();

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm font-semibold text-gray-900 mb-2">{data.fullDate}</p>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between gap-4">
              <span className="text-red-500 font-medium">開値:</span>
              <span className="text-growth-green font-semibold">{data.open.toLocaleString()}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-red-500 font-medium">高値:</span>
              <span className="text-growth-green font-semibold">{data.high.toLocaleString()}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-red-500 font-medium">安値:</span>
              <span className="text-growth-green font-semibold">{data.low.toLocaleString()}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-red-500 font-medium">終値:</span>
              <span className="text-growth-green font-semibold">{data.close.toLocaleString()}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-red-500 font-medium">出来高:</span>
              <span className="text-growth-green font-semibold">{data.volume}</span>
            </div>
            <div className="flex justify-between gap-4 pt-1 border-t border-gray-200">
              <span className="text-red-500 font-medium">変動:</span>
              <span className={`font-semibold ${data.change.startsWith('-') ? 'text-red-500' : 'text-growth-green'}`}>
                {data.change} ({data.changePercent})
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="px-4 py-6">
      <div className="max-w-lg mx-auto">
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveTab('carousel')}
            className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === 'carousel'
                ? 'bg-growth-green text-white shadow-lg scale-105'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            データ輪播
          </button>
          <button
            onClick={() => setActiveTab('chart')}
            className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === 'chart'
                ? 'bg-growth-green text-white shadow-lg scale-105'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            動態図表
          </button>
        </div>

        {activeTab === 'carousel' ? (
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
        ) : (
          <div className="bg-white rounded-xl shadow-card p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">株価推移チャート</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorClose" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11, fill: '#6b7280' }}
                  tickLine={{ stroke: '#e5e7eb' }}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: '#6b7280' }}
                  tickLine={{ stroke: '#e5e7eb' }}
                  tickFormatter={(value) => value.toLocaleString()}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="close"
                  stroke="#22c55e"
                  strokeWidth={2}
                  fill="url(#colorClose)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            ※ 過去のデータは将来の結果を保証するものではありません
          </p>
        </div>
      </div>
    </div>
  );
}
