/**
 * Site-wide DOM cleanup transformer for Maruti Suzuki Driving School
 * Removes unnecessary elements and fixes common issues before parsing
 */

export function preTransform(document) {
  // Remove scripts and styles
  document.querySelectorAll('script, style, noscript').forEach((el) => el.remove());

  // Remove hidden elements
  document.querySelectorAll('[style*="display: none"], [style*="display:none"], .d-none, .hidden').forEach((el) => el.remove());

  // Remove tracking pixels and ads
  document.querySelectorAll('iframe[src*="google"], iframe[src*="facebook"], img[src*="pagead"]').forEach((el) => el.remove());

  // Remove modal popups
  document.querySelectorAll('.modal, .popup, .overlay, #CarouselPopUp').forEach((el) => el.remove());

  // Remove form inputs that are not visible
  document.querySelectorAll('input[type="hidden"]').forEach((el) => el.remove());

  // Remove owl carousel cloned items (duplicates)
  document.querySelectorAll('.owl-item.cloned').forEach((el) => el.remove());

  // Remove navigation dots and arrows (UI elements)
  document.querySelectorAll('.owl-nav, .owl-dots').forEach((el) => el.remove());

  // Remove header and footer (handled separately)
  document.querySelectorAll('header, footer, .headerRight, .footerMain').forEach((el) => el.remove());

  // Remove app download banner
  document.querySelectorAll('.getAppMain').forEach((el) => el.remove());

  // Clean up empty divs
  document.querySelectorAll('div:empty').forEach((el) => {
    if (!el.querySelector('img, picture, video')) {
      el.remove();
    }
  });

  return document;
}

export function postTransform(document) {
  // Final cleanup after parsing
  // Remove any remaining empty paragraphs
  document.querySelectorAll('p:empty').forEach((el) => el.remove());

  // Normalize whitespace in text nodes
  document.querySelectorAll('*').forEach((el) => {
    if (el.childNodes.length === 1 && el.childNodes[0].nodeType === 3) {
      el.textContent = el.textContent.trim();
    }
  });

  return document;
}
