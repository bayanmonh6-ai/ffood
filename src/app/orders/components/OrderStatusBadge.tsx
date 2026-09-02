import React from 'react';
import type { OrderStatus } from './OrdersContent';

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

const statusConfig: Record<OrderStatus, { label: string; classes: string }> = {
  pending: { label: 'Pending', classes: 'bg-amber-100 text-amber-700' },
  'in-progress': { label: 'In Progress', classes: 'bg-blue-100 text-blue-700' },
  delivered: { label: 'Delivered', classes: 'bg-green-100 text-green-700' },
  cancelled: { label: 'Cancelled', classes: 'bg-red-100 text-red-600' },
};

export default function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span className={`status-badge ${config.classes}`}>
      {config.label}
    </span>
  );
}