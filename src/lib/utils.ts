import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCoins(amount: number): string {
  if (amount >= 1000) {
    return `${(amount / 1000).toFixed(1)}K`;
  }
  return amount.toString();
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

export function formatFullDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function getDifficultyColor(difficulty: string): string {
  const map: Record<string, string> = {
    easy: 'badge-success',
    medium: 'badge-warning',
    hard: 'badge-error',
  };
  return map[difficulty] || 'badge-info';
}

export function getCategoryColor(category: string): string {
  const map: Record<string, string> = {
    daily: '#10b981',
    weekly: '#8b5cf6',
    challenge: '#f43f5e',
    social: '#06b6d4',
    learning: '#f59e0b',
    fitness: '#ef4444',
  };
  return map[category] || '#6868a0';
}

export function getLevelTitle(level: number): string {
  const titles: Record<number, string> = {
    1: 'Newcomer',
    2: 'Explorer',
    3: 'Achiever',
    4: 'Warrior',
    5: 'Champion',
    6: 'Hero',
    7: 'Legend',
    8: 'Master',
    9: 'Grandmaster',
    10: 'Sikka Elite',
  };
  return titles[Math.min(level, 10)] || 'Sikka Elite';
}

export function getRarityColor(rarity: string): string {
  const map: Record<string, string> = {
    common: '#10b981',
    rare: '#3b82f6',
    epic: '#8b5cf6',
    legendary: '#f59e0b',
  };
  return map[rarity] || '#6868a0';
}

export function getXPProgress(xp: number, xpToNext: number): number {
  return Math.min((xp / xpToNext) * 100, 100);
}

export function getTimeUntilMidnight(): string {
  const now = new Date();
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0);
  const diff = midnight.getTime() - now.getTime();
  const hours = Math.floor(diff / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  return `${hours}h ${mins}m`;
}

export function generateConfetti(count: number = 50): Array<{ x: number; y: number; color: string; delay: number }> {
  const colors = ['#f59e0b', '#d97706', '#fbbf24', '#7c3aed', '#10b981', '#f43f5e'];
  return Array.from({ length: count }, () => ({
    x: Math.random() * 100,
    y: Math.random() * -50,
    color: colors[Math.floor(Math.random() * colors.length)],
    delay: Math.random() * 3,
  }));
}
