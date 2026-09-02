import React from 'react';
import AppLayout from '@/components/AppLayout';
import OrdersContent from './components/OrdersContent';

export default function OrdersPage() {
  return (
    <AppLayout>
      <OrdersContent />
    </AppLayout>
  );
}