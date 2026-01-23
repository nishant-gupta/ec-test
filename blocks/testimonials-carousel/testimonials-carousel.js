export default function decorate(block) {
  const cards = [...block.children];
  if (cards.length === 0) return;

  // Create carousel structure
  const carousel = document.createElement('div');
  carousel.className = 'testimonials-carousel-container';

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
          // This is the main quote/subtitle - blue and bold
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

  carousel.appendChild(track);

  // Clear and append
  block.textContent = '';
  block.appendChild(carousel);
}
