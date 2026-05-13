import { useEffect, useState, useRef } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const cursorRef = useRef(null);
  const trailRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    const interactiveElements = document.querySelectorAll('a, button, input, textarea, [role="button"]');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleHoverStart);
      el.addEventListener('mouseleave', handleHoverEnd);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverStart);
        el.removeEventListener('mouseleave', handleHoverEnd);
      });
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Trail effect */}
      <div
        ref={trailRef}
        className="cursor-trail"
        style={{
          left: position.x,
          top: position.y,
        }}
      />
      
      {/* Main cursor - Dumbbell icon */}
      <div
        ref={cursorRef}
        className={`custom-cursor ${isClicking ? 'cursor-clicking' : ''} ${isHovering ? 'cursor-hovering' : ''}`}
        style={{
          left: position.x,
          top: position.y,
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="cursor-svg"
        >
          {/* Left weight plate */}
          <rect x="5" y="35" width="20" height="30" rx="3" fill="#d90429" />
          <rect x="8" y="40" width="14" height="20" rx="2" fill="#ef233c" />
          
          {/* Left outer plate */}
          <rect x="2" y="30" width="8" height="40" rx="2" fill="#8b0000" />
          <rect x="3" y="35" width="6" height="30" rx="1" fill="#a00000" />
          
          {/* Bar */}
          <rect x="25" y="45" width="50" height="10" rx="2" fill="#e0e0e0" />
          <rect x="25" y="47" width="50" height="6" rx="1" fill="#ffffff" />
          <rect x="25" y="48" width="50" height="2" rx="1" fill="#cccccc" />
          
          {/* Right weight plate */}
          <rect x="75" y="35" width="20" height="30" rx="3" fill="#d90429" />
          <rect x="78" y="40" width="14" height="20" rx="2" fill="#ef233c" />
          
          {/* Right outer plate */}
          <rect x="90" y="30" width="8" height="40" rx="2" fill="#8b0000" />
          <rect x="91" y="35" width="6" height="30" rx="1" fill="#a00000" />
          
          {/* Grip texture */}
          <line x1="35" y1="45" x2="35" y2="55" stroke="#999999" strokeWidth="1" />
          <line x1="40" y1="45" x2="40" y2="55" stroke="#999999" strokeWidth="1" />
          <line x1="45" y1="45" x2="45" y2="55" stroke="#999999" strokeWidth="1" />
          <line x1="50" y1="45" x2="50" y2="55" stroke="#999999" strokeWidth="1" />
          <line x1="55" y1="45" x2="55" y2="55" stroke="#999999" strokeWidth="1" />
          <line x1="60" y1="45" x2="60" y2="55" stroke="#999999" strokeWidth="1" />
          <line x1="65" y1="45" x2="65" y2="55" stroke="#999999" strokeWidth="1" />
        </svg>
        
        {/* Glow effect */}
        <div className="cursor-glow" />
      </div>
    </>
  );
};

export default CustomCursor;
