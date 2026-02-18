import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  Globe,
  Users,
  Award,
} from 'lucide-react';
import { motion } from 'framer-motion';
import InteractiveCard from '../components/InteractiveCard';

import { useTheme } from '../contexts/ThemeContext';
import ServiceCarousel from '../components/ServiceCarousel';

// Import product images
import chatzImg from '../assets/products/chatz.io.webp';
import imgGenImg from '../assets/products/img_gen.webp';

// Import project images from assets/services
import acImg from '../assets/services/ac.webp';
import sasImg from '../assets/services/sas.webp';
import karpagamImg from '../assets/services/karpagam.webp';

// Import company logo
import halfLogo from '../assets/company_logo/half_logo.webp';

// Sample project data
const sampleProjects = [
  {
    id: 1,
    title: 'Cooling Services Website',
    description:
      'A service website for home appliance repairs including washing machines, fridges, and ACs.',
    image: acImg,
    link: 'https://multibrandwashingmachineservice.in/',
    category: 'Web Development',
  },
  {
    id: 2,
    title: 'Business Consultancy Website',
    description:
      'A modern business website for an import-export consultancy firm offering expert guidance to global trade clients',
    image: sasImg,
    link: 'https://sas-impex.netlify.app/',
    category: 'Web Development',
  },
  {
    id: 3,
    title: 'Sri Karpagam Brand Website',
    description:
      'A product showcase website featuring traditional flours and food mixes with a clean product gallery',
    image: karpagamImg,
    link: 'https://srikarpagambrand.in/',
    category: 'Web Development',
  },
];

