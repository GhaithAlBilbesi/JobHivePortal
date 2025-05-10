import { useEffect, useRef, CSSProperties } from "react";

/**
 * Animated Bee Component
 * 
 * Creates an animated bee emoji that follows a random flight path
 * Adds visual interest to the hero section and throughout the site
 * Uses emoji (🐝) instead of SVG for a simpler, more playful approach
 * 
 * @param {Object} props - Component props
 * @param {CSSProperties} props.style - Style object for positioning
 */
const AnimatedBee = ({ style }: { style?: CSSProperties }) => {
  const beeRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const bee = beeRef.current;
    if (!bee) return;
    
    // Create animation function
    const animateBee = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // Random position within viewport boundaries
      const randomX = Math.random() * viewportWidth * 0.8;
      const randomY = Math.random() * (viewportHeight / 2) + 100; // Keep in upper half
      
      // Animate to random position with rotation
      const animation = bee.animate([
        { transform: `translate(${randomX}px, ${randomY}px) rotate(${Math.random() * 35 - 15}deg)` }
      ], {
        duration: 8000 + (Math.random() * 2000), // Random duration between 8-10s
        easing: 'ease-in-out',
        fill: 'forwards'
      });
      
      // Call again after animation completes
      animation.onfinish = animateBee;
    };
    
    // Start animation with small delay
    const timeoutId = setTimeout(animateBee, Math.random() * 500);
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div 
      className="bee" 
      ref={beeRef} 
      style={{
        fontSize: '28px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...style
      }}
      aria-hidden="true"
    >
      🐝
    </div>
  );
};

export default AnimatedBee;
