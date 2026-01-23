export default function decorate(block) {
  const content = block.children[0];
  
  if (!content) return;
  
  // Create course card structure
  const courseCard = document.createElement('div');
  courseCard.classList.add('course-card-wrapper');
  
  // Extract elements
  const picture = content.querySelector('picture');
  const heading = content.querySelector('h1, h2, h3, h4, h5, h6, strong, p > strong');
  const paragraphs = content.querySelectorAll('p:not(:has(strong))');
  const list = content.querySelector('ul, ol');
  const price = [...content.querySelectorAll('p, strong')].find(el => 
    el.textContent.includes('Rs.') || el.textContent.includes('₹') || 
    el.textContent.toLowerCase().includes('starting') ||
    el.textContent.toLowerCase().includes('from')
  );
  const link = content.querySelector('a');
  
  // Image section
  if (picture) {
    const imageSection = document.createElement('div');
    imageSection.classList.add('course-card-image');
    imageSection.appendChild(picture.cloneNode(true));
    courseCard.appendChild(imageSection);
  }
  
  // Content section
  const contentSection = document.createElement('div');
  contentSection.classList.add('course-card-content');
  
  // Title
  if (heading) {
    const title = document.createElement('h3');
    title.classList.add('course-card-title');
    title.textContent = heading.textContent.trim();
    contentSection.appendChild(title);
  }
  
  // Description
  if (paragraphs.length > 0) {
    const description = document.createElement('p');
    description.classList.add('course-card-description');
    description.textContent = paragraphs[0].textContent.trim();
    contentSection.appendChild(description);
  }
  
  // Features/Details list
  if (list) {
    const features = document.createElement('div');
    features.classList.add('course-card-features');
    const items = list.querySelectorAll('li');
    
    items.forEach(item => {
      const feature = document.createElement('div');
      feature.classList.add('course-card-feature');
      
      const text = item.textContent.trim();
      const parts = text.split(/:\s*/);
      
      if (parts.length > 1) {
        // Has label and value
        const label = document.createElement('span');
        label.classList.add('feature-label');
        label.textContent = parts[0];
        
        const value = document.createElement('span');
        value.classList.add('feature-value');
        value.textContent = parts[1];
        
        feature.appendChild(label);
        feature.appendChild(value);
      } else {
        // Just text
        feature.textContent = text;
      }
      
      features.appendChild(feature);
    });
    
    contentSection.appendChild(features);
  }
  
  // Price section
  if (price) {
    const priceSection = document.createElement('div');
    priceSection.classList.add('course-card-price');
    priceSection.innerHTML = price.innerHTML || price.textContent;
    contentSection.appendChild(priceSection);
  }
  
  // CTA button
  if (link) {
    const button = document.createElement('a');
    button.href = link.href;
    button.classList.add('button', 'course-card-cta');
    button.textContent = link.textContent.trim();
    contentSection.appendChild(button);
  }
  
  courseCard.appendChild(contentSection);
  
  block.textContent = '';
  block.appendChild(courseCard);
}
