'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useOrderSelection } from '@/context/OrderSelectionContext';

type DeliveryState = 'Pending' | 'Delivered' | 'Cancelled';

interface FoodItem {
  name: string;
  image: string;
  qty: number;
}

interface Order {
  id: string;
  num: number;
  customer: string;
  foods: FoodItem[];
  date: string;
  total: string;
  deliveryAddress: string;
  deliveryState: DeliveryState;
}

const FOOD_IMAGES = [
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=48&h=48&fit=crop',
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=48&h=48&fit=crop',
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=48&h=48&fit=crop',
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=48&h=48&fit=crop',
];

function generateOrders(): Order[] {
  const customers = [
    'Amgalan', 'Test@gamil.com', 'Test@gamil.com', 'Test@gamil.com',
    'Test@gamil.com', 'Test@gamil.com', 'Test@gamil.com', 'Test@gamil.com',
    'Test@gamil.com', 'Test@gamil.com', 'Test@gamil.com', 'Test@gamil.com',
    'Test@gamil.com', 'Test@gamil.com', 'Test@gamil.com', 'Test@gamil.com',
    'Test@gamil.com', 'Test@gamil.com', 'Test@gamil.com', 'Test@gamil.com',
    'Test@gamil.com', 'Test@gamil.com', 'Test@gamil.com', 'Test@gamil.com',
    'Test@gamil.com', 'Test@gamil.com', 'Test@gamil.com', 'Test@gamil.com',
    'Test@gamil.com', 'Test@gamil.com', 'Test@gamil.com', 'Test@gamil.com',
  ];
  const states: DeliveryState[] = [
    'Pending', 'Pending', 'Pending', 'Delivered', 'Delivered', 'Delivered',
    'Delivered', 'Cancelled', 'Cancelled', 'Cancelled', 'Cancelled', 'Cancelled',
    'Pending', 'Pending', 'Delivered', 'Delivered', 'Cancelled', 'Cancelled',
    'Pending', 'Delivered', 'Cancelled', 'Pending', 'Delivered', 'Cancelled',
    'Pending', 'Delivered', 'Cancelled', 'Pending', 'Delivered', 'Cancelled',
    'Pending', 'Delivered',
  ];
  return customers.map((customer, i) => ({
    id: `order-${i + 1}`,
    num: 1,
    customer,
    foods: [
      { name: 'Sunshine Stackers', image: FOOD_IMAGES[i % FOOD_IMAGES.length], qty: 1 },
      { name: 'Sunshine Stackers', image: FOOD_IMAGES[(i + 1) % FOOD_IMAGES.length], qty: 1 },
    ],
    date: '2024/12/20',
    total: '$26.97',
    deliveryAddress: '2024/12/СБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdse...',
    deliveryState: states[i] || 'Pending',
  }));
}

const ALL_ORDERS = generateOrders();
const PAGE_SIZE = 13;
const TOTAL_PAGES = 10;

const STATE_COLORS: Record<DeliveryState, string> = {
  Pending: 'border border-red-400 text-red-500 bg-white',
  Delivered: 'border border-green-500 text-gray-700 bg-white',
  Cancelled: 'border border-gray-300 text-gray-700 bg-white',
};

