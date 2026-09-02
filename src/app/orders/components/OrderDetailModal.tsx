'use client';

import React from 'react';
import { X, MapPin, Clock, CreditCard, User } from 'lucide-react';
import type { Order } from './OrdersContent';
import OrderStatusBadge from './OrderStatusBadge';

interface OrderDetailModalProps {
  order: Order;
  onClose: () => void;
}

export default function OrderDetailModal({ order, onClose }: OrderDetailModalProps) {
  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-card max-w-lg animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
          <div>
            <h2 className="text-base font-bold text-foreground">Order {order.orderNumber}</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Placed at {order.placedAt}</p>
          </div>
          <div className="flex items-center gap-2">
            <OrderStatusBadge status={order.status} />
            <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors duration-150">
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="px-6 py-5 flex flex-col gap-5">
          {/* Customer */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
              <User size={15} className="text-muted-foreground" />
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">{order.customer}</p>
              <p className="text-xs text-muted-foreground">{order.customerEmail}</p>
            </div>
          </div>

          {/* Delivery */}
          <div className="flex gap-4">
            <div className="flex items-start gap-2 flex-1">
              <MapPin size={14} className="text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">Delivery Address</p>
                <p className="text-sm text-foreground">{order.deliveryAddress}</p>
              </div>
            </div>
            <div className="flex items-start gap-2 flex-1">
              <Clock size={14} className="text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">Est. Delivery</p>
                <p className="text-sm text-foreground">{order.estimatedDelivery}</p>
              </div>
            </div>
          </div>

          {/* Items */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Order Items</p>
            <div className="flex flex-col gap-2">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-2" style={{ borderBottom: '1px solid var(--border)' }}>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">{item.qty}</span>
                    <span className="text-sm text-foreground font-medium">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-foreground font-tabular">${(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between pt-3">
              <span className="text-sm font-bold text-foreground">Total</span>
              <span className="text-base font-bold text-foreground font-tabular">${order.total.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-muted">
            <CreditCard size={14} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Payment status:</span>
            <span className={`status-badge ${
              order.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' :
              order.paymentStatus === 'pending'? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-600'
            }`}>
              {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
            </span>
          </div>

          {order.notes && (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
              <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-1">Notes</p>
              <p className="text-sm text-amber-800">{order.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}