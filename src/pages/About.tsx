import React, { useState } from 'react';
import {
  Target,
  Award,
  Code,
  Mail,
  Phone,
  Linkedin,
  Globe,
  HeadphonesIcon,
  Rocket,
  Lightbulb,
  Heart,
} from 'lucide-react';
import { motion } from 'framer-motion';
import InteractiveCard from '../components/InteractiveCard';
import { useTheme } from '../contexts/ThemeContext';
import logo from '../assets/company_logo/hand.webp';
import ReviewCarousel from '../components/ReviewCarousel';

// Add these styles to your CSS file or add as a style tag in your component
const flipCardStyles = `
.perspective-1000 {
  perspective: 1000px;
}

.transform-style-3d {
  transform-style: preserve-3d;
}

.backface-hidden {
  backface-visibility: hidden;
}

.rotate-y-180 {
  transform: rotateY(180deg);
}
`;

const About = () => {
  const { isDark } = useTheme();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const teamMembers = [
    {
      name: 'Kawin M.S.',
      role: 'Founder & CEO',
      description: 'Leads the company vision, projects, and development. Expert in AI/ML, web development, and business strategy.',
      email: 'integeriokawin@gmail.com',
      phone: '+91 8015355914',
      linkedin: 'https://www.linkedin.com/in/kawin-m-s-570961285/',
      portfolio: 'https://kawin-portfolio.netlify.app/',
      image: 'https://i.postimg.cc/28DQW47p/kawin-removebg-preview.png',
      color: 'emerald',
    },
    {
      name: 'Livan',
      role: 'Creative Director',
      description: 'Manages video editing, YouTube content, Instagram marketing, and creative design projects.',
      email: 'integeriolivan@gmail.com',
      phone: '+91 6385243064',
      linkedin: 'https://linkedin.com/in/livan',
      image: 'https://i.postimg.cc/pTgPMDzN/IMG-20250426-WA0007-1-removebg-preview.png',
      color: 'indigo',
    },
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      emerald: 'from-emerald-500 to-emerald-400',
      purple: 'from-purple-500 to-purple-400',
      blue: 'from-blue-500 to-blue-400',
      pink: 'from-pink-500 to-pink-400',
      indigo: 'from-indigo-500 to-indigo-400',
      cyan: 'from-cyan-500 to-cyan-400',
    };
    return colorMap[color as keyof typeof colorMap] || 'from-emerald-500 to-emerald-400';
  };

  const values = [
    {
      icon: <Lightbulb className="h-10 w-10" />,
      title: 'Innovation',
      description: 'We embrace cutting-edge technologies to deliver modern solutions.',
      color: 'emerald',
    },
    {
      icon: <Heart className="h-10 w-10" />,
      title: 'Passion',
      description: 'Every project is crafted with dedication and enthusiasm.',
      color: 'pink',
    },
    {
      icon: <Award className="h-10 w-10" />,
      title: 'Excellence',
      description: 'We strive for quality in every line of code we write.',
      color: 'purple',
    },
    {
      icon: <Rocket className="h-10 w-10" />,
      title: 'Growth',
      description: 'We help businesses scale and reach new heights.',
      color: 'blue',
    },
  ];

  return (
    <div className="relative min-h-screen pt-20">
      {/* Inject flip card styles */}
      <style>{flipCardStyles}</style>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 pb-8"
        >
          <h1
            className={`text-4xl md:text-6xl font-bold ${isDark
              ? 'bg-gradient-to-r from-emerald-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'
              : 'text-gray-900'
              }`}
            style={{ lineHeight: '1.3', paddingBottom: '0.4rem', letterSpacing: '0.02em' }}
          >
            About Integer.IO
          </h1>
        </motion.div>

        {/* Company Introduction Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent">
            Our Mission
          </h2>
          <InteractiveCard glowColor="emerald" className="p-6 sm:p-8 md:p-12">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="w-32 h-32 sm:w-36 sm:h-36 md:w-44 md:h-44 flex-shrink-0"
              >
                <div
                  className={`w-full h-full rounded-full flex items-center justify-center border-4 overflow-hidden shadow-xl ${isDark
                    ? 'border-emerald-400/50 shadow-emerald-500/20'
                    : 'bg-gradient-to-r from-emerald-100/10 to-purple-500/10 border-emerald-500/50 shadow-emerald-500/10'
                    }`}
                >
                  <img
                    src={logo}
                    alt="Integer.IO Services Logo"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </motion.div>

              <div className="flex-1">
                <div className="text-center lg:text-left mb-6">
                  <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    Empowering Digital Transformation
                  </h3>
                  <p className={`text-base sm:text-lg leading-relaxed mb-4 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                    Integer.IO Services is a leading digital solutions provider founded with a vision to
                    <span className="text-emerald-400 font-semibold"> democratize technology</span> for
                    businesses of all sizes. We specialize in web development, AI/ML solutions, billing software,
                    and digital marketing.
                  </p>
                  <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Our mission is to make cutting-edge technology
                    <span className="text-purple-400 font-semibold"> accessible and affordable</span> for
                    everyone—from startups and small businesses to students working on their final year projects.
                    We transform ideas into reality with innovation, excellence, and personalized support.
                  </p>
                </div>

                {/* Key Stats */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="text-center p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20">
                    <div className="text-2xl md:text-3xl font-bold text-emerald-400">30+</div>
                    <div className={`text-xs md:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Happy Clients</div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20">
                    <div className="text-2xl md:text-3xl font-bold text-purple-400">50+</div>
                    <div className={`text-xs md:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Projects Done</div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border border-cyan-500/20">
                    <div className="text-2xl md:text-3xl font-bold text-cyan-400">24/7</div>
                    <div className={`text-xs md:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Support</div>
                  </div>
                </div>
              </div>
            </div>
          </InteractiveCard>
        </motion.div>

        {/* Client Reviews Section */}
        <motion.div
          id="client-reviews"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 scroll-mt-24"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent">
            Client Reviews
          </h2>
          <ReviewCarousel />
        </motion.div>

        {/* Our Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent">
            Our Values
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <InteractiveCard glowColor={value.color as 'emerald' | 'purple' | 'pink' | 'blue'} className="p-6 h-full">
                  <div className="flex flex-col items-center text-center">
                    <div className={`mb-4 text-${value.color}-400`}>
                      {value.icon}
                    </div>
                    <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                      {value.title}
                    </h3>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {value.description}
                    </p>
                  </div>
                </InteractiveCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Section with Wide Rectangle Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 pt-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent">
            Our Team
          </h2>

          {/* Wide Rectangle Cards - 2 in a row on PC */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative perspective-1000"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  className={`relative w-full transition-transform duration-500 transform-style-3d ${hoveredCard === index ? 'rotate-y-180' : ''}`}
                  style={{ minHeight: '220px' }}
                >
                  {/* Front Face - Wide Rectangle */}
                  <div
                    className={`absolute w-full h-full backface-hidden rounded-xl overflow-hidden transition-all duration-300 ${isDark
                      ? 'bg-white/5 backdrop-blur-md border border-white/10'
                      : 'bg-white/70 backdrop-blur-md border border-gray-200/50'
                      } shadow-lg`}
                  >
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${getColorClasses(member.color)}`} />
                    <div className="p-6 h-full flex flex-row items-center gap-6">
                      <div className={`w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 flex-shrink-0 ${isDark ? 'border-white/50' : 'border-gray-300/50'}`}>
                        <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h3 className={`text-xl md:text-2xl font-bold mb-1 bg-gradient-to-r ${getColorClasses(member.color)} bg-clip-text text-transparent`}>
                          {member.name}
                        </h3>
                        <p className={`text-sm font-medium mb-2 bg-gradient-to-r ${getColorClasses(member.color)} bg-clip-text text-transparent`}>
                          {member.role}
                        </p>
                        <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          {member.description}
                        </p>
                        <div className="text-xs text-gray-400 mt-3">Hover for contact details</div>
                      </div>
                    </div>
                  </div>

                  {/* Back Face - Contact Details */}
                  <div
                    className={`absolute w-full h-full backface-hidden rounded-xl overflow-hidden rotate-y-180 transition-all duration-300 ${isDark
                      ? 'bg-white/5 backdrop-blur-md border border-white/10'
                      : 'bg-white/70 backdrop-blur-md border border-gray-200/50'
                      } shadow-lg`}
                  >
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${getColorClasses(member.color)}`} />
                    <div className="p-6 h-full flex flex-col justify-center">
                      <h3 className={`text-xl font-bold mb-4 text-center bg-gradient-to-r ${getColorClasses(member.color)} bg-clip-text text-transparent`}>
                        Contact Details
                      </h3>
                      <div className="space-y-4">
                        <a href={`mailto:${member.email}`} className={`flex items-center space-x-2 text-sm ${isDark ? 'text-white hover:text-emerald-400' : 'text-gray-800 hover:text-emerald-600'} transition-colors`}>
                          <Mail className="h-4 w-4" />
                          <span className="truncate">{member.email}</span>
                        </a>
                        <a href={`tel:${member.phone}`} className={`flex items-center space-x-2 text-sm ${isDark ? 'text-white hover:text-emerald-400' : 'text-gray-800 hover:text-emerald-600'} transition-colors`}>
                          <Phone className="h-4 w-4" />
                          <span>{member.phone}</span>
                        </a>
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className={`flex items-center space-x-2 text-sm ${isDark ? 'text-white hover:text-emerald-400' : 'text-gray-800 hover:text-emerald-600'} transition-colors`}>
                          <Linkedin className="h-4 w-4" />
                          <span>LinkedIn</span>
                        </a>
                        {member.portfolio && (
                          <a href={member.portfolio} target="_blank" rel="noopener noreferrer" className={`flex items-center space-x-2 text-sm ${isDark ? 'text-white hover:text-emerald-400' : 'text-gray-800 hover:text-emerald-600'} transition-colors`}>
                            <Globe className="h-4 w-4" />
                            <span>Portfolio</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent">
            Why Choose Us
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <InteractiveCard glowColor="emerald" className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${isDark ? 'bg-emerald-500/20' : 'bg-emerald-100'}`}>
                  <Target className={`h-8 w-8 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                </div>
                <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-800'}`}>Precision Focused</h3>
                <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>We deliver exactly what you need with attention to every detail</p>
              </div>
            </InteractiveCard>

            <InteractiveCard glowColor="purple" className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${isDark ? 'bg-purple-500/20' : 'bg-purple-100'}`}>
                  <Code className={`h-8 w-8 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
                </div>
                <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-800'}`}>Modern Technology</h3>
                <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>Built with the latest tools and frameworks for optimal performance</p>
              </div>
            </InteractiveCard>

            <InteractiveCard glowColor="blue" className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${isDark ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
                  <HeadphonesIcon className={`h-8 w-8 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
                <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-800'}`}>24/7 Support</h3>
                <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>Round-the-clock assistance to ensure your success</p>
              </div>
            </InteractiveCard>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
