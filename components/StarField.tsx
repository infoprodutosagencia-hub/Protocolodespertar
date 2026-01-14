import React, { useRef, useEffect } from 'react';

const StarField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    // Star configuration
    const stars: { x: number; y: number; size: number; opacity: number; speed: number; glow: boolean }[] = [];
    const starCount = 200;

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random(),
        speed: Math.random() * 0.2 + 0.05,
        glow: Math.random() > 0.9 // 10% special glowing stars
      });
    }

    const render = () => {
      ctx.fillStyle = '#000000'; // Base black
      ctx.fillRect(0, 0, width, height);

      // Nebula Effect (Simulated with gradients)
      const gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width);
      gradient.addColorStop(0, 'rgba(75, 0, 130, 0.15)'); // Deep purple center
      gradient.addColorStop(0.5, 'rgba(20, 0, 40, 0.3)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw Stars
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        
        // Twinkle effect
        const flicker = Math.sin(Date.now() * 0.002 + star.x) * 0.3 + 0.7;
        const currentOpacity = star.opacity * flicker;
        
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
        
        if (star.glow) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#FFD700'; // Gold glow
        } else {
            ctx.shadowBlur = 0;
        }

        ctx.fill();

        // Parallax Movement (simulating upward energy)
        star.y -= star.speed;
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1]"
    />
  );
};

export default StarField;
