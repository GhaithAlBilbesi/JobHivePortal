/**
 * Animation Utilities
 * 
 * Helper functions for working with animations
 * Provides consistent animation settings across components
 */

/**
 * Creates a staggered animation sequence for multiple elements
 * 
 * @param elements - Array of HTML elements to animate
 * @param baseDelay - Base delay in ms before starting animations
 * @param staggerDelay - Delay between each element's animation
 * @param animationClass - CSS class containing the animation
 */
export const staggerAnimation = (
  elements: HTMLElement[],
  baseDelay: number = 0,
  staggerDelay: number = 100,
  animationClass: string = 'fade-in-up'
): void => {
  elements.forEach((element, index) => {
    if (!element) return;
    
    // Add animation class
    setTimeout(() => {
      element.classList.add(animationClass);
      element.style.opacity = '1';
    }, baseDelay + (index * staggerDelay));
  });
};

/**
 * Checks if an element is in the viewport
 * 
 * @param element - HTML element to check
 * @param offset - Offset in pixels before element is considered in view
 * @returns Boolean indicating if element is in viewport
 */
export const isInViewport = (element: HTMLElement, offset: number = 100): boolean => {
  if (!element) return false;
  
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight - offset) &&
    rect.bottom >= offset &&
    rect.left <= window.innerWidth &&
    rect.right >= 0
  );
};

/**
 * Adds an animation class when an element scrolls into view
 * 
 * @param element - HTML element to animate
 * @param animationClass - CSS class containing the animation
 * @param offset - Offset in pixels before triggering animation
 */
export const animateOnScroll = (
  element: HTMLElement | null,
  animationClass: string = 'fade-in-up',
  offset: number = 100
): void => {
  if (!element) return;
  
  const handleScroll = () => {
    if (isInViewport(element, offset)) {
      element.classList.add(animationClass);
      element.style.opacity = '1';
      window.removeEventListener('scroll', handleScroll);
    }
  };
  
  // Check immediately in case element is already in view
  handleScroll();
  
  // Then listen for scroll events
  window.addEventListener('scroll', handleScroll);
};
