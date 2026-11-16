function stars(n) {
  return "★".repeat(n) + "☆".repeat(5 - n);
}

function renderDealsSlider() {
  const host = document.getElementById("deals-slider");
  if (!host || typeof CURRENT_DEALS === "undefined") return;

  host.innerHTML = `
    <div class="slider" data-slider data-autoplay="true">
      <div class="slider-viewport">
        <div class="slider-track" data-slider-track="">
          ${CURRENT_DEALS.map(
            (d) => `
            <article class="slider-slide deal-slide">
              <span class="deal-badge">${d.badge}</span>
              <h3>${d.title}</h3>
              <p>${d.description}</p>
              ${d.priceHint ? `<p class="deal-price">${d.priceHint}</p>` : ""}
              <div class="btn-row">
                <a class="btn btn-primary" href="${d.ctaHref}">${d.cta}</a>
                <a class="btn btn-secondary" href="${d.source}" target="_blank" rel="noopener">Instagram</a>
              </div>
              <small class="line-meta">${d.sourceLabel}</small>
            </article>`
          ).join("")}
        </div>
      </div>
      <div class="slider-controls">
        <button type="button" class="slider-btn" data-slider-prev aria-label="Previous">‹</button>
        <div class="slider-dots" data-slider-dots></div>
        <button type="button" class="slider-btn" data-slider-next aria-label="Next">›</button>
      </div>
    </div>
  `;
}

function renderBestsellersSlider() {
  const host = document.getElementById("bestsellers-slider");
  if (!host) return;
  host.innerHTML = `
    <div class="slider" data-slider data-autoplay="true">
      <div class="slider-viewport">
        <div class="slider-track" data-slider-track="">
          ${BEST_SELLERS.map(
            (b) => `
            <article class="slider-slide product-mini-card">
              <div class="product-mini-emoji" aria-hidden="true">${b.emoji}</div>
              <span class="pill">${b.category}</span>
              <h3>${b.name}</h3>
              <p>${b.blurb}</p>
              <p class="deal-price">From Rs ${b.priceFrom.toLocaleString()}</p>
              <a class="btn btn-primary" href="${b.href}">Order</a>
            </article>`
          ).join("")}
        </div>
      </div>
      <div class="slider-controls">
        <button type="button" class="slider-btn" data-slider-prev aria-label="Previous">‹</button>
        <div class="slider-dots" data-slider-dots></div>
        <button type="button" class="slider-btn" data-slider-next aria-label="Next">›</button>
      </div>
    </div>
  `;
}

function renderTeamSlider() {
  const host = document.getElementById("team-slider");
  if (!host) return;
  host.innerHTML = `
    <div class="slider" data-slider data-autoplay="true">
      <div class="slider-viewport">
        <div class="slider-track" data-slider-track="">
          ${TEAM.map(
            (m) => `
            <article class="slider-slide team-card">
              <div class="team-avatar" aria-hidden="true">${m.emoji}</div>
              <h3>${m.name}</h3>
              <p class="team-role">${m.role}</p>
              <p>${m.bio}</p>
            </article>`
          ).join("")}
        </div>
      </div>
      <div class="slider-controls">
        <button type="button" class="slider-btn" data-slider-prev aria-label="Previous">‹</button>
        <div class="slider-dots" data-slider-dots></div>
        <button type="button" class="slider-btn" data-slider-next aria-label="Next">›</button>
      </div>
    </div>
  `;
}

function renderReviewsSlider() {
  const host = document.getElementById("reviews-slider");
  if (!host) return;
  host.innerHTML = `
    <div class="slider" data-slider data-autoplay="true">
      <div class="slider-viewport">
        <div class="slider-track" data-slider-track="">
          ${CUSTOMER_REVIEWS.map(
            (r) => `
            <article class="slider-slide review-card">
              <div class="review-stars" aria-label="${r.rating} out of 5">${stars(r.rating)}</div>
              <p class="review-text">"${r.text}"</p>
              <p class="review-meta"><strong>${r.name}</strong> · ${r.date}</p>
            </article>`
          ).join("")}
        </div>
      </div>
      <div class="slider-controls">
        <button type="button" class="slider-btn" data-slider-prev aria-label="Previous">‹</button>
        <div class="slider-dots" data-slider-dots></div>
        <button type="button" class="slider-btn" data-slider-next aria-label="Next">›</button>
      </div>
    </div>
    <p class="section-foot reveal">
      More reviews &amp; menu updates on
      <a href="${STORE.instagram}" target="_blank" rel="noopener">Instagram @deepizza.official</a>.
    </p>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  renderNav("index.html");
  renderFooter();
  renderDealsSlider();
  renderBestsellersSlider();
  renderTeamSlider();
  renderReviewsSlider();
  initAllSliders();
  initScrollReveal();
});