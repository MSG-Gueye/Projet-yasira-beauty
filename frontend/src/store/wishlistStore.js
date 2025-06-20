import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product) => {
        const { items } = get();
        const existingItem = items.find(item => item.id === product.id);
        
        if (!existingItem) {
          set({ items: [...items, { ...product, addedAt: new Date().toISOString() }] });
          return true; // Item added
        }
        return false; // Item already exists
      },

      removeItem: (productId) => {
        const { items } = get();
        set({ items: items.filter(item => item.id !== productId) });
      },

      isInWishlist: (productId) => {
        const { items } = get();
        return items.some(item => item.id === productId);
      },

      toggleItem: (product) => {
        const { isInWishlist, addItem, removeItem } = get();
        if (isInWishlist(product.id)) {
          removeItem(product.id);
          return false; // Removed
        } else {
          addItem(product);
          return true; // Added
        }
      },

      clearWishlist: () => {
        set({ items: [] });
      },

      getItemCount: () => {
        return get().items.length;
      }
    }),
    {
      name: 'wishlist-storage',
      partialize: (state) => ({
        items: state.items
      })
    }
  )
);