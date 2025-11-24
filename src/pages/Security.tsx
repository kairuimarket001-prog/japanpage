import { ArrowLeft, Shield, Lock, AlertTriangle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Security() {
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
            <div className="bg-green-100 p-3 rounded-lg">
              <Shield className="w-6 h-6 text-green-700" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">セキュリティとコンプライアンス</h1>
          </div>

          <div className="prose max-w-none">
            <p className="text-sm text-gray-600 mb-6">最終更新日: 2025年11月24日</p>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5 text-blue-600" />
                セキュリティ対策
              </h2>

              <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
                <p className="text-green-900 font-bold mb-2">安全なサービス提供への取り組み</p>
                <p className="text-gray-700 leading-relaxed">
                  当サービスは、ユーザーの皆様に安全にご利用いただくため、以下のセキュリティ対策を実施しています。
                </p>
              </div>

              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    SSL/TLS暗号化通信
                  </h3>
                  <p className="text-sm text-gray-700">
                    全ての通信はHTTPS（SSL/TLS）で暗号化されており、第三者による盗聴や改ざんを防止しています。
                    HSTS（HTTP Strict Transport Security）により、常に安全な接続が確保されます。
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Content Security Policy (CSP)
                  </h3>
                  <p className="text-sm text-gray-700">
                    厳格なコンテンツセキュリティポリシーを実装し、クロスサイトスクリプティング（XSS）攻撃を防止しています。
                    不正なスクリプトの実行を防ぎ、ユーザーデータを保護します。
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    セキュリティヘッダー
                  </h3>
                  <p className="text-sm text-gray-700">
                    X-Frame-Options、X-Content-Type-Options、X-XSS-Protection等の
                    セキュリティヘッダーを設定し、クリックジャッキングやMIMEタイプスニッフィング攻撃を防止しています。
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    入力検証とサニタイゼーション
                  </h3>
                  <p className="text-sm text-gray-700">
                    全てのユーザー入力に対して厳格な検証とサニタイゼーションを実施し、
                    SQLインジェクションやXSS攻撃を防止しています。
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    レート制限
                  </h3>
                  <p className="text-sm text-gray-700">
                    API エンドポイントにレート制限を実装し、DDoS攻撃やブルートフォース攻撃から保護しています。
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    外部リンクの安全性確認
                  </h3>
                  <p className="text-sm text-gray-700">
                    外部サイトへのリダイレクト前に、ホワイトリストによる検証と
                    ユーザーへの確認ダイアログを表示し、フィッシング攻撃を防止しています。
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">マルウェア対策</h2>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
                <p className="text-blue-900 font-semibold mb-2">クリーンで安全なサービス</p>
                <p className="text-gray-700 leading-relaxed">
                  当サービスは、マルウェア、ウイルス、トロイの木馬等の悪意のあるソフトウェアを一切含んでいません。
                </p>
              </div>

              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>定期的なセキュリティスキャンと脆弱性診断の実施</li>
                <li>依存関係パッケージの脆弱性チェックと定期アップデート</li>
                <li>コードレビューによるセキュリティチェック</li>
                <li>Google Safe Browsing によるサイト安全性の継続的モニタリング</li>
                <li>ファイル整合性監視によるファイル改ざん検知</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">データ保護</h2>

              <div className="space-y-3 text-gray-700">
                <p>
                  当サービスでは、個人を特定できる情報（氏名、住所、電話番号、メールアドレス等）の登録は不要です。
                </p>
                <p>
                  アクセスログ、Cookie等の情報は、サービス改善と不正アクセス防止の目的でのみ使用され、
                  個人情報保護法に基づき適切に管理されています。
                </p>
                <p>
                  詳細は<Link to="/privacy" className="text-blue-600 hover:underline">プライバシーポリシー</Link>をご確認ください。
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Google Ads ポリシーコンプライアンス</h2>

              <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
                <p className="text-green-900 font-semibold mb-2">広告ポリシー遵守</p>
                <p className="text-gray-700 leading-relaxed">
                  当サービスは、Google Ads のポリシーを遵守し、適切な広告運用を行っています。
                </p>
              </div>

              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>マルウェアやフィッシングサイトへのリンクは一切含まれていません</li>
                <li>誤解を招く広告や不正な表現は使用していません</li>
                <li>投資助言を行わない情報提供サービスであることを明記しています</li>
                <li>ユーザーに対して適切な免責事項を提示しています</li>
                <li>外部リンクには適切な警告とホワイトリスト検証を実施しています</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                セキュリティに関するお問い合わせ
              </h2>

              <div className="bg-slate-100 rounded-lg p-6">
                <p className="text-gray-700 leading-relaxed mb-3">
                  セキュリティ上の問題や脆弱性を発見された場合は、速やかに以下の連絡先までご報告ください。
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>株式会社ネクストスフィア</strong><br />
                  <strong>セキュリティ担当</strong>
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  メール: support@stocktrends.jp<br />
                  件名: 【セキュリティ報告】
                </p>
                <p className="text-xs text-gray-600 mt-4">
                  ※ セキュリティに関する報告は、責任ある開示（Responsible Disclosure）の原則に基づき対応いたします。
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">継続的な改善</h2>

              <p className="text-gray-700 leading-relaxed">
                当社は、最新のセキュリティ脅威に対応するため、セキュリティ対策を継続的に見直し、改善しています。
                ユーザーの皆様が安心してサービスをご利用いただける環境の維持に努めてまいります。
              </p>
            </section>

            <div className="bg-blue-50 rounded-lg p-6 mt-8">
              <h3 className="font-bold text-gray-900 mb-3">関連ページ</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/privacy" className="text-blue-600 hover:underline">
                    プライバシーポリシー
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-blue-600 hover:underline">
                    利用規約
                  </Link>
                </li>
                <li>
                  <Link to="/disclaimer" className="text-blue-600 hover:underline">
                    免責事項
                  </Link>
                </li>
                <li>
                  <Link to="/company-nature" className="text-blue-600 hover:underline">
                    会社概要・サービス性質について
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
