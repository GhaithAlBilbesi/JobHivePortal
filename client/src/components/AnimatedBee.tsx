import { useEffect, useRef, CSSProperties } from "react";

/**
 * Animated Bee Component
 * 
 * Creates an animated bee that follows a random flight path
 * Adds visual interest to the hero section and throughout the site
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
        { transform: `translate(${randomX}px, ${randomY}px) rotate(${Math.random() * 360}deg)` }
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
        backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjAgOEMxNC40NzcyIDggMTAgMTIuNDc3MiAxMCAxOEMxMCAyMy41MjI4IDE0LjQ3NzIgMjggMjAgMjhDMjUuNTIyOCAyOCAzMCAyMy41MjI4IDMwIDE4QzMwIDEyLjQ3NzIgMjUuNTIyOCA4IDIwIDhaIiBmaWxsPSIjRkZENzAwIi8+PHBhdGggZD0iTTIwIDEwQzE1LjU4MTcgMTAgMTIgMTMuNTgxNyAxMiAxOEMxMiAyMi40MTgzIDE1LjU4MTcgMjYgMjAgMjZDMjQuNDE4MyAyNiAyOCAyMi40MTgzIDI4IDE4QzI4IDEzLjU4MTcgMjQuNDE4MyAxMCAyMCAxMFoiIGZpbGw9IiMwMDAwMDAiLz48cGF0aCBkPSJNMzQgMTNMMzAgMTVNMzAgMjFMMzQgMjNNNiAxM0wxMCAxNU0xMCAyMUw2IDIzIiBzdHJva2U9IiNGRkQ3MDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9zdmc+")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain", 
        ...style
      }}
      aria-hidden="true"
    ></div>
  );
};

export default AnimatedBee;
