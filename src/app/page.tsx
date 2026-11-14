'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CheckCircle, Zap, Gift, Trophy, Star, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/lib/stores/authStore';
import { useRouter } from 'next/navigation';

const features = [
  {
    icon: CheckCircle,
    emoji: '✅',
    title: 'Complete Tasks',
    description: 'Browse daily challenges, fitness goals, learning tasks, and more. Each completion earns you Sikka coins.',
    color: '#10b981',
  },
  {
    icon: Zap,
    emoji: '⚡',
    title: 'Earn Coins',
    description: 'Accumulate Sikka coins with every completed task, daily bonuses, spin wheel wins, and achievements.',
    color: '#f59e0b',
  },
  {
    icon: Gift,
    emoji: '🎁',
    title: 'Redeem Rewards',
    description: 'Spend your coins on amazing rewards — gift cards, subscriptions, experiences, products, and donations.',
    color: '#8b5cf6',
  },
  {
    icon: Trophy,
    emoji: '🏆',
    title: 'Win Achievements',
    description: 'Unlock special badges and achievements as you complete milestones. Level up and earn bonus coins.',
    color: '#f43f5e',
  },
];

const stats = [
  { label: 'Active Users', value: '50K+', icon: Users },
  { label: 'Tasks Completed', value: '2M+', icon: CheckCircle },
  { label: 'Coins Awarded', value: '500M+', icon: Star },
  { label: 'Rewards Redeemed', value: '100K+', icon: Gift },
];

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const step = target / 60;
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

function FloatingCoin({ delay, x, size = 20 }: { delay: number; x: number; size?: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={{ left: `${x}%`, top: '-20px' }}
      animate={{ y: ['0vh', '110vh'], rotate: [0, 360, 720] }}
      transition={{ duration: 6 + Math.random() * 4, delay, repeat: Infinity, ease: 'linear' }}
    >
      <div
        className="rounded-full flex items-center justify-center font-black text-dark-900"
        style={{
          width: size, height: size,
          background: 'linear-gradient(135deg, #fbbf24, #d97706)',
          boxShadow: '0 0 10px rgba(245,158,11,0.5)',
          fontSize: size * 0.4,
        }}
      >
        ₿
      </div>
    </motion.div>
  );
}

