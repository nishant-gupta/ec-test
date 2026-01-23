export default function decorate(block) {
  const cards = [...block.children];
  if (cards.length === 0) return;

  // Create carousel structure
  const carousel = document.createElement('div');
  carousel.className = 'testimonials-carousel-container';

  const viewport = document.createElement('div');
  viewport.className = 'testimonials-carousel-viewport';

  const track = document.createElement('div');
  track.className = 'testimonials-carousel-track';

  // Process each testimonial card
  cards.forEach((card) => {
    const slide = document.createElement('div');
    slide.className = 'testimonials-carousel-slide';

    const cardEl = document.createElement('div');
    cardEl.className = 'testimonials-carousel-card';

    const cols = [...card.children];
    if (cols.length >= 2) {
      // First column might have image (optional for testimonials)
      const imgCol = cols[0];
      const contentCol = cols[1];

      // Check if there's an image
      const img = imgCol.querySelector('img');
      if (img) {
        const imgWrapper = document.createElement('div');
        imgWrapper.className = 'testimonials-carousel-image';
        imgWrapper.appendChild(img.cloneNode(true));
        cardEl.appendChild(imgWrapper);
      }

      // Process content column
      const cardBody = document.createElement('div');
      cardBody.className = 'testimonials-carousel-body';

      const paragraphs = [...contentCol.querySelectorAll('p')];
      const strongs = [...contentCol.querySelectorAll('strong')];

      // First strong is usually course type
      if (strongs.length > 0) {
        const courseType = document.createElement('div');
        courseType.className = 'testimonials-course-type';
        courseType.textContent = strongs[0].textContent;
        cardBody.appendChild(courseType);
      }

      // Find the quote (text in quotes)
      paragraphs.forEach((p, index) => {
        const text = p.textContent.trim();
        if (text.startsWith('"') && text.endsWith('"') && !text.includes('-')) {
          // This is the main quote
          const quote = document.createElement('div');
          quote.className = 'testimonials-quote';
          quote.textContent = text;
          cardBody.appendChild(quote);
        } else if (text && !p.querySelector('strong') && !text.startsWith('-') && !text.startsWith('**')) {
          // This is the full testimonial text
          const testimonialText = document.createElement('p');
          testimonialText.className = 'testimonials-text';
          testimonialText.textContent = text;
          cardBody.appendChild(testimonialText);
        }
      });

      // Last strong is usually author info (name, location)
      if (strongs.length > 1) {
        const authorInfo = strongs[strongs.length - 1].textContent;
        const authorWrapper = document.createElement('div');
        authorWrapper.className = 'testimonials-author';

        // Parse "- Name, Location" format
        const cleanAuthor = authorInfo.replace(/^-\s*/, '');
        const parts = cleanAuthor.split(',').map((s) => s.trim());

        if (parts.length >= 1) {
          const name = document.createElement('div');
          name.className = 'testimonials-author-name';
          name.textContent = parts[0];
          authorWrapper.appendChild(name);
        }

        if (parts.length >= 2) {
          const location = document.createElement('div');
          location.className = 'testimonials-author-location';
          location.textContent = parts[1];
          authorWrapper.appendChild(location);
        }

        cardBody.appendChild(authorWrapper);
      }

      cardEl.appendChild(cardBody);
    }

    slide.appendChild(cardEl);
    track.appendChild(slide);
  });

  viewport.appendChild(track);

  // Create navigation
  const prevBtn = document.createElement('button');
  prevBtn.className = 'testimonials-carousel-nav testimonials-carousel-prev';
  prevBtn.innerHTML = '<span>&#8249;</span>';
  prevBtn.setAttribute('aria-label', 'Previous testimonial');

  const nextBtn = document.createElement('button');
  nextBtn.className = 'testimonials-carousel-nav testimonials-carousel-next';
  nextBtn.innerHTML = '<span>&#8250;</span>';
  nextBtn.setAttribute('aria-label', 'Next testimonial');

  carousel.appendChild(prevBtn);
  carousel.appendChild(viewport);
  carousel.appendChild(nextBtn);

  // Clear and append
  block.textContent = '';
  block.appendChild(carousel);

  // Carousel logic
  let currentIndex = 0;

  function getSlidesPerView() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  }

  function updateCarousel() {
    const slidesPerView = getSlidesPerView();
    const slides = track.querySelectorAll('.testimonials-carousel-slide');
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
    const slides = track.querySelectorAll('.testimonials-carousel-slide');
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
