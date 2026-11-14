'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/lib/stores/authStore';

/* ── exact Figma colour tokens ── */
const C = {
  bg:           '#0d0d0d',  // page background — near-black
  logoBg:       '#1c1c1e',  // dark circle
  logoStar:     '#CAFF33',  // lime-green star
  white:        '#ffffff',
  tabActive:    '#ffffff',
  tabInactive:  '#8e8e93',  // iOS-system grey
  separator:    '#2c2c2e',  // divider between tabs and content
  inputBorder:  '#2c2c2e',  // bottom-line under inputs
  orText:       '#636366',  // "OR" text
  orLine:       '#2c2c2e',  // horizontal line beside OR
  socialBg:     '#1c1c1e',  // social button fill
  socialBorder: '#2c2c2e',  // social button stroke
  nextBg:       '#000000',  // NEXT button background
  nextBorder:   '#1c1c1e',  // NEXT button subtle border
};

function AuthForm() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') === 'login' ? 'login' : 'signup';
  const [tab, setTab] = useState<'signup' | 'login'>(initialTab);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuthStore();
  const router = useRouter();

  const handleNext = async () => {
    const u = username.trim() || 'demo@sikka.app';
    const p = password.trim() || 'password';
    await login(u, p);
    router.push(tab === 'signup' ? '/onboarding' : '/dashboard');
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: `1px solid ${C.inputBorder}`,
    color: C.white,
    fontSize: '15px',
    padding: '14px 0 16px 0',
    outline: 'none',
    boxSizing: 'border-box',
    caretColor: C.logoStar,
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
  };

  const socialBtn: React.CSSProperties = {
    flex: 1,
    padding: '15px 10px',
    background: C.socialBg,
    border: `1px solid ${C.socialBorder}`,
    borderRadius: '10px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <>
      {/* Global placeholder colour for this page */}
      <style>{`
        #auth-username::placeholder,
        #auth-password::placeholder { color: #636366; }
        #auth-username:focus, #auth-password:focus {
          border-bottom-color: #3a3a3c !important;
        }
        #auth-next:hover { background: #111 !important; }
      `}</style>

      <div
        style={{
          minHeight: '100vh',
          background: C.bg,
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '480px',
          margin: '0 auto',
          padding: '44px 24px 40px',
        }}
      >
        {/* ── Logo ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '40px' }}>
          <div
            style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: C.logoBg,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <span style={{ color: C.logoStar, fontSize: '17px', lineHeight: 1 }}>★</span>
          </div>
          <span style={{ fontWeight: 800, fontSize: '20px', color: C.white, letterSpacing: '-0.3px' }}>
            Sikka
          </span>
        </div>

        {/* ── Tabs ── */}
        <div style={{ display: 'flex', gap: '28px', borderBottom: `1px solid ${C.separator}` }}>
          {(['signup', 'login'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                paddingBottom: '14px',
                fontWeight: tab === t ? 700 : 400,
                fontSize: '17px',
                color: tab === t ? C.tabActive : C.tabInactive,
                background: 'transparent',
                border: 'none',
                borderBottom: `2px solid ${tab === t ? '#fff' : 'transparent'}`,
                marginBottom: '-1px',
                cursor: 'pointer',
                textTransform: 'capitalize',
                transition: 'color 0.15s',
                fontFamily: 'inherit',
              }}
            >
              {t === 'signup' ? 'Signup' : 'Login'}
            </button>
          ))}
        </div>

        {/* ── Inputs ── */}
        <div style={{ marginTop: '40px' }}>
          <input
            id="auth-username"
            type="text"
            placeholder="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            style={inputStyle}
            autoComplete="username"
          />
        </div>
        <div>
          <input
            id="auth-password"
            type="password"
            placeholder="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={inputStyle}
            autoComplete="current-password"
          />
        </div>

        {/* ── OR ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', margin: '36px 0' }}>
          <div style={{ flex: 1, height: '1px', background: C.orLine }} />
          <span style={{ color: C.orText, fontSize: '13px', letterSpacing: '0.5px', fontWeight: 500 }}>OR</span>
          <div style={{ flex: 1, height: '1px', background: C.orLine }} />
        </div>

        {/* ── Social buttons ── */}
        <div style={{ display: 'flex', gap: '10px' }}>
          {/* Google */}
          <button style={socialBtn} aria-label="Continue with Google">
            <svg width="22" height="22" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          </button>

          {/* Facebook */}
          <button style={socialBtn} aria-label="Continue with Facebook">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#1877F2">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </button>

          {/* Apple */}
          <button style={socialBtn} aria-label="Continue with Apple">
            <svg width="20" height="20" viewBox="0 0 814 1000" fill="#ffffff">
              <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.3-150.3-93.5C27.5 751.8 0 659.7 0 579.1c0-203 110.7-310.9 221.3-310.9 59 0 103.7 38.9 139.3 38.9 33.6 0 86.5-41.8 154.4-41.8 24.6 0 108.2 2.6 168.5 80.6zm-180.6-78.9c-33.5-37.1-80.1-61.8-131.8-61.8-14.5 0-32.2 2.6-50.7 10.4L430 210c5.8-4.5 72.1-5.8 108.2 50.3 24.6 38.3 25.4 85.5 23.1 115.9-20.1 1.3-37.1 2.6-55.6 2.6z"/>
            </svg>
          </button>
        </div>

        {/* ── Spacer pushes NEXT to bottom ── */}
        <div style={{ flex: 1 }} />

        {/* ── NEXT ── */}
        <button
          id="auth-next"
          onClick={handleNext}
          disabled={isLoading}
          style={{
            width: '100%',
            background: C.nextBg,
            color: '#fff',
            borderRadius: '999px',
            padding: '20px',
            fontSize: '15px',
            fontWeight: 700,
            letterSpacing: '1.5px',
            border: `1px solid ${C.nextBorder}`,
            cursor: isLoading ? 'wait' : 'pointer',
            opacity: isLoading ? 0.6 : 1,
            marginTop: '32px',
            fontFamily: 'inherit',
            transition: 'background 0.2s, opacity 0.2s',
          }}
        >
          {isLoading ? 'Please wait…' : 'NEXT'}
        </button>
      </div>
    </>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div style={{ background: '#0d0d0d', minHeight: '100vh' }} />}>
      <AuthForm />
    </Suspense>
  );
}
