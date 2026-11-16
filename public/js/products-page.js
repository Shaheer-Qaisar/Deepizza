const CATEGORY_FILTERS = [
  { key: "all", label: "All" },
  { key: "pizza", label: "Pizza" },
  { key: "burgers", label: "Burgers" },
  { key: "drinks", label: "Drinks" },
  { key: "sides", label: "Sides" },
];

function stars(n) {
  return "★".repeat(n) + "☆".repeat(5 - n);
}

function renderCategoryFilters(active) {
  const host = document.getElementById("category-filters");
  if (!host) return;
  host.innerHTML = CATEGORY_FILTERS.map(
    (f) =>
      `<button type="button" class="filter-pill ${
        f.key === active ? "active" : ""
      }" data-filter="${f.key}">${f.label}</button>`
  ).join("");

  host.querySelectorAll("[data-filter]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.filter;
      history.replaceState(null, "", key === "all" ? "products.html" : `products.html?cat=${key}`);
      renderProducts(key);
      renderCategoryFilters(key);
    });
  });
}

function productCard(product) {
  const badge = product.badge
    ? `<span class="product-card-badge">${product.badge}</span>`
    : "";

  if (product.type === "pizza") {
    const options = product.sizes
      .map(
        (s) =>
          `<option value="${s.key}">${s.label} — Rs ${product.prices[s.key]}</option>`
      )
      .join("");
    return `
      <article class="product-card reveal" data-product-cat="pizza">
        ${badge}
        <div class="product-card-visual">${product.emoji}</div>
        <span class="pill">${product.categoryLabel}</span>
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="menu-item-actions">
          <select data-size-select aria-label="Size for ${product.name}">${options}</select>
          <button type="button" class="btn btn-primary" data-add-pizza
            data-menu-key="${product.menuKey}"
            data-item-id="${product.id}"
            data-name="${product.name}">Add</button>
        </div>
      </article>`;
  }

  return `
    <article class="product-card reveal" data-product-cat="${product.category}">
      ${badge}
      <div class="product-card-visual">${product.emoji}</div>
      <span class="pill">${product.categoryLabel}</span>
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p class="deal-price">Rs ${product.price.toLocaleString()}</p>
      <button type="button" class="btn btn-primary btn-block" data-add-simple
        data-category="${product.category}"
        data-item-id="${product.id}"
        data-name="${product.name}"
        data-price="${product.price}">Add to cart</button>
    </article>`;
}

function renderProducts(filter) {
  const grid = document.getElementById("products-grid");
  if (!grid) return;
  const items =
    filter === "all"
      ? ALL_PRODUCTS
      : ALL_PRODUCTS.filter((p) => p.category === filter);

  grid.innerHTML = items.length
    ? items.map(productCard).join("")
    : `<p class="empty-cart">No items in this category yet.</p>`;

  grid.querySelectorAll("[data-add-pizza]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".product-card");
      const select = card.querySelector("[data-size-select]");
      const menuKey = btn.dataset.menuKey;
      const size = select.value;
      const cat = MENU[menuKey];
      const sizeMeta = cat.sizes.find((s) => s.key === size);
      addToCart({
        category: menuKey,
        itemId: btn.dataset.itemId,
        name: btn.dataset.name,
        size,
        sizeLabel: sizeMeta?.label || size,
        unitPrice: cat.prices[size],
        qty: 1,
      });
      showToast(`${btn.dataset.name} added`);
    });
  });

  grid.querySelectorAll("[data-add-simple]").forEach((btn) => {
    btn.addEventListener("click", () => {
      addToCart({
        category: btn.dataset.category,
        itemId: btn.dataset.itemId,
        name: btn.dataset.name,
        size: "std",
        sizeLabel: "Regular",
        unitPrice: Number(btn.dataset.price),
        qty: 1,
      });
      showToast(`${btn.dataset.name} added`);
    });
  });

  initScrollReveal();
}

function renderDealsStrip() {
  const host = document.getElementById("deals-strip");
  if (!host || typeof CURRENT_DEALS === "undefined") return;
  host.innerHTML = CURRENT_DEALS.map(
    (d) => `
    <article class="deal-strip-card reveal">
      <span class="deal-badge">${d.badge}</span>
      <h3>${d.title}</h3>
      <p>${d.description}</p>
      <a href="${d.source}" target="_blank" rel="noopener">${d.sourceLabel} →</a>
    </article>`
  ).join("");
}

function renderProductReviews() {
  const host = document.getElementById("product-reviews");
  if (!host) return;
  host.innerHTML = `
    <div class="reviews-grid">
      ${CUSTOMER_REVIEWS.slice(0, 6)
        .map(
          (r) => `
        <article class="review-card static reveal">
          <div class="review-stars">${stars(r.rating)}</div>
          <p class="review-text">"${r.text}"</p>
          <p class="review-meta"><strong>${r.name}</strong> · ${r.date}</p>
        </article>`
        )
        .join("")}
    </div>
    <p class="section-foot reveal">
      See more customer love on
      <a href="${STORE.instagram}" target="_blank" rel="noopener">@deepizza.official</a>
      and
      <a href="${STORE.facebook}" target="_blank" rel="noopener">Facebook</a>.
    </p>
  `;
}

function showToast(message) {
  const existing = document.querySelector(".toast");
  existing?.remove();
  const t = document.createElement("div");
  t.className = "toast";
  t.textContent = message;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2800);
}

document.addEventListener("DOMContentLoaded", () => {
  renderNav("products.html");
  renderFooter();
  const params = new URLSearchParams(location.search);
  let filter = params.get("cat") || "all";
  if (!CATEGORY_FILTERS.some((f) => f.key === filter)) filter = "all";
  renderCategoryFilters(filter);
  renderProducts(filter);
  renderDealsStrip();
  renderProductReviews();
  initScrollReveal();
});