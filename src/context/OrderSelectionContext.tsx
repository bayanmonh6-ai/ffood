'use client';

import React, { createContext, useContext, useState } from 'react';

interface OrderSelectionContextType {
  deliveredCount: number;
  setDeliveredCount: (count: number) => void;
}

const OrderSelectionContext = createContext<OrderSelectionContextType>({
  deliveredCount: 0,
  setDeliveredCount: () => {},
});

export function OrderSelectionProvider({ children }: { children: React.ReactNode }) {
  const [deliveredCount, setDeliveredCount] = useState(0);

  return (
    <OrderSelectionContext.Provider value={{ deliveredCount, setDeliveredCount }}>
      {children}
    </OrderSelectionContext.Provider>
  );
}

export function useOrderSelection() {
  return useContext(OrderSelectionContext);
}
