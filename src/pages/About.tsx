import React, { useState } from 'react';
import {
  Award,
  Mail,
  Phone,
  Linkedin,
  Globe,
  Rocket,
  Lightbulb,
  Heart,
} from 'lucide-react';
import { motion } from 'framer-motion';
import InteractiveCard from '../components/InteractiveCard';
import { useTheme } from '../contexts/ThemeContext';
import logo from '../assets/company_logo/hand.webp';
import ReviewCarousel from '../components/ReviewCarousel';
import kawin from '../assets/team/kawin.webp'
import livan from '../assets/team/livan.webp'
import muthulakshmi from '../assets/team/muthulakshmi.webp'

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
      image: kawin,
      color: 'emerald',
    },
    {
      name: 'Livan',
      role: 'Creative Director',
      description: 'Manages video editing, YouTube content, Instagram marketing, and creative design projects.',
      email: 'integeriolivan@gmail.com',
      phone: '+91 6385243064',
      linkedin: 'https://linkedin.com/in/livan',
      image: livan,
      color: 'indigo',
    },
    {
      name: 'Muthulakshmi',
      role: 'Operations & QA Executive',
      description: 'Oversees profit/loss and supports client communication. Manages financial planning and stakeholder relations.',
      email: 'integeriofinance@gmail.com',
      phone: '+91 8015355914',
      linkedin: 'https://linkedin.com/in/muthulakshmi',
      image: muthulakshmi,
      color: 'pink',
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

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-12">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6 sm:mb-10 pb-4 sm:pb-8"
        >
          <h1
            className={`text-2xl sm:text-4xl md:text-6xl font-bold ${isDark
              ? 'bg-gradient-to-r from-emerald-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'
              : 'bg-gradient-to-r from-purple-900 via-indigo-800 to-emerald-800 bg-clip-text text-transparent'
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
          <h2 className={`text-xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-12 bg-gradient-to-r bg-clip-text text-transparent ${isDark
            ? 'from-emerald-400 to-purple-400'
            : 'from-purple-800 to-emerald-700'
            }`}>
            Our Mission
          </h2>
          <InteractiveCard glowColor="emerald" className="!p-4 sm:!p-6 md:!p-12">
            <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-8 lg:gap-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="w-24 h-24 sm:w-32 sm:h-32 md:w-44 md:h-44 flex-shrink-0"
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
                  <h3 className={`text-lg sm:text-2xl font-bold mb-2 sm:mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    Empowering Digital Transformation
                  </h3>
                  <p className={`text-xs sm:text-base lg:text-lg leading-relaxed mb-3 sm:mb-4 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                    Integer.IO Services is a leading digital solutions provider founded with a vision to
                    <span className="text-emerald-400 font-semibold"> democratize technology</span> for
                    businesses of all sizes. We specialize in web development, AI/ML solutions, billing software,
                    and digital marketing.
                  </p>
                  <p className={`text-xs sm:text-base lg:text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Our mission is to make cutting-edge technology
                    <span className="text-purple-400 font-semibold"> accessible and affordable</span> for
                    everyone—from startups and small businesses to students working on their final year projects.
                    We transform ideas into reality with innovation, excellence, and personalized support.
                  </p>
                </div>

                {/* Key Stats */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-4 sm:mt-6">
                  <div className="text-center p-2 sm:p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20">
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold text-emerald-400">30+</div>
                    <div className={`text-[10px] sm:text-xs md:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Happy Clients</div>
                  </div>
                  <div className="text-center p-2 sm:p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20">
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-400">50+</div>
                    <div className={`text-[10px] sm:text-xs md:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Projects Done</div>
                  </div>
                  <div className="text-center p-2 sm:p-4 rounded-xl bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border border-cyan-500/20">
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold text-cyan-400">24/7</div>
                    <div className={`text-[10px] sm:text-xs md:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Support</div>
                  </div>
                </div>
              </div>
            </div>
          </InteractiveCard>
        </motion.div>

        {/* Team Section with Square Cards - 3 in a row on PC */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-16 pt-4 sm:pt-8"
        >
          <h2 className={`text-xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-12 bg-gradient-to-r bg-clip-text text-transparent ${isDark
            ? 'from-emerald-400 to-purple-400'
            : 'from-purple-800 to-emerald-700'
            }`}>
            Our Team
          </h2>

          {/* Square Cards - 3 in a row on PC */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative perspective-1000"
              >
                <div
                  className={`relative w-full transition-transform duration-700 transform-style-3d ${hoveredCard === index ? 'rotate-y-180' : ''}`}
                  style={{ minHeight: '280px' }}
                >
                  {/* Front Face - Square Card with Border */}
                  <div
                    className={`absolute w-full h-full backface-hidden rounded-xl overflow-hidden transition-all duration-300 ${isDark
                      ? 'bg-white/5 backdrop-blur-md border border-emerald-500/30'
                      : 'bg-white/70 backdrop-blur-md border border-emerald-400/40'
                      } shadow-lg`}
                  >
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${getColorClasses(member.color)}`} />
                    <div className="p-4 sm:p-6 h-full flex flex-col items-center text-center">
                      <div className={`w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 mb-3 sm:mb-4 ${isDark ? 'border-emerald-400/40' : 'border-emerald-500/30'}`}>
                        <img src={member.image} alt={member.name} className="w-full h-full object-cover object-center" />
                      </div>
                      <h3 className={`text-lg sm:text-xl font-bold mb-1 bg-gradient-to-r ${getColorClasses(member.color)} bg-clip-text text-transparent`}>
                        {member.name}
                      </h3>
                      <p className={`text-sm font-medium mb-3 bg-gradient-to-r ${getColorClasses(member.color)} bg-clip-text text-transparent`}>
                        {member.role}
                      </p>
                      <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'} line-clamp-3`}>
                        {member.description}
                      </p>
                    </div>
                  </div>

                  {/* Back Face - Contact Details with Border */}
                  <div
                    className={`absolute w-full h-full backface-hidden rounded-xl overflow-hidden rotate-y-180 transition-all duration-300 ${isDark
                      ? 'bg-white/5 backdrop-blur-md border border-emerald-500/30'
                      : 'bg-white/70 backdrop-blur-md border border-emerald-400/40'
                      } shadow-lg`}
                  >
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${getColorClasses(member.color)}`} />
                    <div className="p-4 sm:p-6 h-full flex flex-col justify-center">
                      <h3 className={`text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-center bg-gradient-to-r ${getColorClasses(member.color)} bg-clip-text text-transparent`}>
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

                {/* Floating Contact Button */}
                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => setHoveredCard(hoveredCard === index ? null : index)}
                    className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 shadow-lg hover:scale-105 ${hoveredCard === index
                      ? 'bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white'
                      : 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white'
                      }`}
                  >
                    <Mail className="h-4 w-4" />
                    {hoveredCard === index ? 'Back' : 'Contact'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Client Reviews Section */}
        <motion.div
          id="client-reviews"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 scroll-mt-24"
        >
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r bg-clip-text text-transparent ${isDark
            ? 'from-emerald-400 to-purple-400'
            : 'from-purple-800 to-emerald-700'
            }`}>
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
          <h2 className={`text-xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-12 bg-gradient-to-r bg-clip-text text-transparent ${isDark
            ? 'from-emerald-400 to-purple-400'
            : 'from-purple-800 to-emerald-700'
            }`}>
            Our Values
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <InteractiveCard glowColor={value.color as 'emerald' | 'purple' | 'pink' | 'blue'} className="h-full">
                  <div className="flex flex-col items-center text-center">
                    <div className={`mb-2 sm:mb-4 text-${value.color}-400`}>
                      {React.cloneElement(value.icon, { className: 'h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10' })}
                    </div>
                    <h3 className={`text-sm sm:text-base md:text-lg font-bold mb-1 sm:mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                      {value.title}
                    </h3>
                    <p className={`text-[10px] sm:text-xs md:text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {value.description}
                    </p>
                  </div>
                </InteractiveCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
