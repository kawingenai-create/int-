import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  category: string;
  technologies: string[];
}

interface ModernProjectCarouselProps {
  projects: Project[];
}

const ModernProjectCarousel: React.FC<ModernProjectCarouselProps> = ({ projects }) => {
  const { isDark } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = projects.length - 1;
      if (nextIndex >= projects.length) nextIndex = 0;
      return nextIndex;
    });
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const currentProject = projects[currentIndex];

  const projectHighlights = [
    'Custom Design & Development',
    'Mobile Responsive Layout',
    'SEO Optimized Structure',
    'Fast Loading Performance',
  ];

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <div className={`relative overflow-hidden rounded-2xl shadow-2xl ${isDark
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700/50'
        : 'bg-white border border-gray-200'
        }`}>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(_, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
          >
            {/* VERTICAL LAYOUT: Image TOP, Content BOTTOM */}
            <div className="flex flex-col">

              {/* TOP: Full Width Image - Shows COMPLETE image */}
              <div className="relative h-56 sm:h-72 md:h-80 lg:h-[400px] overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                <motion.img
                  src={currentProject.image}
                  alt={currentProject.title}
                  loading="lazy"
                  className="w-full h-full object-contain"
                  initial={{ scale: 1.02, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-2 bg-emerald-500 text-white text-sm font-bold rounded-full shadow-lg">
                    {currentProject.category}
                  </span>
                </div>

                {/* Project Number */}
                <div className="absolute top-4 right-4">
                  <span className={`text-3xl font-bold text-white drop-shadow-lg`}>
                    {String(currentIndex + 1).padStart(2, '0')}
                  </span>
                  <span className="text-lg ml-1 text-gray-300">
                    / {String(projects.length).padStart(2, '0')}
                  </span>
                </div>

                {/* Title Overlay on Image */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
                    {currentProject.title}
                  </h2>
                </div>
              </div>

              {/* BOTTOM: Content Section */}
              <div className="p-5 sm:p-6 md:p-8">
                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className={`text-sm sm:text-base md:text-lg leading-relaxed mb-5 ${isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}
                >
                  {currentProject.description}
                </motion.p>

                {/* Two Column: Highlights + Technologies */}
                <div className="grid sm:grid-cols-2 gap-5 mb-6">
                  {/* Project Highlights */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h4 className={`text-xs font-semibold uppercase tracking-wider mb-3 ${isDark ? 'text-emerald-400' : 'text-emerald-600'
                      }`}>
                      Project Highlights
                    </h4>
                    <div className="space-y-2">
                      {projectHighlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className={`h-4 w-4 flex-shrink-0 ${isDark ? 'text-emerald-400' : 'text-emerald-500'
                            }`} />
                          <span className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                            {highlight}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Technologies */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h4 className={`text-xs font-semibold uppercase tracking-wider mb-3 ${isDark ? 'text-purple-400' : 'text-purple-600'
                      }`}>
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {currentProject.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium ${isDark
                            ? 'bg-gray-800 text-gray-300 border border-gray-700'
                            : 'bg-gray-100 text-gray-700 border border-gray-200'
                            }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* CTA Button */}
                <motion.a
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  href={currentProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                >
                  <ExternalLink className="h-5 w-5" />
                  View Live Project
                </motion.a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={() => paginate(-1)}
          className={`absolute left-3 top-32 sm:top-40 md:top-48 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-200 ${isDark
            ? 'bg-gray-900/80 hover:bg-gray-800 text-white'
            : 'bg-white/90 hover:bg-white text-gray-800'
            } shadow-xl hover:scale-110`}
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={() => paginate(1)}
          className={`absolute right-3 top-32 sm:top-40 md:top-48 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-200 ${isDark
            ? 'bg-gray-900/80 hover:bg-gray-800 text-white'
            : 'bg-white/90 hover:bg-white text-gray-800'
            } shadow-xl hover:scale-110`}
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${index === currentIndex
              ? 'w-8 h-2 bg-gradient-to-r from-emerald-500 to-cyan-500'
              : isDark
                ? 'w-2 h-2 bg-gray-600 hover:bg-gray-500'
                : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
              }`}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ModernProjectCarousel;
