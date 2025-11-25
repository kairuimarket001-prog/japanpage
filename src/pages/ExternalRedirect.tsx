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
  const [totalDuration] = useState(() => 2000 + Math.random() * 2000);
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
        setTimeout(() => {
          if (redirectUrl) {
            window.location.href = redirectUrl;
          } else {
            navigate('/');
          }
        }, 300);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [searchParams, navigate, totalDuration, redirectUrl]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-green-100">

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-growth-green to-emerald-400 rounded-full mb-4 shadow-lg">
              <Shield className="w-10 h-10 text-white animate-pulse" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              セキュリティ認証中
            </h1>
            <p className="text-gray-600 text-lg">
              安全な接続を確立しています
            </p>
          </div>

          <div className="relative w-full h-6 bg-gray-200 rounded-full overflow-hidden mb-10 shadow-inner">
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

          <div className="space-y-4 mb-10">
            {securityChecks.map((check) => (
              <div
                key={check.id}
                className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-500 ${
                  check.completed
                    ? 'opacity-100 translate-x-0 bg-green-50 border-2 border-growth-green'
                    : 'opacity-30 -translate-x-4 bg-gray-50 border-2 border-transparent'
                }`}
              >
                <div className={`${check.completed ? 'text-growth-green' : 'text-gray-400'}`}>
                  {check.icon}
                </div>
                <span className={`flex-1 font-medium ${check.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                  {check.text}
                </span>
                {check.completed && (
                  <CheckCircle className="w-6 h-6 text-growth-green animate-bounce" strokeWidth={2.5} />
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-10 mb-8">
            <div className="relative">
              <Shield className="w-14 h-14 text-growth-green" strokeWidth={1.5} />
              <div className="absolute inset-0 w-14 h-14 bg-growth-green opacity-20 rounded-full animate-ping" />
            </div>
            <div className="relative" style={{ animationDelay: '0.2s' }}>
              <Lock className="w-14 h-14 text-emerald-500" strokeWidth={1.5} />
              <div className="absolute inset-0 w-14 h-14 bg-emerald-500 opacity-20 rounded-full animate-ping" style={{ animationDelay: '0.2s' }} />
            </div>
            <div className="relative" style={{ animationDelay: '0.4s' }}>
              <Zap className="w-14 h-14 text-green-600" strokeWidth={1.5} />
              <div className="absolute inset-0 w-14 h-14 bg-green-600 opacity-20 rounded-full animate-ping" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>

          <div className="text-center border-t-2 border-green-100 pt-6">
            <p className="text-gray-700 font-semibold mb-2">
              お客様の安全を最優先に考えています
            </p>
            <p className="text-sm text-gray-500">
              外部サービスへ安全に接続しています
            </p>
          </div>

        </div>

        <div className="text-center mt-6 text-xs text-gray-500">
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
