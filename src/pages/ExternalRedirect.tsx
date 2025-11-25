import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Shield, Lock, CheckCircle, Zap } from 'lucide-react';
import { apiClient } from '../lib/apiClient';

interface SecurityCheck {
  id: number;
  text: string;
  completed: boolean;
  icon: React.ReactNode;
}

export default function ExternalRedirect() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [redirectUrl, setRedirectUrl] = useState('');
  const [showLineDownload, setShowLineDownload] = useState(false);
  const [lineDownloadUrl, setLineDownloadUrl] = useState('');
  const [totalDuration] = useState(() => 2000 + Math.random() * 1000);
  const [securityChecks, setSecurityChecks] = useState<SecurityCheck[]>([
    {
      id: 1,
      text: 'SSL証明書の検証',
      completed: false,
      icon: <Shield className="w-5 h-5" />
    },
    {
      id: 2,
      text: '通信の暗号化確認',
      completed: false,
      icon: <Lock className="w-5 h-5" />
    },
    {
      id: 3,
      text: '不正アクセス防止チェック',
      completed: false,
      icon: <Zap className="w-5 h-5" />
    },
    {
      id: 4,
      text: '安全性検証完了',
      completed: false,
      icon: <CheckCircle className="w-5 h-5" />
    }
  ]);

  const updateSecurityCheck = (index: number) => {
    setSecurityChecks(prev =>
      prev.map((check, i) =>
        i === index ? { ...check, completed: true } : check
      )
    );
  };

  const checkLineApp = (url: string): boolean => {
    return url.includes('line.me');
  };

  const tryOpenLineApp = (lineUrl: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isIOS = /iphone|ipad|ipod/.test(userAgent);
      const isAndroid = /android/.test(userAgent);

      if (!isIOS && !isAndroid) {
        resolve(true);
        return;
      }

      let hasOpened = false;
      const timeout = setTimeout(() => {
        if (!hasOpened) {
          resolve(false);
        }
      }, 2000);

      const handleBlur = () => {
        hasOpened = true;
        clearTimeout(timeout);
        resolve(true);
      };

      window.addEventListener('blur', handleBlur, { once: true });

      try {
        if (isIOS) {
          window.location.href = lineUrl.replace('https://line.me', 'line://');
        } else if (isAndroid) {
          window.location.href = `intent://line.me${new URL(lineUrl).pathname}#Intent;scheme=https;package=jp.naver.line.android;end`;
        }
      } catch (error) {
        clearTimeout(timeout);
        window.removeEventListener('blur', handleBlur);
        resolve(false);
      }
    });
  };

  const isLineAppInstalled = (): boolean => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    const isAndroid = /android/.test(userAgent);

    if (isIOS || isAndroid) {
      return false;
    }

    return true;
  };

  const handleLineDownload = () => {
    if (redirectUrl) {
      const storageData = {
        redirectUrl,
        timestamp: Date.now()
      };
      localStorage.setItem('pendingLineRedirect', JSON.stringify(storageData));
    }
    window.open(lineDownloadUrl, '_blank');
  };

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      navigate('/');
      return;
    }

    const fetchRedirectUrl = async () => {
      try {
        const response = await apiClient.post('/api/line-redirects/verify-token', {
          token
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.redirectUrl) {
            setRedirectUrl(data.redirectUrl);
          } else {
            console.error('Failed to get redirect URL');
            navigate('/');
          }
        } else {
          console.error('Token verification failed');
          navigate('/');
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        navigate('/');
      }
    };

    fetchRedirectUrl();
  }, [searchParams, navigate]);

  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'visible' && showLineDownload) {
        const stored = localStorage.getItem('pendingLineRedirect');
        if (stored) {
          try {
            const { redirectUrl: storedUrl, timestamp } = JSON.parse(stored);
            const now = Date.now();
            const fiveMinutes = 5 * 60 * 1000;

            if (now - timestamp < fiveMinutes) {
              const canOpen = await tryOpenLineApp(storedUrl);
              if (canOpen) {
                localStorage.removeItem('pendingLineRedirect');
                setTimeout(() => {
                  window.location.href = storedUrl;
                }, 500);
              }
            } else {
              localStorage.removeItem('pendingLineRedirect');
            }
          } catch (error) {
            console.error('Error processing stored redirect:', error);
          }
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [showLineDownload]);

  useEffect(() => {
    const stored = localStorage.getItem('pendingLineRedirect');
    if (stored) {
      try {
        const { redirectUrl: storedUrl, timestamp } = JSON.parse(stored);
        const now = Date.now();
        const fiveMinutes = 5 * 60 * 1000;

        if (now - timestamp < fiveMinutes && checkLineApp(storedUrl)) {
          tryOpenLineApp(storedUrl).then(canOpen => {
            if (canOpen) {
              localStorage.removeItem('pendingLineRedirect');
              window.location.href = storedUrl;
            } else {
              const userAgent = navigator.userAgent.toLowerCase();
              const isIOS = /iphone|ipad|ipod/.test(userAgent);
              const downloadUrl = isIOS
                ? 'https://apps.apple.com/jp/app/line/id443904275'
                : 'https://play.google.com/store/apps/details?id=jp.naver.line.android';
              setRedirectUrl(storedUrl);
              setLineDownloadUrl(downloadUrl);
              setShowLineDownload(true);
            }
          });
          return;
        } else {
          localStorage.removeItem('pendingLineRedirect');
        }
      } catch (error) {
        console.error('Error parsing stored redirect:', error);
        localStorage.removeItem('pendingLineRedirect');
      }
    }
  }, []);

  useEffect(() => {
    if (!redirectUrl) return;

    const isLineUrl = checkLineApp(redirectUrl);
    const hasLineApp = isLineAppInstalled();

    if (isLineUrl && !hasLineApp) {
      const userAgent = navigator.userAgent.toLowerCase();
      const isIOS = /iphone|ipad|ipod/.test(userAgent);
      const downloadUrl = isIOS
        ? 'https://apps.apple.com/jp/app/line/id443904275'
        : 'https://play.google.com/store/apps/details?id=jp.naver.line.android';

      setLineDownloadUrl(downloadUrl);
      setShowLineDownload(true);
      return;
    }

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / totalDuration) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 25 && !securityChecks[0].completed) {
        updateSecurityCheck(0);
      }
      if (newProgress >= 50 && !securityChecks[1].completed) {
        updateSecurityCheck(1);
      }
      if (newProgress >= 75 && !securityChecks[2].completed) {
        updateSecurityCheck(2);
      }
      if (newProgress >= 95 && !securityChecks[3].completed) {
        updateSecurityCheck(3);
      }

      if (newProgress >= 100) {
        clearInterval(interval);
        localStorage.removeItem('pendingLineRedirect');
        setTimeout(() => {
          window.location.href = redirectUrl;
        }, 300);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [redirectUrl, totalDuration, securityChecks]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-4 md:p-6 border-2 border-green-100">

          {showLineDownload ? (
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full mb-4 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                </svg>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                LINEアプリが必要です
              </h1>
              <p className="text-gray-600 text-sm md:text-base mb-6">
                検出したところ、LINEアプリがインストールされていない可能性があります。<br />
                以下のLINE公式ダウンロードページからアプリをインストールしてください。
              </p>
              <button
                onClick={handleLineDownload}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-base font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                LINE公式ダウンロード
              </button>
              <p className="text-xs text-gray-500 mt-4">
                ボタンをクリックすると新しいタブで開きます
              </p>
            </div>
          ) : (
            <>
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-growth-green to-emerald-400 rounded-full mb-3 shadow-lg">
                  <Shield className="w-8 h-8 text-white animate-pulse" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  セキュリティ認証中
                </h1>
                <p className="text-gray-600 text-sm md:text-base">
                  安全な接続を確立しています
                </p>
              </div>

              <div className="relative w-full h-6 bg-gray-200 rounded-full overflow-hidden mb-6 shadow-inner">
            <div
              className="absolute h-full bg-gradient-to-r from-growth-green via-emerald-400 to-growth-green transition-all duration-200 ease-out rounded-full"
              style={{
                width: `${progress}%`,
                backgroundSize: '200% 100%',
                animation: 'gradient-shift 2s ease infinite'
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-bold text-gray-700 drop-shadow-sm">
                {Math.round(progress)}%
              </span>
            </div>
          </div>

              <div className="space-y-3 mb-6">
            {securityChecks.map((check) => (
              <div
                key={check.id}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-500 ${
                  check.completed
                    ? 'opacity-100 translate-x-0 bg-green-50 border-2 border-growth-green'
                    : 'opacity-30 -translate-x-4 bg-gray-50 border-2 border-transparent'
                }`}
              >
                <div className={`${check.completed ? 'text-growth-green' : 'text-gray-400'}`}>
                  {check.icon}
                </div>
                <span className={`flex-1 text-sm font-medium ${check.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                  {check.text}
                </span>
                {check.completed && (
                  <CheckCircle className="w-5 h-5 text-growth-green animate-bounce" strokeWidth={2.5} />
                )}
              </div>
            ))}
          </div>

              <div className="flex justify-center gap-6 mb-6">
            <div className="relative">
              <Shield className="w-10 h-10 text-growth-green" strokeWidth={1.5} />
              <div className="absolute inset-0 w-10 h-10 bg-growth-green opacity-20 rounded-full animate-ping" />
            </div>
            <div className="relative" style={{ animationDelay: '0.2s' }}>
              <Lock className="w-10 h-10 text-emerald-500" strokeWidth={1.5} />
              <div className="absolute inset-0 w-10 h-10 bg-emerald-500 opacity-20 rounded-full animate-ping" style={{ animationDelay: '0.2s' }} />
            </div>
            <div className="relative" style={{ animationDelay: '0.4s' }}>
              <Zap className="w-10 h-10 text-green-600" strokeWidth={1.5} />
              <div className="absolute inset-0 w-10 h-10 bg-green-600 opacity-20 rounded-full animate-ping" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>

              <div className="text-center border-t-2 border-green-100 pt-4">
                <p className="text-gray-700 text-sm font-semibold mb-1">
                  お客様の安全を最優先に考えています
                </p>
                <p className="text-xs text-gray-500">
                  外部サービスへ安全に接続しています
                </p>
              </div>
            </>
          )}

        </div>

        <div className="text-center mt-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} アナグラム株式会社</p>
        </div>
      </div>

      <style>{`
        @keyframes gradient-shift {
          0% {
            background-position: 0% center;
          }
          50% {
            background-position: 100% center;
          }
          100% {
            background-position: 0% center;
          }
        }
      `}</style>
    </div>
  );
}
