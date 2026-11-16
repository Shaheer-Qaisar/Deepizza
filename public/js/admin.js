const ADMIN_KEY = "deepizza-demo";
const SESSION_KEY = "deepizza_admin_auth";

function isAuthed() {
  return sessionStorage.getItem(SESSION_KEY) === "1";
}

function setAuthed() {
  sessionStorage.setItem(SESSION_KEY, "1");
}

async function fetchOrders() {
  const res = await fetch(`/api/orders?key=${ADMIN_KEY}`);
  if (!res.ok) throw new Error("Unauthorized or server error");
  return res.json();
}

function statusBadge(status) {
  const s = status || "received";
  return `<span class="badge badge-${s}">${s}</span>`;
}

function formatItems(items) {
  return (items || [])
    .map((i) => `${i.qty}× ${i.name} (${i.size})`)
    .join("; ");
}

async function renderOrdersTable() {
  const tbody = document.getElementById("orders-body");
  const empty = document.getElementById("orders-empty");
  if (!tbody) return;

  try {
    const orders = await fetchOrders();
    if (!orders.length) {
      tbody.innerHTML = "";
      empty.hidden = false;
      return;
    }
    empty.hidden = true;
    tbody.innerHTML = orders
      .map(
        (o) => `
      <tr class="reveal">
        <td><code>${o.id}</code><br><small>${new Date(o.createdAt).toLocaleString()}</small></td>
        <td><strong>${escapeHtml(o.name)}</strong><br>${escapeHtml(o.contact)}</td>
        <td class="items-preview">${escapeHtml(formatItems(o.items))}</td>
        <td>${escapeHtml(o.paymentMethod)}</td>
        <td>Rs ${Number(o.total).toLocaleString()}</td>
        <td>${statusBadge(o.status)}</td>
        <td>
          <select data-status-order="${o.id}" aria-label="Update status">
            <option value="received" ${o.status === "received" ? "selected" : ""}>Received</option>
            <option value="preparing" ${o.status === "preparing" ? "selected" : ""}>Preparing</option>
            <option value="out" ${o.status === "out" ? "selected" : ""}>Out for delivery</option>
            <option value="delivered" ${o.status === "delivered" ? "selected" : ""}>Delivered</option>
          </select>
        </td>
      </tr>`
      )
      .join("");

    tbody.querySelectorAll("[data-status-order]").forEach((sel) => {
      sel.addEventListener("change", async () => {
        await fetch(
          `/api/orders/${sel.dataset.statusOrder}?key=${ADMIN_KEY}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: sel.value }),
          }
        );
        renderOrdersTable();
      });
    });
  } catch {
    tbody.innerHTML = `<tr><td colspan="7">Could not load orders. Run <code>npm start</code> in the project folder.</td></tr>`;
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function showDashboard() {
  document.getElementById("admin-login").hidden = true;
  document.getElementById("admin-dashboard").hidden = false;
  renderOrdersTable();
  if (!window._adminPoll) {
    window._adminPoll = setInterval(renderOrdersTable, 8000);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderNav("admin.html");
  renderFooter();

  document.getElementById("admin-login-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const pass = document.getElementById("admin-pass").value;
    if (pass === ADMIN_KEY) {
      setAuthed();
      showDashboard();
    } else {
      document.getElementById("login-error").hidden = false;
    }
  });

  if (isAuthed()) showDashboard();

  document.getElementById("refresh-orders")?.addEventListener("click", renderOrdersTable);
});