import { Link } from 'react-router-dom';
import { ExternalLink, AlertTriangle, Activity } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-20 border-t-2 border-blue-500/30 mt-0 footer-bg">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-8">

        {/* Legal Documents Links */}
        <div className="mb-8 pt-6">
          <div className="grid grid-cols-3 gap-3 max-w-4xl mx-auto">
            <Link
              to="/disclaimer"
              className="inline-flex items-center gap-1 hover:underline font-semibold text-red-700 text-xs sm:text-sm justify-center"
              style={{ fontFamily: 'HiraKakuPro-W3, Hiragino Kaku Gothic Pro, sans-serif' }}
            >
              <AlertTriangle className="w-3 h-3" />
              免責事項
            </Link>
            <Link
              to="/terms"
              className="inline-flex items-center gap-1 hover:underline text-xs sm:text-sm justify-center"
              style={{ color: '#3c0800', fontFamily: 'HiraKakuPro-W3, Hiragino Kaku Gothic Pro, sans-serif' }}
            >
              利用規約 <ExternalLink className="w-3 h-3" />
            </Link>
            <Link
              to="/privacy"
              className="inline-flex items-center gap-1 hover:underline text-xs sm:text-sm justify-center"
              style={{ color: '#3c0800', fontFamily: 'HiraKakuPro-W3, Hiragino Kaku Gothic Pro, sans-serif' }}
            >
              プライバシー <ExternalLink className="w-3 h-3" />
            </Link>
            <Link
              to="/specified-commercial-transaction-act"
              className="inline-flex items-center gap-1 hover:underline text-xs sm:text-sm justify-center"
              style={{ color: '#3c0800', fontFamily: 'HiraKakuPro-W3, Hiragino Kaku Gothic Pro, sans-serif' }}
            >
              特商法表記 <ExternalLink className="w-3 h-3" />
            </Link>
            <Link
              to="/company-nature"
              className="inline-flex items-center gap-1 hover:underline text-xs sm:text-sm justify-center"
              style={{ color: '#3c0800', fontFamily: 'HiraKakuPro-W3, Hiragino Kaku Gothic Pro, sans-serif' }}
            >
              会社概要 <ExternalLink className="w-3 h-3" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-1 hover:underline text-xs sm:text-sm justify-center"
              style={{ color: '#3c0800', fontFamily: 'HiraKakuPro-W3, Hiragino Kaku Gothic Pro, sans-serif' }}
            >
              お問い合わせ <ExternalLink className="w-3 h-3" />
            </Link>
            <Link
              to="/faq"
              className="inline-flex items-center gap-1 hover:underline text-xs sm:text-sm justify-center"
              style={{ color: '#3c0800', fontFamily: 'HiraKakuPro-W3, Hiragino Kaku Gothic Pro, sans-serif' }}
            >
              FAQ <ExternalLink className="w-3 h-3" />
            </Link>
            <Link
              to="/api-stats"
              className="inline-flex items-center gap-1 hover:underline text-xs sm:text-sm justify-center font-semibold"
              style={{ color: '#1e40af', fontFamily: 'HiraKakuPro-W3, Hiragino Kaku Gothic Pro, sans-serif' }}
            >
              <Activity className="w-3 h-3" />
              API統計・FSA合規
            </Link>
          </div>
        </div>

        {/* Service Operation Info */}
        <div className="mb-6 text-center">
          <div className="bg-gray-50 rounded-lg p-4 max-w-3xl mx-auto border border-gray-200">
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed" style={{ fontFamily: 'HiraKakuPro-W3, Hiragino Kaku Gothic Pro, sans-serif' }}>
              <strong className="text-gray-900">運営について：</strong>
              本サービスは広告収益により運営されており、ユーザーの皆様には完全無料でご提供しています。証券取引手数料・投資助言料等は一切受領しておりません。
            </p>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-300 pt-4 text-center">
          <p className="text-xs sm:text-sm mb-3 font-medium" style={{ color: '#3c0800', fontFamily: 'HiraKakuPro-W3, Hiragino Kaku Gothic Pro, sans-serif' }}>
            &copy; {currentYear} 株式会社ネクストスフィア (NextSphere Co., Ltd.). All rights reserved.
          </p>
          <p className="text-xs leading-relaxed max-w-4xl mx-auto mb-2" style={{ color: '#3c0800', fontFamily: 'HiraKakuPro-W3, Hiragino Kaku Gothic Pro, sans-serif' }}>
            当サイトで提供される情報は投資勧誘を目的としたものではありません。
            投資に関する最終決定は、利用者ご自身の判断でなさるようお願いいたします。
            掲載されている情報の正確性については万全を期しておりますが、その内容の正確性、安全性、有用性を保証するものではありません。
          </p>
          <p className="text-xs text-gray-600" style={{ fontFamily: 'HiraKakuPro-W3, Hiragino Kaku Gothic Pro, sans-serif' }}>
            本サービスは日本国内のユーザー向けです ｜ This service is intended for users in Japan
          </p>
        </div>
      </div>
    </footer>
  );
}
