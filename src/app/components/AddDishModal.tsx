'use client';

import React, { useState, useRef } from 'react';
import { X, Upload, Trash2 } from 'lucide-react';
import AppImage from '@/components/ui/AppImage';
import type { Dish, Category } from './FoodMenuContent';

interface AddDishModalProps {
  categoryLabel: string;
  categorySlug: string;
  categories?: Category[];
  dish?: Dish;
  isEdit?: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Dish, 'id'>) => void;
  onDelete?: () => void;
}

export default function AddDishModal({
  categoryLabel,
  categorySlug,
  categories = [],
  dish,
  isEdit,
  onClose,
  onSubmit,
  onDelete,
}: AddDishModalProps) {
  const [name, setName] = useState(dish?.name ?? '');
  const [selectedCategory, setSelectedCategory] = useState(dish?.category ?? categorySlug);
  const [ingredients, setIngredients] = useState(dish?.description ?? '');
  const [price, setPrice] = useState(dish?.price ? `$${dish.price.toFixed(2)}` : '');
  const [imagePreview, setImagePreview] = useState<string>(dish?.image ?? '');
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Dish name is required';
    if (!ingredients.trim()) newErrors.ingredients = 'Ingredients are required';
    const priceNum = parseFloat(price.replace('$', ''));
    if (!price.trim() || isNaN(priceNum)) newErrors.price = 'Valid price is required';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 400));
    onSubmit({
      name: name.trim(),
      price: parseFloat(price.replace('$', '')),
      description: ingredients.trim(),
      image: imagePreview || 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
      category: selectedCategory,
    });
    setIsSubmitting(false);
  };

  const getCategoryLabel = (slug: string) => {
    const cat = categories.find((c) => c.slug === slug);
    return cat ? cat.label : categoryLabel;
  };

  // --- EDIT MODE: "Dishes info" layout ---
  if (isEdit) {
    return (
      <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
            <h2 className="text-base font-bold text-foreground">Dishes info</h2>
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
            {/* Dish name */}
            <div className="grid grid-cols-[110px_1fr] items-start gap-3">
              <label className="text-sm text-muted-foreground pt-2.5">Dish name</label>
              <div>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input"
                  placeholder="e.g. Grilled Chicken Salad"
                />
                {errors.name && <p className="form-error">{errors.name}</p>}
              </div>
            </div>

            {/* Dish category */}
            <div className="grid grid-cols-[110px_1fr] items-start gap-3">
              <label className="text-sm text-muted-foreground pt-2.5">Dish category</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setCategoryDropdownOpen((v) => !v)}
                  className="form-input flex items-center justify-between text-left"
                >
                  <span>{getCategoryLabel(selectedCategory)}</span>
                  <svg
                    className={`w-4 h-4 text-muted-foreground transition-transform duration-150 ${categoryDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {categoryDropdownOpen && (
                  <div
                    className="absolute left-0 right-0 top-full mt-1 bg-white rounded-xl shadow-lg z-10 py-1 overflow-hidden"
                    style={{ border: '1px solid var(--border)' }}
                  >
                    {categories
                      .filter((c) => c.slug !== 'all')
                      .map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => {
                            setSelectedCategory(cat.slug);
                            setCategoryDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-100 hover:bg-muted ${
                            selectedCategory === cat.slug ? 'font-semibold text-foreground' : 'text-foreground'
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                  </div>
                )}
              </div>
            </div>

            {/* Ingredients */}
            <div className="grid grid-cols-[110px_1fr] items-start gap-3">
              <label className="text-sm text-muted-foreground pt-2.5">Ingredients</label>
              <div>
                <textarea
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  className="form-input resize-none"
                  rows={3}
                  placeholder="e.g. Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar."
                />
                {errors.ingredients && <p className="form-error">{errors.ingredients}</p>}
              </div>
            </div>

            {/* Price */}
            <div className="grid grid-cols-[110px_1fr] items-start gap-3">
              <label className="text-sm text-muted-foreground pt-2.5">Price</label>
              <div>
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="form-input"
                  placeholder="$12.99"
                />
                {errors.price && <p className="form-error">{errors.price}</p>}
              </div>
            </div>

            {/* Image */}
            <div className="grid grid-cols-[110px_1fr] items-start gap-3">
              <label className="text-sm text-muted-foreground pt-2.5">Image</label>
              <div>
                {imagePreview ? (
                  <div className="relative rounded-xl overflow-hidden h-36">
                    <AppImage
                      src={imagePreview}
                      alt="Preview of uploaded dish photo"
                      fill
                      className="object-cover"
                      sizes="300px"
                    />
                    <button
                      type="button"
                      onClick={() => setImagePreview('')}
                      className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
                      aria-label="Remove image"
                    >
                      <X size={13} />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-28 rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-primary hover:bg-primary/5 transition-all duration-150"
                  >
                    <Upload size={18} />
                    <span className="text-xs font-medium">Click to upload image</span>
                  </button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
            </div>

            {/* Footer: trash + save */}
            <div
              className="flex items-center justify-between pt-2"
              style={{ borderTop: '1px solid var(--border)' }}
            >
              <button
                type="button"
                onClick={onDelete}
                className="w-10 h-10 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-red-50 hover:text-red-500 transition-colors duration-150"
                style={{ border: '1px solid var(--border)' }}
                aria-label="Delete dish"
                title="Delete this dish"
              >
                <Trash2 size={16} />
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary px-8"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    <span>Saving...</span>
                  </>
                ) : (
                  <span>Save changes</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // --- ADD MODE: original layout ---
  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-card animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
          <h2 className="text-base font-bold text-foreground">
            Add new Dish to {categoryLabel}
          </h2>
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
          {/* Row: Name + Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">Food name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
                placeholder="e.g. Grilled Chicken Salad"
              />
              {errors.name && <p className="form-error">{errors.name}</p>}
            </div>
            <div>
              <label className="form-label">Food price</label>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="form-input"
                placeholder="$12.99"
              />
              {errors.price && <p className="form-error">{errors.price}</p>}
            </div>
          </div>

          {/* Ingredients */}
          <div>
            <label className="form-label">Ingredients</label>
            <p className="text-xs text-muted-foreground mb-1.5">Describe the key ingredients and preparation style.</p>
            <textarea
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="form-input resize-none"
              rows={3}
              placeholder="e.g. Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar."
            />
            {errors.ingredients && <p className="form-error">{errors.ingredients}</p>}
          </div>

          {/* Food Image */}
          <div>
            <label className="form-label">Food image</label>
            {imagePreview ? (
              <div className="relative rounded-xl overflow-hidden h-40">
                <AppImage
                  src={imagePreview}
                  alt="Preview of uploaded dish photo"
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
                <button
                  type="button"
                  onClick={() => setImagePreview('')}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
                  aria-label="Remove image"
                >
                  <X size={13} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-32 rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-primary hover:bg-primary/5 transition-all duration-150"
              >
                <Upload size={20} />
                <span className="text-sm font-medium">Click to upload food image</span>
                <span className="text-xs">PNG, JPG up to 10MB</span>
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end pt-1">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary min-w-[120px]"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  <span>Saving...</span>
                </>
              ) : (
                <span>Add Dish</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}