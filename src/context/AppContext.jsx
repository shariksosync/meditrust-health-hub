import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { articles as seedArticles, categories as seedCategories, defaultSettings, doctors as seedDoctors, faqs as seedFaqs, labTests as seedLabTests, offers as seedOffers, products as seedProducts } from "../data/demo";

const STORAGE_KEY = "meditrust-demo-v1";
const Context = createContext(null);
const initialState = () => ({
  products: seedProducts,
  categories: seedCategories,
  labTests: seedLabTests,
  doctors: seedDoctors,
  articles: seedArticles,
  offers: seedOffers,
  faqs: seedFaqs.map(([question, answer], index) => ({ id: `faq-${index}`, question, answer })),
  settings: defaultSettings,
  cart: [], wishlist: [], orders: [], bookings: [], appointments: [],
  signedIn: false, adminSignedIn: false, profile: { name: "", email: "" },
  recent: [],
});

export function AppProvider({ children }) {
  const [state, setState] = useState(initialState);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setState({ ...initialState(), ...parsed, settings: { ...defaultSettings, ...(parsed.settings || {}) } });
      }
    } catch { /* An unreadable demo cache falls back to sample data. */ }
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    const { signedIn, adminSignedIn, profile, ...demoState } = state;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...demoState, signedIn, adminSignedIn, profile }));
  }, [ready, state]);
  const update = useCallback((patch) => setState((current) => ({ ...current, ...(typeof patch === "function" ? patch(current) : patch) })), []);
  const addToCart = useCallback((product, quantity = 1) => update((current) => ({
    cart: current.cart.some((item) => item.id === product.id)
      ? current.cart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item)
      : [...current.cart, { id: product.id, quantity }],
  })), [update]);
  const changeQuantity = useCallback((id, delta) => update((current) => ({ cart: current.cart.map((item) => item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item).filter((item) => item.quantity > 0) })), [update]);
  const toggleWishlist = useCallback((id) => update((current) => ({ wishlist: current.wishlist.includes(id) ? current.wishlist.filter((item) => item !== id) : [...current.wishlist, id] })), [update]);
  const value = useMemo(() => ({ state, update, addToCart, changeQuantity, toggleWishlist, reset: () => { setState(initialState()); window.localStorage.removeItem(STORAGE_KEY); } }), [state, update, addToCart, changeQuantity, toggleWishlist]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useApp() {
  const value = useContext(Context);
  if (!value) throw new Error("useApp must be used inside AppProvider");
  return value;
}