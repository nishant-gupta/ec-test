export default function decorate(block) {
  const courses = [...block.children];
  
  if (courses.length === 0) return;
  
  // Create courses container
  const coursesContainer = document.createElement('div');
  coursesContainer.classList.add('courses-container');
  
  // Process each course
  courses.forEach((course) => {
    const courseCard = document.createElement('div');
    courseCard.classList.add('course-card');
    
    // Extract course elements
    const picture = course.querySelector('picture');
    const heading = course.querySelector('h1, h2, h3, h4, h5, h6, strong, p > strong');
    const description = course.querySelector('p:not(:has(strong))');
    const list = course.querySelector('ul, ol');
    const price = [...course.querySelectorAll('p, strong')].find(el => 
      el.textContent.includes('Rs.') || el.textContent.includes('₹')
    );
    const link = course.querySelector('a');
    
    // Add image
    if (picture) {
      const imageWrapper = document.createElement('div');
      imageWrapper.classList.add('course-image');
      imageWrapper.appendChild(picture.cloneNode(true));
      courseCard.appendChild(imageWrapper);
    }
    
    // Content wrapper
    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('course-content');
    
    // Add heading
    if (heading) {
      const title = document.createElement('h3');
      title.classList.add('course-title');
      title.textContent = heading.textContent.trim();
      contentWrapper.appendChild(title);
    }
    
    // Add description
    if (description) {
      const desc = document.createElement('p');
      desc.classList.add('course-description');
      desc.textContent = description.textContent.trim();
      contentWrapper.appendChild(desc);
    }
    
    // Add features list
    if (list) {
      const features = document.createElement('ul');
      features.classList.add('course-features');
      const items = list.querySelectorAll('li');
      items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.textContent.trim();
        features.appendChild(li);
      });
      contentWrapper.appendChild(features);
    }
    
    // Add price
    if (price) {
      const priceWrapper = document.createElement('div');
      priceWrapper.classList.add('course-price');
      priceWrapper.textContent = price.textContent.trim();
      contentWrapper.appendChild(priceWrapper);
    }
    
    // Add CTA button
    if (link) {
      const button = document.createElement('a');
      button.href = link.href;
      button.classList.add('button', 'course-cta');
      button.textContent = link.textContent.trim();
      contentWrapper.appendChild(button);
    }
    
    courseCard.appendChild(contentWrapper);
    coursesContainer.appendChild(courseCard);
  });
  
  block.textContent = '';
  block.appendChild(coursesContainer);
}
