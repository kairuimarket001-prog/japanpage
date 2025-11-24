import { useState, useEffect } from 'react';
import { Star, BadgeCheck, Users, TrendingUp, Shield } from 'lucide-react';

export default function SocialProofSection() {
  const testimonials = [
    {
      name: '田中 健一',
      role: '個人投資家',
      rating: 5,
      comment: '銘柄情報を見やすく表示してくれるので、学習の参考にしています。投資判断は自分で行っています。',
    },
    {
      name: '佐藤 美咲',
      role: '会社員',
      rating: 5,
      comment: '初心者でも使いやすい情報表示ツールです。投資の勉強に役立っています。',
    },
    {
      name: '山田 雄太',
      role: 'デイトレーダー',
      rating: 5,
      comment: 'データをまとめて見れるのが便利です。市場の勉強用ツールとして使っています。',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="relative mx-4 my-12 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-trust-green/20 to-trust-green/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-trust-green/30 mb-3">
            <BadgeCheck className="w-3 h-3 text-trust-green" />
<span className="text-trust-green text-xs font-bold">教育・学習用ツール</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
            投資学習ツールとして多数の方にご利用いただいています
          </h2>
          <p className="text-gray-400 text-base">
            市場データの学習・研究用ツール
          </p>
        </div>

        <div className="flex gap-2 mb-8 justify-center">
          <div className="bg-gradient-to-br from-dark-card to-dark-tech rounded-lg p-3 border border-accent-orange/30 text-center hover:shadow-orange-glow transition-all flex-shrink-0">
            <Users className="w-6 h-6 text-accent-gold mx-auto mb-1" />
            <div className="text-xl font-black text-white mb-0.5">教育ツール</div>
            <div className="text-gray-400 text-xs font-medium">学習用</div>
          </div>

          <div className="bg-gradient-to-br from-dark-card to-dark-tech rounded-lg p-3 border border-accent-orange/30 text-center hover:shadow-orange-glow transition-all flex-shrink-0">
            <TrendingUp className="w-6 h-6 text-trust-green mx-auto mb-1" />
            <div className="text-xl font-black text-white mb-0.5">公開データ</div>
            <div className="text-gray-400 text-xs font-medium">表示機能</div>
          </div>

          <div className="bg-gradient-to-br from-dark-card to-dark-tech rounded-lg p-3 border border-accent-orange/30 text-center hover:shadow-orange-glow transition-all flex-shrink-0">
            <Star className="w-6 h-6 text-accent-gold mx-auto mb-1" />
            <div className="text-xl font-black text-white mb-0.5">無料利用</div>
            <div className="text-gray-400 text-xs font-medium">基本機能</div>
          </div>

          <div className="bg-gradient-to-br from-dark-card to-dark-tech rounded-lg p-3 border border-accent-orange/30 text-center hover:shadow-orange-glow transition-all flex-shrink-0">
            <Shield className="w-6 h-6 text-tech-cyan mx-auto mb-1" />
            <div className="text-xl font-black text-white mb-0.5">24/7</div>
            <div className="text-gray-400 text-xs font-medium">稼働時間</div>
          </div>
        </div>

        <div className="relative bg-gradient-to-br from-dark-card via-dark-tech to-dark-card rounded-2xl p-8 border border-accent-orange/30 shadow-orange-glow overflow-hidden mb-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold/10 rounded-full blur-3xl"></div>

          <div className="relative">
            <h3 className="text-2xl font-black text-white mb-6 text-center">
              ユーザーの声
            </h3>

            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="w-full flex-shrink-0 px-2"
                  >
                    <div className="bg-dark-deep/50 rounded-xl p-6 border border-accent-orange/20">
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-accent-gold fill-accent-gold" />
                        ))}
                      </div>

                      <p className="text-gray-300 text-sm leading-relaxed mb-4">
                        「{testimonial.comment}」
                      </p>
                      <p className="text-xs text-gray-500 italic">
                        ※個人の感想であり、投資成果を保証するものではありません
                      </p>

                      <div className="pt-4 border-t border-accent-orange/20">
                        <div className="text-white font-bold text-sm">{testimonial.name}</div>
                        <div className="text-gray-400 text-xs">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center gap-2 mt-4">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex ? 'bg-accent-gold w-6' : 'bg-gray-500'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-trust-green/10 via-tech-cyan/10 to-accent-gold/10 rounded-2xl p-6 border border-accent-orange/30 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-trust-green to-trust-green/80 rounded-full flex items-center justify-center shadow-lg">
                <BadgeCheck className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-white font-bold text-lg mb-1">教育・学習用ツール</div>
                <div className="text-gray-400 text-sm">株式市場の学習・研究用</div>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-dark-card/50 px-4 py-2 rounded-lg border border-trust-green/30">
              <Shield className="w-5 h-5 text-trust-green" />
              <span className="text-trust-green text-sm font-semibold">安全なツール</span>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-gradient-to-br from-dark-card to-dark-tech rounded-xl p-6 border border-accent-orange/20">
          <div className="text-center text-gray-400 text-sm leading-relaxed">
            <p className="mb-2">
              <span className="text-accent-gold font-semibold">データ:</span> 公開市場情報を活用
            </p>
            <p className="text-xs text-gray-500">
              本ツールは教育・学習目的の情報表示ツールであり、投資助言・勧誘ではありません。投資判断は必ずご自身で行ってください。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
