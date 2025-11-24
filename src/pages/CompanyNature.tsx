import { ArrowLeft, Building2, AlertTriangle, Shield, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CompanyNature() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          トップページに戻る
        </Link>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Building2 className="w-6 h-6 text-blue-700" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">会社概要・サービス性質について</h1>
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
              <div>
                <p className="text-red-900 font-bold mb-2">重要な宣言</p>
                <p className="text-red-800 leading-relaxed">
                  株式会社ネクストスフィアは<strong>広告サービス提供会社</strong>であり、<strong>金融商品取引業者ではありません</strong>。
                  金融商品取引法第29条の登録を受けた事業者ではないため、投資助言業務、投資運用業務、金融商品仲介業務等を行うことはできません。
                </p>
              </div>
            </div>
          </div>

          <div className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">1. 会社の性質と事業内容</h2>

              <div className="bg-blue-50 rounded-lg p-6 mb-4">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-blue-600" />
                  会社概要
                </h3>
                <dl className="space-y-3">
                  <div className="grid sm:grid-cols-3 gap-2">
                    <dt className="font-semibold text-gray-900">会社名</dt>
                    <dd className="sm:col-span-2 text-gray-700">株式会社ネクストスフィア（NextSphere Co., Ltd.）</dd>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-2">
                    <dt className="font-semibold text-gray-900">事業分類</dt>
                    <dd className="sm:col-span-2 text-gray-700">
                      <span className="font-bold text-blue-700">広告代理業・インターネット情報提供サービス</span>
                    </dd>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-2">
                    <dt className="font-semibold text-gray-900">主要事業</dt>
                    <dd className="sm:col-span-2 text-gray-700">
                      デジタル広告サービス、マーケティングソリューション、Web情報提供サービス
                    </dd>
                  </div>
                </dl>
              </div>

              <p className="text-gray-700 leading-relaxed mb-3">
                当社は、デジタルマーケティングおよび広告技術を専門とする企業です。
                AI技術を活用した情報分析サービスを提供していますが、これは<strong>情報提供および教育目的</strong>に限定されており、
                金融商品取引業務には該当しません。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">2. 組織構成と専門領域</h2>

              <div className="bg-slate-50 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-4">当社の組織構成</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">✓</span>
                    <div>
                      <strong>技術開発部門:</strong> AI・機械学習技術の開発、データ分析システムの構築
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">✓</span>
                    <div>
                      <strong>マーケティング部門:</strong> 広告企画、デジタルマーケティング戦略の立案
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">✓</span>
                    <div>
                      <strong>情報提供サービス部門:</strong> Webコンテンツの企画・制作、ユーザー向け情報の提供
                    </div>
                  </li>
                </ul>

                <div className="mt-4 p-4 bg-amber-50 border-l-4 border-amber-500">
                  <p className="text-amber-900 font-semibold">重要な注意事項</p>
                  <p className="text-gray-700 mt-2">
                    当社には<strong>金融商品取引業務を担当する部門は存在しません</strong>。
                    投資助言者、ファイナンシャルプランナー、証券アナリスト等の金融専門資格者も在籍していません。
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">3. 収益モデルの透明性</h2>

              <div className="bg-green-50 rounded-lg p-6 border-2 border-green-200">
                <h3 className="font-bold text-gray-900 mb-3">完全無料サービス（広告収益型）</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  本サービスは<strong>広告収益により運営</strong>されており、ユーザーの皆様には<strong>完全無料</strong>でご提供しています。
                </p>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">ユーザー料金</p>
                      <p className="text-gray-700">無料（登録料、月額料金、利用料金等は一切不要）</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">収益源</p>
                      <p className="text-gray-700">広告表示による広告収入のみ</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">金融関連収入</p>
                      <p className="text-gray-700">
                        <strong className="text-red-700">証券取引手数料、投資助言料、運用報酬等は一切受領しておりません</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">4. サービスの範囲と限界</h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-5 border-2 border-blue-200">
                  <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                    ✓ 本サービスが提供するもの
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• AI技術を用いた株式情報の分析レポート生成</li>
                    <li>• 過去の株価データおよびチャートの表示</li>
                    <li>• 市場統計情報の集計と提供</li>
                    <li>• 教育目的の投資関連情報の提供</li>
                    <li>• 公開データに基づく情報の整理と可視化</li>
                  </ul>
                </div>

                <div className="bg-red-50 rounded-lg p-5 border-2 border-red-200">
                  <h3 className="font-bold text-red-900 mb-3 flex items-center gap-2">
                    ✗ 本サービスが提供しないもの
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• 個別銘柄の購入・売却推奨</li>
                    <li>• 売買タイミングの具体的指示</li>
                    <li>• ポートフォリオ運用代行</li>
                    <li>• 金融商品の仲介・販売</li>
                    <li>• 投資助言契約に基づくアドバイス</li>
                    <li>• 個人の投資目標に基づく資産運用計画</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">5. 金融監督機関との関係</h2>

              <div className="bg-slate-100 rounded-lg p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-32 flex-shrink-0 font-semibold text-gray-900">金融庁登録</div>
                    <div className="flex-1">
                      <span className="inline-block px-3 py-1 bg-gray-300 text-gray-700 rounded-full text-sm font-semibold">
                        非該当
                      </span>
                      <p className="text-sm text-gray-700 mt-2">
                        当社は金融商品取引法第29条に基づく登録事業者ではありません。
                        情報提供サービスのみを提供しているため、登録の対象外です。
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-32 flex-shrink-0 font-semibold text-gray-900">投資助言業</div>
                    <div className="flex-1">
                      <span className="inline-block px-3 py-1 bg-gray-300 text-gray-700 rounded-full text-sm font-semibold">
                        非該当
                      </span>
                      <p className="text-sm text-gray-700 mt-2">
                        投資助言業務は行っておりません。
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-32 flex-shrink-0 font-semibold text-gray-900">投資運用業</div>
                    <div className="flex-1">
                      <span className="inline-block px-3 py-1 bg-gray-300 text-gray-700 rounded-full text-sm font-semibold">
                        非該当
                      </span>
                      <p className="text-sm text-gray-700 mt-2">
                        投資運用業務は行っておりません。
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-32 flex-shrink-0 font-semibold text-gray-900">金融商品仲介業</div>
                    <div className="flex-1">
                      <span className="inline-block px-3 py-1 bg-gray-300 text-gray-700 rounded-full text-sm font-semibold">
                        非該当
                      </span>
                      <p className="text-sm text-gray-700 mt-2">
                        金融商品の仲介・販売は一切行っておりません。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">6. 関連監督機関・情報源</h2>

              <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
                <p className="text-gray-700 leading-relaxed mb-4">
                  投資判断を行う際は、金融庁に登録された金融商品取引業者にご相談されることをお勧めします。
                </p>

                <div className="space-y-3">
                  <a
                    href="https://www.fsa.go.jp/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 bg-white rounded-lg hover:shadow-md transition-shadow"
                  >
                    <ExternalLink className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">金融庁（Financial Services Agency）</p>
                      <p className="text-sm text-gray-600">日本の金融監督機関の公式サイト</p>
                    </div>
                  </a>

                  <a
                    href="https://www.jsda.or.jp/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 bg-white rounded-lg hover:shadow-md transition-shadow"
                  >
                    <ExternalLink className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">日本証券業協会（JSDA）</p>
                      <p className="text-sm text-gray-600">証券会社の自主規制機関</p>
                    </div>
                  </a>

                  <a
                    href="https://www.fsa.go.jp/ordinary/kinyusyohin/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 bg-white rounded-lg hover:shadow-md transition-shadow"
                  >
                    <ExternalLink className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">登録金融商品取引業者検索</p>
                      <p className="text-sm text-gray-600">金融庁登録業者の検索システム</p>
                    </div>
                  </a>

                  <a
                    href="https://www.shikin-unyou.jp/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 bg-white rounded-lg hover:shadow-md transition-shadow"
                  >
                    <ExternalLink className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">投資信託協会</p>
                      <p className="text-sm text-gray-600">投資信託に関する情報提供</p>
                    </div>
                  </a>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">7. 多言語での重要宣言</h2>

              <div className="bg-slate-50 rounded-lg p-6 border-l-4 border-slate-400">
                <h3 className="font-bold text-gray-900 mb-3">English Declaration</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>NextSphere Co., Ltd. is an advertising and digital marketing service provider, not a financial instruments business operator.</strong>
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  This service is provided by an advertising company and is not regulated by the Financial Services Agency of Japan as a financial instruments business operator. We do not provide investment advisory services, investment management services, or financial product intermediary services.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  This service is intended for users in Japan and is operated entirely through advertising revenue, making it completely free for all users. We do not receive any commissions from securities transactions, investment advisory fees, or management fees.
                </p>
              </div>
            </section>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
              <h3 className="font-bold text-gray-900 mb-3">投資を検討される方へ</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                実際に投資を行う際は、必ず以下の専門家・機関にご相談ください：
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-1">•</span>
                  <span>金融商品取引法に基づき登録された投資助言業者</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-1">•</span>
                  <span>証券会社等の金融商品取引業者</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-1">•</span>
                  <span>税務に関しては税理士</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-1">•</span>
                  <span>法務に関しては弁護士</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
