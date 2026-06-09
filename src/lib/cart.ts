export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  priceUsd: number;
  imageCard: string;
  quantity: number;
};

const KEY = "cyou-cart";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]") as CartItem[];
  } catch {
    return [];
  }
}

function emitCartUpdated() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("cyou-cart-updated"));
  }
}

export function saveCart(items: CartItem[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
  emitCartUpdated();
}

export function addToCart(item: Omit<CartItem, "quantity">, qty = 1) {
  const cart = getCart();
  const existing = cart.find((i) => i.productId === item.productId);
  if (existing) existing.quantity += qty;
  else cart.push({ ...item, quantity: qty });
  saveCart(cart);
  return cart;
}

export function removeFromCart(productId: string) {
  const cart = getCart().filter((i) => i.productId !== productId);
  saveCart(cart);
  return cart;
}

export function clearCart() {
  saveCart([]);
}

export function updateCartQuantity(productId: string, quantity: number) {
  const cart = getCart();
  const item = cart.find((i) => i.productId === productId);
  if (!item) return cart;
  if (quantity <= 0) return removeFromCart(productId);
  item.quantity = quantity;
  saveCart(cart);
  return cart;
}

export function cartSubtotal(items: CartItem[]) {
  return items.reduce((sum, i) => sum + i.priceUsd * i.quantity, 0);
}
