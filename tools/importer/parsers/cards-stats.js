/**
 * Parser for cards-stats block
 * Converts various card layouts to AEM block table format
 */

export const name = 'Cards-Stats';

export const selectors = [
  '.whyChooseMain .studentFacultyDealer',
  '.courseBannerMain .homCoursesBannerSec',
  '.valueAddedSec',
  '.blogSec',
  '.testimonialMainSec',
  '.expertCoachesMain',
  '.mediaContainer:not(.expertCoachesMain)'
];

export function parse(element, document) {
  const cells = [];

  // Add block header
  cells.push(['Cards-Stats']);

  // Detect card type and parse accordingly
  if (element.classList.contains('studentFacultyDealer') || element.querySelector('.studentFacultyDealerRow')) {
    // Stats cards (Why Choose section)
    parseStatsCards(element, document, cells);
  } else if (element.querySelector('.coursesRptSec')) {
    // Course cards
    parseCourseCards(element, document, cells);
  } else if (element.querySelector('.valuaddedBox')) {
    // Value added service cards
    parseValueCards(element, document, cells);
  } else if (element.querySelector('.blogSecRptSec')) {
    // Blog cards
    parseBlogCards(element, document, cells);
  } else if (element.querySelector('.testimonialSliderSec')) {
    // Testimonial cards
    parseTestimonialCards(element, document, cells);
  } else if (element.querySelector('.trainerBoxRpt')) {
    // Trainer/Coach cards
    parseTrainerCards(element, document, cells);
  } else if (element.querySelector('.mediaRptSec')) {
    // Media/News cards
    parseMediaCards(element, document, cells);
  } else {
    // Generic card parsing
    parseGenericCards(element, document, cells);
  }

  return cells;
}

function parseStatsCards(element, document, cells) {
  const items = element.querySelectorAll('.studentFacultyDealerRow');
  items.forEach((item) => {
    const row = [];

    // Image
    const img = item.querySelector('img');
    if (img) {
      const imgEl = document.createElement('img');
      imgEl.src = img.src;
      imgEl.alt = img.alt || '';
      row.push(imgEl);
    } else {
      row.push('');
    }

    // Content
    const contentDiv = document.createElement('div');

    const stat = item.querySelector('h2, .count, .count2');
    if (stat) {
      const strong = document.createElement('strong');
      strong.textContent = stat.textContent.trim();
      contentDiv.appendChild(strong);
    }

    const title = item.querySelector('h3');
    if (title) {
      const p = document.createElement('p');
      p.textContent = title.textContent.trim();
      contentDiv.appendChild(p);
    }

    const desc = item.querySelector('p');
    if (desc) {
      const p = document.createElement('p');
      p.textContent = desc.textContent.trim();
      contentDiv.appendChild(p);
    }

    row.push(contentDiv);
    cells.push(row);
  });
}

function parseCourseCards(element, document, cells) {
  const items = element.querySelectorAll('.owl-item:not(.cloned) .coursesRptSec');
  items.forEach((item) => {
    const row = [];

    // Image
    const img = item.querySelector('.courseBanner img');
    if (img) {
      const imgEl = document.createElement('img');
      imgEl.src = img.src;
      imgEl.alt = img.alt || '';
      row.push(imgEl);
    } else {
      row.push('');
    }

    // Content
    const contentDiv = document.createElement('div');

    const title = item.querySelector('h3');
    if (title) {
      const strong = document.createElement('strong');
      strong.textContent = title.textContent.trim();
      contentDiv.appendChild(strong);
    }

    const desc = item.querySelector('p');
    if (desc) {
      const p = document.createElement('p');
      p.textContent = desc.textContent.trim();
      contentDiv.appendChild(p);
    }

    const price = item.querySelector('.homeCourPriceTxt');
    if (price) {
      const priceP = document.createElement('p');
      priceP.innerHTML = '<strong>' + price.textContent.trim() + '</strong>';
      contentDiv.appendChild(priceP);
    }

    const link = item.querySelector('.viewLearnerBtn a');
    if (link) {
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.textContent.trim();
      contentDiv.appendChild(a);
    }

    row.push(contentDiv);
    cells.push(row);
  });
}

function parseValueCards(element, document, cells) {
  const items = element.querySelectorAll('.valuaddedBox');
  items.forEach((item) => {
    const row = [];

    // Image/Icon
    const img = item.querySelector('img');
    if (img) {
      const imgEl = document.createElement('img');
      imgEl.src = img.src;
      imgEl.alt = img.alt || '';
      row.push(imgEl);
    } else {
      row.push('');
    }

    // Content
    const contentDiv = document.createElement('div');

    const title = item.querySelector('h3, h4');
    if (title) {
      const strong = document.createElement('strong');
      strong.textContent = title.textContent.trim();
      contentDiv.appendChild(strong);
    }

    const desc = item.querySelector('p');
    if (desc) {
      const p = document.createElement('p');
      p.textContent = desc.textContent.trim();
      contentDiv.appendChild(p);
    }

    row.push(contentDiv);
    cells.push(row);
  });
}

