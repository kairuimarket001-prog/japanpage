import { Link } from 'react-router-dom';
import { ExternalLink, AlertTriangle } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-20 border-t-2 border-blue-500/30 mt-0 footer-bg">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-8">

        {/* Legal Documents Links */}
        <div className="mb-8 pt-6">
          <div className="grid grid-cols-2 gap-3 max-w-2xl mx-auto">
            <Link
              to="/disclaimer"
              className="inline-flex items-center gap-1 hover:underline font-semibold text-red-700 text-xs sm:text-sm justify-center"
              style={{ fontFamily: 'HiraKakuPro-W3, Hiragino Kaku Gothic Pro, sans-serif' }}
            >
              <AlertTriangle className="w-3 h-3" />
              免責事項
            </Link>
            <Link
              to="/faq"
              className="inline-flex items-center gap-1 hover:underline text-xs sm:text-sm justify-center"
              style={{ color: '#3c0800', fontFamily: 'HiraKakuPro-W3, Hiragino Kaku Gothic Pro, sans-serif' }}
            >
              FAQ <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-300 pt-4 text-center">
          <p className="text-xs sm:text-sm mb-3 font-medium" style={{ color: '#3c0800', fontFamily: 'HiraKakuPro-W3, Hiragino Kaku Gothic Pro, sans-serif' }}>
            &copy; {currentYear} AI株. All rights reserved.
          </p>
          <p className="text-xs leading-relaxed max-w-4xl mx-auto mb-2" style={{ color: '#3c0800', fontFamily: 'HiraKakuPro-W3, Hiragino Kaku Gothic Pro, sans-serif' }}>
            当サイトで提供される情報は投資勧誘を目的としたものではありません。
            投資に関する最終決定は、利用者ご自身の判断でなさるようお願いいたします。
            掲載されている情報の正確性については万全を期しておりますが、その内容の正確性、安全性、有用性を保証するものではありません。
          </p>
        </div>
      </div>
    </footer>
  );
}
