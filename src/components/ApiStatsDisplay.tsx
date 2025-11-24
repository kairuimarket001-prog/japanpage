import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, Database, Zap, TrendingUp, AlertTriangle, Building2, ExternalLink } from 'lucide-react';
import { apiClient } from '../lib/apiClient';

interface RateLimitStatus {
  rpm: { current: number; limit: number; remaining: number };
  rpd: { current: number; limit: number; remaining: number };
}

interface TodayStats {
  totals: {
    requests_total: number;
    cache_hits: number;
    api_calls: number;
    errors_count: number;
  };
  cacheHitRate: string;
}

interface StatsData {
  rateLimit: RateLimitStatus;
  today: TodayStats;
}

export default function ApiStatsDisplay() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await apiClient.get('/api/gemini/stats');
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 30000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  if (!stats) return null;

  const cacheHitRate = parseFloat(stats.today.cacheHitRate);
  const apiUsagePercent = (stats.rateLimit.rpd.current / stats.rateLimit.rpd.limit) * 100;

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50">
        {!isOpen ? (
          <button
            onClick={() => setIsOpen(true)}
            className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
            title="API統計・合規情報を表示"
            aria-label="API統計・合規情報を表示"
          >
            <Activity className="w-6 h-6" />
          </button>
        ) : null}
      </div>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div
            className="fixed inset-0 z-[70] flex items-center justify-center p-4"
            role="dialog"
            aria-labelledby="stats-dialog-title"
            aria-modal="true"
          >
            <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden border-2 border-blue-500/30">
              <div className="sticky top-0 bg-slate-900/95 backdrop-blur-sm border-b border-blue-500/30 px-4 sm:px-6 py-4 flex items-center justify-between z-10">
                <h2 id="stats-dialog-title" className="font-bold text-white text-lg sm:text-xl flex items-center gap-2">
                  <Activity className="w-6 h-6 text-blue-400" />
                  API統計・FSA合規情報
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white text-2xl leading-none transition-colors p-1"
                  aria-label="閉じる"
                >
                  ×
                </button>
              </div>

              <div className="overflow-y-auto max-h-[calc(90vh-80px)] px-4 sm:px-6 py-4 space-y-6">
                <section>
                  <h3 className="text-lg font-bold text-blue-300 mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    API運用統計
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-green-500/30">
                      <div className="flex items-center gap-2 mb-2">
                        <Database className="w-4 h-4 text-green-400" />
                        <span className="text-sm font-semibold text-gray-300">キャッシュ効率</span>
                      </div>
                      <div className="text-2xl font-bold text-green-400">{cacheHitRate.toFixed(1)}%</div>
                      <div className="text-xs text-gray-400 mt-1">
                        {stats.today.totals.cache_hits} / {stats.today.totals.requests_total} リクエスト
                      </div>
                    </div>

                    <div className="bg-slate-800/50 p-4 rounded-lg border border-blue-500/30">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-4 h-4 text-blue-400" />
                        <span className="text-sm font-semibold text-gray-300">今日のAPI使用</span>
                      </div>
                      <div className="text-2xl font-bold text-white">
                        {stats.rateLimit.rpd.current}
                      </div>
                      <div className="text-xs text-gray-400 mb-2">
                        上限: {stats.rateLimit.rpd.limit} / 残り: {stats.rateLimit.rpd.remaining}
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            apiUsagePercent > 80 ? 'bg-red-500' : apiUsagePercent > 50 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${Math.min(apiUsagePercent, 100)}%` }}
                        />
                      </div>
                    </div>

                    <div className="bg-slate-800/50 p-4 rounded-lg border border-yellow-500/30">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm font-semibold text-gray-300">分あたりレート</span>
                      </div>
                      <div className="text-2xl font-bold text-white">
                        {stats.rateLimit.rpm.current}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        上限: {stats.rateLimit.rpm.limit} / 残り: {stats.rateLimit.rpm.remaining}
                      </div>
                    </div>

                    <div className="bg-slate-800/50 p-4 rounded-lg border border-purple-500/30">
                      <div className="flex items-center gap-2 mb-2">
                        <Activity className="w-4 h-4 text-purple-400" />
                        <span className="text-sm font-semibold text-gray-300">外部API呼び出し</span>
                      </div>
                      <div className="text-2xl font-bold text-purple-400">
                        {stats.today.totals.api_calls}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">本日の実際の呼び出し回数</div>
                    </div>
                  </div>

                  {stats.today.totals.errors_count > 0 && (
                    <div className="bg-red-900/30 border border-red-500 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-red-400 text-sm">
                        <AlertTriangle className="w-4 h-4" />
                        <span>エラー: {stats.today.totals.errors_count} 件</span>
                      </div>
                    </div>
                  )}

                  <div className="text-xs text-gray-400 text-center mt-3">
                    統計データは30秒ごとに自動更新されます
                  </div>
                </section>

                <div className="border-t border-slate-700"></div>

                <section>
                  <h3 className="text-lg font-bold text-red-300 mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    FSA合規情報
                  </h3>

                  <div className="bg-red-900/30 border-2 border-red-500 rounded-lg p-4 mb-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-red-200 mb-2">
                          重要：本サービスは金融商品取引業者ではありません
                        </h4>
                        <p className="text-xs text-red-100 leading-relaxed">
                          株式会社ネクストスフィアは広告サービス提供会社であり、金融庁登録の金融商品取引業者ではありません。金融商品取引法第29条の登録を受けておらず、投資助言業・投資運用業・金融商品仲介業には該当しません。本サービスは情報提供のみを目的としており、個別銘柄の推奨や投資判断のアドバイスを行うものではありません。
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-900/30 rounded-lg p-3 border border-green-500 mb-4 inline-block">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-green-400" />
                      <div>
                        <span className="text-xs font-bold text-green-200 block">サービス区分</span>
                        <span className="text-xs text-green-300 font-semibold">無料情報提供サービス（広告収益型）</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-900/30 border-l-4 border-amber-500 rounded-r-lg p-4 mb-4">
                    <p className="text-xs text-amber-100 leading-relaxed">
                      株式等の売買には価格変動リスク等があり、損失が生じるおそれがあります。投資判断は必ずご自身の責任で行ってください。過去の実績は将来の成果を保証するものではありません。実際に投資を行う際は、金融商品取引業者にご相談されることをお勧めします。
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    <div className="bg-blue-900/30 rounded-lg p-3 border border-blue-500">
                      <h4 className="text-xs font-bold text-blue-200 mb-2">
                        ✓ 提供するサービス
                      </h4>
                      <ul className="space-y-1 text-xs text-gray-300">
                        <li>• AI技術を用いた情報分析</li>
                        <li>• 株価データ・チャート表示</li>
                        <li>• 統計情報の提供</li>
                        <li>• 教育目的の情報提供</li>
                      </ul>
                    </div>

                    <div className="bg-red-900/30 rounded-lg p-3 border border-red-500">
                      <h4 className="text-xs font-bold text-red-200 mb-2">
                        ✗ 提供しないサービス
                      </h4>
                      <ul className="space-y-1 text-xs text-gray-300">
                        <li>• 個別銘柄の売買推奨</li>
                        <li>• 売買タイミングの指示</li>
                        <li>• 運用代行・資産管理</li>
                        <li>• 金融商品の仲介・販売</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-600 mb-4">
                    <h4 className="text-sm font-bold text-gray-200 mb-2">関連監督機関・情報源</h4>
                    <p className="text-xs text-gray-300 mb-2 leading-relaxed">
                      投資判断を行う際は、金融庁に登録された金融商品取引業者にご相談されることをお勧めします。
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <a
                        href="https://www.fsa.go.jp/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 hover:underline"
                      >
                        <ExternalLink className="w-3 h-3" />
                        金融庁（FSA）
                      </a>
                      <a
                        href="https://www.jsda.or.jp/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 hover:underline"
                      >
                        <ExternalLink className="w-3 h-3" />
                        日本証券業協会
                      </a>
                      <a
                        href="https://www.fsa.go.jp/ordinary/kinyusyohin/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 hover:underline"
                      >
                        <ExternalLink className="w-3 h-3" />
                        登録業者検索
                      </a>
                    </div>
                  </div>

                  <Link
                    to="/api-stats"
                    onClick={() => setIsOpen(false)}
                    className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-lg transition-all shadow-lg hover:shadow-xl text-center"
                  >
                    <span className="inline-flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      完全な統計・合規情報ページを見る
                    </span>
                  </Link>
                </section>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
