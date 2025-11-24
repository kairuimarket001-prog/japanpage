import { Database, Cpu, LineChart, CheckCircle, Zap, Shield } from 'lucide-react';

export default function AITrustSection() {
  return (
    <div className="max-w-6xl mx-auto">
      <div>
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-accent-orange/20 to-accent-gold/20 backdrop-blur-sm px-4 py-2 rounded-full border border-accent-orange/30 mb-4">
            <Shield className="w-4 h-4 text-accent-gold" />
<span className="text-accent-gold text-sm font-bold">公開市場データの表示ツール</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
            銘柄情報表示ツール
          </h2>
          <p className="text-gray-400 text-lg">
            公開市場データを見やすく表示（教育・学習用）
          </p>
        </div>

        <div className="relative bg-gradient-to-br from-dark-card via-dark-tech to-dark-card rounded-2xl p-8 border border-accent-orange/30 shadow-orange-glow overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-orange/10 rounded-full blur-3xl"></div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <div className="flex-1 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-accent-orange to-accent-gold rounded-full flex items-center justify-center mx-auto mb-3 shadow-gold-glow">
                <Database className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white text-lg font-bold mb-2">データ取得</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                公開市場データの取得
              </p>
            </div>

            <div className="hidden md:block">
              <svg className="w-12 h-8" viewBox="0 0 48 32" fill="none">
                <path d="M0 16 L40 16 M40 16 L32 8 M40 16 L32 24" stroke="url(#gradient1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <defs>
                  <linearGradient id="gradient1" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#ff8c42"/>
                    <stop offset="100%" stopColor="#ffa726"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="md:hidden w-px h-8 bg-gradient-to-b from-accent-orange to-accent-gold"></div>

            <div className="flex-1 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-accent-orange to-accent-gold rounded-full flex items-center justify-center mx-auto mb-3 shadow-gold-glow">
                <Cpu className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white text-lg font-bold mb-2">情報整理</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                データの整理と表示
              </p>
            </div>

            <div className="hidden md:block">
              <svg className="w-12 h-8" viewBox="0 0 48 32" fill="none">
                <path d="M0 16 L40 16 M40 16 L32 8 M40 16 L32 24" stroke="url(#gradient2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <defs>
                  <linearGradient id="gradient2" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#ff8c42"/>
                    <stop offset="100%" stopColor="#ffa726"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="md:hidden w-px h-8 bg-gradient-to-b from-accent-orange to-accent-gold"></div>

            <div className="flex-1 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-accent-orange to-accent-gold rounded-full flex items-center justify-center mx-auto mb-3 shadow-gold-glow">
                <LineChart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white text-lg font-bold mb-2">情報表示</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                読みやすい形式で表示
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-trust-green/10 to-trust-green/5 border border-trust-green/30 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-trust-green" />
              <div>
                <div className="text-white font-bold text-sm">データ表示</div>
                <div className="text-gray-400 text-xs">市場データの表示</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-tech-cyan/10 to-tech-cyan/5 border border-tech-cyan/30 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-tech-cyan" />
              <div>
                <div className="text-white font-bold text-sm">学習ツール</div>
                <div className="text-gray-400 text-xs">教育目的のツール</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-accent-gold/10 to-accent-gold/5 border border-accent-gold/30 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-accent-gold" />
              <div>
                <div className="text-white font-bold text-sm">情報整理</div>
                <div className="text-gray-400 text-xs">データの整理表示</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
