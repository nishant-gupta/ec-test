export default function decorate(block) {
  const testimonials = [...block.children];
  
  if (testimonials.length === 0) return;
  
  // Create testimonials grid container
  const testimonialsGrid = document.createElement('div');
  testimonialsGrid.classList.add('testimonials-grid');
  
  // Calculate center index for highlighting
  const centerIndex = Math.floor(testimonials.length / 2);
  
  // Process testimonials
  testimonials.forEach((testimonial, index) => {
    const testimonialCard = document.createElement('div');
    testimonialCard.classList.add('testimonial-card');
    
    // Highlight center card
    if (index === centerIndex) {
      testimonialCard.classList.add('center');
    }
    
    // Simply clone all content and apply appropriate classes
    const children = [...testimonial.children];
    
    children.forEach((child) => {
      const clone = child.cloneNode(true);
      const text = clone.textContent.trim();
      
      // Skip empty elements
      if (!text) return;
      
      // Apply classes based on element type and content
      if (child.tagName === 'P' && child.querySelector('strong')) {
        // Course type
        clone.className = 'testimonial-course';
      } else if (child.tagName === 'BLOCKQUOTE' || clone.tagName === 'BLOCKQUOTE') {
        // Check if it's a quote or author
        if (text.length < 50 && text.includes(',')) {
          clone.className = 'testimonial-author';
          clone.tagName = 'DIV';
        } else {
          clone.className = 'testimonial-quote';
        }
      } else if (child.tagName === 'P') {
        // Regular paragraph - could be testimonial or author
        if (text.length < 50 && (text.includes(',') || text.split(' ').length <= 4)) {
          clone.className = 'testimonial-author';
        } else {
          clone.className = 'testimonial-text';
        }
      }
      
      testimonialCard.appendChild(clone);
    });
    
    testimonialsGrid.appendChild(testimonialCard);
  });
  
  block.textContent = '';
  block.appendChild(testimonialsGrid);
}
