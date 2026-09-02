'use client';

import React, { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmModalProps {
  title: string;
  message: string;
  confirmLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({ title, message, confirmLabel, onConfirm, onCancel }: ConfirmModalProps) {
  const [isConfirming, setIsConfirming] = useState(false);

  const handleConfirm = async () => {
    setIsConfirming(true);
    await new Promise((r) => setTimeout(r, 600));
    setIsConfirming(false);
    onConfirm();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card max-w-sm animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="flex items-center gap-2">
            <AlertTriangle size={16} className="text-red-500" />
            <h2 className="text-base font-bold text-foreground">{title}</h2>
          </div>
          <button onClick={onCancel} className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors duration-150">
            <X size={16} />
          </button>
        </div>
        <div className="px-6 py-5">
          <p className="text-sm text-muted-foreground leading-relaxed">{message}</p>
          <div className="flex justify-end gap-3 mt-6">
            <button onClick={onCancel} className="btn-ghost">Cancel</button>
            <button
              onClick={handleConfirm}
              disabled={isConfirming}
              className="px-5 py-2.5 rounded-lg bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-all duration-150 active:scale-95 disabled:opacity-60 min-w-[140px] flex items-center justify-center gap-2"
            >
              {isConfirming ? (
                <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg><span>Deleting…</span></>
              ) : confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}