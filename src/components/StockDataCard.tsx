import { useState, useEffect } from 'react';
import { StockInfo, StockPrice } from '../types/stock';

interface StockDataCardProps {
  info: StockInfo;
  latestPrice?: StockPrice;
}

export default function StockDataCard({ info, latestPrice }: StockDataCardProps) {
  const [chartData, setChartData] = useState<number[]>([]);
  const [animationOffset, setAnimationOffset] = useState(0);

  useEffect(() => {
    const baseValue = parseFloat(info.price.replace(/,/g, '')) || 1000;
    const points = Array.from({ length: 30 }, (_, i) => {
      const variation = Math.sin(i * 0.4) * 80 + Math.cos(i * 0.3) * 40;
      return baseValue - 200 + variation + (i * 8);
    });
    setChartData(points);
  }, [info.price]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationOffset((prev) => (prev + 0.5) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const isPositive = !info.change.startsWith('-');

  return (
    <div className="px-4 py-3">
      <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-card p-5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#86efac" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#22c55e" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#16a34a" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            {chartData.length > 0 && (
              <>
                <path
                  d={`M ${-10 + animationOffset},${100 - (chartData[0] / Math.max(...chartData)) * 60 + 20} ${chartData.map((value, i) => {
                    const x = ((i / (chartData.length - 1)) * 120) - 10 + animationOffset;
                    const y = 100 - (value / Math.max(...chartData)) * 60 + 20;
                    return `L ${x},${y}`;
                  }).join(' ')} L ${110 + animationOffset},100 L ${-10 + animationOffset},100 Z`}
                  fill="url(#waveGradient)"
                />
                <path
                  d={`M ${-10 + animationOffset},${100 - (chartData[0] / Math.max(...chartData)) * 60 + 20} ${chartData.map((value, i) => {
                    const x = ((i / (chartData.length - 1)) * 120) - 10 + animationOffset;
                    const y = 100 - (value / Math.max(...chartData)) * 60 + 20;
                    return `L ${x},${y}`;
                  }).join(' ')}`}
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </>
            )}
          </svg>
        </div>

        <div className="relative z-10">
          <div className="mb-3">
            <h2 className="text-base font-medium text-gray-600">株智能報告</h2>
          </div>

          <div className="mb-2">
            <div className="text-5xl font-bold text-gray-900 leading-tight">
              {info.price}
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <span className={`text-xl font-bold ${isPositive ? 'text-growth-green' : 'text-red-500'}`}>
              {info.change}
            </span>
            <span className={`text-xl font-bold ${isPositive ? 'text-growth-green' : 'text-red-500'}`}>
              ({info.changePercent})
            </span>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-3 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">初値</span>
              <span className="text-sm font-semibold text-gray-900">{latestPrice?.open || info.price}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">高値</span>
              <span className="text-sm font-semibold text-gray-900">{latestPrice?.high || info.price}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">安値</span>
              <span className="text-sm font-semibold text-gray-900">{latestPrice?.low || info.price}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">終値</span>
              <span className="text-sm font-semibold text-gray-900">{latestPrice?.close || info.price}</span>
            </div>
            <div className="flex items-center gap-2 col-span-2">
              <span className="text-xs text-gray-500">売買高(株)</span>
              <span className="text-sm font-semibold text-gray-900">{latestPrice?.volume || 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
