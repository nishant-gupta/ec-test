export default function decorate(block) {
  const accordionItems = [...block.children];
  
  accordionItems.forEach((item, index) => {
    const header = item.querySelector('h1, h2, h3, h4, h5, h6, p:first-child, div:first-child > *:first-child');
    const content = item.querySelector('div:last-child');
    
    if (!header || !content) return;
    
    // Create accordion structure
    const accordionItem = document.createElement('div');
    accordionItem.classList.add('accordion-item');
    
    const accordionHeader = document.createElement('button');
    accordionHeader.classList.add('accordion-header');
    accordionHeader.setAttribute('type', 'button');
    accordionHeader.setAttribute('aria-expanded', 'false');
    accordionHeader.setAttribute('aria-controls', `accordion-content-${index}`);
    accordionHeader.innerHTML = `
      <span class="accordion-title">${header.textContent}</span>
      <span class="accordion-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </span>
    `;
    
    const accordionContent = document.createElement('div');
    accordionContent.classList.add('accordion-content');
    accordionContent.id = `accordion-content-${index}`;
    accordionContent.setAttribute('aria-hidden', 'true');
    
    const accordionBody = document.createElement('div');
    accordionBody.classList.add('accordion-body');
    
    // Move content
    while (content.firstChild) {
      accordionBody.appendChild(content.firstChild);
    }
    
    accordionContent.appendChild(accordionBody);
    
    // Add click handler
    accordionHeader.addEventListener('click', () => {
      const isExpanded = accordionHeader.getAttribute('aria-expanded') === 'true';
      
      // Close all other items (optional - comment out for multi-open)
      block.querySelectorAll('.accordion-header').forEach((btn) => {
        if (btn !== accordionHeader) {
          btn.setAttribute('aria-expanded', 'false');
          btn.classList.remove('active');
          const btnContent = btn.nextElementSibling;
          btnContent.setAttribute('aria-hidden', 'true');
          btnContent.style.maxHeight = null;
        }
      });
      
      // Toggle current item
      accordionHeader.setAttribute('aria-expanded', !isExpanded);
      accordionContent.setAttribute('aria-hidden', isExpanded);
      
      if (!isExpanded) {
        accordionHeader.classList.add('active');
        accordionContent.style.maxHeight = `${accordionContent.scrollHeight}px`;
      } else {
        accordionHeader.classList.remove('active');
        accordionContent.style.maxHeight = null;
      }
    });
    
    accordionItem.appendChild(accordionHeader);
    accordionItem.appendChild(accordionContent);
    
    item.replaceWith(accordionItem);
  });
}
