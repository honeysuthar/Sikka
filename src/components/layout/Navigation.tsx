'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Home, CheckSquare, Gift, Star, User, Trophy, Zap, LogOut, Menu, X, Bell
} from 'lucide-react';
import { useAuthStore } from '@/lib/stores/authStore';
import { useUIStore } from '@/lib/stores/uiStore';
import { CoinDisplay } from '@/components/coins/CoinDisplay';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', icon: Home, label: 'Dashboard' },
  { href: '/tasks', icon: CheckSquare, label: 'Tasks' },
  { href: '/rewards', icon: Gift, label: 'Rewards' },
  { href: '/spin', icon: Zap, label: 'Spin & Win' },
  { href: '/achievements', icon: Trophy, label: 'Achievements' },
  { href: '/profile', icon: User, label: 'Profile' },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { isMobileNavOpen, setMobileNav } = useUIStore();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <>
      {/* Desktop Top Bar */}
      <header className="hidden md:flex fixed top-0 left-64 right-0 h-16 z-30 items-center justify-between px-6"
        style={{
          background: 'rgba(8, 8, 20, 0.9)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(245, 158, 11, 0.08)',
        }}>
        {/* Page title based on route */}
        <div>
          <h1 className="font-display font-bold text-white text-lg">
            {navItems.find(n => pathname.startsWith(n.href))?.label || 'Dashboard'}
          </h1>
          <p className="text-dark-400 text-xs">Welcome back, {user?.name?.split(' ')[0]} 👋</p>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Coin balance */}
          <div className="glass-card px-4 py-2 flex items-center">
            <CoinDisplay size="sm" showAnimation />
          </div>

          {/* Notifications */}
          <button className="relative w-10 h-10 rounded-xl flex items-center justify-center text-dark-400 hover:text-gold-400 hover:bg-gold-500/5 transition-all">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gold-500 rounded-full"></span>
          </button>

          {/* Avatar */}
          <div className="w-9 h-9 rounded-xl bg-gold-gradient flex items-center justify-center text-dark-950 font-bold text-sm">
            {user?.name?.charAt(0) || 'U'}
          </div>
        </div>
      </header>

      {/* Mobile Top Bar */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-16 z-30 flex items-center justify-between px-4"
        style={{
          background: 'rgba(8, 8, 20, 0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(245, 158, 11, 0.08)',
        }}>
        <div className="flex items-center gap-3">
          <span className="text-2xl">🪙</span>
          <span className="font-display font-bold text-white text-lg">Sikka</span>
        </div>

        <div className="flex items-center gap-3">
          <CoinDisplay size="sm" />
          <button
            onClick={() => setMobileNav(!isMobileNavOpen)}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-dark-300 hover:text-white"
          >
            {isMobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Nav Drawer */}
      {isMobileNavOpen && (
        <motion.div
          initial={{ opacity: 0, x: -300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          className="md:hidden fixed inset-0 z-40 flex"
        >
          <div
            className="fixed inset-0 bg-black/60"
            onClick={() => setMobileNav(false)}
          />
          <div className="relative w-72 h-full overflow-y-auto"
            style={{ background: 'rgba(10, 10, 30, 0.98)', backdropFilter: 'blur(20px)' }}>
            <SidebarContent onNavigate={() => setMobileNav(false)} onLogout={handleLogout} />
          </div>
        </motion.div>
      )}
    </>
  );
}

export function Sidebar() {
  const router = useRouter();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 z-40 flex-col"
      style={{
        background: 'rgba(8, 8, 20, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRight: '1px solid rgba(245, 158, 11, 0.08)',
      }}>
      <SidebarContent onLogout={handleLogout} />
    </aside>
  );
}

function SidebarContent({ onNavigate, onLogout }: { onNavigate?: () => void; onLogout: () => void }) {
  const pathname = usePathname();
  const { user } = useAuthStore();

  return (
    <div className="flex flex-col h-full p-4">
      {/* Logo */}
      <div className="flex items-center gap-3 p-4 mb-6">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-2xl"
          style={{ background: 'linear-gradient(135deg, #fbbf24, #d97706)' }}>
          🪙
        </div>
        <div>
          <span className="font-display font-black text-white text-xl">Sikka</span>
          <p className="text-dark-400 text-xs">Reward Platform</p>
        </div>
      </div>

      {/* User quick info */}
      <div className="glass-card p-4 mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gold-gradient flex items-center justify-center text-dark-950 font-bold">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div>
            <p className="font-semibold text-white text-sm">{user?.name}</p>
            <p className="text-dark-400 text-xs">Level {user?.level}</p>
          </div>
        </div>
        <CoinDisplay size="sm" showAnimation />
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href || (href !== '/dashboard' && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              className={cn('nav-link', isActive && 'active')}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
              {href === '/spin' && (
                <span className="ml-auto px-2 py-0.5 rounded-full text-xs font-bold bg-gold-500/20 text-gold-400 border border-gold-500/30">
                  Free
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="mt-6 pt-6" style={{ borderTop: '1px solid rgba(245,158,11,0.08)' }}>
        <button
          onClick={onLogout}
          className="nav-link w-full text-rose-400 hover:bg-rose-500/5 hover:text-rose-300"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}
