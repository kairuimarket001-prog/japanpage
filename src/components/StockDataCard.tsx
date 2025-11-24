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
    <div className="px-4 py-3 relative overflow-hidden">
      <div className="absolute inset-0 px-4 py-3">
        <div className="max-w-lg mx-auto h-full rounded-2xl overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#86efac" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#22c55e" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#16a34a" stopOpacity="0.4" />
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
                  stroke="#16a34a"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </>
            )}
          </svg>
        </div>
      </div>

      <div className="max-w-lg mx-auto bg-white/75 backdrop-blur-sm rounded-2xl shadow-card p-5 relative">

        <div className="relative z-10 bg-white/40 rounded-xl p-4">
          <div className="mb-4">
            <h2 className="text-base font-medium text-gray-600">{info.name || '株智能報告'}</h2>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2 pb-4 border-b border-gray-200">
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

          <div className="mt-4 flex items-end justify-between">
            <div className="text-4xl font-bold text-gray-900 leading-tight">
              {info.price}
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-lg font-bold ${isPositive ? 'text-growth-green' : 'text-red-500'}`}>
                {info.change}
              </span>
              <span className={`text-lg font-bold ${isPositive ? 'text-growth-green' : 'text-red-500'}`}>
                ({info.changePercent})
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
