import React, { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  speed: number;
  opacity: number;
  twinkle: number;
}

interface Asteroid {
  x: number;
  y: number;
  size: number;
  speed: number;
  rotation: number;
  rotationSpeed: number;
  depth: number;
  points: { x: number; y: number }[];
  gradient: CanvasGradient | null;
}

const SpaceBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isDark } = useTheme();
  const starsRef = useRef<Star[]>([]);
  const asteroidsRef = useRef<Asteroid[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const isMobile = window.innerWidth < 768;
      const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const createStars = () => {
      starsRef.current = [];
      const starCount = window.innerWidth < 768 ? 30 : 80;
      for (let i = 0; i < starCount; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 1000,
          size: Math.random() * 2 + 0.5,
          speed: Math.random() * 0.4 + 0.1,
          opacity: Math.random() * 0.5 + 0.2,
          twinkle: Math.random() * Math.PI * 2
        });
      }
    };

    const createAsteroids = () => {
      asteroidsRef.current = [];
      const asteroidCount = window.innerWidth < 768 ? 0 : 3;
      for (let i = 0; i < asteroidCount; i++) {
        const size = Math.random() * 5 + 1.5;
        const points: { x: number; y: number }[] = [];
        const polygonPoints = 6;
        for (let p = 0; p < polygonPoints; p++) {
          const angle = (p / polygonPoints) * Math.PI * 2;
          const radius = size * (0.85 + Math.random() * 0.15);
          points.push({ x: Math.cos(angle) * radius, y: Math.sin(angle) * radius });
        }

        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
        if (isDark) {
          gradient.addColorStop(0, '#a855f7');
          gradient.addColorStop(0.3, '#8b5cf6');
          gradient.addColorStop(0.6, '#7c3aed');
          gradient.addColorStop(1, '#581c87');
        } else {
          gradient.addColorStop(0, '#ddd6fe');
          gradient.addColorStop(0.3, '#c4b5fd');
          gradient.addColorStop(0.6, '#a78bfa');
          gradient.addColorStop(1, '#8b5cf6');
        }

        asteroidsRef.current.push({
          x: Math.random() * (canvas.width / (ctx.getTransform().a || 1)),
          y: Math.random() * (canvas.height / (ctx.getTransform().d || 1)),
          size,
          speed: Math.random() * 0.2 + 0.08,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.012,
          depth: Math.random() * 0.25 + 0.75,
          points,
          gradient,
        });
      }
    };

    const drawStar = (star: Star) => {
      ctx.save();
      
      const scale = 1000 / (1000 + star.z);
      const x = star.x * scale;
      const y = star.y * scale;
      const size = star.size * scale;
      
      star.twinkle += 0.02;
      const twinkleOpacity = star.opacity * (0.5 + 0.5 * Math.sin(star.twinkle));
      
      ctx.globalAlpha = twinkleOpacity;
      
      const starColor = isDark ? '#ffffff' : '#4338ca';
      ctx.fillStyle = starColor;
      ctx.shadowBlur = 12 * scale;
      ctx.shadowColor = starColor;
      
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
      
      // Cross lines for star effect
      ctx.strokeStyle = starColor;
      ctx.lineWidth = 0.5 * scale;
      ctx.beginPath();
      ctx.moveTo(x - size * 2, y);
      ctx.lineTo(x + size * 2, y);
      ctx.moveTo(x, y - size * 2);
      ctx.lineTo(x, y + size * 2);
      ctx.stroke();
      
      ctx.restore();
    };

    const drawAsteroid = (asteroid: Asteroid) => {
      ctx.save();
      ctx.translate(asteroid.x, asteroid.y);
      ctx.rotate(asteroid.rotation);
      ctx.scale(asteroid.depth, asteroid.depth);
      
      ctx.fillStyle = asteroid.gradient || '#8b5cf6';
      ctx.shadowBlur = 10;
      ctx.shadowColor = isDark ? '#8b5cf6' : '#7c3aed';
      
      ctx.beginPath();
      asteroid.points.forEach((pt, idx) => {
        if (idx === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      });
      ctx.closePath();
      ctx.fill();
      
      ctx.globalCompositeOperation = 'screen';
      ctx.fillStyle = isDark ? 'rgba(139, 92, 246, 0.25)' : 'rgba(124, 58, 237, 0.15)';
      ctx.fill();
      
      ctx.restore();
    };

    const animate = () => {
      // Skip painting when tab is hidden to save CPU/GPU
      if (document.hidden) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      starsRef.current.forEach(star => {
        star.z -= star.speed * 1.0;
        if (star.z <= 0) {
          star.z = 1000;
          star.x = Math.random() * canvas.width;
          star.y = Math.random() * canvas.height;
        }
        drawStar(star);
      });

      asteroidsRef.current.forEach(asteroid => {
        asteroid.x -= asteroid.speed * 0.85;
        asteroid.rotation += asteroid.rotationSpeed;
        
        if (asteroid.x < -asteroid.size * 2) {
          const scaleX = ctx.getTransform().a || 1;
          const scaleY = ctx.getTransform().d || 1;
          asteroid.x = canvas.width / scaleX + asteroid.size * 2;
          asteroid.y = Math.random() * (canvas.height / scaleY);
        }
        
        drawAsteroid(asteroid);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    createStars();
    createAsteroids();
    const start = () => {
      if (!animationRef.current) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    const stop = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = undefined;
      }
    };

    start();

    const handleResize = () => {
      resizeCanvas();
      createStars();
      createAsteroids();
    };

    window.addEventListener('resize', handleResize);
    const handleVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      stop();
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ 
        background: isDark 
          ? 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 30%, #16213e 70%, #0f0f23 100%)' 
          : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 30%, #cbd5e1 70%, #94a3b8 100%)'
      }}
    />
  );
};

export default SpaceBackground;