function DeliveryDropdown({
  value,
  onChange,
}: {
  value: DeliveryState;
  onChange: (v: DeliveryState) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const options: DeliveryState[] = ['Delivered', 'Pending', 'Cancelled'];

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${STATE_COLORS[value]}`}
        style={{ minWidth: 90 }}
      >
        <span className="flex-1 text-left">{value}</span>
        <span className="flex flex-col" style={{ lineHeight: 0 }}>
          <ChevronUp size={10} />
          <ChevronDown size={10} />
        </span>
      </button>
      {open && (
        <div
          className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg z-50 py-1"
          style={{ minWidth: 120, border: '1px solid #e5e7eb' }}
        >
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function FoodCell({ foods }: { foods: FoodItem[] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setExpanded((e) => !e)}
        className="flex items-center gap-1 text-sm text-gray-700"
      >
        <span>{foods.length} foods</span>
        <ChevronDown size={14} className="text-gray-500" />
      </button>
      {expanded && (
        <div
          className="absolute left-0 top-full mt-1 bg-white rounded-lg shadow-lg z-40 py-2"
          style={{ minWidth: 200, border: '1px solid #e5e7eb' }}
        >
          {foods.map((food, i) => (
            <div key={i} className="flex items-center gap-2 px-3 py-1.5">
              <img
                src={food.image}
                alt={food.name}
                className="w-8 h-8 rounded object-cover flex-shrink-0"
              />
              <span className="text-xs text-gray-700 flex-1">{food.name}</span>
              <span className="text-xs text-gray-500">x {food.qty}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ChangeDeliveryModal({
  count,
  onClose,
  onSave,
}: {
  count: number;
  onClose: () => void;
  onSave: (state: DeliveryState) => void;
}) {
  const [selected, setSelected] = useState<DeliveryState>('Pending');
  const options: DeliveryState[] = ['Delivered', 'Pending', 'Cancelled'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.18)' }}>
      <div className="bg-white rounded-2xl shadow-xl p-6" style={{ minWidth: 380, maxWidth: 420 }}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-gray-900">Change delivery state</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={18} />
          </button>
        </div>
        <div className="flex items-center justify-center gap-4 mb-6">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => setSelected(opt)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                selected === opt
                  ? 'border-red-400 text-red-500 bg-white' :'border-gray-300 text-gray-500 bg-white hover:border-gray-400'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
        <button
          onClick={() => onSave(selected)}
          className="w-full py-3 rounded-xl bg-gray-900 text-white font-semibold text-sm hover:bg-gray-800 transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default function OrdersContent() {
  const [orders, setOrders] = useState<Order[]>(ALL_ORDERS);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [pendingToDeliveredCount, setPendingToDeliveredCount] = useState(0);
  const { setDeliveredCount } = useOrderSelection();

  const pageOrders = orders.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const allPageSelected = pageOrders.length > 0 && pageOrders.every((o) => selected.has(o.id));
  const someSelected = selected.size > 0;

  useEffect(() => {
    setDeliveredCount(pendingToDeliveredCount);
  }, [pendingToDeliveredCount, setDeliveredCount]);

  function toggleAll() {
    if (allPageSelected) {
      setSelected((prev) => {
        const next = new Set(prev);
        pageOrders.forEach((o) => next.delete(o.id));
        return next;
      });
    } else {
      setSelected((prev) => {
        const next = new Set(prev);
        pageOrders.forEach((o) => next.add(o.id));
        return next;
      });
    }
  }

  function toggleRow(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleStateChange(id: string, state: DeliveryState) {
    setOrders((prev) => {
      const order = prev.find((o) => o.id === id);
      if (order && order.deliveryState === 'Pending' && state === 'Delivered') {
        setPendingToDeliveredCount((c) => c + 1);
      }
      return prev.map((o) => (o.id === id ? { ...o, deliveryState: state } : o));
    });
  }

  function handleBulkSave(state: DeliveryState) {
    setOrders((prev) => {
      if (state === 'Delivered') {
        const newDelivered = prev.filter(
          (o) => selected.has(o.id) && o.deliveryState === 'Pending'
        ).length;
        if (newDelivered > 0) {
          setPendingToDeliveredCount((c) => c + newDelivered);
        }
      }
      return prev.map((o) => (selected.has(o.id) ? { ...o, deliveryState: state } : o));
    });
    setSelected(new Set());
    setShowModal(false);
  }

  const visiblePages = [1, 2, 3, 4, 5];

  return (
    <div className="p-4 md:p-6 max-w-screen-2xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Orders</h1>
          <p className="text-sm text-gray-500 mt-0.5">{orders.length} items</p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar size={15} className="text-gray-400" />
            <span>13 June 2023 - 14 July 2023</span>
          </div>
          {someSelected && (
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors bg-gray-900 text-white hover:bg-gray-800"
          >
            <span>Change delivery state</span>
            <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {selected.size}
            </span>
          </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl overflow-hidden" style={{ border: '1.5px solid #38bdf8' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <th className="px-4 py-3 w-10">
                  <input
                    type="checkbox"
                    checked={allPageSelected}
                    onChange={toggleAll}
                    className="w-4 h-4 rounded border-gray-300 cursor-pointer accent-gray-800"
                  />
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 w-10">№</th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500">Customer</th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500">Food</th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500">
                  <div className="flex items-center gap-1">
                    Date
                    <span className="flex flex-col" style={{ lineHeight: 0 }}>
                      <ChevronUp size={10} className="text-gray-400" />
                      <ChevronDown size={10} className="text-gray-400" />
                    </span>
                  </div>
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500">Total</th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500">Delivery Address</th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500">
                  <div className="flex items-center gap-1">
                    Delivery state
                    <span className="flex flex-col" style={{ lineHeight: 0 }}>
                      <ChevronUp size={10} className="text-gray-400" />
                      <ChevronDown size={10} className="text-gray-400" />
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {pageOrders.map((order) => (
                <tr
                  key={order.id}
                  style={{ borderBottom: '1px dashed #bae6fd' }}
                  className={selected.has(order.id) ? 'bg-blue-50/30' : 'hover:bg-gray-50/50'}
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selected.has(order.id)}
                      onChange={() => toggleRow(order.id)}
                      className="w-4 h-4 rounded border-gray-300 cursor-pointer accent-gray-800"
                    />
                  </td>
                  <td className="px-3 py-3 text-gray-700 text-sm">{order.num}</td>
                  <td className="px-3 py-3 text-gray-700 text-sm">{order.customer}</td>
                  <td className="px-3 py-3">
                    <FoodCell foods={order.foods} />
                  </td>
                  <td className="px-3 py-3 text-gray-700 text-sm whitespace-nowrap">{order.date}</td>
                  <td className="px-3 py-3 text-gray-700 text-sm whitespace-nowrap">{order.total}</td>
                  <td className="px-3 py-3 text-gray-500 text-xs max-w-[180px]">
                    <span className="line-clamp-2">{order.deliveryAddress}</span>
                  </td>
                  <td className="px-3 py-3">
                    <DeliveryDropdown
                      value={order.deliveryState}
                      onChange={(v) => handleStateChange(order.id, v)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-1 py-4 border-t border-gray-100">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 disabled:opacity-30 transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          {visiblePages.map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                page === p ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {p}
            </button>
          ))}
          <span className="w-8 h-8 flex items-center justify-center text-gray-400 text-sm">...</span>
          <button
            onClick={() => setPage(TOTAL_PAGES)}
            className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
              page === TOTAL_PAGES ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {TOTAL_PAGES}
          </button>
          <button
            onClick={() => setPage((p) => Math.min(TOTAL_PAGES, p + 1))}
            disabled={page === TOTAL_PAGES}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 disabled:opacity-30 transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Change Delivery State Modal */}
      {showModal && (
        <ChangeDeliveryModal
          count={selected.size}
          onClose={() => setShowModal(false)}
          onSave={handleBulkSave}
        />
      )}
    </div>
  );
}

const Order: React.FC = () => {
  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.warn('Placeholder: Order is not implemented yet.');
  }, []);
  return (
    <div>
      {/* Order placeholder */}
    </div>
  );
};

export { Order };
const OrderStatus: React.FC = () => {
  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.warn('Placeholder: OrderStatus is not implemented yet.');
  }, []);
  return (
    <div>
      {/* OrderStatus placeholder */}
    </div>
  );
};

export { OrderStatus };