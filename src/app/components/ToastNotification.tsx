'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ToastNotificationProps {
  message: string;
  subMessage?: string;
  onUndo?: () => void;
}

export default function ToastNotification({ message, subMessage, onUndo }: ToastNotificationProps) {
  return (
    <div className="toast-notification">
      <CheckCircle2 size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <span className="font-semibold">{message}</span>
        {subMessage && (
          <span className="text-xs text-white/70">{subMessage}</span>
        )}
      </div>
      {onUndo && (
        <button
          onClick={onUndo}
          className="ml-2 text-xs font-bold underline underline-offset-2 text-white/90 hover:text-white transition-colors duration-150 flex-shrink-0"
        >
          Undo
        </button>
      )}
    </div>
  );
}