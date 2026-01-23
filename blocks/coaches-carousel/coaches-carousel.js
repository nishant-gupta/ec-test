export default function decorate(block) {
  const cards = [...block.children];
  if (cards.length === 0) return;

  // Create carousel structure
  const carousel = document.createElement('div');
  carousel.className = 'coaches-carousel-container';

  const viewport = document.createElement('div');
  viewport.className = 'coaches-carousel-viewport';

  const track = document.createElement('div');
  track.className = 'coaches-carousel-track';

  // Process each coach card
  cards.forEach((card) => {
    const slide = document.createElement('div');
    slide.className = 'coaches-carousel-slide';

    const cardEl = document.createElement('div');
    cardEl.className = 'coaches-carousel-card';

    const cols = [...card.children];
    if (cols.length >= 2) {
      const imgCol = cols[0];
      const contentCol = cols[1];

      // Coach image (circular)
      const img = imgCol.querySelector('img');
      if (img) {
        const imgWrapper = document.createElement('div');
        imgWrapper.className = 'coaches-carousel-image';
        imgWrapper.appendChild(img.cloneNode(true));
        cardEl.appendChild(imgWrapper);
      }

      // Process content column
      const cardBody = document.createElement('div');
      cardBody.className = 'coaches-carousel-body';

      const paragraphs = [...contentCol.querySelectorAll('p')];

      paragraphs.forEach((p, index) => {
        const strong = p.querySelector('strong');
        const text = p.textContent.trim();

        if (index === 0 && strong) {
          // First paragraph with strong is the name
          const name = document.createElement('div');
          name.className = 'coaches-name';
          name.textContent = strong.textContent;
          cardBody.appendChild(name);
        } else if (index === 1 && !strong) {
          // Second paragraph is location
          const location = document.createElement('div');
          location.className = 'coaches-location';
          location.textContent = text;
          cardBody.appendChild(location);
        } else if (text.startsWith('"') && text.endsWith('"')) {
          // Quoted text is the motto
          const motto = document.createElement('div');
          motto.className = 'coaches-motto';
          motto.textContent = text;
          cardBody.appendChild(motto);
        } else if (text && !strong) {
          // Regular text is description
          const desc = document.createElement('p');
          desc.className = 'coaches-description';
          desc.textContent = text;
          cardBody.appendChild(desc);
        }
      });

      cardEl.appendChild(cardBody);
    }

    slide.appendChild(cardEl);
    track.appendChild(slide);
  });

  viewport.appendChild(track);

  // Create navigation
  const prevBtn = document.createElement('button');
  prevBtn.className = 'coaches-carousel-nav coaches-carousel-prev';
  prevBtn.innerHTML = '<span>&#8249;</span>';
  prevBtn.setAttribute('aria-label', 'Previous coach');

  const nextBtn = document.createElement('button');
  nextBtn.className = 'coaches-carousel-nav coaches-carousel-next';
  nextBtn.innerHTML = '<span>&#8250;</span>';
  nextBtn.setAttribute('aria-label', 'Next coach');

  carousel.appendChild(prevBtn);
  carousel.appendChild(viewport);
  carousel.appendChild(nextBtn);

  // Clear and append
  block.textContent = '';
  block.appendChild(carousel);

  // Carousel logic
  let currentIndex = 0;

  function getSlidesPerView() {
    if (window.innerWidth >= 1200) return 4;
    if (window.innerWidth >= 900) return 3;
    if (window.innerWidth >= 600) return 2;
    return 1;
  }

  function updateCarousel() {
    const slidesPerView = getSlidesPerView();
    const slides = track.querySelectorAll('.coaches-carousel-slide');
    const maxIndex = Math.max(0, slides.length - slidesPerView);

    currentIndex = Math.min(currentIndex, maxIndex);

    const slideWidth = 100 / slidesPerView;
    slides.forEach((slide) => {
      slide.style.flex = `0 0 ${slideWidth}%`;
      slide.style.maxWidth = `${slideWidth}%`;
    });

    const offset = -(currentIndex * slideWidth);
    track.style.transform = `translateX(${offset}%)`;

    // Update button states
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex;
  }

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex -= 1;
      updateCarousel();
    }
  });

  nextBtn.addEventListener('click', () => {
    const slidesPerView = getSlidesPerView();
    const slides = track.querySelectorAll('.coaches-carousel-slide');
    const maxIndex = Math.max(0, slides.length - slidesPerView);

    if (currentIndex < maxIndex) {
      currentIndex += 1;
      updateCarousel();
    }
  });

  window.addEventListener('resize', () => {
    updateCarousel();
  });

  // Initial setup
  updateCarousel();
}
