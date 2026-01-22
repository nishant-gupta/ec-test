/**
 * Cards Carousel Block
 * A carousel/slider for course cards with navigation arrows
 */

export default function decorate(block) {
  const cards = [...block.children];
  if (cards.length === 0) return;

  // Create carousel structure
  block.classList.add('cards-carousel-initialized');

  // Create track container
  const track = document.createElement('div');
  track.className = 'cards-carousel-track';

  // Process each card
  cards.forEach((card, index) => {
    const slide = document.createElement('div');
    slide.className = 'cards-carousel-slide';
    slide.dataset.index = index;

    // Get image and content
    const cols = [...card.children];
    if (cols.length >= 2) {
      const imageCol = cols[0];
      const contentCol = cols[1];

      // Create card structure
      const cardElement = document.createElement('div');
      cardElement.className = 'cards-carousel-card';

      // Image container
      const imageContainer = document.createElement('div');
      imageContainer.className = 'cards-carousel-card-image';
      const img = imageCol.querySelector('img');
      if (img) {
        imageContainer.appendChild(img.cloneNode(true));
      }
      cardElement.appendChild(imageContainer);

      // Content container
      const contentContainer = document.createElement('div');
      contentContainer.className = 'cards-carousel-card-body';
      contentContainer.innerHTML = contentCol.innerHTML;
      cardElement.appendChild(contentContainer);

      slide.appendChild(cardElement);
    }

    track.appendChild(slide);
    card.remove();
  });

  // Clear block and add new structure
  block.innerHTML = '';

  // Create navigation arrows
  const prevBtn = document.createElement('button');
  prevBtn.className = 'cards-carousel-nav cards-carousel-prev';
  prevBtn.setAttribute('aria-label', 'Previous');
  prevBtn.innerHTML = '<span>‹</span>';

  const nextBtn = document.createElement('button');
  nextBtn.className = 'cards-carousel-nav cards-carousel-next';
  nextBtn.setAttribute('aria-label', 'Next');
  nextBtn.innerHTML = '<span>›</span>';

  // Create viewport
  const viewport = document.createElement('div');
  viewport.className = 'cards-carousel-viewport';
  viewport.appendChild(track);

  // Add elements to block
  block.appendChild(prevBtn);
  block.appendChild(viewport);
  block.appendChild(nextBtn);

  // Carousel state
  let currentIndex = 0;
  const totalSlides = track.children.length;
  let slidesPerView = getSlidesPerView();

  function getSlidesPerView() {
    if (window.innerWidth >= 1200) return 4;
    if (window.innerWidth >= 900) return 3;
    if (window.innerWidth >= 600) return 2;
    return 1;
  }

  function updateCarousel() {
    const slideWidth = 100 / slidesPerView;
    const offset = -currentIndex * slideWidth;
    track.style.transform = `translateX(${offset}%)`;

    // Update button states
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= totalSlides - slidesPerView;

    // Update slides width
    [...track.children].forEach((slide) => {
      slide.style.flex = `0 0 ${slideWidth}%`;
    });
  }

  function goToSlide(index) {
    const maxIndex = Math.max(0, totalSlides - slidesPerView);
    currentIndex = Math.max(0, Math.min(index, maxIndex));
    updateCarousel();
  }

  // Event listeners
  prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
  nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

  // Handle resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      slidesPerView = getSlidesPerView();
      goToSlide(currentIndex);
    }, 100);
  });

  // Initialize
  updateCarousel();
}
