/**
 * Parser for accordion-faq block
 * Converts FAQ accordion HTML to AEM block table format
 */

export const name = 'Accordion-Faq';

export const selectors = [
  '.accordionBlockMain',
  '#accordionFaqHome',
  '.faqAccordion'
];

export function parse(element, document) {
  const cells = [];

  // Add block header
  cells.push(['Accordion-Faq']);

  // Find all accordion items
  const items = element.querySelectorAll('.card, .accordion-item, [class*="faqItem"], .panel');

  items.forEach((item) => {
    const row = [];

    // Question (first column)
    const question = item.querySelector('.card-header, .accordion-header, [class*="faqQues"], .panel-heading, button, h4, h5');
    if (question) {
      row.push(question.textContent.trim());
    } else {
      row.push('');
    }

    // Answer (second column)
    const answer = item.querySelector('.card-body, .accordion-body, [class*="faqAns"], .panel-body, .collapse');
    if (answer) {
      const answerDiv = document.createElement('div');

      // Get all paragraphs from the answer
      const paragraphs = answer.querySelectorAll('p');
      if (paragraphs.length > 0) {
        paragraphs.forEach((p) => {
          const pEl = document.createElement('p');
          pEl.textContent = p.textContent.trim();
          answerDiv.appendChild(pEl);
        });
      } else {
        // If no paragraphs, get text content
        const p = document.createElement('p');
        p.textContent = answer.textContent.trim();
        answerDiv.appendChild(p);
      }

      // Get any lists
      const lists = answer.querySelectorAll('ul, ol');
      lists.forEach((list) => {
        const listEl = document.createElement(list.tagName.toLowerCase());
        list.querySelectorAll('li').forEach((li) => {
          const liEl = document.createElement('li');
          liEl.textContent = li.textContent.trim();
          listEl.appendChild(liEl);
        });
        answerDiv.appendChild(listEl);
      });

      row.push(answerDiv);
    } else {
      row.push('');
    }

    if (row[0] || row[1]) {
      cells.push(row);
    }
  });

  // If no items found, try alternative parsing
  if (cells.length === 1) {
    parseAlternativeFormat(element, document, cells);
  }

  return cells;
}

function parseAlternativeFormat(element, document, cells) {
  // Try parsing dt/dd format
  const dts = element.querySelectorAll('dt');
  const dds = element.querySelectorAll('dd');

  if (dts.length > 0 && dts.length === dds.length) {
    for (let i = 0; i < dts.length; i++) {
      const row = [];
      row.push(dts[i].textContent.trim());

      const answerDiv = document.createElement('div');
      const p = document.createElement('p');
      p.textContent = dds[i].textContent.trim();
      answerDiv.appendChild(p);
      row.push(answerDiv);

      cells.push(row);
    }
    return;
  }

  // Try parsing details/summary format
  const details = element.querySelectorAll('details');
  if (details.length > 0) {
    details.forEach((detail) => {
      const row = [];

      const summary = detail.querySelector('summary');
      row.push(summary ? summary.textContent.trim() : '');

      const content = detail.cloneNode(true);
      const summaryToRemove = content.querySelector('summary');
      if (summaryToRemove) summaryToRemove.remove();

      const answerDiv = document.createElement('div');
      const p = document.createElement('p');
      p.textContent = content.textContent.trim();
      answerDiv.appendChild(p);
      row.push(answerDiv);

      cells.push(row);
    });
  }
}
