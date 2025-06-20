import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      total: 0,
      itemCount: 0,

      addItem: (product, quantity = 1) => {
        const { items } = get();
        const existingItem = items.find(item => item.id === product.id);
        
        let newItems;
        if (existingItem) {
          newItems = items.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          newItems = [...items, { ...product, quantity }];
        }
        
        const newTotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const newItemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
        
        set({ 
          items: newItems, 
          total: newTotal, 
          itemCount: newItemCount 
        });
      },

      removeItem: (productId) => {
        const { items } = get();
        const newItems = items.filter(item => item.id !== productId);
        const newTotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const newItemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
        
        set({ 
          items: newItems, 
          total: newTotal, 
          itemCount: newItemCount 
        });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        
        const { items } = get();
        const newItems = items.map(item =>
          item.id === productId ? { ...item, quantity } : item
        );
        
        const newTotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const newItemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
        
        set({ 
          items: newItems, 
          total: newTotal, 
          itemCount: newItemCount 
        });
      },

      clearCart: () => {
        set({ items: [], total: 0, itemCount: 0 });
      },

      toggleCart: () => {
        set(state => ({ isOpen: !state.isOpen }));
      },

      openCart: () => {
        set({ isOpen: true });
      },

      closeCart: () => {
        set({ isOpen: false });
      }
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({
        items: state.items,
        total: state.total,
        itemCount: state.itemCount
      })
    }
  )
);