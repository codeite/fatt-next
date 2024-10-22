'use client';

import React, { ReactNode } from 'react';

export function SwitchContainer({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

export function Switch({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange?: (checked: boolean) => void;
}) {
  return (
    <label>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <span />
    </label>
  );
}
