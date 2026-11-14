'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const interests = [
  'Budgeting & Saving',
  'Banking',
  'Investing Basics',
  'Stocks & Shares',
  'Mutual Funds',
  'Crypto Currencies',
  'Taxes',
  'Investing',
];

export default function InterestsPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (item: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(item)) next.delete(item);
      else next.add(item);
      return next;
    });
  };

  const handleNext = () => {
    router.push('/dashboard');
  };

  return (
    <div
      className="min-h-screen flex flex-col px-6 py-10"
      style={{ background: '#111111', color: '#fff' }}
    >
      {/* Header */}
      <div className="mb-6">
        <h1 style={{ fontWeight: 800, fontSize: '24px', color: '#fff', letterSpacing: '-0.3px', marginBottom: '6px' }}>
          Let&apos;s customize your experience
        </h1>
        <p style={{ color: '#888', fontSize: '14px' }}>Choose your interests to customize the app</p>
      </div>

      {/* NEXT button at top (matches Figma) */}
      <button
        onClick={handleNext}
        id="interests-next-top"
        style={{
          width: '100%',
          background: '#000',
          color: '#fff',
          borderRadius: '999px',
          padding: '16px',
          fontSize: '16px',
          fontWeight: 700,
          border: 'none',
          cursor: 'pointer',
          marginBottom: '28px',
        }}
      >
        NEXT
      </button>

      {/* Interest chips grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px',
          flex: 1,
        }}
      >
        {interests.map((item) => {
          const isSelected = selected.has(item);
          return (
            <button
              key={item}
              onClick={() => toggle(item)}
              style={{
                padding: '14px 10px',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s',
                background: isSelected ? '#CAFF33' : '#1a1a1a',
                color: isSelected ? '#111' : '#ccc',
                border: isSelected ? '2px solid #CAFF33' : '2px solid #2a2a2a',
                textAlign: 'center',
              }}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
}
