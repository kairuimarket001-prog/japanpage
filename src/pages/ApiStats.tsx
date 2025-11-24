import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  Database,
  Zap,
  TrendingUp,
  AlertTriangle,
  Building2,
  ExternalLink,
  ArrowLeft
} from 'lucide-react';
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

export default function ApiStats() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = 'API統計・FSA合規情報 | AI株式診断サービス';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'AI株式診断サービスのAPI運用統計と金融庁（FSA）合規情報。当社は広告サービス提供会社であり、金融商品取引業者ではありません。');
    }

    const fetchStats = async () => {
      try {
        const response = await apiClient.get('/api/gemini/stats');
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 30000);

    return () => clearInterval(interval);
  }, []);

  const cacheHitRate = stats ? parseFloat(stats.today.cacheHitRate) : 0;
  const apiUsagePercent = stats ? (stats.rateLimit.rpd.current / stats.rateLimit.rpd.limit) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50">
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          トップページに戻る
        </Link>

        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            API統計・FSA合規情報
          </h1>
          <p className="text-gray-600">
            当サービスの運用統計と金融商品取引業に関する重要情報
          </p>
        </header>

        {/* FSA Compliance Section */}
        <section className="mb-8" aria-labelledby="fsa-compliance-heading">
          <h2 id="fsa-compliance-heading" className="sr-only">金融庁合規情報</h2>

          <div className="bg-red-50 border-2 border-red-400 rounded-lg p-4 sm:p-6 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-base sm:text-lg font-bold text-red-900 mb-2" style={{ fontFamily: 'HiraKakuPro-W3, Hiragino Kaku Gothic Pro, sans-serif' }}>
                  重要：本サービスは金融商品取引業者ではありません
                </h3>
                <p className="text-sm sm:text-base text-red-800 leading-relaxed" style={{ fontFamily: 'HiraKakuPro-W3, Hiragino Kaku Gothic Pro, sans-serif' }}>
                  株式会社ネクストスフィアは広告サービス提供会社であり、金融庁登録の金融商品取引業者ではありません。金融商品取引法第29条の登録を受けておらず、投資助言業・投資運用業・金融商品仲介業には該当しません。本サービスは情報提供のみを目的としており、個別銘柄の推奨や投資判断のアドバイスを行うものではありません。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Service Classification */}
        <section className="mb-8" aria-labelledby="service-classification-heading">
          <h2 id="service-classification-heading" className="text-xl font-bold text-gray-900 mb-4">
            サービス区分
          </h2>
          <div className="bg-green-100 rounded-lg p-4 border border-green-300 inline-block">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-green-700" />
              <div>
                <span className="text-sm font-bold text-green-800 block" style={{ fontFamily: 'HiraKakuPro-W3, Hiragino Kaku Gothic Pro, sans-serif' }}>サービス区分</span>
                <span className="text-sm text-green-700 font-semibold" style={{ fontFamily: 'HiraKakuPro-W3, Hiragino Kaku Gothic Pro, sans-serif' }}>無料情報提供サービス（広告収益型）</span>
              </div>
            </div>
          </div>
        </section>

        {/* Investment Risk Warning */}
        <section className="mb-8" aria-labelledby="risk-warning-heading">
          <h2 id="risk-warning-heading" className="text-xl font-bold text-gray-900 mb-4">
            投資リスクに関する重要な注意事項
          </h2>
          <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-lg p-4 sm:p-5">
            <p className="text-xs sm:text-sm text-amber-900 leading-relaxed" style={{ fontFamily: 'HiraKakuPro-W3, Hiragino Kaku Gothic Pro, sans-serif' }}>
              株式等の売買には価格変動リスク等があり、損失が生じるおそれがあります。投資判断は必ずご自身の責任で行ってください。過去の実績は将来の成果を保証するものではありません。実際に投資を行う際は、金融商品取引業者にご相談されることをお勧めします。
            </p>
          </div>
        </section>

        {/* Service Scope */}
        <section className="mb-8" aria-labelledby="service-scope-heading">
          <h2 id="service-scope-heading" className="text-xl font-bold text-gray-900 mb-4">
            本サービスの範囲
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h3 className="text-sm sm:text-base font-bold text-blue-900 mb-3" style={{ fontFamily: 'HiraKakuPro-W3, Hiragino Kaku Gothic Pro, sans-serif' }}>
                ✓ 提供するサービス
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-700" style={{ fontFamily: 'HiraKakuPro-W3, Hiragino Kaku Gothic Pro, sans-serif' }}>
                <li>• AI技術を用いた情報分析</li>
                <li>• 株価データ・チャート表示</li>
                <li>• 統計情報の提供</li>
                <li>• 教育目的の情報提供</li>
              </ul>
            </div>

            <div className="bg-red-50 rounded-lg p-4 border border-red-200">
              <h3 className="text-sm sm:text-base font-bold text-red-900 mb-3" style={{ fontFamily: 'HiraKakuPro-W3, Hiragino Kaku Gothic Pro, sans-serif' }}>
                ✗ 提供しないサービス
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-700" style={{ fontFamily: 'HiraKakuPro-W3, Hiragino Kaku Gothic Pro, sans-serif' }}>
                <li>• 個別銘柄の売買推奨</li>
                <li>• 売買タイミングの指示</li>
                <li>• 運用代行・資産管理</li>
                <li>• 金融商品の仲介・販売</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Regulatory Links */}
        <section className="mb-8" aria-labelledby="regulatory-links-heading">
          <h2 id="regulatory-links-heading" className="text-xl font-bold text-gray-900 mb-4">
            関連監督機関・情報源
          </h2>
          <div className="bg-blue-50 rounded-lg p-4 sm:p-5 border border-blue-200">
            <p className="text-xs sm:text-sm text-gray-700 mb-3 leading-relaxed" style={{ fontFamily: 'HiraKakuPro-W3, Hiragino Kaku Gothic Pro, sans-serif' }}>
              投資判断を行う際は、金融庁に登録された金融商品取引業者にご相談されることをお勧めします。
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.fsa.go.jp/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs sm:text-sm text-blue-700 hover:text-blue-900 hover:underline"
                style={{ fontFamily: 'HiraKakuPro-W3, Hiragino Kaku Gothic Pro, sans-serif' }}
              >
                <ExternalLink className="w-3 h-3 flex-shrink-0" />
                金融庁（FSA）
              </a>
              <a
                href="https://www.jsda.or.jp/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs sm:text-sm text-blue-700 hover:text-blue-900 hover:underline"
                style={{ fontFamily: 'HiraKakuPro-W3, Hiragino Kaku Gothic Pro, sans-serif' }}
              >
                <ExternalLink className="w-3 h-3 flex-shrink-0" />
                日本証券業協会（JSDA）
              </a>
              <a
                href="https://www.fsa.go.jp/ordinary/kinyusyohin/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs sm:text-sm text-blue-700 hover:text-blue-900 hover:underline"
                style={{ fontFamily: 'HiraKakuPro-W3, Hiragino Kaku Gothic Pro, sans-serif' }}
              >
                <ExternalLink className="w-3 h-3 flex-shrink-0" />
                登録業者検索
              </a>
              <a
                href="https://www.shikin-unyou.jp/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs sm:text-sm text-blue-700 hover:text-blue-900 hover:underline"
                style={{ fontFamily: 'HiraKakuPro-W3, Hiragino Kaku Gothic Pro, sans-serif' }}
              >
                <ExternalLink className="w-3 h-3 flex-shrink-0" />
                投資信託協会
              </a>
            </div>
          </div>
        </section>

        {/* API Statistics Section */}
        <section className="mb-8" aria-labelledby="api-stats-heading">
          <h2 id="api-stats-heading" className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Activity className="w-6 h-6 text-blue-600" />
            API運用統計
          </h2>

          {isLoading ? (
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
              </div>
              <p className="text-gray-500 mt-4">統計データを読み込んでいます...</p>
            </div>
          ) : stats ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg shadow-lg p-5 border-2 border-green-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Database className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-semibold text-gray-700">キャッシュ効率</span>
                </div>
                <div className="text-3xl font-bold text-green-600">{cacheHitRate.toFixed(1)}%</div>
                <div className="text-xs text-gray-500 mt-2">
                  {stats.today.totals.cache_hits} / {stats.today.totals.requests_total} リクエスト
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  キャッシュヒット率が高いほど、効率的にデータを提供できています
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-5 border-2 border-blue-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-semibold text-gray-700">今日のAPI使用</span>
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {stats.rateLimit.rpd.current}
                </div>
                <div className="text-xs text-gray-500 mb-2">
                  上限: {stats.rateLimit.rpd.limit} / 残り: {stats.rateLimit.rpd.remaining}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all ${
                      apiUsagePercent > 80 ? 'bg-red-500' : apiUsagePercent > 50 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min(apiUsagePercent, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  1日あたりのAPI呼び出し回数
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-5 border-2 border-yellow-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm font-semibold text-gray-700">分あたりレート</span>
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {stats.rateLimit.rpm.current}
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  上限: {stats.rateLimit.rpm.limit} / 残り: {stats.rateLimit.rpm.remaining}
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  現在の1分あたりのAPI使用状況
                </p>
              </div>

              {stats.today.totals.errors_count > 0 && (
                <div className="bg-red-50 rounded-lg shadow-lg p-5 border-2 border-red-500">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                    <span className="text-sm font-semibold text-red-700">エラー統計</span>
                  </div>
                  <div className="text-3xl font-bold text-red-600">
                    {stats.today.totals.errors_count}
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    本日発生したエラー件数
                  </p>
                </div>
              )}

              <div className="bg-gray-50 rounded-lg shadow-lg p-5 border-2 border-gray-300">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-5 h-5 text-gray-500" />
                  <span className="text-sm font-semibold text-gray-700">総リクエスト数</span>
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {stats.today.totals.requests_total}
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  本日の総リクエスト数
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg shadow-lg p-5 border-2 border-blue-300">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-semibold text-gray-700">外部API呼び出し</span>
                </div>
                <div className="text-3xl font-bold text-blue-600">
                  {stats.today.totals.api_calls}
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  本日の実際のAPI呼び出し回数
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <p className="text-gray-700 font-semibold mb-2">統計データを取得できませんでした</p>
              <p className="text-sm text-gray-500">
                サーバーとの接続を確認してください。30秒後に自動的に再試行します。
              </p>
            </div>
          )}

          {stats && (
            <div className="mt-4 text-center text-xs text-gray-500">
              <p>統計データは30秒ごとに自動更新されます</p>
              <p className="mt-1">最終更新: {new Date().toLocaleTimeString('ja-JP')}</p>
            </div>
          )}
        </section>

        {/* Additional Information */}
        <section className="mb-8 bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-3">このページについて</h2>
          <p className="text-sm text-gray-700 leading-relaxed mb-3">
            このページでは、当サービスのAPI運用状況と金融庁（FSA）関連の重要な合規情報を提供しています。
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">
            API統計データはリアルタイムで更新され、サービスの透明性を確保しています。
            投資判断を行う際は、必ず金融商品取引法に基づき登録された専門家にご相談ください。
          </p>
        </section>
      </main>
    </div>
  );
}
