import { useEffect, useRef, CSSProperties } from "react";

/**
 * Animated Icon Component
 * 
 * Creates an animated briefcase icon that follows a random path
 * Adds visual interest to the hero section and throughout the site
 * Uses emoji (💼) representing employment and career opportunities
 * 
 * @param {Object} props - Component props
 * @param {CSSProperties} props.style - Style object for positioning
 */
const AnimatedIcon = ({ style }: { style?: CSSProperties }) => {
  const iconRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const icon = iconRef.current;
    if (!icon) return;
    
    // Create animation function
    const animateIcon = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // Random position within viewport boundaries
      const randomX = Math.random() * viewportWidth * 0.8;
      const randomY = Math.random() * (viewportHeight / 2) + 100; // Keep in upper half
      
      // Animate to random position with rotation
      const animation = icon.animate([
        { transform: `translate(${randomX}px, ${randomY}px) rotate(${Math.random() * 35 - 15}deg)` }
      ], {
        duration: 8000 + (Math.random() * 2000), // Random duration between 8-10s
        easing: 'ease-in-out',
        fill: 'forwards'
      });
      
      // Call again after animation completes
      animation.onfinish = animateIcon;
    };
    
    // Start animation with small delay
    const timeoutId = setTimeout(animateIcon, Math.random() * 500);
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div 
      className="animated-icon" 
      ref={iconRef} 
      style={{
        fontSize: '28px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...style
      }}
      aria-hidden="true"
    >
      💼
    </div>
  );
};

export default AnimatedIcon;
