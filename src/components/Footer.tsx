import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Heart,
  Instagram,
  Linkedin,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import logo from '../assets/company_logo/half_logo.webp';

const Footer: React.FC = () => {
  const { isDark } = useTheme();
  // Professional console message for recruitment
  useEffect(() => {
    console.clear();

    // Integer.IO ASCII Logo
    console.log(`%c
                                              ++++++++++++++                                    
                                         ++++++++++++++++++++++++                               
                                      ++++++++++++++  +++++++++++++++                           
                  +++++++           +++++++                     +++++++                         
                 +++++++++        ++++++                           +++++++                      
                 ++++ ++++      ++++++      ++    ++    ++           ++++++                     
                 +++++++++     +++++       +++   ++++  ++++            +++++                    
                   +++++     ++++++    ++++++++++++++++++++++++         +++++                   
           +       +++++     ++++    ++++++++++++++++++++++++++++         ++++                  
       ++++++++    +++++    ++++    +++++                    +++++         ++++                 
       +++++++++    +++++   +++     ++++                      ++++         ++++                 
       +++  ++++     +++++++        ++++              ++      ++++         +++++                
       ++++++++++      +++++++++++++++++      +++  +++++++++  ++++         +++++                
         ++++++++++       ++++++++++++++      +++ ++++  ++++  +++++++      +++++                
               +++++++++++++++++++++++++      +++ +++    ++++ ++++          +++++               
                 +++++++++++++++++++++++      +++ +++    ++++ ++++          +++++               
                                    ++++   +  +++ ++++  ++++  +++++++        +++++              
            ++++++         +++++++++++++  +++ +++  ++++++++   ++++++++        +++++             
           +++++++++    ++++++++++++++++   +                  ++++              +++++           
           +++  ++++++++++++        ++++                      ++++               ++++           
           +++++++++++++++    ++++++++++                      ++++               +++++          
            ++++++           ++++++++++++++++++++++++++++++++++++             +++++++           
                           +++++      ++++++++++++++++++++++++++             +++++              
                         +++++   +         +++   ++++  ++++                   ++++              
                  ++++++++++    +++        +++   ++++  ++++                  +++++              
                 ++++++++++     ++++                                        +++++               
                 ++++  ++++      ++++                                        ++++               
                  ++++++++       ++++                                       +++++               
                   ++++++        ++++                                       ++++                
                                 ++++                                       ++++                
                                 ++++                        ++++++        +++++                
                                 ++++                     ++++++++++++++++++++                  
                                ++++                     +++++   +++++++++++                    
                                ++++                     ++++                                   
                                ++++                     ++++                                   
                               ++++                     ++++                                    
                               +++++++++++++++++++++++++++++                                    
                               ++++++++++++++++++++++++++++                                     
`, 'color: #05e01bff; font-family: monospace;');

    // Integer.IO Text
    console.log(`%c
██╗███╗   ██╗████████╗███████╗ ██████╗ ███████╗██████╗    ██╗ ██████╗ 
██║████╗  ██║╚══██╔══╝██╔════╝██╔════╝ ██╔════╝██╔══██╗   ██║██╔═══██╗
██║██╔██╗ ██║   ██║   █████╗  ██║  ███╗█████╗  ██████╔╝   ██║██║   ██║
██║██║╚██╗██║   ██║   ██╔══╝  ██║   ██║██╔══╝  ██╔══██╗   ██║██║   ██║
██║██║ ╚████║   ██║   ███████╗╚██████╔╝███████╗██║  ██║██╗██║╚██████╔╝
╚═╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝╚═╝ ╚═════╝ 
`, 'color: #8b5cf6; font-family: monospace; font-weight: bold;');

    console.log('%c════════════════════════════════════════════════════════════════════════════════', 'color: #374151;');
    console.log('%c   🚀  INTERESTED IN JOINING OUR TEAM?', 'color: #00ffcc; font-size: 16px; font-weight: bold;');
    console.log('%c════════════════════════════════════════════════════════════════════════════════', 'color: #374151;');
    console.log('%c   📧  Email       :  integer.io.ai@gmail.com', 'color: #ffffff; font-size: 13px;');
    console.log('%c   📝  Apply Here  :  https://forms.gle/AzTZM9ccVWkFSWxP8', 'color: #00e676; font-size: 13px;');
    console.log('%c════════════════════════════════════════════════════════════════════════════════', 'color: #374151;');
    console.log('%c   ⚡  Build AI. Break Limits. Create Future.', 'color: #ff9800; font-size: 12px; font-style: italic;');
    console.log('%c════════════════════════════════════════════════════════════════════════════════', 'color: #374151;');
  }, []);

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Products', path: '/products' },
    { name: 'Contact', path: '/contact' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
  ];

  const services = [
    { name: 'Web Application Development', key: 'web-development' },
    { name: 'AI Product & Automation', key: 'ai-automation' },
    { name: 'Custom Software & SaaS', key: 'software-saas' },
    { name: 'Digital Marketing & Branding', key: 'digital-marketing' },
    { name: 'Education & Student Services', key: 'education-services' },
    { name: 'Cloud Deployment & Support', key: 'cloud-deployment' },
  ];

  return (
    <footer
      className={`relative mt-20 border-t transition-all duration-300 ${isDark
        ? 'bg-gradient-to-b from-gray-900/80 via-gray-900/60 to-gray-950/80 border-emerald-500/20 backdrop-blur-xl'
        : 'bg-gradient-to-b from-white/90 via-gray-50/80 to-white/90 border-gray-300/60 backdrop-blur-xl'
        }`}
    >
      {/* Subtle gradient and grid accents for professional feel */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden opacity-40"
      >
        <div className={`absolute -top-24 -right-24 w-80 h-80 blur-3xl rounded-full ${isDark ? 'bg-emerald-500/10' : 'bg-purple-400/10'
          }`} />
        <div className={`absolute -bottom-16 -left-24 w-96 h-96 blur-3xl rounded-full ${isDark ? 'bg-cyan-500/10' : 'bg-pink-400/10'
          }`} />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-14">
        {/* Desktop: 4 columns, Mobile: 2 columns side by side */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {/* Company Info - Full width on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="col-span-2 lg:col-span-1"
          >
            <div className="flex items-center space-x-3 mb-4">
              <img src={logo} alt="Logo" className="h-10 w-10 object-contain" />
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent">
                Integer.IO
              </span>
            </div>
            <p
              className={`mb-4 text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'
                }`}
            >
              Empowering Tamil Nadu's future through smart web & AI solutions.
            </p>
            <div className="flex space-x-2">
              <a
                href="https://wa.me/918015355914"
                className={`p-1.5 rounded-lg transition-colors border ${isDark
                  ? 'text-gray-200 border-white/10 hover:text-emerald-400'
                  : 'text-gray-600 border-gray-200 hover:text-emerald-600'
                  }`}
              >
                <Phone className="h-4 w-4" />
              </a>
              <a
                href="mailto:integer.io.ai@gmail.com"
                className={`p-1.5 rounded-lg transition-colors border ${isDark
                  ? 'text-gray-200 border-white/10 hover:text-purple-400'
                  : 'text-gray-600 border-gray-200 hover:text-purple-600'
                  }`}
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/Integer.IO/"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-1.5 rounded-lg transition-colors border ${isDark
                  ? 'text-gray-200 border-white/10 hover:text-pink-400'
                  : 'text-gray-600 border-gray-200 hover:text-pink-600'
                  }`}
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/integer-io-services/"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-1.5 rounded-lg transition-colors border ${isDark
                  ? 'text-gray-200 border-white/10 hover:text-blue-400'
                  : 'text-gray-600 border-gray-200 hover:text-blue-600'
                  }`}
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links + Legal - LEFT column on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3
              className={`text-base font-semibold tracking-wide mb-3 ${isDark ? 'text-white' : 'text-gray-900'
                }`}
            >
              Quick Links
            </h3>
            <ul className="space-y-1.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={`text-sm transition-all flex items-center ${isDark
                      ? 'text-gray-300 hover:text-emerald-400'
                      : 'text-gray-700 hover:text-emerald-600'
                      }`}
                  >
                    <ArrowRight className={`h-3 w-3 mr-1.5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h4
              className={`text-sm font-bold mt-4 mb-2 ${isDark ? 'text-white' : 'text-gray-900'
                }`}
            >
              Legal
            </h4>
            <ul className="space-y-1.5">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={`text-sm transition-all flex items-center ${isDark
                      ? 'text-gray-300 hover:text-emerald-400'
                      : 'text-gray-700 hover:text-emerald-600'
                      }`}
                  >
                    <ArrowRight className={`h-3 w-3 mr-1.5 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Our Services - RIGHT column on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3
              className={`text-sm font-semibold tracking-wide mb-2 ${isDark ? 'text-white' : 'text-gray-900'
                }`}
            >
              Our Services
            </h3>
            <ul className="space-y-1.5">
              {services.map((service) => (
                <li key={service.key}>
                  <Link
                    to={`/services?service=${service.key}`}
                    className={`text-sm transition-all flex items-center ${isDark
                      ? 'text-gray-300 hover:text-emerald-400'
                      : 'text-gray-700 hover:text-emerald-600'
                      }`}
                  >
                    <ArrowRight className={`h-3 w-3 mr-1.5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info LEFT + Business Hours RIGHT - on larger screens combined */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="col-span-2 lg:col-span-1"
          >
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-1 lg:gap-0">
              {/* Contact Info */}
              <div>
                <h3
                  className={`text-sm font-semibold tracking-wide mb-2 ${isDark ? 'text-white' : 'text-gray-900'
                    }`}
                >
                  Contact Info
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Phone className={`h-4 w-4 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                    <a href="tel:8015355914" className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      +91 8015355914
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className={`h-4 w-4 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
                    <a href="mailto:integer.io.ai@gmail.com" className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      integer.io.ai@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className={`h-4 w-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                    <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Tamil Nadu, India
                    </span>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="lg:mt-4">
                <h4 className={`text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Business Hours
                </h4>
                <div className={`text-sm space-y-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <p>Mon-Sat: 9AM - 8PM</p>
                  <p>Sunday: 10AM - 6PM</p>
                  <p className="text-emerald-400 text-xs">24/7 WhatsApp Support</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`mt-10 pt-8 border-t flex flex-col md:flex-row justify-between items-center ${isDark ? 'border-gray-800' : 'border-gray-200'
            }`}
        >
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
            <p
              className={`text-sm flex items-center ${isDark ? 'text-gray-400' : 'text-gray-500'
                }`}
            >
              © 2024 Integer.IO Services. Crafted with{' '}
              <Heart className="h-4 w-4 text-red-500 mx-1 animate-pulse" /> by
              <Link
                to="/admin"
                className={`ml-1 hover:text-emerald-400 transition-colors ${isDark ? 'text-gray-200' : 'text-gray-600'}`}
              >
                MS Kawin
              </Link>
            </p>
            <div className="flex items-center space-x-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
                className="text-emerald-400"
              >
                🚀
              </motion.div>
              <span
                className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'
                  }`}
              >
                Launching Dreams into Digital Reality
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-end mt-4 md:mt-0">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-emerald-400">●</span>
              <span
                className={`text-sm font-medium ${isDark ? 'text-emerald-400' : 'text-emerald-600'
                  }`}
              >
                Trusted Worldwide
              </span>
            </div>
            <div className={`flex items-center space-x-3 text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              <span>Web Dev</span>
              <span>•</span>
              <span>AI/ML</span>
              <span>•</span>
              <span>Marketing</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
