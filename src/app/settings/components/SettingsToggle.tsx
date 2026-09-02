'use client';

import React from 'react';

interface SettingsToggleProps {
  enabled: boolean;
  onChange: (val: boolean) => void;
  id: string;
}

export default function SettingsToggle({ enabled, onChange, id }: SettingsToggleProps) {
  return (
    <button
      role="switch"
      aria-checked={enabled}
      id={id}
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex w-11 h-6 rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary/40 flex-shrink-0 ${
        enabled ? 'bg-primary' : 'bg-border'
      }`}
    >
      <span
        className={`inline-block w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out mt-0.5 ${
          enabled ? 'translate-x-5' : 'translate-x-0.5'
        }`}
      />
    </button>
  );
}