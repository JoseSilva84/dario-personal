import { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let time = 0;

    const resizeCanvas = () => {
      // Usar documentHeight para cobrir toda a página
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      canvas.width = window.innerWidth;
      canvas.height = docHeight;
    };

    const createParticle = (x, y) => ({
      x: x || Math.random() * canvas.width,
      y: y || Math.random() * canvas.height,
      size: Math.random() * 200 + 80,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.12 + 0.03,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.015 + 0.008,
    });

    const initParticles = () => {
      particles = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 30000);
      for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle());
      }
    };

    const drawGradientOrb = (particle, timeOffset) => {
      const pulseScale = 1 + Math.sin(particle.pulse + timeOffset) * 0.3;
      const size = particle.size * pulseScale;
      
      const gradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, size
      );
      
      const alpha = particle.opacity * (0.8 + Math.sin(particle.pulse + timeOffset) * 0.2);
      gradient.addColorStop(0, `rgba(217, 4, 41, ${alpha})`);
      gradient.addColorStop(0.4, `rgba(230, 57, 70, ${alpha * 0.5})`);
      gradient.addColorStop(0.7, `rgba(139, 0, 0, ${alpha * 0.2})`);
      gradient.addColorStop(1, 'rgba(10, 10, 10, 0)');

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    };

    const drawEnergyLines = (time) => {
      ctx.strokeStyle = 'rgba(217, 4, 41, 0.02)';
      ctx.lineWidth = 1;

      for (let i = 0; i < 6; i++) {
        ctx.beginPath();
        const startX = Math.sin(time * 0.0008 + i) * canvas.width * 0.3 + canvas.width * 0.5;
        const startY = Math.cos(time * 0.001 + i) * canvas.height * 0.3 + canvas.height * 0.5;
        
        ctx.moveTo(startX, startY);
        
        for (let j = 0; j < 4; j++) {
          const cpX = startX + Math.sin(time * 0.0015 + i + j) * 250;
          const cpY = startY + Math.cos(time * 0.0015 + i + j) * 250;
          const endX = startX + Math.cos(time * 0.0008 + i + j) * 350;
          const endY = startY + Math.sin(time * 0.0008 + i + j) * 350;
          
          ctx.quadraticCurveTo(cpX, cpY, endX, endY);
        }
        
        ctx.stroke();
      }
    };

    const drawPulseRings = (time) => {
      const centerX = canvas.width * 0.5;
      const centerY = canvas.height * 0.5;
      
      for (let i = 0; i < 4; i++) {
        const phase = (time * 0.0008 + i * 2) % 8;
        const radius = phase * 180;
        const opacity = Math.max(0, 1 - phase / 8) * 0.04;
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(217, 4, 41, ${opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    };

    const animate = () => {
      time++;
      
      // Limpar com o gradiente base
      const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bgGradient.addColorStop(0, '#0a0a0a');
      bgGradient.addColorStop(0.5, '#1a1a1a');
      bgGradient.addColorStop(1, '#0a0a0a');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawEnergyLines(time);
      drawPulseRings(time);

      particles.forEach((particle) => {
        particle.x += particle.speedX + Math.sin(time * 0.008 + particle.pulse) * 0.2;
        particle.y += particle.speedY + Math.cos(time * 0.008 + particle.pulse) * 0.2;
        particle.pulse += particle.pulseSpeed;

        if (particle.x < -particle.size) particle.x = canvas.width + particle.size;
        if (particle.x > canvas.width + particle.size) particle.x = -particle.size;
        if (particle.y < -particle.size) particle.y = canvas.height + particle.size;
        if (particle.y > canvas.height + particle.size) particle.y = -particle.size;

        drawGradientOrb(particle, time * 0.015);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initParticles();
    animate();

    // Recalcular quando a janela redimensionar
    const handleResize = () => {
      resizeCanvas();
      initParticles();
    };

    // Recalcular quando o conteúdo mudar (scroll ou mudança de conteúdo)
    const handleScroll = () => {
      const newHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.scrollHeight
      );
      if (newHeight !== canvas.height) {
        resizeCanvas();
        initParticles();
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    // MutationObserver para detectar mudanças no DOM
    const observer = new MutationObserver(() => {
      const newHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      );
      if (newHeight !== canvas.height) {
        resizeCanvas();
        initParticles();
      }
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full pointer-events-none"
      style={{ 
        zIndex: 0,
        height: '100%',
      }}
    />
  );
};

export default AnimatedBackground;
