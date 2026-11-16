const STATUS_STEPS = [
  { key: "received", label: "Order received" },
  { key: "preparing", label: "Kitchen — highly stuffing in progress" },
  { key: "out", label: "Out for delivery" },
  { key: "delivered", label: "Delivered — enjoy!" },
];

function renderTimeline(status) {
  const root = document.getElementById("status-timeline");
  if (!root) return;

  const order = ["received", "preparing", "out", "delivered"];
  const activeIndex = Math.max(0, order.indexOf(status));

  root.innerHTML = STATUS_STEPS.map((step, i) => `
    <div class="status-step reveal ${i <= activeIndex ? "active" : ""}">
      <span class="dot" aria-hidden="true"></span>
      <span>${step.label}</span>
    </div>
  `).join("");

  initScrollReveal();
}

async function lookupOrder(id) {
  const res = await fetch(`/api/orders?key=deepizza-demo`);
  if (!res.ok) throw new Error("Could not load orders");
  const orders = await res.json();
  return orders.find((o) => o.id.toLowerCase() === id.toLowerCase());
}

document.addEventListener("DOMContentLoaded", () => {
  renderNav("delivery.html");
  renderFooter();

  const last = sessionStorage.getItem("deepizza_last_order");
  const input = document.getElementById("track-id");
  if (last && input) {
    try {
      input.value = JSON.parse(last).id;
    } catch {
      /* ignore */
    }
  }

  document.getElementById("track-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = input.value.trim();
    const result = document.getElementById("track-result");
    const err = document.getElementById("track-error");
    err.hidden = true;
    result.hidden = true;

    if (!id) return;

    try {
      const order = await lookupOrder(id);
      if (!order) {
        err.hidden = false;
        err.textContent = "No order found with that ID. Check your confirmation or try again.";
        return;
      }
      document.getElementById("track-order-id").textContent = order.id;
      document.getElementById("track-customer").textContent = order.name;
      document.getElementById("track-address").textContent = order.address;
      renderTimeline(order.status);
      result.hidden = false;
    } catch {
      err.hidden = false;
      err.textContent = "Tracking unavailable — start the server with npm start.";
    }
  });
});