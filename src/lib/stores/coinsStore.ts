import { create } from 'zustand';
import { CoinTransaction } from '@/lib/types';
import { mockTransactions } from '@/lib/mock-data/users';
import { useAuthStore } from './authStore';

interface CoinsStore {
  transactions: CoinTransaction[];
  isAnimating: boolean;
  lastChange: number;
  addCoins: (amount: number, description: string, type?: CoinTransaction['type']) => void;
  spendCoins: (amount: number, description: string) => boolean;
  claimDailyBonus: () => number;
  canClaimDailyBonus: () => boolean;
  setAnimating: (animating: boolean) => void;
}

export const useCoinsStore = create<CoinsStore>((set, get) => ({
  transactions: mockTransactions,
  isAnimating: false,
  lastChange: 0,

  addCoins: (amount, description, type = 'earned') => {
    const { updateUser, user } = useAuthStore.getState();
    if (!user) return;

    const newBalance = user.coinsBalance + amount;
    updateUser({ coinsBalance: newBalance });

    const txn: CoinTransaction = {
      id: `txn-${Date.now()}`,
      userId: user.id,
      type,
      amount,
      description,
      createdAt: new Date().toISOString(),
      balance: newBalance,
    };

    set(state => ({
      transactions: [txn, ...state.transactions],
      isAnimating: true,
      lastChange: amount,
    }));

    setTimeout(() => set({ isAnimating: false }), 2000);
  },

  spendCoins: (amount, description) => {
    const { updateUser, user } = useAuthStore.getState();
    if (!user || user.coinsBalance < amount) return false;

    const newBalance = user.coinsBalance - amount;
    updateUser({ coinsBalance: newBalance });

    const txn: CoinTransaction = {
      id: `txn-${Date.now()}`,
      userId: user.id,
      type: 'spent',
      amount: -amount,
      description,
      createdAt: new Date().toISOString(),
      balance: newBalance,
    };

    set(state => ({
      transactions: [txn, ...state.transactions],
      lastChange: -amount,
    }));

    return true;
  },

  canClaimDailyBonus: () => {
    const { user } = useAuthStore.getState();
    if (!user) return false;
    if (!user.dailyBonusClaimedAt) return true;
    const lastClaimed = new Date(user.dailyBonusClaimedAt);
    const now = new Date();
    return now.toDateString() !== lastClaimed.toDateString();
  },

  claimDailyBonus: () => {
    const { addCoins } = get();
    const { updateUser, user } = useAuthStore.getState();
    if (!user) return 0;

    const streakDays = user.streakDays + 1;
    const bonusAmount = Math.min(10 + streakDays * 5, 100); // 15 for day 1, up to 100

    addCoins(bonusAmount, `Daily login bonus — Day ${streakDays} streak!`, 'daily_bonus');
    updateUser({
      dailyBonusClaimedAt: new Date().toISOString(),
      streakDays,
    });

    return bonusAmount;
  },

  setAnimating: (isAnimating) => set({ isAnimating }),
}));
