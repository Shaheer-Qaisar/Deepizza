function renderNav(active) {
  const links = [
    { href: "index.html", label: "Home" },
    { href: "products.html", label: "Products" },
    { href: "menu.html", label: "Pizza menu" },
    { href: "order.html", label: "Order" },
    { href: "delivery.html", label: "Track" },
    { href: "about.html", label: "About" },
  ];

  const nav = document.querySelector("[data-site-nav]");
  if (!nav) return;

  const isActive = (href) => {
    if (active === href) return true;
    if (active === "menu.html" && href === "products.html") return false;
    return false;
  };

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
            `<li><a href="${l.href}" class="${isActive(l.href) ? "active" : ""}">${l.label}</a></li>`
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

function socialIconInstagram() {
  return `<svg class="social-svg" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4A5.8 5.8 0 0 1 16.2 22H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4H7.8M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3m5.25-6.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5z"/></svg>`;
}

function socialIconFacebook() {
  return `<svg class="social-svg" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M14 13.5h2.5l1-4H14v-2.1c0-1 .3-1.7 1.8-1.7H18V4.2C17.4 4.1 16.5 4 15.4 4 12.9 4 11.2 5.5 11.2 8v1.5H9v4h2.2V20h2.8v-6.5z"/></svg>`;
}

function renderFooter() {
  const foot = document.querySelector("[data-site-footer]");
  if (!foot || typeof STORE === "undefined") return;

  const ig = STORE.instagram;
  const fb = STORE.facebook;

  foot.innerHTML = `
    <div class="footer-pro">
      <div class="footer-brand-col">
        <a class="footer-brand" href="index.html">🍕 ${STORE.name}</a>
        <p>${STORE.tagline || "Highly stuffed fast food from Central Park."}</p>
        <div class="footer-social">
          <a href="${ig}" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="Deepizza on Instagram">
            ${socialIconInstagram()}
          </a>
          <a href="${fb}" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="Deepizza on Facebook">
            ${socialIconFacebook()}
          </a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Visit</h4>
        <p>${STORE.address}</p>
        <p>${STORE.addressFull || "Central Park Housing Scheme"}</p>
        <p><a href="tel:${STORE.phone.replace(/\D/g, "")}">Store: ${STORE.phone}</a></p>
        <p><a href="tel:${(STORE.deliveryPhone || STORE.phone).replace(/\D/g, "")}">Delivery: ${STORE.deliveryPhone || STORE.phone}</a></p>
      </div>
      <div class="footer-col">
        <h4>Menu &amp; deals</h4>
        <ul class="footer-links">
          <li><a href="products.html">All products</a></li>
          <li><a href="products.html?cat=pizza">Pizza</a></li>
          <li><a href="products.html?cat=burgers">Burgers</a></li>
          <li><a href="index.html#deals">Current deals</a></li>
          <li><a href="${ig}" target="_blank" rel="noopener">Full menu on Instagram</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Reviews</h4>
        <p>Customer favorites and new drops are posted on our social pages.</p>
        <ul class="footer-links">
          <li><a href="index.html#reviews">Website reviews</a></li>
          <li><a href="${ig}" target="_blank" rel="noopener">${STORE.handle}</a></li>
          <li><a href="about.html">About Central Park</a></li>
          <li><a href="admin.html">Admin dashboard</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© ${new Date().getFullYear()} ${STORE.name}. Demo ordering site — menu &amp; deals synced from official socials.</p>
    </div>
  `;
}