function parseBlogCards(element, document, cells) {
  const items = element.querySelectorAll('.owl-item:not(.cloned) .blogSecRptSec');
  items.forEach((item) => {
    const row = [];

    // Image
    const img = item.querySelector('img');
    if (img) {
      const imgEl = document.createElement('img');
      imgEl.src = img.src;
      imgEl.alt = img.alt || '';
      row.push(imgEl);
    } else {
      row.push('');
    }

    // Content
    const contentDiv = document.createElement('div');

    const title = item.querySelector('h3, h4');
    if (title) {
      const strong = document.createElement('strong');
      strong.textContent = title.textContent.trim();
      contentDiv.appendChild(strong);
    }

    const link = item.querySelector('a.ripple, a[href*="blog"]');
    if (link) {
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = 'Read More';
      contentDiv.appendChild(a);
    }

    row.push(contentDiv);
    cells.push(row);
  });
}

function parseTestimonialCards(element, document, cells) {
  const items = element.querySelectorAll('.owl-item:not(.cloned) .testimonialSliderSec');
  items.forEach((item) => {
    const row = [];

    // Icon/Image
    const img = item.querySelector('img');
    if (img) {
      const imgEl = document.createElement('img');
      imgEl.src = img.src;
      imgEl.alt = img.alt || '';
      row.push(imgEl);
    } else {
      row.push('');
    }

    // Content
    const contentDiv = document.createElement('div');

    const courseType = item.querySelector('.courseName, .courseType');
    if (courseType) {
      const strong = document.createElement('strong');
      strong.textContent = courseType.textContent.trim();
      contentDiv.appendChild(strong);
    }

    const quote = item.querySelector('.testimonialTxt, p');
    if (quote) {
      const p = document.createElement('p');
      p.textContent = quote.textContent.trim();
      contentDiv.appendChild(p);
    }

    const name = item.querySelector('.studentName, .name');
    if (name) {
      const nameP = document.createElement('p');
      nameP.innerHTML = '<strong>' + name.textContent.trim() + '</strong>';
      contentDiv.appendChild(nameP);
    }

    row.push(contentDiv);
    cells.push(row);
  });
}

function parseTrainerCards(element, document, cells) {
  const items = element.querySelectorAll('.owl-item:not(.cloned) .trainerBoxRpt');
  items.forEach((item) => {
    const row = [];

    // Photo
    const img = item.querySelector('img');
    if (img) {
      const imgEl = document.createElement('img');
      imgEl.src = img.src;
      imgEl.alt = img.alt || '';
      row.push(imgEl);
    } else {
      row.push('');
    }

    // Content
    const contentDiv = document.createElement('div');

    const name = item.querySelector('.trainerName, h3, h4');
    if (name) {
      const strong = document.createElement('strong');
      strong.textContent = name.textContent.trim();
      contentDiv.appendChild(strong);
    }

    const location = item.querySelector('.trainerLocation, .location');
    if (location) {
      const p = document.createElement('p');
      p.textContent = location.textContent.trim();
      contentDiv.appendChild(p);
    }

    const motto = item.querySelector('.trainerMotto, .motto');
    if (motto) {
      const p = document.createElement('p');
      p.innerHTML = '<em>' + motto.textContent.trim() + '</em>';
      contentDiv.appendChild(p);
    }

    const bio = item.querySelector('.trainerBio, .bio, p');
    if (bio) {
      const p = document.createElement('p');
      p.textContent = bio.textContent.trim();
      contentDiv.appendChild(p);
    }

    row.push(contentDiv);
    cells.push(row);
  });
}

function parseMediaCards(element, document, cells) {
  const items = element.querySelectorAll('.owl-item:not(.cloned) .mediaRptSec');
  items.forEach((item) => {
    const row = [];

    // Image
    const img = item.querySelector('img');
    if (img) {
      const imgEl = document.createElement('img');
      imgEl.src = img.src;
      imgEl.alt = img.alt || '';
      row.push(imgEl);
    } else {
      row.push('');
    }

    // Content
    const contentDiv = document.createElement('div');

    const title = item.querySelector('h3, h4, .mediaTitle');
    if (title) {
      const strong = document.createElement('strong');
      strong.textContent = title.textContent.trim();
      contentDiv.appendChild(strong);
    }

    const desc = item.querySelector('p, .mediaDesc');
    if (desc) {
      const p = document.createElement('p');
      p.textContent = desc.textContent.trim();
      contentDiv.appendChild(p);
    }

    const link = item.querySelector('a.ripple, a[href*="media"]');
    if (link) {
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = 'Read More';
      contentDiv.appendChild(a);
    }

    row.push(contentDiv);
    cells.push(row);
  });
}

function parseGenericCards(element, document, cells) {
  const items = element.querySelectorAll('.card, .item, [class*="card"], [class*="box"]');
  items.forEach((item) => {
    const row = [];

    // Image
    const img = item.querySelector('img');
    if (img) {
      const imgEl = document.createElement('img');
      imgEl.src = img.src;
      imgEl.alt = img.alt || '';
      row.push(imgEl);
    } else {
      row.push('');
    }

    // Content
    const contentDiv = document.createElement('div');

    const title = item.querySelector('h1, h2, h3, h4, h5, strong');
    if (title) {
      const strong = document.createElement('strong');
      strong.textContent = title.textContent.trim();
      contentDiv.appendChild(strong);
    }

    const desc = item.querySelector('p');
    if (desc) {
      const p = document.createElement('p');
      p.textContent = desc.textContent.trim();
      contentDiv.appendChild(p);
    }

    const link = item.querySelector('a[href]');
    if (link) {
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.textContent.trim() || 'Learn More';
      contentDiv.appendChild(a);
    }

    row.push(contentDiv);
    cells.push(row);
  });
}
