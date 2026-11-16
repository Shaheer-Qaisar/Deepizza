function initSlider(root) {
  if (!root) return;
  const track = root.querySelector("[data-slider-track]");
  const slides = track ? [...track.children] : [];
  const prev = root.querySelector("[data-slider-prev]");
  const next = root.querySelector("[data-slider-next]");
  const dotsHost = root.querySelector("[data-slider-dots]");
  let index = 0;

  if (!slides.length) return;

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    dotsHost?.querySelectorAll("button").forEach((btn, idx) => {
      btn.classList.toggle("active", idx === index);
      btn.setAttribute("aria-selected", idx === index ? "true" : "false");
    });
  }

  if (dotsHost) {
    dotsHost.innerHTML = slides
      .map(
        (_, i) =>
          `<button type="button" role="tab" aria-label="Slide ${i + 1}" ${
            i === 0 ? 'class="active" aria-selected="true"' : ""
          } data-dot="${i}"></button>`
      )
      .join("");
    dotsHost.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => goTo(Number(btn.dataset.dot)));
    });
  }

  prev?.addEventListener("click", () => goTo(index - 1));
  next?.addEventListener("click", () => goTo(index + 1));

  const autoplay = root.dataset.autoplay === "true";
  let timer;
  if (autoplay) {
    timer = setInterval(() => goTo(index + 1), 6000);
    root.addEventListener("mouseenter", () => clearInterval(timer));
    root.addEventListener("mouseleave", () => {
      timer = setInterval(() => goTo(index + 1), 6000);
    });
  }

  goTo(0);
}

function initAllSliders() {
  document.querySelectorAll("[data-slider]").forEach(initSlider);
}