import React from 'react';
import Link from 'next/link';
import styles from './component.module.css';

export function PageHeader() {
  return (
    <header className={styles.header}>
      <Link href="/">Home</Link>
      <Link href="/app/month">Months</Link>
      <Link href="/app/tasks">Tasks</Link>
      <Link href="/app/contact">Contact</Link>
    </header>
  );
}
