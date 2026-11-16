function pizzaEmoji(category) {
  if (category === "deepDish") return "🧀";
  if (category === "stuffers") return "👑";
  return "🔥";
}

function formatPrices(categoryKey) {
  const cat = MENU[categoryKey];
  return cat.sizes
    .map((s) => `${s.key} ${cat.prices[s.key]}`)
    .join("  |  ");
}

function renderMenu() {
  const root = document.getElementById("menu-root");
  if (!root || typeof MENU === "undefined") return;

  const order = ["deepDish", "stuffers", "premium"];
  const headerClass = { deepDish: "", stuffers: "stuffers", premium: "premium" };

  root.innerHTML = order
    .map((key, catIndex) => {
      const cat = MENU[key];
      const options = cat.sizes
        .map(
          (s) =>
            `<option value="${s.key}">${s.label} — Rs ${cat.prices[s.key]}</option>`
        )
        .join("");

      const items = cat.items
        .map(
          (item, i) => `
        <article class="menu-item reveal reveal-delay-${(i % 3) + 1}">
          <div class="menu-item-visual" aria-hidden="true">${pizzaEmoji(key)}</div>
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <div class="menu-item-actions">
            <select data-size-select aria-label="Size for ${item.name}">
              ${options}
            </select>
            <button type="button" class="btn btn-primary" data-add-menu
              data-category="${key}"
              data-item-id="${item.id}"
              data-name="${item.name}">
              Add
            </button>
          </div>
        </article>`
        )
        .join("");

      return `
      <section class="menu-category reveal" style="transition-delay: ${catIndex * 0.05}s">
        <div class="menu-category-header ${headerClass[key] || ""}">
          <div>
            <h2>${cat.title}</h2>
            <p class="menu-prices">${formatPrices(key)}</p>
          </div>
          <span>${cat.tagline}</span>
        </div>
        <div class="menu-items">${items}</div>
      </section>`;
    })
    .join("");

  root.querySelectorAll("[data-add-menu]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".menu-item");
      const select = card.querySelector("[data-size-select]");
      const category = btn.dataset.category;
      const size = select.value;
      const cat = MENU[category];
      const sizeMeta = cat.sizes.find((s) => s.key === size);

      addToCart({
        category,
        itemId: btn.dataset.itemId,
        name: btn.dataset.name,
        size,
        sizeLabel: sizeMeta?.label || size,
        unitPrice: cat.prices[size],
        qty: 1,
      });

      showToast(`${btn.dataset.name} added to cart`);
    });
  });

  if (typeof initScrollReveal === "function") {
    initScrollReveal();
  }
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
  renderNav("menu.html");
  renderFooter();
  renderMenu();
});