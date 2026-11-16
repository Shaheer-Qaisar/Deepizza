function renderCart() {
  const listEl = document.getElementById("cart-lines");
  const subtotalEl = document.getElementById("cart-subtotal");
  const deliveryEl = document.getElementById("delivery-fee");
  const grandEl = document.getElementById("cart-grand");
  const submitBtn = document.getElementById("submit-order");
  const cart = getCart();

  if (!listEl) return;

  if (!cart.length) {
    listEl.innerHTML = `<p class="empty-cart">Your cart is empty. <a href="menu.html">Browse the menu</a></p>`;
    subtotalEl.textContent = "Rs 0";
    deliveryEl.textContent = "Rs 0";
    grandEl.textContent = "Rs 0";
    if (submitBtn) submitBtn.disabled = true;
    return;
  }

  if (submitBtn) submitBtn.disabled = false;

  listEl.innerHTML = cart
    .map(
      (line) => `
    <li>
      <div>
        <strong>${line.name}</strong>
        <div class="line-meta">${MENU[line.category]?.title || line.category} · ${line.sizeLabel}</div>
        <div class="line-meta">Rs ${line.unitPrice} each</div>
      </div>
      <div>
        <div class="qty-controls">
          <button type="button" data-qty-minus data-id="${line.id}" aria-label="Decrease">−</button>
          <span>${line.qty}</span>
          <button type="button" data-qty-plus data-id="${line.id}" aria-label="Increase">+</button>
        </div>
        <strong>Rs ${line.unitPrice * line.qty}</strong>
      </div>
    </li>`
    )
    .join("");

  const deliveryType = document.querySelector('input[name="fulfillment"]:checked')?.value;
  const sub = cartSubtotal();
  const fee = deliveryType === "delivery" ? DELIVERY_FEE : 0;

  subtotalEl.textContent = `Rs ${sub.toLocaleString()}`;
  deliveryEl.textContent = `Rs ${fee.toLocaleString()}`;
  grandEl.textContent = `Rs ${(sub + fee).toLocaleString()}`;

  listEl.querySelectorAll("[data-qty-minus]").forEach((b) => {
    b.addEventListener("click", () => {
      const line = cart.find((l) => l.id === b.dataset.id);
      if (line) setQty(b.dataset.id, line.qty - 1);
      renderCart();
    });
  });
  listEl.querySelectorAll("[data-qty-plus]").forEach((b) => {
    b.addEventListener("click", () => {
      const line = cart.find((l) => l.id === b.dataset.id);
      if (line) setQty(b.dataset.id, line.qty + 1);
      renderCart();
    });
  });
}

function setupOrderForm() {
  const form = document.getElementById("checkout-form");
  const addressGroup = document.getElementById("address-group");
  const fulfillmentInputs = form?.querySelectorAll('input[name="fulfillment"]');

  fulfillmentInputs?.forEach((input) => {
    input.addEventListener("change", () => {
      const isDelivery = input.value === "delivery" && input.checked;
      if (addressGroup) addressGroup.hidden = !isDelivery;
      renderCart();
    });
  });

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const cart = getCart();
    if (!cart.length) return;

    const fd = new FormData(form);
    const fulfillment = fd.get("fulfillment") || "delivery";
    const sub = cartSubtotal();
    const fee = fulfillment === "delivery" ? DELIVERY_FEE : 0;
    const total = sub + fee;

    const payload = {
      name: fd.get("name"),
      contact: fd.get("contact"),
      address:
        fulfillment === "delivery"
          ? fd.get("address") || "Address not provided"
          : `Pickup at ${STORE.address}`,
      paymentMethod: fd.get("payment"),
      deliveryNotes: fd.get("notes"),
      items: cart.map((l) => ({
        name: l.name,
        category: l.category,
        size: l.sizeLabel,
        qty: l.qty,
        price: l.unitPrice,
      })),
      total,
    };

    const submitBtn = document.getElementById("submit-order");
    submitBtn.disabled = true;
    submitBtn.textContent = "Placing order…";

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Order failed");

      sessionStorage.setItem(
        "deepizza_last_order",
        JSON.stringify({ id: data.order.id, status: data.order.status })
      );
      clearCart();
      document.getElementById("order-panel").hidden = true;
      const success = document.getElementById("order-success");
      success.hidden = false;
      document.getElementById("success-order-id").textContent = data.order.id;
    } catch (err) {
      alert(err.message || "Could not place order. Is the server running?");
      submitBtn.disabled = false;
      submitBtn.textContent = "Place order";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderNav("order.html");
  renderFooter();
  renderCart();
  setupOrderForm();
});