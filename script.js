/* ================================================================
   SOCIAL CAROUSEL CONTENT
   Replace these image paths with your real carousel slides.
================================================================ */
const SOCIAL_CAROUSELS = [
  [
    "1.jpg",
    "2.jpg",
    "3.jpg",
  "4.jpg",
  ]
];


/* ================================================================
   SOCIAL CAROUSEL
================================================================ */
document.querySelectorAll("[data-carousel]").forEach((carousel, carouselIndex) => {
  const images = SOCIAL_CAROUSELS[carouselIndex] || [];
  const image = carousel.querySelector(".carousel-image");
  const current = carousel.querySelector(".carousel-current");
  const total = carousel.querySelector(".carousel-total");
  const previous = carousel.querySelector(".post-arrow-prev");
  const next = carousel.querySelector(".post-arrow-next");
  const media = carousel.querySelector(".post-media");

  let index = 0;

  if (!images.length) return;

  total.textContent = String(images.length).padStart(2, "0");

  function render() {
    image.src = images[index];
    image.alt = `Social post carousel slide ${index + 1}`;
    current.textContent = String(index + 1).padStart(2, "0");

    previous.disabled = images.length <= 1;
    next.disabled = images.length <= 1;
  }

  function changeSlide(direction) {
    index = (index + direction + images.length) % images.length;
    render();
  }

  previous.addEventListener("click", () => changeSlide(-1));
  next.addEventListener("click", () => changeSlide(1));

  let touchStartX = null;

  media.addEventListener("touchstart", (event) => {
    touchStartX = event.touches[0].clientX;
  }, { passive: true });

  media.addEventListener("touchend", (event) => {
    if (touchStartX === null) return;

    const distance = event.changedTouches[0].clientX - touchStartX;

    if (Math.abs(distance) > 45) {
      changeSlide(distance < 0 ? 1 : -1);
    }

    touchStartX = null;
  }, { passive: true });

  render();
});


/* ================================================================
   NAVIGATION / SCROLLSPY / PROGRESS
================================================================ */
(function initNavigation() {
  const sections = [
    document.getElementById("thinking"),
    document.getElementById("social"),
    document.getElementById("emails"),
    document.getElementById("closing")
  ];

  const links = Array.from(document.querySelectorAll(".nav a"));
  const current = document.getElementById("counterCurrent");
  const progress = document.getElementById("headerProgress");

  function update() {
    let activeIndex = -1;

    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();

      if (rect.top <= window.innerHeight * 0.42) {
        activeIndex = index;
      }
    });

    links.forEach((link, index) => {
      link.classList.toggle("is-active", index === activeIndex);
    });

    current.textContent = String(Math.max(0, activeIndex + 1)).padStart(2, "0");

    const scrollTop = window.scrollY;
    const documentHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const percent =
      documentHeight > 0
        ? (scrollTop / documentHeight) * 100
        : 0;

    progress.style.width = `${percent}%`;
  }

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);

  update();
})();

