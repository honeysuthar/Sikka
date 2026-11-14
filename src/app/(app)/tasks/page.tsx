'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Clock, ChevronRight, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CoinBadge } from '@/components/coins/CoinDisplay';
import { mockTasks } from '@/lib/mock-data/tasks';
import { Task, TaskCategory, TaskDifficulty } from '@/lib/types';
import { getDifficultyColor, getCategoryColor, cn } from '@/lib/utils';
import Link from 'next/link';
import type { Metadata } from 'next';

const categories: { value: TaskCategory | 'all'; label: string; emoji: string }[] = [
  { value: 'all', label: 'All', emoji: '🌟' },
  { value: 'daily', label: 'Daily', emoji: '☀️' },
  { value: 'fitness', label: 'Fitness', emoji: '💪' },
  { value: 'learning', label: 'Learning', emoji: '🎓' },
  { value: 'social', label: 'Social', emoji: '🤝' },
  { value: 'challenge', label: 'Challenge', emoji: '⚡' },
  { value: 'weekly', label: 'Weekly', emoji: '📅' },
];

const difficulties: { value: TaskDifficulty | 'all'; label: string }[] = [
  { value: 'all', label: 'All Levels' },
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
];

// Simulated completed tasks
const completedTaskIds = new Set(['task-1', 'task-3']);

function TaskCard({ task }: { task: Task }) {
  const isCompleted = completedTaskIds.has(task.id);
  const catColor = getCategoryColor(task.category);

  return (
    <Link href={`/tasks/${task.id}`}>
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
        className={cn('glass-card p-5 cursor-pointer transition-all duration-300',
          'hover:border-gold-500/25 hover:shadow-card-hover',
          isCompleted && 'opacity-60'
        )}
      >
        <div className="flex items-start gap-4">
          {/* Emoji icon */}
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ background: `${catColor}15`, border: `1px solid ${catColor}25` }}>
              {task.iconEmoji}
            </div>
            {isCompleted && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                <CheckCircle className="w-3 h-3 text-white" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className={cn('font-bold text-white leading-tight', isCompleted && 'line-through text-dark-400')}>
                {task.title}
              </h3>
              <ChevronRight className="w-4 h-4 text-dark-500 flex-shrink-0 mt-1" />
            </div>

            <p className="text-dark-400 text-sm line-clamp-2 leading-relaxed mb-3">
              {task.description}
            </p>

            {/* Meta row */}
            <div className="flex items-center gap-3 flex-wrap">
              <CoinBadge amount={task.coinValue} />

              <span className={cn(getDifficultyColor(task.difficulty))}>
                {task.difficulty}
              </span>

              <div className="flex items-center gap-1 text-dark-500 text-xs">
                <Clock className="w-3 h-3" />
                {task.estimatedMinutes}m
              </div>

              <div className="flex items-center gap-1 text-xs" style={{ color: catColor }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: catColor }} />
                {task.category}
              </div>

              {task.isRepeatable && (
                <span className="badge-info">Repeatable</span>
              )}
            </div>
          </div>
        </div>

        {isCompleted && (
          <div className="mt-3 pt-3 border-t border-dark-700/50 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 text-xs font-medium">Completed today!</span>
          </div>
        )}
      </motion.div>
    </Link>
  );
}

export default function TasksPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<TaskCategory | 'all'>('all');
  const [difficulty, setDifficulty] = useState<TaskDifficulty | 'all'>('all');

  const filtered = mockTasks.filter(task => {
    const matchSearch = !search || task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'all' || task.category === category;
    const matchDiff = difficulty === 'all' || task.difficulty === difficulty;
    return matchSearch && matchCat && matchDiff;
  });

  const completedCount = mockTasks.filter(t => completedTaskIds.has(t.id)).length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="font-display font-black text-3xl text-white">Tasks</h1>
        <p className="text-dark-400 mt-1">Complete tasks to earn coins · {completedCount}/{mockTasks.length} done today</p>
      </div>

      {/* Progress summary */}
      <Card variant="gold" padding="sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white font-semibold text-sm">Today&apos;s Progress</span>
          <span className="text-gold-400 font-bold text-sm">{completedCount}/{mockTasks.length} tasks</span>
        </div>
        <div className="progress-bar">
          <motion.div
            className="progress-bar-fill"
            initial={{ width: '0%' }}
            animate={{ width: `${(completedCount / mockTasks.length) * 100}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>
      </Card>

      {/* Search + Filters */}
      <div className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input-field pl-12"
            id="task-search"
          />
        </div>

        {/* Category filters */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className={cn(
                'flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0',
                category === cat.value
                  ? 'text-dark-900 font-bold'
                  : 'text-dark-400 hover:text-dark-200',
              )}
              style={category === cat.value ? {
                background: 'linear-gradient(135deg, #fbbf24, #d97706)',
              } : {
                background: 'rgba(245,158,11,0.05)',
                border: '1px solid rgba(245,158,11,0.1)',
              }}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>

        {/* Difficulty filter */}
        <div className="flex gap-2">
          {difficulties.map(diff => (
            <button
              key={diff.value}
              onClick={() => setDifficulty(diff.value)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200',
                difficulty === diff.value
                  ? 'bg-dark-700 text-white'
                  : 'text-dark-500 hover:text-dark-300'
              )}
            >
              {diff.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-dark-500 text-sm">{filtered.length} tasks found</p>
        <div className="flex items-center gap-1 text-dark-500 text-xs">
          <Filter className="w-3.5 h-3.5" />
          Sorted by coin value
        </div>
      </div>

      {/* Task grid */}
      <div className="grid gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="text-5xl mb-3">🔍</div>
              <p className="text-dark-300 font-medium">No tasks found</p>
              <p className="text-dark-500 text-sm mt-1">Try different search terms or filters</p>
            </motion.div>
          ) : (
            filtered.map((task, i) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
              >
                <TaskCard task={task} />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
