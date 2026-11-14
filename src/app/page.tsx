'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/stores/authStore';

export default function LandingPage() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) router.push('/dashboard');
  }, [isAuthenticated, router]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-between px-6 py-10"
      style={{ background: '#CAFF33' }}
    >
      {/* Top — Logo */}
      <div className="flex flex-col items-center pt-8">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-3"
          style={{ background: '#111' }}
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M20 4L23.09 13.26H33L25.45 18.74L28.55 28L20 22.52L11.45 28L14.55 18.74L7 13.26H16.91L20 4Z" fill="#CAFF33"/>
          </svg>
        </div>
        <h1 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: '28px', color: '#111', letterSpacing: '-0.5px' }}>
          Sikka
        </h1>
      </div>

      {/* Middle — Feature list */}
      <div className="w-full max-w-sm space-y-6 my-10">
        {[
          {
            icon: (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
              </svg>
            ),
            title: 'Learn all about Financial Literacy',
            sub: 'from our daily learning games',
          },
          {
            icon: (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
              </svg>
            ),
            title: 'Track your Expenses & stay on track',
            sub: 'set up monthly budgets & goals',
          },
          {
            icon: (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
              </svg>
            ),
            title: 'See what other have to say & discuss',
            sub: 'engage with other users through blogs & posts',
          },
        ].map((f, i) => (
          <div key={i} className="flex items-start gap-4">
            <div className="mt-0.5 flex-shrink-0">{f.icon}</div>
            <div>
              <p style={{ fontWeight: 700, color: '#111', fontSize: '15px', lineHeight: 1.3 }}>{f.title}</p>
              <p style={{ color: '#444', fontSize: '13px', marginTop: '2px' }}>{f.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom — Buttons */}
      <div className="w-full max-w-sm space-y-3">
        <Link href="/login">
          <button
            className="w-full py-4 rounded-full font-bold text-base"
            style={{ background: '#111', color: '#CAFF33', fontSize: '16px', fontWeight: 700 }}
          >
            Get Started
          </button>
        </Link>
        <Link href="/login?tab=login">
          <button
            className="w-full py-4 rounded-full font-semibold text-base border-2"
            style={{ background: 'transparent', borderColor: '#111', color: '#111', fontSize: '16px', fontWeight: 600 }}
          >
            I already have an Account
          </button>
        </Link>
      </div>
    </div>
  );
}
