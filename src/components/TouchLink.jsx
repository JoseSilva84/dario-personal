import { useState, useRef, useEffect } from 'react';

export default function TouchLink({ href, children, className, activeClassName = '', onStateChange, ...props }) {
  const [isToggled, setIsToggled] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleTouchStart = (e) => {
    e.preventDefault();
    
    if (isToggled) {
      window.open(href, '_blank', 'noopener,noreferrer');
      setIsToggled(false);
      onStateChange?.(false);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      return;
    }
    
    setIsToggled(true);
    onStateChange?.(true);
    
    timeoutRef.current = setTimeout(() => {
      setIsToggled(false);
      onStateChange?.(false);
    }, 2000);
  };

  const handleClick = (e) => {
    if (!isToggled) {
      e.preventDefault();
    }
  };

  const handleMouseEnter = () => {
    setIsToggled(true);
    onStateChange?.(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsToggled(false);
    onStateChange?.(false);
  };

  return (
    <a
      href={href}
      className={`${className} ${isToggled ? activeClassName : ''}`}
      onTouchStart={handleTouchStart}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </a>
  );
}