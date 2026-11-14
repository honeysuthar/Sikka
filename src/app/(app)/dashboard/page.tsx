'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, CheckCircle, Gift, Flame, Trophy, Calendar, ArrowRight, Zap, Clock } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CoinDisplay } from '@/components/coins/CoinDisplay';
import { useAuthStore } from '@/lib/stores/authStore';
import { useCoinsStore } from '@/lib/stores/coinsStore';
import { useUIStore } from '@/lib/stores/uiStore';
import { mockTasks } from '@/lib/mock-data/tasks';
import { mockActivity } from '@/lib/mock-data/users';
import { formatDate, getLevelTitle, getTimeUntilMidnight } from '@/lib/utils';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';
import { mockWeeklyData } from '@/lib/mock-data/users';
import Link from 'next/link';

const categoryColors: Record<string, string> = {
  daily: '#10b981',
  fitness: '#ef4444',
  learning: '#f59e0b',
  social: '#06b6d4',
  challenge: '#8b5cf6',
  weekly: '#a78bfa',
};

function StatCard({ icon: Icon, label, value, change, color }: {
  icon: typeof TrendingUp; label: string; value: string | number; change?: string; color: string;
}) {
  return (
    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
      <Card variant="hover" className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 opacity-10 rounded-full -translate-y-6 translate-x-6"
          style={{ background: color }} />
        <div className="flex items-start justify-between">
          <div>
            <p className="text-dark-400 text-sm mb-1">{label}</p>
            <p className="font-black text-2xl text-white font-display">{value}</p>
            {change && <p className="text-emerald-400 text-xs mt-1 font-medium">{change}</p>}
          </div>
          <div className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{ background: `${color}20`, border: `1px solid ${color}30` }}>
            <Icon className="w-5 h-5" style={{ color }} />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

function DailyBonusCard() {
  const { canClaimDailyBonus, claimDailyBonus } = useCoinsStore();
  const { user } = useAuthStore();
  const { addToast } = useUIStore();
  const [claimed, setClaimed] = useState(!canClaimDailyBonus());

  const handleClaim = () => {
    const amount = claimDailyBonus();
    setClaimed(true);
    addToast({
      title: `Daily Bonus Claimed! 🎁`,
      description: `You earned ${amount} coins. Day ${(user?.streakDays || 0) + 1} streak!`,
      type: 'success',
    });
  };

  return (
    <Card variant="gold" className="relative overflow-hidden">
      <div className="absolute inset-0 opacity-20"
        style={{ background: 'radial-gradient(ellipse at top right, rgba(245,158,11,0.5) 0%, transparent 60%)' }} />
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-4xl">{claimed ? '✅' : '🎁'}</div>
          <div>
            <p className="font-bold text-white">Daily Login Bonus</p>
            {claimed ? (
              <p className="text-dark-400 text-sm">Come back in {getTimeUntilMidnight()}</p>
            ) : (
              <p className="text-gold-300 text-sm font-medium">
                Claim your Day {(user?.streakDays || 0) + 1} bonus! 🔥
              </p>
            )}
          </div>
        </div>
        {!claimed && (
          <Button onClick={handleClaim} size="sm" id="claim-daily-bonus">
            Claim
          </Button>
        )}
        {claimed && (
          <div className="badge-success">Claimed ✓</div>
        )}
      </div>
    </Card>
  );
}

export default function DashboardPage() {
  const { user } = useAuthStore();
  const xpPercent = user ? (user.xp / user.xpToNextLevel) * 100 : 0;
  const availableTasks = mockTasks.slice(0, 4);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display font-black text-3xl text-white">
            Good day, {user?.name?.split(' ')[0]}! 👋
          </h1>
          <p className="text-dark-400 mt-1">
            {getLevelTitle(user?.level || 1)} · Level {user?.level} · {user?.streakDays} day streak 🔥
          </p>
        </div>
        <CoinDisplay size="lg" showAnimation />
      </div>

      {/* Daily bonus */}
      <DailyBonusCard />

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={CheckCircle} label="Tasks Completed" value={user?.tasksCompleted || 0}
          change="+3 this week" color="#10b981" />
        <StatCard icon={Flame} label="Day Streak" value={`${user?.streakDays || 0} 🔥`}
          change="Keep it up!" color="#ef4444" />
        <StatCard icon={Gift} label="Rewards Redeemed" value={user?.rewardsRedeemed || 0}
          color="#8b5cf6" />
        <StatCard icon={Trophy} label="Current Level" value={user?.level || 1}
          change={`${Math.round(xpPercent)}% to next`} color="#f59e0b" />
      </div>

      {/* XP Progress */}
      <Card>
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="font-bold text-white">Level {user?.level} Progress</p>
            <p className="text-dark-400 text-sm">{getLevelTitle(user?.level || 1)}</p>
          </div>
          <div className="text-right">
            <span className="font-bold text-gold-400">{user?.xp?.toLocaleString()}</span>
            <span className="text-dark-500 text-sm"> / {user?.xpToNextLevel?.toLocaleString()} XP</span>
          </div>
        </div>
        <div className="progress-bar">
          <motion.div
            className="progress-bar-fill"
            initial={{ width: '0%' }}
            animate={{ width: `${xpPercent}%` }}
            transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
          />
        </div>
        <p className="text-dark-500 text-xs mt-2">
          {user?.xpToNextLevel ? user.xpToNextLevel - user.xp : 0} XP to Level {(user?.level || 1) + 1}
        </p>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Weekly chart */}
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="section-title">Weekly Activity</h2>
                <p className="text-dark-400 text-sm">Coins earned this week</p>
              </div>
              <div className="coin-badge">
                <span>+685</span>
                <span className="text-xs text-dark-400">this week</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <AreaChart data={mockWeeklyData}>
                <defs>
                  <linearGradient id="coinGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tick={{ fill: '#6868a0', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ background: '#0f0f28', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '12px', color: '#fff' }}
                  formatter={(value) => [`${value} coins`, 'Earned']}
                />
                <Area type="monotone" dataKey="coins" stroke="#f59e0b" strokeWidth={2}
                  fill="url(#coinGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Recent activity */}
        <Card>
          <h2 className="section-title mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {mockActivity.slice(0, 4).map(item => (
              <div key={item.id} className="flex items-start gap-3 py-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                  style={{ background: 'rgba(245,158,11,0.1)' }}>
                  {item.iconEmoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium leading-tight">{item.title}</p>
                  <p className="text-dark-500 text-xs">{item.description}</p>
                </div>
                <div className="flex-shrink-0">
                  {item.coinChange && (
                    <span className={`text-xs font-bold ${item.coinChange > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {item.coinChange > 0 ? '+' : ''}{item.coinChange}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick tasks */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title">Today&apos;s Tasks</h2>
          <Link href="/tasks">
            <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>View All</Button>
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {availableTasks.map((task, i) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/tasks/${task.id}`}>
                <Card variant="hover" className="flex items-start gap-4">
                  <div className="text-3xl">{task.iconEmoji}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold text-white text-sm">{task.title}</p>
                      <span className="coin-badge flex-shrink-0 text-xs">+{task.coinValue}</span>
                    </div>
                    <p className="text-dark-500 text-xs mt-1 leading-relaxed line-clamp-1">{task.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: categoryColors[task.category] }} />
                      <span className="text-dark-500 text-xs capitalize">{task.category}</span>
                      <Clock className="w-3 h-3 text-dark-600 ml-1" />
                      <span className="text-dark-500 text-xs">{task.estimatedMinutes}m</span>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick access cards */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Link href="/spin">
          <Card variant="hover" className="flex items-center gap-4 bg-gradient-to-r from-violet-700/20 to-dark-900/50">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
              style={{ background: 'rgba(124,58,237,0.2)', border: '1px solid rgba(124,58,237,0.3)' }}>
              🎡
            </div>
            <div>
              <p className="font-bold text-white">Spin & Win</p>
              <p className="text-dark-400 text-sm">1 free spin available!</p>
            </div>
            <Zap className="w-5 h-5 text-violet-400 ml-auto" />
          </Card>
        </Link>
        <Link href="/rewards">
          <Card variant="hover" className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
              style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.2)' }}>
              🛍️
            </div>
            <div>
              <p className="font-bold text-white">Rewards Shop</p>
              <p className="text-dark-400 text-sm">15 rewards available</p>
            </div>
            <Gift className="w-5 h-5 text-gold-400 ml-auto" />
          </Card>
        </Link>
      </div>
    </div>
  );
}
