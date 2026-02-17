import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Code, Brain, FileText, Megaphone, Search, Globe, Shield, MessageCircle } from 'lucide-react';
import InteractiveCard from '../components/InteractiveCard';
import { useTheme } from '../contexts/ThemeContext';

const Services = () => {
  const { isDark } = useTheme();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedService, setHighlightedService] = useState<string | null>(null);
  const serviceRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Handle URL parameter for service navigation from footer
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const serviceKey = params.get('service');
    if (serviceKey) {
      setHighlightedService(serviceKey);
      // Scroll to the service card after a short delay
      setTimeout(() => {
        const element = serviceRefs.current[serviceKey];
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 500);
      // Remove highlight after 3 seconds
      setTimeout(() => setHighlightedService(null), 3000);
    }
  }, [location.search]);

  const coreServices = [
    {
      key: 'web-development',
      category: 'Web Application Development',
      icon: <Code className="h-7 w-7 sm:h-10 sm:w-10 md:h-12 md:w-12" />,
      color: 'emerald' as const,
      description: 'We design and develop secure, scalable web solutions for businesses and startups',
      features: [
        'Static websites',
        'Dynamic web applications',
        'Database integrations',
        'Admin dashboards',
        'API integrations',
        'Performance optimization'
      ]
    },
    {
      key: 'ai-automation',
      category: 'AI Product & Automation Services',
      icon: <Brain className="h-7 w-7 sm:h-10 sm:w-10 md:h-12 md:w-12" />,
      color: 'purple' as const,
      description: 'We build intelligent AI solutions to automate workflows and improve business efficiency',
      features: [
        'AI chatbots',
        'Voice assistants',
        'NLP solutions',
        'Computer vision',
        'AI process automation',
        'Smart data insights'
      ]
    },
    {
      key: 'software-saas',
      category: 'Custom Software & SaaS Product Development',
      icon: <FileText className="h-7 w-7 sm:h-10 sm:w-10 md:h-12 md:w-12" />,
      color: 'blue' as const,
      description: 'We create custom software and SaaS platforms tailored to real business needs',
      features: [
        'Billing Software',
        'CRM Solutions',
        'SaaS Platforms',
        'Data Analytics Dashboards',
        'PDF Auto-generation',
        'Business Automation Tools',
        'Role-based Systems'
      ]
    },
    {
      key: 'digital-marketing',
      category: 'Digital Marketing & Branding Services',
      icon: <Megaphone className="h-7 w-7 sm:h-10 sm:w-10 md:h-12 md:w-12" />,
      color: 'pink' as const,
      description: 'We help brands grow their online presence and generate high-quality leads',
      features: [
        'SEO optimization',
        'Social media marketing',
        'Video editing',
        'Logo & brand identity',
        'Creative poster design'
      ]
    },
    {
      key: 'education-services',
      category: 'Education & Student Services',
      icon: <Globe className="h-7 w-7 sm:h-10 sm:w-10 md:h-12 md:w-12" />,
      color: 'indigo' as const,
      description: 'We support students and working professionals with industry-ready solutions',
      features: [
        'Final year projects',
        'Student portfolios',
        'Professional portfolios',
        'ATS-friendly resumes',
        'Project documentation',
        'Career guidance'
      ]
    },
    {
      key: 'cloud-deployment',
      category: 'Cloud Deployment & Technical Support',
      icon: <Shield className="h-7 w-7 sm:h-10 sm:w-10 md:h-12 md:w-12" />,
      color: 'cyan' as const,
      description: 'We provide reliable cloud hosting and ongoing technical support for your applications',
      features: [
        'Cloud deployment',
        'Server configuration',
        'Website hosting setup',
        'Domain & SSL setup',
        'Performance monitoring',
        'Ongoing maintenance'
      ]
    }
  ];

  // Student project keywords for search
  const studentProjectKeywords = [
    'machine learning', 'ml', 'data analysis', 'ai', 'deep learning', 'nlp',
    'natural language', 'computer vision', 'chatbot', 'speech', 'resume',
    'ats', 'student', 'final year', 'project', 'predictive', 'image classification',
    'recommendation', 'fraud detection', 'sales forecasting', 'market research',
    'healthcare analytics', 'financial risk'
  ];

  // Filter services based on search query
  const filteredServices = coreServices.filter(service =>
    service.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.features.some(feature => feature.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Check if search matches student content
  const showStudentSection = searchQuery === '' ||
    studentProjectKeywords.some(keyword => keyword.includes(searchQuery.toLowerCase())) ||
    searchQuery.toLowerCase().includes('student') ||
    searchQuery.toLowerCase().includes('project') ||
    searchQuery.toLowerCase().includes('resume');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <div className="relative min-h-screen pt-20">
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-16"
        >
          <h1 className={`text-2xl sm:text-4xl md:text-6xl font-bold mb-3 sm:mb-6 bg-gradient-to-r bg-clip-text text-transparent ${isDark
            ? 'from-emerald-400 via-purple-400 to-pink-400'
            : 'from-purple-900 via-indigo-800 to-emerald-800'
            }`}>
            Our Services
          </h1>
          <p className={`text-xs sm:text-lg md:text-xl max-w-3xl mx-auto font-medium mb-4 sm:mb-8 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
            Comprehensive digital solutions tailored for businesses, institutions, and students worldwide
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className={`relative flex items-center rounded-xl border transition-all duration-300 ${isDark
              ? 'bg-gray-800/50 border-gray-700 focus-within:border-emerald-500'
              : 'bg-white/80 border-gray-300 focus-within:border-emerald-500'
              }`}>
              <Search className={`h-5 w-5 ml-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full px-4 py-3 bg-transparent border-none outline-none text-base ${isDark ? 'text-white placeholder-gray-400' : 'text-gray-800 placeholder-gray-500'
                  }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className={`mr-4 text-sm ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-800'}`}
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Core Services Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-6 sm:mb-12">
            <h2 className={`text-xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4 bg-gradient-to-r bg-clip-text text-transparent ${isDark
              ? 'from-emerald-400 to-purple-400'
              : 'from-purple-800 to-emerald-700'
              }`}>
              🏆 Our Services
            </h2>
            <p className={`text-xs sm:text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} available
            </p>
          </div>

          {filteredServices.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-16"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {filteredServices.map((service) => {
                return (
                  <motion.div
                    key={service.key}
                    ref={(el) => { serviceRefs.current[service.key] = el; }}
                    variants={itemVariants}
                    whileHover={{
                      y: -12,
                      scale: 1.03,
                      rotateX: 5,
                      rotateY: 5,
                      transition: { type: "spring", stiffness: 300, damping: 20 }
                    }}
                    className="group"
                  >
                    <div className={`
                    relative p-4 sm:p-6 md:p-8 rounded-2xl backdrop-blur-lg border transition-all duration-500 h-full
                    ${isDark
                        ? 'bg-gray-900/70 border-gray-700/50 hover:bg-gray-800/80'
                        : 'bg-white/90 border-gray-300/50 hover:bg-white/95'
                      }
                    ${highlightedService === service.key
                        ? 'ring-4 ring-emerald-500 ring-opacity-50'
                        : ''
                      }
                    hover:shadow-2xl
                    transform-gpu will-change-transform
                  `}>
                      {/* Glow effect */}
                      <div className={`
                      absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500
                      bg-gradient-to-r from-${service.color}-500/10 via-transparent to-${service.color}-500/10
                    `} />

                      <div className="relative z-10 flex flex-col h-full">
                        <motion.div
                          className={`text-${service.color}-400 mb-3 sm:mb-6 flex justify-center lg:justify-start`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          {service.icon}
                        </motion.div>
                        <h3 className={`text-base sm:text-xl md:text-2xl font-bold mb-1.5 sm:mb-3 text-center lg:text-left ${isDark ? 'text-white' : 'text-gray-800'}`}>
                          {service.category}
                        </h3>
                        <p className={`text-[10px] sm:text-xs md:text-sm mb-2 sm:mb-4 font-medium text-center lg:text-left text-${service.color}-400`}>
                          {service.description}
                        </p>
                        <ul className="space-y-1 sm:space-y-2 mb-3 sm:mb-6 flex-grow">
                          {service.features.map((feature, featureIdx) => (
                            <motion.li
                              key={featureIdx}
                              className={`flex items-center text-xs sm:text-sm md:text-base ${isDark ? 'text-gray-200' : 'text-gray-700'}`}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: featureIdx * 0.1 }}
                            >
                              <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mr-2 sm:mr-3 flex-shrink-0 bg-${service.color}-400`} />
                              {feature}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <p className={`text-sm sm:text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                No services found matching "{searchQuery}"
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 text-emerald-400 hover:text-emerald-300 underline"
              >
                Clear search
              </button>
            </div>
          )}
        </motion.div>

        {/* Student Project Packages - From Students Page */}
        {showStudentSection && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-center mb-2 sm:mb-4 bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent">
              🎓 Final Year Student Corner
            </h2>
            <p className={`text-center text-xs sm:text-lg mb-6 sm:mb-12 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Dedicated support for college students with affordable project packages and expert guidance
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-8">
              {/* Web Development */}
              <InteractiveCard glowColor="emerald">
                <Code className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-emerald-400 mb-2 sm:mb-4" />
                <h3 className={`text-sm sm:text-lg md:text-xl font-bold mb-1.5 sm:mb-3 ${isDark ? 'text-white' : 'text-gray-800'}`}>Web Development</h3>
                <ul className={`space-y-1 sm:space-y-2 mb-2 sm:mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-sm"><div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-emerald-400 rounded-full" />Full Stack Applications</li>
                  <li className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-sm"><div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-emerald-400 rounded-full" />React & Node.js Projects</li>
                  <li className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-sm"><div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-emerald-400 rounded-full" />E-commerce Websites</li>
                  <li className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-sm"><div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-emerald-400 rounded-full" />Portfolio Websites</li>
                </ul>
                <span className={`text-[10px] sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Duration: 1-3 weeks</span>
              </InteractiveCard>

              {/* AI/ML & GenAI */}
              <InteractiveCard glowColor="purple">
                <Brain className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-purple-400 mb-2 sm:mb-4" />
                <h3 className={`text-sm sm:text-lg md:text-xl font-bold mb-1.5 sm:mb-3 ${isDark ? 'text-white' : 'text-gray-800'}`}>AI/ML & GenAI</h3>
                <ul className={`space-y-1 sm:space-y-2 mb-2 sm:mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-sm"><div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-purple-400 rounded-full" />Machine Learning Models</li>
                  <li className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-sm"><div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-purple-400 rounded-full" />Generative AI Apps</li>
                  <li className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-sm"><div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-purple-400 rounded-full" />Chatbot Development</li>
                  <li className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-sm"><div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-purple-400 rounded-full" />Computer Vision</li>
                </ul>
                <span className={`text-[10px] sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Duration: 2-4 weeks</span>
              </InteractiveCard>

              {/* Data Science & Analysis */}
              <InteractiveCard glowColor="blue">
                <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-blue-400 mb-2 sm:mb-4" />
                <h3 className={`text-sm sm:text-lg md:text-xl font-bold mb-1.5 sm:mb-3 ${isDark ? 'text-white' : 'text-gray-800'}`}>Data Science & Analysis</h3>
                <ul className={`space-y-1 sm:space-y-2 mb-2 sm:mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-sm"><div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-blue-400 rounded-full" />Data Visualization</li>
                  <li className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-sm"><div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-blue-400 rounded-full" />Predictive Analytics</li>
                  <li className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-sm"><div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-blue-400 rounded-full" />Business Intelligence</li>
                  <li className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-sm"><div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-blue-400 rounded-full" />Statistical Analysis</li>
                </ul>
                <span className={`text-[10px] sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Duration: 1-2 weeks</span>
              </InteractiveCard>
            </div>

            {/* Register Button for Final Year Projects */}
            <div className="text-center mt-4 sm:mt-8 mb-6 sm:mb-12">
              <a
                href="https://integer-io-projectportal.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-5 py-2.5 sm:px-8 sm:py-4 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 shadow-lg hover:scale-105"
              >
                <Brain className="h-4 w-4 sm:h-5 sm:w-5" />
                Register for Final Year Project
              </a>
            </div>

            {/* ATS Resume + Portfolio in one line */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* ATS Resume */}
              <InteractiveCard glowColor="indigo">
                <div className="flex items-start gap-2.5 sm:gap-4">
                  <FileText className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-indigo-400 flex-shrink-0" />
                  <div>
                    <h3 className={`text-sm sm:text-lg md:text-xl font-bold mb-1 sm:mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>ATS-Friendly Resume</h3>
                    <p className={`text-[10px] sm:text-xs md:text-sm mb-2 sm:mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Get professional, ATS-optimized resumes that pass automated screening systems.
                    </p>
                    <a
                      href="https://wa.me/918015355914?text=Hi, I need help with ATS-friendly resume making"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 sm:gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-300"
                    >
                      Order Resume
                    </a>
                  </div>
                </div>
              </InteractiveCard>

              {/* Portfolio */}
              <InteractiveCard glowColor="pink">
                <div className="flex items-start gap-2.5 sm:gap-4">
                  <Globe className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-pink-400 flex-shrink-0" />
                  <div>
                    <h3 className={`text-sm sm:text-lg md:text-xl font-bold mb-1 sm:mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>Portfolio Website</h3>
                    <p className={`text-[10px] sm:text-xs md:text-sm mb-2 sm:mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Showcase your work with a stunning professional portfolio website.
                    </p>
                    <a
                      href="https://wa.me/918015355914?text=Hi, I need help with creating a portfolio website"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 sm:gap-2 bg-pink-500 hover:bg-pink-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-300"
                    >
                      Get Portfolio
                    </a>
                  </div>
                </div>
              </InteractiveCard>
            </div>
          </motion.div>
        )}


        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <InteractiveCard className="!p-4 sm:!p-8 md:!p-12 hover-3d">
            <h2 className="text-xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-6 bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent">
              Ready to Get Started?
            </h2>
            <p className={`text-xs sm:text-lg md:text-xl mb-4 sm:mb-8 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
              Contact us today for a free consultation and custom quote for your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href="mailto:integer.io.ai@gmail.com"
                className="border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white px-5 py-2.5 sm:px-8 sm:py-4 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 shadow-lg"
              >
                Email Us
              </a>
            </div>
          </InteractiveCard>
        </motion.div>
      </div>
    </div>
  );
};

export default Services;