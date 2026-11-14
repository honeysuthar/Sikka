// Core entity types for Sikka reward platform

export type UserRole = 'user' | 'admin';
export type TaskDifficulty = 'easy' | 'medium' | 'hard';
export type TaskStatus = 'available' | 'in_progress' | 'completed' | 'expired';
export type TaskCategory = 'daily' | 'weekly' | 'challenge' | 'social' | 'learning' | 'fitness';
export type RewardCategory = 'voucher' | 'product' | 'experience' | 'digital' | 'donation';
export type TransactionType = 'earned' | 'spent' | 'bonus' | 'spin' | 'daily_bonus';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  coinsBalance: number;
  level: number;
  xp: number;
  xpToNextLevel: number;
  tasksCompleted: number;
  rewardsRedeemed: number;
  joinedAt: string;
  lastLogin: string;
  streakDays: number;
  dailyBonusClaimedAt?: string;
  lastSpinAt?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  difficulty: TaskDifficulty;
  coinValue: number;
  xpValue: number;
  iconEmoji: string;
  imageUrl?: string;
  estimatedMinutes: number;
  deadline?: string;
  isRepeatable: boolean;
  repeatIntervalDays?: number;
  requiredLevel: number;
  tags: string[];
  completedCount: number;
  createdAt: string;
}

export interface UserTask {
  taskId: string;
  userId: string;
  status: TaskStatus;
  startedAt?: string;
  completedAt?: string;
  coinsEarned: number;
  task: Task;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  category: RewardCategory;
  coinCost: number;
  imageUrl?: string;
  iconEmoji: string;
  stock: number | null; // null = unlimited
  brand?: string;
  discount?: string;
  validUntil?: string;
  tags: string[];
  redemptionCount: number;
  rating: number;
  isPopular: boolean;
  isFeatured: boolean;
  createdAt: string;
}

export interface UserReward {
  id: string;
  userId: string;
  rewardId: string;
  redeemedAt: string;
  coinsSpent: number;
  reward: Reward;
  redemptionCode?: string;
  status: 'active' | 'used' | 'expired';
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  iconEmoji: string;
  badgeColor: string;
  category: string;
  requirement: {
    type: 'tasks_completed' | 'coins_earned' | 'streak_days' | 'rewards_redeemed' | 'level_reached' | 'spins_done';
    value: number;
  };
  coinReward: number;
  xpReward: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface UserAchievement {
  achievementId: string;
  userId: string;
  achievedAt: string;
  progress: number; // 0-100
  achievement: Achievement;
}

export interface CoinTransaction {
  id: string;
  userId: string;
  type: TransactionType;
  amount: number; // positive = earned, negative = spent
  description: string;
  relatedId?: string; // task id, reward id, etc
  createdAt: string;
  balance: number; // balance after this transaction
}

export interface SpinSegment {
  id: string;
  label: string;
  coinValue: number;
  color: string;
  probability: number; // 0-1
  isJackpot?: boolean;
}

export interface SpinResult {
  segmentId: string;
  segment: SpinSegment;
  coinsEarned: number;
  finalRotation: number;
}

export interface DashboardStats {
  totalCoins: number;
  tasksCompleted: number;
  rewardsRedeemed: number;
  currentStreak: number;
  rank: number;
  level: number;
  xp: number;
  xpToNextLevel: number;
  coinsThisWeek: number;
  tasksThisWeek: number;
}

export interface ActivityFeedItem {
  id: string;
  type: 'task_completed' | 'reward_redeemed' | 'achievement_earned' | 'daily_bonus' | 'spin_win' | 'level_up';
  title: string;
  description: string;
  coinChange?: number;
  createdAt: string;
  iconEmoji: string;
}

// API response wrappers
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// Auth types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
