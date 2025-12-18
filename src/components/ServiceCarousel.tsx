import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import './ServiceCarousel.css';

// Import local images
import webdevImg from '../assets/serivice caosel/webdev_services.webp';
import aiImg from '../assets/serivice caosel/ai_services.webp';
import softwareImg from '../assets/serivice caosel/software_services.webp';
import finalyrImg from '../assets/serivice caosel/finalyr_services.webp';
import videoImg from '../assets/serivice caosel/video_edit_services.webp';
import digitalMarketingImg from '../assets/serivice caosel/digital marketing_services.webp';

const ServiceCarousel = () => {
  const { isDark } = useTheme();
  const [rotation, setRotation] = useState(0);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);
  const rafRef = useRef(null);
  const rotationRef = useRef(0);
  const isDraggingRef = useRef(false);
  const lastMouseXRef = useRef(0);

  const services = [
    {
      title: 'Web Development',
      description: 'Professional websites with responsive design and modern features',
      image: webdevImg,
    },
    {
      title: 'AI - Chatbot / Voice Assistant',
      description: 'Intelligent AI chatbots and voice assistants for your business',
      image: aiImg,
    },
    {
      title: 'Billing Software Development',
      description: 'Custom billing and invoicing software solutions',
      image: softwareImg,
    },
    {
      title: 'Final Year Projects',
      description: 'AI, ML, DL, NLP, Data Analysis Projects with Documentation',
      image: finalyrImg,
    },
    {
      title: 'Video Editing',
      description: 'Professional video editing and post-production services',
      image: videoImg,
    },
    {
      title: 'Digital Marketing',
      description: 'Strategic social media planning and content creation',
      image: digitalMarketingImg,
    },
  ];

  // Intersection Observer to optimize performance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Mouse interaction handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isDraggingRef.current = true;
    lastMouseXRef.current = e.clientX;
    setIsPaused(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !carouselRef.current) return;
    e.preventDefault();
    const deltaX = e.clientX - lastMouseXRef.current;
    rotationRef.current = (rotationRef.current + deltaX * 0.3) % 360;
    (carouselRef.current as HTMLDivElement).style.transform = `rotateY(${rotationRef.current}deg)`;
    lastMouseXRef.current = e.clientX;
  };

  const handleMouseUp = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      setTimeout(() => setIsPaused(false), 200); // Resume quickly after drag
    }
  };

  // Touch interaction handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    isDraggingRef.current = true;
    lastMouseXRef.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || !carouselRef.current) return;
    // Don't preventDefault here generally to allow vertical scroll, 
    // but maybe for horizontal swipe we might need to.
    const deltaX = e.touches[0].clientX - lastMouseXRef.current;
    rotationRef.current = (rotationRef.current + deltaX * 0.5) % 360; // Slightly faster multiplier for touch
    (carouselRef.current as HTMLDivElement).style.transform = `rotateY(${rotationRef.current}deg)`;
    lastMouseXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
    setTimeout(() => setIsPaused(false), 200);
  };

  // Removed handleMouseEnter/Leave pause logic to keep it rotating on hover as requested
  // Hover effect will be handled by CSS only

  // Optimized animation: faster rotation speed
  useEffect(() => {
    if (!isIntersecting || !carouselRef.current || isPaused) return;

    let lastTime = performance.now();
    // Slower speed: 0.25 on desktop, 0.18 on mobile
    const speed = window.innerWidth < 768 ? 0.18 : 0.25;

    const step = (now: number) => {
      if (document.hidden || isPaused) {
        rafRef.current = requestAnimationFrame(step);
        return;
      }
      const delta = now - lastTime;
      if (delta >= 16) {
        rotationRef.current = (rotationRef.current - speed) % 360;
        if (carouselRef.current) {
          carouselRef.current.style.transform = `rotateY(${rotationRef.current}deg)`;
        }
        lastTime = now;
      }
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [isIntersecting, isPaused]);

  // Keep rotation state in sync for initial render and when ref resets
  useEffect(() => {
    rotationRef.current = rotation;
  }, [rotation]);

  return (
    <div
      ref={sectionRef}
      className={`service-section ${isDark ? 'dark-theme' : 'light-theme'}`}
      data-theme={isDark ? 'dark' : 'light'}
    >
      <div
        className="carousel-container"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp} // Handle leaving window while dragging
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ cursor: isDraggingRef.current ? 'grabbing' : 'grab' }}
      >
        <div
          className="carousel"
          ref={carouselRef}
          style={{
            transform: `rotateY(${rotation}deg)`,
            willChange: isIntersecting ? 'transform' : 'auto',
          }}
        >
          {services.map((service, index) => {
            const theta = (360 / services.length) * index;

            return (
              <div
                key={index}
                className="carousel__face"
                style={{
                  transform: `rotateY(${theta}deg) translateZ(var(--translateZ))`,
                  '--theta': `${theta}deg`,
                }}
              >
                <div className="carousel-content">
                  <div className="service-image-container">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="service-image"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ServiceCarousel;
