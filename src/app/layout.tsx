import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';
import './globals.css';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { cn } from './utils/cn';
import styles from './layout.module.css';
import Link from 'next/link';

dayjs.extend(advancedFormat);

const figtree = Figtree({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Fatt',
  description: 'FreeAgent Time Tracker',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(figtree.className, styles.body)}>
        <header className={styles.header}>
          <Link href="/">Home</Link>
          <Link href="/month">Months</Link>
          <Link href="/tasks">Tasks</Link>
        </header>
        {children}
      </body>
    </html>
  );
}
