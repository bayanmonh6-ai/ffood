'use client';

import React from 'react';
import type { Category } from './FoodMenuContent';

interface CategoryFiltersProps {
  categories: Category[];
  activeCategory: string;
  onSelect: (slug: string) => void;
  getDishCount: (slug: string) => number;
}

export default function CategoryFilters({
  categories,
  activeCategory,
  onSelect,
  getDishCount,
}: CategoryFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.slug;
        const count = getDishCount(cat.slug);
        return (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.slug)}
            className={`category-chip ${isActive ? 'category-chip-active' : 'category-chip-inactive'}`}
          >
            <span>{cat.label}</span>
            <span
              className={`text-xs font-bold ${
                isActive ? 'text-white/80' : 'text-muted-foreground'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}