import React from 'react';
import { PageHeader } from '@/components/page-header';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PageHeader />
      {children}
    </>
  );
}
