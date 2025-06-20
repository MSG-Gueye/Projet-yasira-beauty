import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCompareStore = create(
  persist(
    (set, get) => ({
      items: [],
      maxItems: 4, // Maximum products to compare
      
      addItem: (product) => {
        const { items, maxItems } = get();
        const existingItem = items.find(item => item.id === product.id);
        
        if (!existingItem && items.length < maxItems) {
          set({ items: [...items, { ...product, addedAt: new Date().toISOString() }] });
          return { success: true, message: 'Produit ajouté à la comparaison' };
        } else if (existingItem) {
          return { success: false, message: 'Produit déjà en comparaison' };
        } else {
          return { success: false, message: `Maximum ${maxItems} produits pour la comparaison` };
        }
      },

      removeItem: (productId) => {
        const { items } = get();
        set({ items: items.filter(item => item.id !== productId) });
      },

      isInCompare: (productId) => {
        const { items } = get();
        return items.some(item => item.id === productId);
      },

      toggleItem: (product) => {
        const { isInCompare, addItem, removeItem } = get();
        if (isInCompare(product.id)) {
          removeItem(product.id);
          return { success: true, message: 'Produit retiré de la comparaison', action: 'removed' };
        } else {
          const result = addItem(product);
          return { ...result, action: 'added' };
        }
      },

      clearCompare: () => {
        set({ items: [] });
      },

      getItemCount: () => {
        return get().items.length;
      },

      canAddMore: () => {
        const { items, maxItems } = get();
        return items.length < maxItems;
      }
    }),
    {
      name: 'compare-storage',
      partialize: (state) => ({
        items: state.items
      })
    }
  )
);