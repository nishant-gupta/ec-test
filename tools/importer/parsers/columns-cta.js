/**
 * Parser for columns-cta block
 * Converts CTA banners and side-by-side layouts to AEM block table format
 */

export const name = 'Columns-Cta';

export const selectors = [
  '.quizBoxMainSec',
  '.schoolLocatorSec',
  '.corporateTraingSec'
];

export function parse(element, document) {
  const cells = [];

  // Add block header
  cells.push(['Columns-Cta']);

  const row = [];

  // Detect the type of CTA section
  if (element.classList.contains('quizBoxMainSec') || element.querySelector('.quizBox')) {
    parseQuizCta(element, document, row);
  } else if (element.classList.contains('schoolLocatorSec') || element.querySelector('.schoolLocator')) {
    parseSchoolLocator(element, document, row);
  } else if (element.classList.contains('corporateTraingSec') || element.querySelector('.corporateTraining')) {
    parseCorporateTraining(element, document, row);
  } else {
    parseGenericColumns(element, document, row);
  }

  if (row.length > 0) {
    cells.push(row);
  }

  return cells;
}

function parseQuizCta(element, document, row) {
  // Left column - text content
  const leftDiv = document.createElement('div');

  const heading = element.querySelector('h2, h3, .quizTitle');
  if (heading) {
    const h2 = document.createElement('h2');
    h2.textContent = heading.textContent.trim();
    leftDiv.appendChild(h2);
  }

  const desc = element.querySelector('p, .quizDesc');
  if (desc) {
    const p = document.createElement('p');
    p.textContent = desc.textContent.trim();
    leftDiv.appendChild(p);
  }

  row.push(leftDiv);

  // Right column - CTA button
  const rightDiv = document.createElement('div');

  const link = element.querySelector('a.ripple, a[href*="quiz"]');
  if (link) {
    const a = document.createElement('a');
    a.href = link.href;
    a.textContent = link.textContent.trim() || 'Get Started';
    rightDiv.appendChild(a);
  }

  row.push(rightDiv);
}

function parseSchoolLocator(element, document, row) {
  // Left column - text and search info
  const leftDiv = document.createElement('div');

  const heading = element.querySelector('h2, h3, .locatorTitle');
  if (heading) {
    const h3 = document.createElement('h3');
    h3.textContent = heading.textContent.trim();
    leftDiv.appendChild(h3);
  }

  const desc = element.querySelector('p, .locatorDesc');
  if (desc) {
    const p = document.createElement('p');
    p.textContent = desc.textContent.trim();
    leftDiv.appendChild(p);
  }

  const link = element.querySelector('a[href*="outlet"], a[href*="locator"]');
  if (link) {
    const a = document.createElement('a');
    a.href = link.href || '/outletlocator';
    a.textContent = 'Find School';
    leftDiv.appendChild(a);
  } else {
    const a = document.createElement('a');
    a.href = '/outletlocator';
    a.textContent = 'Find School';
    leftDiv.appendChild(a);
  }

  row.push(leftDiv);

  // Right column - image
  const img = element.querySelector('img, .locatorImg img');
  if (img) {
    const imgEl = document.createElement('img');
    imgEl.src = img.src;
    imgEl.alt = img.alt || 'School Locator';
    row.push(imgEl);
  } else {
    row.push('');
  }
}

function parseCorporateTraining(element, document, row) {
  // Left column - image
  const img = element.querySelector('img');
  if (img) {
    const imgEl = document.createElement('img');
    imgEl.src = img.src;
    imgEl.alt = img.alt || 'Corporate Training';
    row.push(imgEl);
  } else {
    row.push('');
  }

  // Right column - content
  const rightDiv = document.createElement('div');

  const heading = element.querySelector('h2, h3, .corpTitle');
  if (heading) {
    const h2 = document.createElement('h2');
    h2.textContent = heading.textContent.trim();
    rightDiv.appendChild(h2);
  }

  const desc = element.querySelector('p, .corpDesc');
  if (desc) {
    const p = document.createElement('p');
    p.textContent = desc.textContent.trim();
    rightDiv.appendChild(p);
  }

  const link = element.querySelector('a.ripple, a[href*="corporate"]');
  if (link) {
    const a = document.createElement('a');
    a.href = link.href;
    a.textContent = link.textContent.trim() || 'Know More';
    rightDiv.appendChild(a);
  }

  row.push(rightDiv);
}

function parseGenericColumns(element, document, row) {
  // Get all direct child divs as columns
  const columns = element.querySelectorAll(':scope > div');

  columns.forEach((col) => {
    const colDiv = document.createElement('div');

    // Copy all content
    const heading = col.querySelector('h1, h2, h3, h4');
    if (heading) {
      const h = document.createElement(heading.tagName.toLowerCase());
      h.textContent = heading.textContent.trim();
      colDiv.appendChild(h);
    }

    const paragraphs = col.querySelectorAll('p');
    paragraphs.forEach((p) => {
      const pEl = document.createElement('p');
      pEl.textContent = p.textContent.trim();
      colDiv.appendChild(pEl);
    });

    const img = col.querySelector('img');
    if (img) {
      const imgEl = document.createElement('img');
      imgEl.src = img.src;
      imgEl.alt = img.alt || '';
      colDiv.appendChild(imgEl);
    }

    const links = col.querySelectorAll('a[href]');
    links.forEach((link) => {
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.textContent.trim();
      colDiv.appendChild(a);
    });

    row.push(colDiv);
  });
}
