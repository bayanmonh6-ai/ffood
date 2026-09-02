'use client';

import React, { useState } from 'react';
import CategoryFilters from './CategoryFilters';
import DishSection from './DishSection';

export interface Dish {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export interface Category {
  id: string;
  label: string;
  slug: string;
}

const categories: Category[] = [
  { id: 'cat-all', label: 'All Dishes', slug: 'all' },
  { id: 'cat-appetizers', label: 'Appetizers', slug: 'appetizers' },
  { id: 'cat-salads', label: 'Salads', slug: 'salads' },
  { id: 'cat-pizzas', label: 'Pizzas', slug: 'pizzas' },
  { id: 'cat-lunch', label: 'Lunch favorites', slug: 'lunch' },
  { id: 'cat-main', label: 'Main dishes', slug: 'main' },
  { id: 'cat-fish', label: 'Fish & Sea foods', slug: 'fish' },
  { id: 'cat-brunch', label: 'Brunch', slug: 'brunch' },
  { id: 'cat-side', label: 'Side dish', slug: 'side' },
  { id: 'cat-desserts', label: 'Desserts', slug: 'desserts' },
  { id: 'cat-beverages', label: 'Beverages', slug: 'beverages' },
];

const dishes: Dish[] = [
  // Appetizers
  { id: 'dish-001', name: 'Brie Crostini Appetizer', price: 12.99, description: 'Toasted baguette topped with creamy brie, honey drizzle, and crushed walnuts.', image: "https://images.unsplash.com/photo-1726422048913-3552d4c68d18", category: 'appetizers' },
  { id: 'dish-002', name: 'Stuffed Mushrooms', price: 9.99, description: 'Button mushrooms filled with herbed cream cheese and breadcrumbs, baked golden.', image: "https://images.unsplash.com/photo-1717946890217-f3b47e9dd864", category: 'appetizers' },
  { id: 'dish-003', name: 'Crispy Calamari', price: 11.99, description: 'Lightly breaded calamari rings fried crisp, served with marinara and lemon aioli.', image: "https://images.unsplash.com/photo-1727198826285-d4b672031afa", category: 'appetizers' },
  { id: 'dish-004', name: 'Shrimp Cocktail', price: 14.99, description: 'Chilled jumbo shrimp with zesty horseradish cocktail sauce and lemon wedges.', image: "https://images.unsplash.com/photo-1691201659377-978b28daa417", category: 'appetizers' },
  { id: 'dish-005', name: 'Bruschetta Trio', price: 10.99, description: 'Three varieties: classic tomato-basil, roasted pepper, and olive tapenade on grilled bread.', image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f", category: 'appetizers' },
  { id: 'dish-006', name: 'Spring Roll Basket', price: 8.99, description: 'Crispy vegetable spring rolls with sweet chili dipping sauce and fresh mint.', image: "https://images.unsplash.com/photo-1594020293082-20140e0af18d", category: 'appetizers' },
  // Salads
  { id: 'dish-007', name: 'Grilled Chicken Cobb Salad', price: 12.99, description: 'Romaine with grilled chicken, avocado, bacon, blue cheese, cherry tomatoes, hard-boiled egg.', image: "https://images.unsplash.com/photo-1649531794752-5833ee051fb6", category: 'salads' },
  { id: 'dish-008', name: 'Burrata Caprese', price: 12.99, description: 'Fresh burrata, heirloom tomatoes, basil oil, sea salt flakes, and aged balsamic glaze.', image: "https://img.rocket.new/generatedImages/rocket_gen_img_109e9ea2a-1772468752458.png", category: 'salads' },
  { id: 'dish-009', name: 'Beetroot and Orange Salad', price: 12.99, description: 'Roasted beets, blood orange segments, arugula, candied pecans, and goat cheese crumble.', image: "https://img.rocket.new/generatedImages/rocket_gen_img_14bcb2af6-1772057367747.png", category: 'salads' },
  // Pizzas
  { id: 'dish-010', name: 'Margherita Classica', price: 15.99, description: 'San Marzano tomatoes, fresh mozzarella di bufala, basil, extra virgin olive oil, sea salt.', image: "https://img.rocket.new/generatedImages/rocket_gen_img_109e9ea2a-1772468752458.png", category: 'pizzas' },
  { id: 'dish-011', name: 'Prosciutto e Rucola', price: 18.99, description: 'Thin-crust pizza with prosciutto di Parma, fresh arugula, shaved parmesan, lemon zest.', image: "https://images.unsplash.com/photo-1672596468166-cade977b8b3a", category: 'pizzas' },
  { id: 'dish-012', name: 'Quattro Stagioni', price: 17.99, description: 'Four seasons pizza: artichokes, ham, mushrooms, olives on a rich tomato base.', image: "https://img.rocket.new/generatedImages/rocket_gen_img_128780a70-1783716887185.png", category: 'pizzas' },
  { id: 'dish-013', name: 'Truffle Funghi', price: 21.99, description: 'Wild mushroom blend, truffle oil, taleggio cheese, rosemary, crispy shallots.', image: "https://img.rocket.new/generatedImages/rocket_gen_img_12d6d8430-1773184193073.png", category: 'pizzas' },
  { id: 'dish-014', name: 'Spicy Nduja', price: 19.99, description: 'Spreadable spicy nduja sausage, burrata, honey, fresh basil, chili flakes on sourdough base.', image: "https://img.rocket.new/generatedImages/rocket_gen_img_1578f0e96-1772215249074.png", category: 'pizzas' },
  // Lunch favorites
  { id: 'dish-015', name: 'Chicken Caesar Wrap', price: 13.99, description: 'Grilled chicken, romaine, parmesan, house Caesar dressing in a toasted spinach tortilla.', image: "https://images.unsplash.com/photo-1727198826112-64f48f49dd7f", category: 'lunch' },
  { id: 'dish-016', name: 'Avocado BLT Club', price: 14.99, description: 'Triple-decker with smoked bacon, heirloom tomato, crisp lettuce, avocado, herb aioli.', image: "https://img.rocket.new/generatedImages/rocket_gen_img_13e64e1fb-1772054033283.png", category: 'lunch' },
  { id: 'dish-017', name: 'Grain Bowl Harvest', price: 13.99, description: 'Farro, roasted sweet potato, kale, pickled red onion, tahini dressing, toasted pumpkin seeds.', image: "https://img.rocket.new/generatedImages/rocket_gen_img_19775dd1e-1772204548691.png", category: 'lunch' },
  { id: 'dish-018', name: 'Lobster Bisque Lunch', price: 16.99, description: 'Creamy lobster bisque with a brioche crouton, chive cream, and micro herbs.', image: "https://img.rocket.new/generatedImages/rocket_gen_img_10ba1c7d1-1773382873021.png", category: 'lunch' },
  { id: 'dish-019', name: 'Smoked Salmon Bagel', price: 12.99, description: 'Everything bagel, cream cheese, cold-smoked salmon, capers, red onion, dill.', image: "https://images.unsplash.com/photo-1680602573288-5a8fa0ed397d", category: 'lunch' },
  { id: 'dish-020', name: 'Mushroom Quesadilla', price: 11.99, description: 'Mixed wild mushrooms, gruyère, caramelized onions, chipotle crema, fresh cilantro.', image: "https://img.rocket.new/generatedImages/rocket_gen_img_15a2c86d9-1772055931873.png", category: 'lunch' },
  // Main dishes
  { id: 'dish-021', name: 'Grilled Ribeye Steak', price: 38.99, description: '12oz USDA prime ribeye, compound butter, roasted garlic mash, broccolini, red wine jus.', image: "https://img.rocket.new/generatedImages/rocket_gen_img_15250586b-1766267381505.png", category: 'main' },
  { id: 'dish-022', name: 'Pan-Seared Duck Breast', price: 32.99, description: 'Magret duck breast, cherry gastrique, pommes sarladaises, wilted spinach, microgreens.', image: "https://img.rocket.new/generatedImages/rocket_gen_img_18e8a1d37-1772193636028.png", category: 'main' },
  { id: 'dish-023', name: 'Lamb Shank Osso Buco', price: 34.99, description: 'Braised lamb shank, saffron risotto, gremolata, roasted cherry tomatoes.', image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b980db99-1772710002548.png", category: 'main' },
  { id: 'dish-024', name: 'Truffle Pasta Tagliatelle', price: 26.99, description: 'House-made tagliatelle, black truffle shavings, parmesan cream, crispy pancetta.', image: "https://images.unsplash.com/photo-1663721605989-3bdd2c994190", category: 'main' },
  { id: 'dish-025', name: 'Sea Bass en Papillote', price: 29.99, description: 'Chilean sea bass baked in parchment, fennel, cherry tomatoes, olives, herbed butter.', image: "https://img.rocket.new/generatedImages/rocket_gen_img_102989974-1769870119700.png", category: 'main' },
  // Fish & Sea foods
  { id: 'dish-026', name: 'Lobster Thermidor', price: 44.99, description: 'Half lobster, brandy cream sauce, gruyère gratin, tarragon, served with seasonal vegetables.', image: "https://img.rocket.new/generatedImages/rocket_gen_img_104381d14-1778187531403.png", category: 'fish' },
  { id: 'dish-027', name: 'Grilled Whole Branzino', price: 32.99, description: 'Whole Mediterranean sea bass, lemon-herb stuffing, caperberry salsa verde, roasted fingerlings.', image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c27c7506-1772072805866.png", category: 'fish' },
  { id: 'dish-028', name: 'Seared Scallops', price: 28.99, description: 'U10 scallops, sweet corn purée, crispy pancetta, pea shoots, brown butter, lemon.', image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c72edabd-1785493092191.png", category: 'fish' },
  { id: 'dish-029', name: 'King Prawn Linguine', price: 24.99, description: 'Tiger prawns, linguine, cherry tomatoes, white wine, chili, garlic, fresh parsley.', image: "https://images.unsplash.com/photo-1724207386454-acbdb49d40e0", category: 'fish' },
  { id: 'dish-030', name: 'Tuna Tataki', price: 22.99, description: 'Seared yellowfin tuna, ponzu dressing, daikon radish, sesame, micro shiso, wasabi cream.', image: "https://images.unsplash.com/photo-1683028013157-e1a5c0d561e7", category: 'fish' },
  // Brunch
  { id: 'dish-031', name: 'Eggs Benedict Royale', price: 16.99, description: 'Poached eggs, smoked salmon, hollandaise, toasted English muffin, chives, lemon zest.', image: "https://images.unsplash.com/photo-1584204581312-b34bca8822d8", category: 'brunch' },
  { id: 'dish-032', name: 'Ricotta Pancake Stack', price: 14.99, description: 'Fluffy ricotta pancakes, fresh berries, whipped cream, maple syrup, powdered sugar.', image: "https://img.rocket.new/generatedImages/rocket_gen_img_1108f145b-1772289645810.png", category: 'brunch' },
  { id: 'dish-033', name: 'Shakshuka Deluxe', price: 13.99, description: "Eggs poached in spiced tomato sauce, feta, za'atar, sourdough toast, harissa drizzle.", image: "https://images.unsplash.com/photo-1542895364-1f38d277f031", category: 'brunch' },
  { id: 'dish-034', name: 'Smashed Avo Toast', price: 12.99, description: 'Sourdough, smashed avocado, poached eggs, dukkah, chili flakes, lemon, cherry tomatoes.', image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d2693faf-1772219285086.png", category: 'brunch' },
  { id: 'dish-035', name: 'Croque Madame', price: 14.99, description: 'Ham and gruyère béchamel toastie topped with a sunny-side egg and Dijon mustard.', image: "https://img.rocket.new/generatedImages/rocket_gen_img_138b22ebc-1772726651072.png", category: 'brunch' },
  // Side dish
  { id: 'dish-036', name: 'Truffle Parmesan Fries', price: 8.99, description: 'Hand-cut fries tossed in truffle oil, parmesan, rosemary salt, and garlic aioli.', image: "https://images.unsplash.com/photo-1469168066427-7cf1d345ff1d", category: 'side' },
  { id: 'dish-037', name: 'Roasted Asparagus', price: 7.99, description: 'Oven-roasted asparagus, lemon butter, toasted almonds, shaved pecorino.', image: "https://images.unsplash.com/photo-1679155239887-a130e948aaa7", category: 'side' },
  { id: 'dish-038', name: 'Mac & Cheese Gratin', price: 9.99, description: 'Four-cheese macaroni gratin with breadcrumb crust, smoked paprika, chive garnish.', image: "https://images.unsplash.com/photo-1692276502793-f3a56eb7b0ab", category: 'side' },
  { id: 'dish-039', name: 'Garlic Confit Bread', price: 5.99, description: 'Sourdough loaf with slow-confit garlic butter, herbs de Provence, sea salt flakes.', image: "https://img.rocket.new/generatedImages/rocket_gen_img_1824dc8de-1786117801551.png", category: 'side' },
  { id: 'dish-040', name: 'Crispy Onion Rings', price: 6.99, description: 'Beer-battered sweet onion rings, chipotle ranch dipping sauce, smoked paprika.', image: "https://img.rocket.new/generatedImages/rocket_gen_img_14c82478d-1772196415210.png", category: 'side' },
  // Desserts
  { id: 'dish-041', name: 'Chocolate Fondant', price: 11.99, description: 'Warm dark chocolate fondant, salted caramel ice cream, hazelnut praline, cocoa tuile.', image: "https://img.rocket.new/generatedImages/rocket_gen_img_1aa735786-1773040826486.png", category: 'desserts' },
  { id: 'dish-042', name: 'Crème Brûlée', price: 9.99, description: 'Classic vanilla crème brûlée, caramelized sugar crust, fresh raspberries, shortbread.', image: "https://img.rocket.new/generatedImages/rocket_gen_img_16e0a25ca-1772257559700.png", category: 'desserts' },
  { id: 'dish-043', name: 'Tiramisu Classico', price: 10.99, description: 'Layers of espresso-soaked ladyfingers, mascarpone cream, dark cocoa dusting.', image: "https://img.rocket.new/generatedImages/rocket_gen_img_1389bde68-1781233938708.png", category: 'desserts' },
  { id: 'dish-044', name: 'Lemon Tart', price: 9.99, description: 'Crisp pastry shell, silky lemon curd, Italian meringue torched, candied lemon zest.', image: "https://img.rocket.new/generatedImages/rocket_gen_img_18ffe33a5-1772275243089.png", category: 'desserts' },
  { id: 'dish-045', name: 'Panna Cotta', price: 8.99, description: 'Vanilla panna cotta, strawberry coulis, fresh mint, almond biscotti on the side.', image: "https://img.rocket.new/generatedImages/rocket_gen_img_192ac1aa6-1772777488278.png", category: 'desserts' },
  // Beverages
  { id: 'dish-046', name: 'Cold Brew Coffee', price: 5.99, description: 'Slow-steeped 18-hour cold brew, served over ice with optional oat milk or cream.', image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b6ba7f2b-1775736113491.png", category: 'beverages' },
  { id: 'dish-047', name: 'Fresh Mango Lassi', price: 6.99, description: 'Alphonso mango, thick yogurt, cardamom, rose water, crushed pistachios on top.', image: "https://img.rocket.new/generatedImages/rocket_gen_img_1bfe36b80-1773120125817.png", category: 'beverages' },
  { id: 'dish-048', name: 'Watermelon Mint Cooler', price: 5.99, description: 'Fresh watermelon juice, muddled mint, lime, sparkling water, pink Himalayan salt rim.', image: "https://images.unsplash.com/photo-1625177663645-86b024af56e3", category: 'beverages' },
  { id: 'dish-049', name: 'Matcha Latte', price: 6.49, description: 'Ceremonial grade matcha, steamed oat milk, honey, served hot or iced.', image: "https://img.rocket.new/generatedImages/rocket_gen_img_13080c382-1778931082264.png", category: 'beverages' },
  { id: 'dish-050', name: 'Sparkling Elderflower', price: 4.99, description: 'St Germain elderflower liqueur, sparkling water, lemon, cucumber ribbons, ice.', image: "https://images.unsplash.com/photo-1676105797000-323c37de780c", category: 'beverages' },
];

export default function FoodMenuContent() {
  const [activeCategory, setActiveCategory] = useState('all');

  const displayCategories = categories.filter((c) => c.slug !== 'all');
  const visibleCategories =
    activeCategory === 'all'
      ? displayCategories
      : displayCategories.filter((c) => c.slug === activeCategory);

  const getDishCount = (slug: string) => {
    if (slug === 'all') return dishes.length;
    return dishes.filter((d) => d.category === slug).length;
  };

  return (
    <div className="p-3 sm:p-4 md:p-6 max-w-screen-2xl mx-auto">
      {/* Category Filters Header */}
      <div
        className="bg-white rounded-2xl p-4 sm:p-5 mb-4 sm:mb-6"
        style={{ border: '1px solid var(--border)' }}
      >
        <h1 className="text-base sm:text-lg font-bold text-foreground mb-3 sm:mb-4">Dishes category</h1>
        <CategoryFilters
          categories={categories}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
          getDishCount={getDishCount}
        />
      </div>

      {/* Dish Sections */}
      <div className="flex flex-col gap-6 sm:gap-8">
        {visibleCategories.map((cat) => {
          const catDishes = dishes.filter((d) => d.category === cat.slug);
          return (
            <DishSection
              key={cat.id}
              category={cat}
              dishes={catDishes}
            />
          );
        })}
      </div>
    </div>
  );
}
