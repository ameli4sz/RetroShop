import { create } from "zustand";

const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("http://localhost:3001/products");
      if (!res.ok) throw new Error("Błąd pobierania produktów");
      const data = await res.json();
      set({ products: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  deleteProduct: async (id) => {
    try {
      await fetch(`http://localhost:3001/products/${id}`, {
        method: "DELETE",
      });
      set((state) => ({
        products: state.products.filter((p) => p.id !== id),
      }));
    } catch (err) {
      console.error("Błąd usuwania produktu:", err);
    }
  },

  addProduct: (newProduct) =>
    set((state) => ({
      products: [...state.products, newProduct],
    })),
}));

export default useProductStore;
