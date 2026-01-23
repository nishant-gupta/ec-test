export default function decorate(block) {
  const cards = [...block.children];
  if (cards.length === 0) return;

  // Create carousel structure
  const carousel = document.createElement('div');
  carousel.className = 'testimonials-carousel-container';

  const track = document.createElement('div');
  track.className = 'testimonials-carousel-track';

  // Function to create a testimonial card
  function createCard(card) {
    const slide = document.createElement('div');
    slide.className = 'testimonials-carousel-slide';

    const cardEl = document.createElement('div');
    cardEl.className = 'testimonials-carousel-card';

    const cols = [...card.children];
    if (cols.length >= 2) {
      const contentCol = cols[1];

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
      paragraphs.forEach((p) => {
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
    return slide;
  }

  // Process each testimonial card
  cards.forEach((card) => {
    track.appendChild(createCard(card));
  });

  // Duplicate cards for infinite scroll effect (only for desktop auto-scroll)
  cards.forEach((card) => {
    track.appendChild(createCard(card));
  });

  carousel.appendChild(track);

  // Clear and append
  block.textContent = '';
  block.appendChild(carousel);

  // Touch/swipe handling for mobile
  let isDown = false;
  let startX;
  let scrollLeft;

  track.addEventListener('mousedown', (e) => {
    // Only enable drag on mobile or when animation is disabled
    if (window.innerWidth > 767) return;
    isDown = true;
    track.style.cursor = 'grabbing';
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });

  track.addEventListener('mouseleave', () => {
    isDown = false;
    track.style.cursor = 'grab';
  });

  track.addEventListener('mouseup', () => {
    isDown = false;
    track.style.cursor = 'grab';
  });

  track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 2;
    track.scrollLeft = scrollLeft - walk;
  });
}
