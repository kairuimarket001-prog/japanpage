import { useState, useEffect } from 'react';
import { StockInfo, StockPrice } from '../types/stock';

interface StockDataCardProps {
  info: StockInfo;
  latestPrice?: StockPrice;
}

export default function StockDataCard({ info, latestPrice }: StockDataCardProps) {
  const [chartData, setChartData] = useState<number[]>([]);

  useEffect(() => {
    const baseValue = parseFloat(info.price.replace(/,/g, '')) || 1000;
    const points = Array.from({ length: 20 }, (_, i) => {
      const variation = Math.sin(i * 0.5) * 50 + Math.random() * 30;
      return baseValue - 200 + variation + (i * 10);
    });
    setChartData(points);
  }, [info.price]);

  const isPositive = !info.change.startsWith('-');

  return (
    <div className="px-4 py-6">
      <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-card p-6">
        <div className="mb-4">
          <h2 className="text-xl font-medium text-gray-700 mb-2">株智能報告</h2>
        </div>

        <div className="mb-6">
          <div className="flex items-end gap-2 mb-2">
            <div className="text-5xl font-bold text-gray-900">
              {info.price}
            </div>
            <div className="flex items-center gap-1 mb-2">
              <span className={`text-lg font-semibold ${isPositive ? 'text-growth-green' : 'text-red-500'}`}>
                {info.change}
              </span>
              <span className={`text-lg font-semibold ${isPositive ? 'text-growth-green' : 'text-red-500'}`}>
                ({info.changePercent})
              </span>
            </div>
          </div>
        </div>

        <div className="relative h-32 mb-6 bg-gradient-to-b from-growth-green/20 to-growth-green/5 rounded-lg overflow-hidden">
          <svg className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#22c55e" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            <path
              d={`M 0,${100 - (chartData[0] / Math.max(...chartData)) * 80} ${chartData.map((value, i) => {
                const x = (i / (chartData.length - 1)) * 100;
                const y = 100 - (value / Math.max(...chartData)) * 80;
                return `L ${x},${y}`;
              }).join(' ')} L 100,100 L 0,100 Z`}
              fill="url(#chartGradient)"
            />
            <path
              d={`M 0,${100 - (chartData[0] / Math.max(...chartData)) * 80} ${chartData.map((value, i) => {
                const x = (i / (chartData.length - 1)) * 100;
                const y = 100 - (value / Math.max(...chartData)) * 80;
                return `L ${x},${y}`;
              }).join(' ')}`}
              fill="none"
              stroke="#22c55e"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <div className="absolute inset-0 grid grid-cols-2 gap-4 p-4 bg-white/60 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-600">初値</span>
              <span className="text-sm font-bold text-gray-900">{latestPrice?.open || info.price}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-600">高値</span>
              <span className="text-sm font-bold text-gray-900">{latestPrice?.high || info.price}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-600">安値</span>
              <span className="text-sm font-bold text-gray-900">{latestPrice?.low || info.price}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-600">終値</span>
              <span className="text-sm font-bold text-gray-900">{latestPrice?.close || info.price}</span>
            </div>
            <div className="flex items-center gap-2 col-span-2">
              <span className="text-xs font-medium text-gray-600">売買高(株)</span>
              <span className="text-sm font-bold text-gray-900">{latestPrice?.volume || 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
