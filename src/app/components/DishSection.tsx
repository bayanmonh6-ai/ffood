'use client';

import React from 'react';
import AppImage from '@/components/ui/AppImage';
import type { Dish, Category } from './FoodMenuContent';

interface DishSectionProps {
  category: Category;
  dishes: Dish[];
}

export default function DishSection({ category, dishes }: DishSectionProps) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-base font-bold text-foreground">{category.label}</h2>
        <span className="text-base font-bold text-muted-foreground">({dishes.length})</span>
      </div>

      <div
        className="bg-white rounded-2xl p-3 sm:p-5"
        style={{ border: '1px solid var(--border)' }}
      >
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4">
          {dishes.map((dish) => (
            <div key={dish.id} className="dish-card">
              {/* Image */}
              <div className="relative h-[140px] overflow-hidden bg-muted">
                <AppImage
                  src={dish.image}
                  alt={`${dish.name} — ${dish.description.substring(0, 50)}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>

              {/* Info */}
              <div className="p-3">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p
                    className="text-sm font-semibold leading-tight line-clamp-1"
                    style={{ color: 'var(--primary)' }}
                  >
                    {dish.name}
                  </p>
                  <span className="text-sm font-bold text-foreground font-tabular flex-shrink-0">
                    ${dish.price.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {dish.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}