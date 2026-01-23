export default function decorate(block) {
  const slides = [...block.children];
  
  if (slides.length === 0) return;
  
  // Create carousel structure
  const carouselContainer = document.createElement('div');
  carouselContainer.classList.add('carousel-container');
  
  const carouselTrack = document.createElement('div');
  carouselTrack.classList.add('carousel-track');
  
  // Process slides
  slides.forEach((slide, index) => {
    slide.classList.add('carousel-slide');
    if (index === 0) slide.classList.add('active');
    carouselTrack.appendChild(slide);
  });
  
  carouselContainer.appendChild(carouselTrack);
  
  // Add navigation if more than 1 slide
  if (slides.length > 1) {
    // Previous button
    const prevButton = document.createElement('button');
    prevButton.classList.add('carousel-nav', 'carousel-prev');
    prevButton.setAttribute('aria-label', 'Previous slide');
    prevButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    `;
    
    // Next button
    const nextButton = document.createElement('button');
    nextButton.classList.add('carousel-nav', 'carousel-next');
    nextButton.setAttribute('aria-label', 'Next slide');
    nextButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    `;
    
    // Dots navigation
    const dotsContainer = document.createElement('div');
    dotsContainer.classList.add('carousel-dots');
    
    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.classList.add('carousel-dot');
      if (index === 0) dot.classList.add('active');
      dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
      dotsContainer.appendChild(dot);
    });
    
    carouselContainer.appendChild(prevButton);
    carouselContainer.appendChild(nextButton);
    carouselContainer.appendChild(dotsContainer);
    
    // Carousel state
    let currentSlide = 0;
    let autoplayInterval;
    
    function updateCarousel() {
      slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlide);
      });
      
      const dots = dotsContainer.querySelectorAll('.carousel-dot');
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
      });
      
      // Update track position
      const offset = -currentSlide * 100;
      carouselTrack.style.transform = `translateX(${offset}%)`;
    }
    
    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      updateCarousel();
    }
    
    function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      updateCarousel();
    }
    
    function goToSlide(index) {
      currentSlide = index;
      updateCarousel();
    }
    
    function startAutoplay() {
      autoplayInterval = setInterval(nextSlide, 5000); // 5 seconds
    }
    
    function stopAutoplay() {
      clearInterval(autoplayInterval);
    }
    
    // Event listeners
    nextButton.addEventListener('click', () => {
      nextSlide();
      stopAutoplay();
      startAutoplay();
    });
    
    prevButton.addEventListener('click', () => {
      prevSlide();
      stopAutoplay();
      startAutoplay();
    });
    
    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        goToSlide(index);
        stopAutoplay();
        startAutoplay();
      });
    });
    
    // Keyboard navigation
    carouselContainer.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
        stopAutoplay();
        startAutoplay();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
        stopAutoplay();
        startAutoplay();
      }
    });
    
    // Pause on hover
    carouselContainer.addEventListener('mouseenter', stopAutoplay);
    carouselContainer.addEventListener('mouseleave', startAutoplay);
    
    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    carouselTrack.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });
    
    carouselTrack.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
    
    function handleSwipe() {
      if (touchEndX < touchStartX - 50) {
        nextSlide();
        stopAutoplay();
        startAutoplay();
      }
      if (touchEndX > touchStartX + 50) {
        prevSlide();
        stopAutoplay();
        startAutoplay();
      }
    }
    
    // Start autoplay
    startAutoplay();
  }
  
  block.textContent = '';
  block.appendChild(carouselContainer);
}
