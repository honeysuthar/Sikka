'use client';

import { cn, formatCoins } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useCoinsStore } from '@/lib/stores/coinsStore';
import { useAuthStore } from '@/lib/stores/authStore';

interface CoinDisplayProps {
  amount?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showAnimation?: boolean;
  className?: string;
}

export function CoinDisplay({ amount, size = 'md', showAnimation = false, className }: CoinDisplayProps) {
  const { user } = useAuthStore();
  const { isAnimating, lastChange } = useCoinsStore();
  const displayAmount = amount ?? user?.coinsBalance ?? 0;

  const sizes = {
    sm: { coin: 'w-4 h-4 text-xs', text: 'text-sm font-semibold' },
    md: { coin: 'w-6 h-6 text-xs', text: 'text-base font-bold' },
    lg: { coin: 'w-8 h-8 text-sm', text: 'text-xl font-bold' },
    xl: { coin: 'w-12 h-12 text-lg', text: 'text-3xl font-black' },
  };

  const { coin, text } = sizes[size];

  return (
    <div className={cn('relative flex items-center gap-2', className)}>
      {/* Coin icon */}
      <div
        className={cn(
          'coin-icon flex-shrink-0',
          coin,
          showAnimation && isAnimating && 'animate-coin-flip'
        )}
        style={{ width: coin.includes('w-4') ? '16px' : coin.includes('w-6') ? '24px' : coin.includes('w-8') ? '32px' : '48px',
                 height: coin.includes('w-4') ? '16px' : coin.includes('w-6') ? '24px' : coin.includes('w-8') ? '32px' : '48px' }}
      >
        ₿
      </div>

      {/* Amount */}
      <span className={cn(text, 'text-gold-400')}>
        {formatCoins(displayAmount)}
      </span>

      {/* Change animation */}
      <AnimatePresence>
        {showAnimation && isAnimating && lastChange !== 0 && (
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 0, y: -30 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className={cn(
              'absolute -top-6 left-1/2 -translate-x-1/2 font-bold text-sm pointer-events-none',
              lastChange > 0 ? 'text-emerald-400' : 'text-rose-400'
            )}
          >
            {lastChange > 0 ? '+' : ''}{lastChange}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Inline coin badge (for use in task/reward cards)
export function CoinBadge({ amount, className }: { amount: number; className?: string }) {
  return (
    <span className={cn('coin-badge', className)}>
      <span className="text-gold-500">₿</span>
      {formatCoins(amount)}
    </span>
  );
}
