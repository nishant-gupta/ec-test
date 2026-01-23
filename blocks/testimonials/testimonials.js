export default function decorate(block) {
  const testimonials = [...block.children];
  
  if (testimonials.length === 0) return;
  
  // Create testimonials structure
  const testimonialsContainer = document.createElement('div');
  testimonialsContainer.classList.add('testimonials-container');
  
  const testimonialsTrack = document.createElement('div');
  testimonialsTrack.classList.add('testimonials-track');
  
  // Process testimonials
  testimonials.forEach((testimonial, index) => {
    const testimonialItem = document.createElement('div');
    testimonialItem.classList.add('testimonial-item');
    if (index === 0) testimonialItem.classList.add('active');
    
    // Extract testimonial parts
    const picture = testimonial.querySelector('picture');
    const content = testimonial.querySelectorAll('p, h1, h2, h3, h4, h5, h6, strong');
    
    // Add image if exists
    if (picture) {
      const imageWrapper = document.createElement('div');
      imageWrapper.classList.add('testimonial-image');
      imageWrapper.appendChild(picture.cloneNode(true));
      testimonialItem.appendChild(imageWrapper);
    }
    
    // Create content wrapper
    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('testimonial-content');
    
    // Process content elements
    let courseType = '';
    let quote = '';
    let author = '';
    
    content.forEach((element) => {
      const text = element.textContent.trim();
      
      // Detect course type (usually bold at the top)
      if (element.tagName === 'STRONG' && !courseType) {
        courseType = text;
      }
      // Detect quote (usually in quotes or longer text)
      else if (text.startsWith('"') || text.length > 20) {
        quote = text;
      }
      // Remaining text is author
      else if (text && !author) {
        author = text;
      }
    });
    
    // Add course type
    if (courseType) {
      const courseLabel = document.createElement('div');
      courseLabel.classList.add('testimonial-course');
      courseLabel.textContent = courseType;
      contentWrapper.appendChild(courseLabel);
    }
    
    // Add quote
    if (quote) {
      const quoteElement = document.createElement('blockquote');
      quoteElement.classList.add('testimonial-quote');
      quoteElement.textContent = quote.replace(/^[""]|[""]$/g, '');
      contentWrapper.appendChild(quoteElement);
    }
    
    // Add full text as fallback if no quote detected
    if (!quote && content.length > 0) {
      const textArray = Array.from(content).map(el => el.textContent.trim());
      const fullText = textArray.join(' ');
      const quoteElement = document.createElement('blockquote');
      quoteElement.classList.add('testimonial-quote');
      quoteElement.textContent = fullText;
      contentWrapper.appendChild(quoteElement);
    }
    
    // Add author
    if (author) {
      const authorElement = document.createElement('div');
      authorElement.classList.add('testimonial-author');
      authorElement.textContent = author;
      contentWrapper.appendChild(authorElement);
    }
    
    testimonialItem.appendChild(contentWrapper);
    testimonialsTrack.appendChild(testimonialItem);
  });
  
  testimonialsContainer.appendChild(testimonialsTrack);
  
  // Add navigation if more than 1 testimonial
  if (testimonials.length > 1) {
    // Previous button
    const prevButton = document.createElement('button');
    prevButton.classList.add('testimonials-nav', 'testimonials-prev');
    prevButton.setAttribute('aria-label', 'Previous testimonial');
    prevButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    `;
    
    // Next button
    const nextButton = document.createElement('button');
    nextButton.classList.add('testimonials-nav', 'testimonials-next');
    nextButton.setAttribute('aria-label', 'Next testimonial');
    nextButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    `;
    
    // Dots navigation
    const dotsContainer = document.createElement('div');
    dotsContainer.classList.add('testimonials-dots');
    
    testimonials.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.classList.add('testimonials-dot');
      if (index === 0) dot.classList.add('active');
      dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
      dotsContainer.appendChild(dot);
    });
    
    testimonialsContainer.appendChild(prevButton);
    testimonialsContainer.appendChild(nextButton);
    testimonialsContainer.appendChild(dotsContainer);
    
    // Testimonials state
    let currentIndex = 0;
    const items = testimonialsTrack.querySelectorAll('.testimonial-item');
    
    function updateTestimonials() {
      items.forEach((item, index) => {
        item.classList.toggle('active', index === currentIndex);
      });
      
      const dots = dotsContainer.querySelectorAll('.testimonials-dot');
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
      
      const offset = -currentIndex * 100;
      testimonialsTrack.style.transform = `translateX(${offset}%)`;
    }
    
    function nextTestimonial() {
      currentIndex = (currentIndex + 1) % items.length;
      updateTestimonials();
    }
    
    function prevTestimonial() {
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      updateTestimonials();
    }
    
    function goToTestimonial(index) {
      currentIndex = index;
      updateTestimonials();
    }
    
    // Event listeners
    nextButton.addEventListener('click', nextTestimonial);
    prevButton.addEventListener('click', prevTestimonial);
    
    const dots = dotsContainer.querySelectorAll('.testimonials-dot');
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => goToTestimonial(index));
    });
    
    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    testimonialsTrack.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });
    
    testimonialsTrack.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchEndX < touchStartX - 50) nextTestimonial();
      if (touchEndX > touchStartX + 50) prevTestimonial();
    });
  }
  
  block.textContent = '';
  block.appendChild(testimonialsContainer);
}
