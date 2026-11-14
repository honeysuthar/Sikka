'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/lib/stores/authStore';
import { useUIStore } from '@/lib/stores/uiStore';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine(d => d.password === d.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

type RegisterForm = z.infer<typeof registerSchema>;

const perks = [
  '100 free coins on registration',
  'Daily login bonuses',
  'Spin wheel once per day',
  'Access to 100+ rewards',
];

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuthStore();
  const { addToast } = useUIStore();
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      await login(data.email, data.password);
      addToast({ title: 'Account created! 🎉', description: 'You\'ve received 100 welcome coins!', type: 'success' });
      router.push('/dashboard');
    } catch {
      addToast({ title: 'Registration failed', description: 'Please try again.', type: 'error' });
    }
  };

  return (
    <div className="min-h-screen bg-hero-gradient flex items-center justify-center p-4 py-10">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-glow-gold opacity-30" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-glow-violet opacity-20" />
      </div>

      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center relative">
        {/* Left — Perks */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden md:block"
        >
          <Link href="/" className="inline-flex items-center gap-3 mb-10">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
              style={{ background: 'linear-gradient(135deg, #fbbf24, #d97706)' }}>
              🪙
            </div>
            <span className="font-display font-black text-white text-3xl">Sikka</span>
          </Link>

          <h2 className="font-display font-black text-4xl text-white mb-4">
            Start earning today
          </h2>
          <p className="text-dark-400 text-lg mb-8">
            Join thousands of users who complete daily tasks and win amazing rewards.
          </p>

          <div className="space-y-4">
            {perks.map((perk, i) => (
              <motion.div
                key={perk}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-3"
              >
                <CheckCircle className="w-5 h-5 text-gold-400 flex-shrink-0" />
                <span className="text-dark-200">{perk}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 glass-card p-5">
            <div className="flex items-center gap-3">
              <div className="text-3xl">🎁</div>
              <div>
                <p className="font-bold text-white">Welcome Bonus</p>
                <p className="text-dark-400 text-sm">Get 100 Sikka coins instantly upon registration</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right — Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="text-center mb-6 md:hidden">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{ background: 'linear-gradient(135deg, #fbbf24, #d97706)' }}>🪙</div>
              <span className="font-display font-black text-white text-2xl">Sikka</span>
            </Link>
          </div>

          <div className="text-center mb-6">
            <h1 className="font-display font-bold text-2xl text-white">Create Account</h1>
            <p className="text-dark-400 mt-1">Join and claim your 100 welcome coins</p>
          </div>

          <div className="glass-card p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark-200 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
                  <input
                    {...register('name')}
                    type="text"
                    placeholder="Arjun Sharma"
                    className="input-field pl-11"
                    id="register-name"
                  />
                </div>
                {errors.name && <p className="text-rose-400 text-xs mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-200 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="you@example.com"
                    className="input-field pl-11"
                    id="register-email"
                  />
                </div>
                {errors.email && <p className="text-rose-400 text-xs mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-200 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
                  <input
                    {...register('password')}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Min. 6 characters"
                    className="input-field pl-11 pr-11"
                    id="register-password"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-500 hover:text-dark-300">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-rose-400 text-xs mt-1">{errors.password.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-200 mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
                  <input
                    {...register('confirmPassword')}
                    type="password"
                    placeholder="Repeat password"
                    className="input-field pl-11"
                    id="register-confirm-password"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-rose-400 text-xs mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>

              <Button type="submit" isLoading={isLoading} className="w-full mt-2" size="lg"
                rightIcon={<ArrowRight className="w-5 h-5" />} id="register-submit">
                Create Account & Claim 100 Coins
              </Button>

              <p className="text-center text-dark-500 text-xs">
                By creating an account, you agree to our{' '}
                <span className="text-gold-500 cursor-pointer">Terms of Service</span>
              </p>
            </form>

            <div className="my-5 divider-gold" />

            <p className="text-center text-dark-400 text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-gold-400 font-semibold hover:text-gold-300 transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
