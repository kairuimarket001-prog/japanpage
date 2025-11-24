import { useState, useEffect } from 'react';
import { StockInfo, StockPrice } from '../types/stock';

interface StockDataCardProps {
  info: StockInfo;
  latestPrice?: StockPrice;
  date?: string;
}

export default function StockDataCard({ info, latestPrice, date }: StockDataCardProps) {
  const [animationOffset, setAnimationOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationOffset((prev) => (prev + 1) % 200);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const generateWavePath = (offset: number) => {
    const points = 100;
    let path = 'M 0,0 ';

    for (let i = 0; i <= points; i++) {
      const x = (i / points) * 100;
      const y = 30 + Math.sin((i / points) * Math.PI * 4 + offset * 0.1) * 10;
      path += `L ${x},${y} `;
    }

    path += 'L 100,100 L 0,100 Z';
    return path;
  };

  const isPositive = !info.change.startsWith('-');

  return (
    <div className="px-4 py-3 relative">
      <div className="max-w-lg mx-auto relative">
        <div className="absolute inset-0 rounded-2xl overflow-hidden bg-white" style={{ zIndex: 0 }}>
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
            <defs>
              <linearGradient id={`waveGradient-${info.code}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#22c55e" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#86efac" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <path
              d={generateWavePath(animationOffset)}
              fill={`url(#waveGradient-${info.code})`}
            />
            <path
              d={generateWavePath(animationOffset + 50)}
              fill={`url(#waveGradient-${info.code})`}
              opacity="0.5"
            />
          </svg>
          {date && (
            <div className="absolute top-4 right-4 z-10">
              <span className="text-xs font-semibold text-white px-3 py-1 rounded-full bg-growth-green/80 backdrop-blur-sm shadow-md">
                {date}
              </span>
            </div>
          )}
        </div>

        <div className="relative bg-white/90 rounded-2xl shadow-card p-5" style={{ zIndex: 1 }}>

        <div className="relative z-10">
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
    </div>
  );
}
