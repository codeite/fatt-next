import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';
import './globals.css';
import './atoms.css';
import './global-icon.css';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { cn } from './utils/cn';
import styles from './layout.module.css';

dayjs.extend(advancedFormat);

const figtree = Figtree({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Fatt',
  description: 'FreeAgent Time Tracker',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(figtree.className, styles.body)}>{children}</body>
    </html>
  );
}
