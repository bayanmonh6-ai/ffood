'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AddCategoryModalProps {
  onClose: () => void;
  onSubmit: (label: string) => void;
}

export default function AddCategoryModal({ onClose, onSubmit }: AddCategoryModalProps) {
  const [categoryName, setCategoryName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryName.trim() || categoryName.trim().length < 2) {
      setError('Category name must be at least 2 characters');
      return;
    }
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 400));
    onSubmit(categoryName.trim());
    setIsSubmitting(false);
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
          <h2 className="text-base font-bold text-foreground">Add new category</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors duration-150"
            aria-label="Close modal"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4">
          <div>
            <label className="form-label">Category name</label>
            <input
              value={categoryName}
              onChange={(e) => {
                setCategoryName(e.target.value);
                if (error) setError('');
              }}
              className="form-input"
              placeholder="Type category name..."
              autoFocus
            />
            {error && <p className="form-error">{error}</p>}
          </div>

          {/* Footer */}
          <div className="flex justify-end pt-1">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary px-6"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  <span>Adding...</span>
                </>
              ) : (
                <span>Add category</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}