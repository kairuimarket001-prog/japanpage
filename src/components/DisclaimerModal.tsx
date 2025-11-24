import { X, AlertTriangle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface DisclaimerModalProps {
  onAccept: () => void;
}

export default function DisclaimerModal({ onAccept }: DisclaimerModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem('disclaimer_accepted');
    if (!hasAccepted) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('disclaimer_accepted', 'true');
    setIsVisible(false);
    document.body.style.overflow = '';
    onAccept();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black bg-opacity-70">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-red-600 px-6 py-4 flex items-center gap-3">
          <AlertTriangle className="w-8 h-8 text-white flex-shrink-0" />
          <h2 className="text-xl font-bold text-white">
            重要な免責事項のご確認
          </h2>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
            <p className="font-bold text-amber-900 mb-2">
              本サービスの性質について
            </p>
            <p className="text-sm text-amber-800 leading-relaxed">
              本サービスは<strong>情報提供のみを目的</strong>としており、投資助言・投資勧誘を行うものではありません。
            </p>
          </div>

          <div className="space-y-3 text-sm text-gray-700">
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <p className="font-semibold text-gray-900 mb-1">運営会社について</p>
              <p>
                株式会社ネクストスフィアは<strong>広告代理業を事業とする企業</strong>であり、
                金融商品取引業者ではありません。金融商品取引法第29条の登録を受けた事業者ではないため、
                投資助言業務を行うことはできません。
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <p className="font-semibold text-gray-900 mb-1">収益モデル</p>
              <p>
                本サービスは<strong>広告収益により運営</strong>されており、ユーザーの皆様には完全無料でご提供しています。
                証券取引手数料、投資助言料、運用報酬等の金融関連収入は一切受領しておりません。
              </p>
            </div>

            <div className="border-l-4 border-red-500 pl-4 py-2">
              <p className="font-semibold text-red-900 mb-1">投資リスク</p>
              <p>
                株式投資には価格変動リスク、信用リスク、流動性リスク等が伴います。
                投資元本を割り込む可能性があります。過去の運用実績は将来の運用成果を保証するものではありません。
              </p>
            </div>

            <div className="border-l-4 border-red-500 pl-4 py-2">
              <p className="font-semibold text-red-900 mb-1">投資判断の責任</p>
              <p>
                <strong>最終的な投資判断は、必ず利用者ご自身の責任において行ってください。</strong>
                本サービスの利用により生じた損害について、当社は一切の責任を負いません。
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <p className="font-semibold text-gray-900 mb-1">専門家への相談</p>
              <p>
                実際に投資を行う際は、金融商品取引法に基づき登録された投資助言業者、
                証券会社等の金融商品取引業者、税理士、弁護士等の専門家にご相談ください。
              </p>
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg p-4 mt-6">
            <p className="text-xs text-gray-600 leading-relaxed">
              本サービスを利用することにより、上記の免責事項、利用規約、プライバシーポリシーの全ての内容に同意したものとみなされます。
              詳細は各ページをご確認ください。
            </p>
          </div>

          <button
            onClick={handleAccept}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-colors shadow-lg"
          >
            上記の内容を確認し、同意してサービスを利用する
          </button>

          <p className="text-xs text-center text-gray-500 mt-2">
            同意しない場合は、ブラウザを閉じてください
          </p>
        </div>
      </div>
    </div>
  );
}
