import { Product } from "../../sanity.types";
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void; // Removes ONE unit
  deleteItem: (productId: string) => void; // Removes the entire item
  clearCart: () => void;
  getTotalPrice: () => number;
  getItemCount: (productId: string) => number;
  getGroupedItems: () => CartItem[];
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product) => {
        const existingItem = get().items.find(
          (item) => item.product._id === product._id
        );

        if (existingItem) {
          set({
            items: get().items.map((item) =>
              item.product._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({
            items: [...get().items, { product, quantity: 1 }],
          });
        }
      },

      removeItem: (productId: string) => {
        const item = get().items.find((item) => item.product._id === productId);

        if (item) {
          if (item.quantity === 1) {
            set({
              items: get().items.filter(
                (item) => item.product._id !== productId
              ),
            });
          } else {
            set({
              items: get().items.map((item) =>
                item.product._id === productId
                  ? { ...item, quantity: item.quantity - 1 }
                  : item
              ),
            });
          }
        }
      },

      deleteItem: (productId: string) => {
        set({
          items: get().items.filter((item) => item.product._id !== productId),
        });
      },

      clearCart: () => set({ items: [] }),

      getTotalPrice: () =>
        get().items.reduce(
          (total, item) => total + (item.product.price ?? 0) * item.quantity,
          0
        ),

      getItemCount: (productId: string) =>
        get().items.find((item) => item.product._id === productId)?.quantity ||
        0,

      getGroupedItems: () => get().items,
    }),
    {
      name: "cart-store",
    }
  )
);
