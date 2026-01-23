export default function decorate(block) {
  const coaches = [...block.children];
  
  if (coaches.length === 0) return;
  
  // Create container
  const container = document.createElement('div');
  container.classList.add('coach-profiles-container');
  
  const track = document.createElement('div');
  track.classList.add('coach-profiles-track');
  
  // Process each coach
  coaches.forEach((coach, index) => {
    const coachCard = document.createElement('div');
    coachCard.classList.add('coach-card');
    if (index < 4) coachCard.classList.add('visible'); // Show first 4 by default
    
    // Extract coach elements
    const picture = coach.querySelector('picture');
    const elements = coach.querySelectorAll('p, strong, h1, h2, h3, h4, h5, h6');
    
    let name = '';
    let location = '';
    let quote = '';
    let description = '';
    
    // Parse content
    elements.forEach((el) => {
      const text = el.textContent.trim();
      const isStrong = el.querySelector('strong') || el.tagName === 'STRONG';
      
      if (isStrong && !name) {
        name = text;
      } else if (text.startsWith('"') || text.includes('Encourages') || text.includes('Uses') || text.includes('Motivates') || text.includes('Helps')) {
        quote = text.replace(/^[""]|[""]$/g, '');
      } else if (!location && text.length < 30 && !text.includes('.')) {
        location = text;
      } else if (text.length > 30) {
        description = text;
      }
    });
    
    // Add profile image
    if (picture) {
      const imageWrapper = document.createElement('div');
      imageWrapper.classList.add('coach-image');
      imageWrapper.appendChild(picture.cloneNode(true));
      coachCard.appendChild(imageWrapper);
    }
    
    // Add coach info
    const infoWrapper = document.createElement('div');
    infoWrapper.classList.add('coach-info');
    
    if (name) {
      const nameEl = document.createElement('h3');
      nameEl.classList.add('coach-name');
      nameEl.textContent = name;
      infoWrapper.appendChild(nameEl);
    }
    
    if (location) {
      const locationEl = document.createElement('div');
      locationEl.classList.add('coach-location');
      locationEl.textContent = location;
      infoWrapper.appendChild(locationEl);
    }
    
    if (quote) {
      const quoteEl = document.createElement('div');
      quoteEl.classList.add('coach-quote');
      quoteEl.textContent = quote;
      infoWrapper.appendChild(quoteEl);
    }
    
    if (description) {
      const descEl = document.createElement('p');
      descEl.classList.add('coach-description');
      descEl.textContent = description;
      infoWrapper.appendChild(descEl);
    }
    
    coachCard.appendChild(infoWrapper);
    track.appendChild(coachCard);
  });
  
  container.appendChild(track);
  
  // Add navigation if more than 4 coaches
  if (coaches.length > 4) {
    // Previous button
    const prevButton = document.createElement('button');
    prevButton.classList.add('coach-nav', 'coach-prev');
    prevButton.setAttribute('aria-label', 'Previous coaches');
    prevButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    `;
    
    // Next button
    const nextButton = document.createElement('button');
    nextButton.classList.add('coach-nav', 'coach-next');
    nextButton.setAttribute('aria-label', 'Next coaches');
    nextButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    `;
    
    container.appendChild(prevButton);
    container.appendChild(nextButton);
    
    // Carousel functionality
    let currentIndex = 0;
    const coachCards = track.querySelectorAll('.coach-card');
    const itemsPerView = window.innerWidth >= 1024 ? 4 : window.innerWidth >= 768 ? 3 : 1;
    const maxIndex = Math.max(0, coachCards.length - itemsPerView);
    
    function updateCarousel() {
      const offset = -currentIndex * (100 / itemsPerView);
      track.style.transform = `translateX(${offset}%)`;
      
      // Update button states
      prevButton.disabled = currentIndex === 0;
      nextButton.disabled = currentIndex >= maxIndex;
    }
    
    prevButton.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    });
    
    nextButton.addEventListener('click', () => {
      if (currentIndex < maxIndex) {
        currentIndex++;
        updateCarousel();
      }
    });
    
    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });
    
    track.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50 && currentIndex < maxIndex) {
        currentIndex++;
        updateCarousel();
      } else if (touchEndX - touchStartX > 50 && currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    });
    
    updateCarousel();
  }
  
  block.textContent = '';
  block.appendChild(container);
}
