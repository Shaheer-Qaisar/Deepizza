const CART_KEY = "deepizza_cart";

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function cartLineId(category, itemId, size) {
  return `${category}:${itemId}:${size}`;
}

function addToCart(entry) {
  const cart = getCart();
  const id = cartLineId(entry.category, entry.itemId, entry.size);
  const existing = cart.find((l) => l.id === id);
  if (existing) {
    existing.qty += entry.qty || 1;
  } else {
    cart.push({
      id,
      category: entry.category,
      itemId: entry.itemId,
      name: entry.name,
      size: entry.size,
      sizeLabel: entry.sizeLabel,
      unitPrice: entry.unitPrice,
      qty: entry.qty || 1,
    });
  }
  saveCart(cart);
}

function setQty(lineId, qty) {
  let cart = getCart();
  if (qty <= 0) {
    cart = cart.filter((l) => l.id !== lineId);
  } else {
    const line = cart.find((l) => l.id === lineId);
    if (line) line.qty = qty;
  }
  saveCart(cart);
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartBadge();
}

function cartSubtotal() {
  return getCart().reduce((sum, l) => sum + l.unitPrice * l.qty, 0);
}

function updateCartBadge() {
  const el = document.querySelector("[data-cart-count]");
  if (!el) return;
  const count = getCart().reduce((n, l) => n + l.qty, 0);
  el.textContent = count;
  el.hidden = count === 0;
}

document.addEventListener("DOMContentLoaded", updateCartBadge);