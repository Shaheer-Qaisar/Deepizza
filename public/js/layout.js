function renderNav(active) {
  const links = [
    { href: "index.html", label: "Home" },
    { href: "menu.html", label: "Menu" },
    { href: "order.html", label: "Order" },
    { href: "delivery.html", label: "Track Delivery" },
    { href: "about.html", label: "About" },
  ];

  const nav = document.querySelector("[data-site-nav]");
  if (!nav) return;

  nav.innerHTML = `
    <a class="brand" href="index.html">
      <span class="brand-icon" aria-hidden="true">🍕</span>
      <span>DEEPIZZA</span>
    </a>
    <button class="nav-toggle" type="button" aria-label="Open menu" data-nav-toggle>
      <span></span><span></span><span></span>
    </button>
    <ul class="nav-links" data-nav-links>
      ${links
        .map(
          (l) =>
            `<li><a href="${l.href}" class="${active === l.href ? "active" : ""}">${l.label}</a></li>`
        )
        .join("")}
      <li>
        <a href="order.html" class="nav-cart">
          Cart <span class="cart-badge" data-cart-count hidden>0</span>
        </a>
      </li>
      <li><a href="admin.html" class="nav-admin">Admin</a></li>
    </ul>
  `;

  const toggle = nav.querySelector("[data-nav-toggle]");
  const list = nav.querySelector("[data-nav-links]");
  toggle?.addEventListener("click", () => {
    list.classList.toggle("open");
    toggle.classList.toggle("open");
  });
}

function renderFooter() {
  const foot = document.querySelector("[data-site-footer]");
  if (!foot || typeof STORE === "undefined") return;
  foot.innerHTML = `
    <div class="footer-grid reveal">
      <div>
        <strong>${STORE.name}</strong>
        <p>Highly stuffed pizzas — deep dish, stuffers & premium.</p>
      </div>
      <div>
        <strong>Visit us</strong>
        <p>${STORE.address}</p>
        <p><a href="tel:${STORE.phone.replace(/\D/g, "")}">${STORE.phone}</a></p>
      </div>
      <div>
        <strong>Follow</strong>
        <p>${STORE.handle}</p>
      </div>
    </div>
    <p class="footer-copy">© ${new Date().getFullYear()} DEEPIZZA — demo ordering site</p>
  `;
}