export default function LandingPage() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) router.push('/dashboard');
  }, [isAuthenticated, router]);

  const coins = Array.from({ length: 15 }, (_, i) => ({
    delay: i * 0.5,
    x: 5 + (i * 6.5),
    size: 16 + Math.random() * 20,
  }));

  return (
    <div className="min-h-screen bg-hero-gradient overflow-hidden">
      {/* Coin rain background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {coins.map((c, i) => <FloatingCoin key={i} {...c} />)}
      </div>

      {/* Glow effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-glow-gold opacity-40" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-glow-violet opacity-30" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-2xl"
            style={{ background: 'linear-gradient(135deg, #fbbf24, #d97706)' }}>
            🪙
          </div>
          <span className="font-display font-black text-white text-2xl">Sikka</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" size="sm">Sign In</Button>
          </Link>
          <Link href="/register">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{
              background: 'rgba(245,158,11,0.1)',
              border: '1px solid rgba(245,158,11,0.3)',
            }}>
            <Star className="w-4 h-4 text-gold-400" />
            <span className="text-gold-400 text-sm font-semibold">India&apos;s #1 Reward Platform</span>
          </div>

          {/* Hero heading */}
          <h1 className="font-display font-black text-6xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight">
            Complete Tasks.<br />
            <span className="text-gradient-gold">Earn Coins.</span><br />
            Win Rewards.
          </h1>

          <p className="text-dark-300 text-xl md:text-2xl max-w-3xl mx-auto mb-10 leading-relaxed">
            Sikka turns your daily habits into real rewards. Complete tasks, spin the wheel,
            and redeem your coins for amazing gifts.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="text-base gap-3" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Start Earning Free
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="secondary" size="lg" className="text-base">
                Sign In to Account
              </Button>
            </Link>
          </div>

          {/* Social proof */}
          <div className="flex items-center justify-center gap-6 mt-10 flex-wrap">
            <div className="flex -space-x-2">
              {['A', 'P', 'R', 'S', 'K'].map((l, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-dark-900 flex items-center justify-center text-xs font-bold text-dark-900"
                  style={{ background: `hsl(${i * 50 + 30}, 80%, 60%)` }}>{l}</div>
              ))}
            </div>
            <span className="text-dark-400 text-sm"><strong className="text-white">50,000+</strong> users already earning</span>
          </div>
        </motion.div>

        {/* Hero card mockup */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          className="mt-20 max-w-2xl mx-auto"
        >
          <div className="glass-card p-6 relative">
            {/* Decorative glow */}
            <div className="absolute inset-0 rounded-2xl opacity-30"
              style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(245,158,11,0.3) 0%, transparent 60%)' }} />

            <div className="relative grid grid-cols-3 gap-4">
              {[
                { label: 'Coins Balance', value: '1,250', emoji: '🪙' },
                { label: 'Tasks Done', value: '23', emoji: '✅' },
                { label: 'Day Streak', value: '5 🔥', emoji: '📅' },
              ].map((stat) => (
                <div key={stat.label} className="bg-dark-900/50 rounded-xl p-4 text-center">
                  <div className="text-2xl mb-1">{stat.emoji}</div>
                  <div className="font-black text-gold-400 text-xl font-display">{stat.value}</div>
                  <div className="text-dark-400 text-xs mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-4 divider-gold" />

            <div className="mt-4 space-y-2">
              {[
                { task: '🧘 Morning Mindfulness', coins: '+25', done: true },
                { task: '👟 Daily Steps Goal', coins: '+50', done: true },
                { task: '📚 Read 20 Minutes', coins: '+30', done: false },
              ].map((item) => (
                <div key={item.task} className="flex items-center justify-between py-2 px-3 rounded-lg"
                  style={{ background: item.done ? 'rgba(16,185,129,0.05)' : 'transparent' }}>
                  <div className="flex items-center gap-3">
                    {item.done
                      ? <CheckCircle className="w-4 h-4 text-emerald-400" />
                      : <div className="w-4 h-4 rounded border border-dark-500" />
                    }
                    <span className={`text-sm ${item.done ? 'text-dark-400 line-through' : 'text-white'}`}>{item.task}</span>
                  </div>
                  <span className="coin-badge text-xs">{item.coins}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(({ label, value, icon: Icon }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 text-center"
            >
              <Icon className="w-8 h-8 text-gold-500 mx-auto mb-3" />
              <div className="text-3xl font-black text-gradient-gold font-display">{value}</div>
              <div className="text-dark-400 text-sm mt-1">{label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-black text-4xl md:text-5xl text-white mb-4">
            How <span className="text-gradient-gold">Sikka</span> Works
          </h2>
          <p className="text-dark-400 text-lg max-w-2xl mx-auto">
            Simple. Fun. Rewarding. Start earning in minutes.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ emoji, title, description, color }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass-card-hover p-6 text-center"
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4"
                style={{ background: `${color}20`, border: `1px solid ${color}30` }}>
                {emoji}
              </div>
              <h3 className="font-display font-bold text-white text-lg mb-2">{title}</h3>
              <p className="text-dark-400 text-sm leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card p-12 relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-20"
            style={{ background: 'radial-gradient(ellipse at center, rgba(245,158,11,0.4) 0%, transparent 70%)' }} />
          <div className="relative">
            <div className="text-5xl mb-4">🪙</div>
            <h2 className="font-display font-black text-4xl text-white mb-4">
              Ready to start earning?
            </h2>
            <p className="text-dark-400 text-lg mb-8 max-w-xl mx-auto">
              Join 50,000+ users already earning coins and winning rewards on Sikka.
              Your first 100 coins are waiting!
            </p>
            <Link href="/register">
              <Button size="lg" className="text-base" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Claim Your 100 Free Coins
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gold-500/10 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🪙</span>
            <span className="font-display font-bold text-white">Sikka</span>
          </div>
          <p className="text-dark-500 text-sm">
            © 2026 Sikka Reward Platform. All rights reserved.
          </p>
          <div className="flex gap-4">
            {['Privacy', 'Terms', 'Contact'].map(l => (
              <span key={l} className="text-dark-500 text-sm hover:text-gold-400 cursor-pointer transition-colors">{l}</span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
