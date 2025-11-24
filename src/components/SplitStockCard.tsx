import { StockInfo, StockPrice } from '../types/stock';

interface SplitStockCardProps {
  info: StockInfo;
  latestPrice?: StockPrice;
}

export default function SplitStockCard({ info, latestPrice }: SplitStockCardProps) {
  const date = latestPrice?.date || info.timestamp;

  return (
    <div className="px-4 py-0">
      <div className="max-w-lg mx-auto">
        <div className="text-left mb-1">
          <div className="text-2xl font-bold" style={{
            color: '#3c0800',
            fontFamily: 'HiraKakuPro-W3, Hiragino Kaku Gothic Pro, sans-serif'
          }}>
            {info.name}
          </div>
          <div className="text-base font-medium" style={{
            color: '#3c0800',
            fontFamily: 'HiraKakuPro-W3, Hiragino Kaku Gothic Pro, sans-serif'
          }}>
            ({info.code}) {date}
          </div>
        </div>

        <div className="relative mt-3">
          <div
            className="w-full rounded-lg overflow-hidden relative"
            style={{
              backgroundImage: 'url(/stock.png)',
              backgroundSize: '100% 100%',
              backgroundPosition: 'center',
              padding: '20px'
            }}
          >
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-bold" style={{
                  color: '#dc2626',
                  textShadow: '0 0 3px rgba(255, 255, 255, 0.8), 1px 1px 2px rgba(255, 255, 255, 0.6)'
                }}>
                  初期値
                </span>
                <span className="text-base font-medium" style={{ color: '#000000' }}>
                  {latestPrice?.open || info.price}
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-sm font-bold" style={{
                  color: '#dc2626',
                  textShadow: '0 0 3px rgba(255, 255, 255, 0.8), 1px 1px 2px rgba(255, 255, 255, 0.6)'
                }}>
                  高価値
                </span>
                <span className="text-base font-medium" style={{ color: '#000000' }}>
                  {latestPrice?.high || info.price}
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-sm font-bold" style={{
                  color: '#dc2626',
                  textShadow: '0 0 3px rgba(255, 255, 255, 0.8), 1px 1px 2px rgba(255, 255, 255, 0.6)'
                }}>
                  一昨日の終わり
                </span>
                <span className="text-base font-medium" style={{ color: '#000000' }}>
                  {latestPrice?.close || info.price}
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-sm font-bold" style={{
                  color: '#dc2626',
                  textShadow: '0 0 3px rgba(255, 255, 255, 0.8), 1px 1px 2px rgba(255, 255, 255, 0.6)'
                }}>
                  最終値
                </span>
                <span className="text-base font-medium" style={{ color: '#000000' }}>
                  {latestPrice?.low || info.price}
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-sm font-bold" style={{
                  color: '#dc2626',
                  textShadow: '0 0 3px rgba(255, 255, 255, 0.8), 1px 1px 2px rgba(255, 255, 255, 0.6)'
                }}>
                  終値を証明する
                </span>
                <span className="text-base font-medium" style={{ color: '#000000' }}>
                  {latestPrice?.close || info.price}
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-sm font-bold" style={{
                  color: '#dc2626',
                  textShadow: '0 0 3px rgba(255, 255, 255, 0.8), 1px 1px 2px rgba(255, 255, 255, 0.6)'
                }}>
                  売買高
                </span>
                <span className="text-base font-medium" style={{ color: '#000000' }}>
                  {latestPrice?.volume || 'N/A'}
                </span>
              </div>
            </div>
          </div>

          <div
            className="absolute -top-6 right-4"
            style={{ zIndex: 10 }}
          >
            <div className="relative">
              <img
                src="/top.png.png"
                alt="Current Price"
                className="w-32 h-auto"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center pt-0">
                <div className="text-lg font-bold text-white mb-0.5" style={{ lineHeight: '1.2' }}>
                  {info.price}
                </div>
                <div className="flex items-center gap-1 text-xs font-medium text-white">
                  <span>{info.change}</span>
                  <span>{info.changePercent}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
