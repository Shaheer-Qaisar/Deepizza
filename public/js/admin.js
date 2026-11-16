let activeAdminTab = "all";
let allOrdersCache = [];

const TAB_STATUS = {
  incoming: ["received", "preparing"],
  pending: ["out"],
  completed: ["delivered"],
};

async function fetchOrders() {
  const res = await fetch("/api/orders");
  if (!res.ok) throw new Error("Server error");
  return res.json();
}

function statusBadge(status) {
  const s = status || "received";
  const labels = {
    received: "Incoming",
    preparing: "Incoming",
    out: "Pending",
    delivered: "Completed",
  };
  return `<span class="badge badge-${s}">${labels[s] || s}</span>`;
}

function formatItems(items) {
  return (items || [])
    .map((i) => `${i.qty}× ${i.name} (${i.size})`)
    .join("; ");
}

function orderMatchesTab(order, tab) {
  if (tab === "all") return true;
  return (TAB_STATUS[tab] || []).includes(order.status);
}

function updateStats(orders) {
  const counts = {
    incoming: orders.filter((o) => TAB_STATUS.incoming.includes(o.status)).length,
    pending: orders.filter((o) => TAB_STATUS.pending.includes(o.status)).length,
    completed: orders.filter((o) => TAB_STATUS.completed.includes(o.status)).length,
    all: orders.length,
  };
  Object.entries(counts).forEach(([key, val]) => {
    const el = document.querySelector(`[data-stat="${key}"]`);
    if (el) el.textContent = val;
  });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function renderOrdersTable() {
  const tbody = document.getElementById("orders-body");
  const empty = document.getElementById("orders-empty");
  if (!tbody) return;

  try {
    allOrdersCache = await fetchOrders();
    updateStats(allOrdersCache);

    const filtered = allOrdersCache.filter((o) => orderMatchesTab(o, activeAdminTab));

    if (!filtered.length) {
      tbody.innerHTML = "";
      empty.hidden = false;
      empty.textContent =
        activeAdminTab === "all"
          ? "No orders yet — place one from the Order page."
          : `No ${activeAdminTab} orders right now.`;
      return;
    }
    empty.hidden = true;
    tbody.innerHTML = filtered
      .map(
        (o) => `
      <tr>
        <td><code>${o.id}</code><br><small>${new Date(o.createdAt).toLocaleString()}</small></td>
        <td><strong>${escapeHtml(o.name)}</strong><br>${escapeHtml(o.contact)}<br><small>${escapeHtml(o.address || "")}</small></td>
        <td class="items-preview">${escapeHtml(formatItems(o.items))}</td>
        <td>${escapeHtml(o.paymentMethod)}</td>
        <td>Rs ${Number(o.total).toLocaleString()}</td>
        <td>${statusBadge(o.status)}</td>
        <td>
          <select data-status-order="${o.id}" aria-label="Update status">
            <option value="received" ${o.status === "received" ? "selected" : ""}>Incoming</option>
            <option value="preparing" ${o.status === "preparing" ? "selected" : ""}>Preparing</option>
            <option value="out" ${o.status === "out" ? "selected" : ""}>Pending delivery</option>
            <option value="delivered" ${o.status === "delivered" ? "selected" : ""}>Completed</option>
          </select>
        </td>
      </tr>`
      )
      .join("");

    tbody.querySelectorAll("[data-status-order]").forEach((sel) => {
      sel.addEventListener("change", async () => {
        await fetch(`/api/orders/${sel.dataset.statusOrder}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: sel.value }),
        });
        renderOrdersTable();
      });
    });
  } catch {
    tbody.innerHTML = `<tr><td colspan="7">Could not load orders. Run <code>npm start</code> in the project folder.</td></tr>`;
  }
}

function setAdminTab(tab) {
  activeAdminTab = tab;
  document.querySelectorAll("[data-admin-tab]").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.adminTab === tab);
  });
  renderOrdersTable();
}

document.addEventListener("DOMContentLoaded", () => {
  renderNav("admin.html");
  renderFooter();

  document.querySelectorAll("[data-admin-tab]").forEach((btn) => {
    btn.addEventListener("click", () => setAdminTab(btn.dataset.adminTab));
  });

  document.getElementById("refresh-orders")?.addEventListener("click", renderOrdersTable);

  renderOrdersTable();
  if (!window._adminPoll) {
    window._adminPoll = setInterval(renderOrdersTable, 8000);
  }
});