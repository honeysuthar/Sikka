import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: {
    default: 'Sikka — Earn Coins, Win Rewards',
    template: '%s | Sikka',
  },
  description: 'Complete tasks, earn coins, and redeem amazing rewards. Sikka is the gamified reward platform that makes self-improvement fun.',
  keywords: ['rewards', 'tasks', 'coins', 'gamification', 'earn', 'redeem', 'sikka'],
  authors: [{ name: 'Sikka Team' }],
  openGraph: {
    title: 'Sikka — Earn Coins, Win Rewards',
    description: 'Complete tasks, earn coins, and redeem amazing rewards.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-dark-950 text-dark-100 antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
