export default function decorate(block) {
  const stats = [...block.children];
  
  // Create container
  const container = document.createElement('div');
  container.classList.add('stats-container');
  
  stats.forEach((stat) => {
    const statItem = document.createElement('div');
    statItem.classList.add('stat-item');
    
    // Get the icon/image
    const icon = stat.querySelector('picture, img');
    if (icon) {
      const iconWrapper = document.createElement('div');
      iconWrapper.classList.add('stat-icon');
      iconWrapper.appendChild(icon);
      statItem.appendChild(iconWrapper);
    }
    
    // Get the stat content
    const content = document.createElement('div');
    content.classList.add('stat-content');
    
    // Extract number and label from the remaining content
    const textContent = stat.textContent.trim();
    const lines = textContent.split('\n').filter(line => line.trim());
    
    lines.forEach((line, index) => {
      if (index === 0) {
        // First line is usually the number
        const number = document.createElement('div');
        number.classList.add('stat-number');
        number.textContent = line.trim();
        content.appendChild(number);
      } else if (index === 1) {
        // Second line is the label
        const label = document.createElement('div');
        label.classList.add('stat-label');
        label.textContent = line.trim();
        content.appendChild(label);
      } else {
        // Additional description
        const description = document.createElement('div');
        description.classList.add('stat-description');
        description.textContent = line.trim();
        content.appendChild(description);
      }
    });
    
    statItem.appendChild(content);
    container.appendChild(statItem);
  });
  
  block.textContent = '';
  block.appendChild(container);
}