const Home = () => {
  const { isDark } = useTheme();



  const features = [
    {
      title: 'Global Reach',
      description: 'Serving clients worldwide with 24/7 support',
      icon: <Globe className="h-7 w-7 sm:h-10 sm:w-10 md:h-12 md:w-12" />,
      color: 'emerald' as const,
    },
    {
      title: 'Expert Team',
      description: 'Skilled professionals with years of experience',
      icon: <Users className="h-7 w-7 sm:h-10 sm:w-10 md:h-12 md:w-12" />,
      color: 'purple' as const,
    },
    {
      title: 'Quality Assured',
      description: 'Premium solutions with guaranteed satisfaction',
      icon: <Award className="h-7 w-7 sm:h-10 sm:w-10 md:h-12 md:w-12" />,
      color: 'blue' as const,
    },
  ];

  const slideL = {
    hidden: { opacity: 0, x: -25 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const slideR = {
    hidden: { opacity: 0, x: 25 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="relative min-h-screen pt-16">
      {/* Hero Section with Enhanced Effects */}
      <section className="relative pt-16 sm:pt-24 md:pt-32 pb-10 sm:pb-20 px-3 sm:px-4 z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            className="mb-8"
          >
            {/* Animated Badge */}
            <motion.div
              variants={slideL}
              className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-emerald-500/20 to-purple-500/20 border border-emerald-500/30 mb-4 sm:mb-8"
            >
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-400 mr-1.5 sm:mr-2" />
              <span
                className={`text-xs sm:text-sm font-medium ${isDark ? 'text-emerald-300' : 'text-emerald-600'
                  }`}
              >
                Trusted by 30+ clients
              </span>
            </motion.div>

            <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold mb-4 sm:mb-6">
              <motion.span variants={slideR} className="flex items-center justify-center gap-2 sm:gap-4">
                <img src={halfLogo} alt="Integer.IO" className="h-16 sm:h-14 md:h-24 w-auto object-contain" />
                <span className={`bg-gradient-to-r bg-clip-text text-transparent pb-1 sm:pb-2 text-xl sm:text-3xl md:text-5xl drop-shadow-sm ${isDark
                  ? 'from-emerald-300 via-purple-300 to-pink-300'
                  : 'from-purple-900 via-indigo-800 to-emerald-800'
                  }`} style={{ lineHeight: '1.3' }}>
                  Integer.IO Services
                </span>
              </motion.span>
              <br />
              <motion.span
                variants={slideL}
                className={`text-xl sm:text-2xl md:text-5xl font-bold ${isDark ? 'text-gray-200' : 'text-gray-900'
                  }`}
              >
                From Worldwide
              </motion.span>
            </h1>

            <motion.p
              variants={slideR}
              className={`text-sm sm:text-xl md:text-2xl mb-4 sm:mb-8 max-w-4xl mx-auto font-bold ${isDark ? 'text-gray-200' : 'text-gray-900'
                }`}
            >
              Delivering Premium Digital Solutions Globally
            </motion.p>

            <motion.p
              variants={slideL}
              className={`text-xs sm:text-lg mb-6 sm:mb-12 max-w-3xl mx-auto font-medium ${isDark ? 'text-gray-300' : 'text-gray-800'
                }`}
            >
              We specialize in cutting-edge web development, AI/ML solutions,
              professional branding, and data analytics for businesses,
              institutions, and students across the globe.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-16"
          >
            <Link
              to="/contact"
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-5 py-2.5 sm:px-8 sm:py-4 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 flex items-center justify-center group hover:scale-105 transform shadow-lg btn-hover-effect"
            >
              Get Started Today
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/services"
              className="border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white px-5 py-2.5 sm:px-8 sm:py-4 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105 transform shadow-lg btn-hover-effect"
            >
              Explore Services
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-10 sm:py-20 px-3 sm:px-4 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideL}
            className={`text-xl sm:text-3xl md:text-4xl font-bold text-center mb-2 sm:mb-4 bg-gradient-to-r bg-clip-text text-transparent ${isDark
              ? 'from-emerald-400 to-purple-400'
              : 'from-purple-800 to-emerald-700'
              }`}
          >
            Our Premium Products
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideR}
            className={`text-center text-xs sm:text-lg mb-6 sm:mb-16 max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-700'
              }`}
          >
            Discover our flagship digital solutions designed to transform your business operations and drive growth
          </motion.p>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-10">
            {/* Chatz.IO Product */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideL}
            >
              <InteractiveCard glowColor="emerald" className="h-full overflow-hidden">
                <div className="relative bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                  <img
                    src={chatzImg}
                    alt="Chatz.IO - AI Chat for Students"
                    loading="lazy"
                    className="w-full h-36 sm:h-48 md:h-64 object-contain p-2"
                  />
                  <span className="absolute top-4 right-4 px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full">
                    NEW
                  </span>
                </div>
                <div className="p-3 sm:p-4 md:p-5">
                  <h3 className={`text-base sm:text-xl md:text-2xl font-bold mb-1.5 sm:mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    Chatz.IO
                  </h3>
                  <p className={`text-[11px] sm:text-sm md:text-base leading-relaxed mb-3 sm:mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    An intelligent AI-powered chat assistant designed specifically for students. Get help with studies and research.
                  </p>
                  <Link
                    to="/products"
                    className="inline-flex items-center gap-1.5 sm:gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-300 hover:scale-105 shadow-md"
                  >
                    Learn More
                    <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </Link>
                </div>
              </InteractiveCard>
            </motion.div>

            {/* Dips.IO Product */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideR}
            >
              <InteractiveCard glowColor="purple" className="h-full overflow-hidden">
                <div className="relative bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                  <img
                    src={imgGenImg}
                    alt="Dips.IO - Coming Soon"
                    loading="lazy"
                    className="w-full h-36 sm:h-48 md:h-64 object-contain p-2"
                  />
                  <span className="absolute top-4 right-4 px-3 py-1 bg-purple-500 text-white text-xs font-bold rounded-full">
                    COMING SOON
                  </span>
                </div>
                <div className="p-3 sm:p-4 md:p-5">
                  <h3 className={`text-base sm:text-xl md:text-2xl font-bold mb-1.5 sm:mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    Dips.IO
                  </h3>
                  <p className={`text-[11px] sm:text-sm md:text-base leading-relaxed mb-3 sm:mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    An innovative next-gen digital platform coming soon! Stay tuned for revolutionary features.
                  </p>
                  <Link
                    to="/products"
                    className="inline-flex items-center gap-1.5 sm:gap-2 bg-purple-500 hover:bg-purple-600 text-white px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-300 hover:scale-105 shadow-md"
                  >
                    Learn More
                    <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </Link>
                </div>
              </InteractiveCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-10 sm:py-20 px-3 sm:px-4 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideL}
            className={`text-xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-12 bg-gradient-to-r bg-clip-text text-transparent ${isDark
              ? 'from-emerald-400 to-purple-400'
              : 'from-purple-800 to-emerald-700'
              }`}
          >
            Our Core Services
          </motion.h2>

          <motion.section
            id="services"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideR}
          >
            <ServiceCarousel />
          </motion.section>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideL}
            className="text-center mt-6 sm:mt-12"
          >
            <Link
              to="/services"
              className="inline-flex items-center bg-gradient-to-r from-emerald-500 to-purple-600 hover:from-emerald-600 hover:to-purple-700 text-white px-5 py-2.5 sm:px-8 sm:py-4 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105 transform shadow-lg btn-hover-effect group"
            >
              View All Services
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-10 sm:py-20 px-3 sm:px-4 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideR}
            className={`text-xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-16 bg-gradient-to-r bg-clip-text text-transparent ${isDark
              ? 'from-emerald-400 to-purple-400'
              : 'from-purple-800 to-emerald-700'
              }`}
          >
            Why Choose Integer.IO Services?
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 mb-8 sm:mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={index % 2 === 0 ? slideL : slideR}
              >
                <InteractiveCard
                  glowColor={feature.color}
                  className="text-center !p-4 sm:!p-6 md:!p-8"
                >
                  <div
                    className={`text-${feature.color}-400 mb-3 sm:mb-6 flex justify-center`}
                  >
                    {feature.icon}
                  </div>
                  <h3
                    className={`text-sm sm:text-lg md:text-xl font-semibold mb-1.5 sm:mb-3 ${isDark ? 'text-white' : 'text-gray-800'
                      }`}
                  >
                    {feature.title}
                  </h3>
                  <p className={`text-xs sm:text-sm md:text-base ${isDark ? 'text-gray-200' : 'text-gray-600'}`}>
                    {feature.description}
                  </p>
                </InteractiveCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Gallery Section */}
      <section className="py-10 sm:py-20 px-3 sm:px-4 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideL}
            className={`text-xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-16 bg-gradient-to-r bg-clip-text text-transparent ${isDark
              ? 'from-emerald-400 to-purple-400'
              : 'from-purple-800 to-emerald-700'
              }`}
          >
            Featured Projects
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {sampleProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={index % 2 === 0 ? slideL : slideR}
                className="group"
              >
                <InteractiveCard
                  glowColor="emerald"
                  className="overflow-hidden h-full"
                >
                  <div className="relative overflow-hidden rounded-lg mb-2 sm:mb-4">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-36 sm:h-44 md:h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-1 sm:p-2 flex flex-col h-full">
                    <span className="text-emerald-400 text-[10px] sm:text-sm font-medium">
                      {project.category}
                    </span>
                    <h3
                      className={`text-base sm:text-lg md:text-xl font-semibold mb-1 sm:mb-2 ${isDark ? 'text-white' : 'text-gray-800'
                        }`}
                    >
                      {project.title}
                    </h3>
                    <p
                      className={`text-[11px] sm:text-sm mb-3 sm:mb-4 flex-grow ${isDark ? 'text-gray-300' : 'text-gray-600'
                        }`}
                    >
                      {project.description}
                    </p>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${isDark
                        ? 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
                        : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                        }`}
                    >
                      Visit Project <ArrowRight className="ml-1.5 sm:ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </a>
                  </div>
                </InteractiveCard>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideR}
            className="text-center mt-6 sm:mt-12"
          >
            <Link
              to="/projects"
              className="inline-flex items-center bg-gradient-to-r from-emerald-500 to-purple-600 hover:from-emerald-600 hover:to-purple-700 text-white px-5 py-2.5 sm:px-8 sm:py-4 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 shadow-lg btn-hover-effect"
            >
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
          </motion.div>
        </div>
      </section>


    </div>
  );
};

export default Home;
