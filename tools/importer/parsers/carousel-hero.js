/**
 * Parser for carousel-hero block
 * Converts hero carousel HTML to AEM block table format
 */

export const name = 'Carousel-Hero';

export const selectors = [
  '.homBannerSection .topsliderMain',
  '.owl-carousel.topmain_slider'
];

export function parse(element, document) {
  const cells = [];

  // Add block header
  cells.push(['Carousel-Hero']);

  // Find all carousel slides (excluding cloned items)
  const slides = element.querySelectorAll('.owl-item:not(.cloned) .item');

  slides.forEach((slide) => {
    const row = [];

    // Get image
    const img = slide.querySelector('img');
    if (img) {
      const imgEl = document.createElement('img');
      imgEl.src = img.src;
      imgEl.alt = img.alt || '';
      row.push(imgEl);
    } else {
      row.push('');
    }

    // Get content (heading and text)
    const contentDiv = document.createElement('div');

    const heading = slide.querySelector('h1, h2, h3');
    if (heading) {
      const h2 = document.createElement('h2');
      h2.textContent = heading.textContent.trim();
      contentDiv.appendChild(h2);
    }

    const description = slide.querySelector('.carousel-caption p, .bannerTxt p');
    if (description) {
      const p = document.createElement('p');
      p.textContent = description.textContent.trim();
      contentDiv.appendChild(p);
    }

    // Get CTA link
    const link = slide.querySelector('a[href]:not([href="#"])');
    if (link && link.href) {
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.textContent.trim() || 'Learn More';
      contentDiv.appendChild(a);
    }

    row.push(contentDiv);
    cells.push(row);
  });

  return cells;
}
