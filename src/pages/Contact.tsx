import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  CheckCircle,
  Instagram,
  Linkedin,
  Youtube,
  Globe,
  Users,
  Star,
} from 'lucide-react';
import InteractiveCard from '../components/InteractiveCard';
import { useTheme } from '../contexts/ThemeContext';

const Contact = () => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      const subject = `Service Inquiry: ${formData.service}`;
      const body = `Name: ${formData.name}%0D%0APhone: ${formData.phone}%0D%0AEmail: ${formData.email}%0D%0AService: ${formData.service}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;

      // Open email client
      window.open(
        `mailto:Integer.IO.ai@gmail.com?subject=${subject}&body=${body}`
      );

      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          phone: '',
          email: '',
          service: '',
          message: '',
        });
      }, 3000);
    }, 1000);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const teamContacts = [
    {
      role: 'CEO',
      name: 'Kawin M.S.',
      phone: '+91 8015355914',
      email: 'integeriokawin@gmail.com',
      color: 'emerald',
      linkedin: 'https://www.linkedin.com/in/kawin-m-s-570961285/',
    },
    {
      role: 'Creative Director',
      name: 'Livan',
      phone: '+91 6385243064',
      email: 'integeriolivan@gmail.com',
      color: 'indigo',
      linkedin: 'https://linkedin.com/in/livan',
    },
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      emerald: 'text-emerald-400 hover:text-emerald-400 hover:bg-emerald-400/10',
      purple: 'text-purple-400 hover:text-purple-400 hover:bg-purple-400/10',
      blue: 'text-blue-400 hover:text-blue-400 hover:bg-blue-400/10',
      pink: 'text-pink-400 hover:text-pink-400 hover:bg-pink-400/10',
      indigo: 'text-indigo-400 hover:text-indigo-400 hover:bg-indigo-400/10',
    };
    return colorMap[color as keyof typeof colorMap] || 'text-emerald-400 hover:text-emerald-400 hover:bg-emerald-400/10';
  };

  const getGlowClasses = (color: string) => {
    const glowMap = {
      emerald: 'hover:shadow-emerald-500/20',
      purple: 'hover:shadow-purple-500/20',
      blue: 'hover:shadow-blue-500/20',
      pink: 'hover:shadow-pink-500/20',
      indigo: 'hover:shadow-indigo-500/20',
    };
    return glowMap[color as keyof typeof glowMap] || 'hover:shadow-emerald-500/20';
  };

  const getGradientClasses = (color: string) => {
    const gradientMap = {
      emerald: 'from-emerald-500/10 via-transparent to-emerald-500/10',
      purple: 'from-purple-500/10 via-transparent to-purple-500/10',
      blue: 'from-blue-500/10 via-transparent to-blue-500/10',
      pink: 'from-pink-500/10 via-transparent to-pink-500/10',
      indigo: 'from-indigo-500/10 via-transparent to-indigo-500/10',
    };
    return gradientMap[color as keyof typeof gradientMap] || 'from-emerald-500/10 via-transparent to-emerald-500/10';
  };

  return (
    <div className="relative min-h-screen pt-20">
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${isDark
            ? 'bg-gradient-to-r from-emerald-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'
            : 'text-gray-900'
            }`}>
            Contact Us
          </h1>
          <p className={`text-xl font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
            Ready to transform your ideas into reality? Get in touch with
            Integer.IO Services today!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col"
          >
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent">
              Get In Touch
            </h2>

            <div className="space-y-6 mb-8">
              <InteractiveCard glowColor="emerald" className="hover-3d">
                <div className="flex items-center space-x-4">
                  <Phone className="h-8 w-8 text-emerald-400" />
                  <div>
                    <h3
                      className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'
                        }`}
                    >
                      Phone / WhatsApp
                    </h3>
                    <a
                      href="tel:8015355914"
                      className="text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      +91 8015355914
                    </a>
                  </div>
                </div>
              </InteractiveCard>

              <InteractiveCard glowColor="purple" className="hover-3d">
                <div className="flex items-center space-x-4">
                  <Mail className="h-8 w-8 text-purple-400" />
                  <div>
                    <h3
                      className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'
                        }`}
                    >
                      Email
                    </h3>
                    <a
                      href="mailto:integer.io.ai@gmail.com"
                      className="text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      integer.io.ai@gmail.com
                    </a>
                  </div>
                </div>
              </InteractiveCard>

              <InteractiveCard glowColor="pink" className="hover-3d">
                <div className="flex items-center space-x-4">
                  <Youtube className="h-8 w-8 text-red-400" />
                  <div>
                    <h3
                      className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'
                        }`}
                    >
                      YouTube Channel
                    </h3>
                    <a
                      href="https://youtube.com/@integerio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      @integerio
                    </a>
                  </div>
                </div>
              </InteractiveCard>

              <InteractiveCard glowColor="pink" className="hover-3d">
                <div className="flex items-center space-x-4">
                  <Instagram className="h-8 w-8 text-pink-400" />
                  <div>
                    <h3
                      className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'
                        }`}
                    >
                      Instagram
                    </h3>
                    <a
                      href="https://instagram.com/Integer.IO.services"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-400 hover:text-pink-300 transition-colors"
                    >
                      @Integer.IO.services
                    </a>
                  </div>
                </div>
              </InteractiveCard>

              <InteractiveCard glowColor="blue" className="hover-3d">
                <div className="flex items-center space-x-4">
                  <Linkedin className="h-8 w-8 text-blue-400" />
                  <div>
                    <h3
                      className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'
                        }`}
                    >
                      LinkedIn
                    </h3>
                    <a
                      href="https://linkedin.com/company/integer-io-services"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Integer.IO Services
                    </a>
                  </div>
                </div>
              </InteractiveCard>

              <InteractiveCard glowColor="cyan" className="hover-3d">
                <div className="flex items-center space-x-4">
                  <MapPin className="h-8 w-8 text-teal-400" />
                  <div>
                    <h3
                      className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'
                        }`}
                    >
                      Service Areas
                    </h3>
                    <div className="space-y-1">
                      <p className="text-teal-400 flex items-center">
                        <Globe className="h-4 w-4 mr-2" />
                        Online Clients: Worldwide
                      </p>
                      <p className="text-teal-400 flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        Offline Clients: Madurai, Coimbatore, Chennai, Bangalore
                      </p>
                    </div>
                  </div>
                </div>
              </InteractiveCard>
            </div>


          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            id="contact-form"
          >
            <InteractiveCard
              glowColor="emerald"
              className="p-8 hover-3d"
              noTilt={true}
            >
              <h2
                className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-800'
                  }`}
              >
                Send us a Message
              </h2>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3
                    className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-800'
                      }`}
                  >
                    Message Sent Successfully!
                  </h3>
                  <p
                    className={`${isDark ? 'text-gray-200' : 'text-gray-700'}`}
                  >
                    We'll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'
                        }`}
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-emerald-500 transition-colors ${isDark
                        ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
                        }`}
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'
                        }`}
                    >
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-emerald-500 transition-colors ${isDark
                        ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
                        }`}
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'
                        }`}
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-emerald-500 transition-colors ${isDark
                        ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
                        }`}
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="service"
                      className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'
                        }`}
                    >
                      Service Interested In *
                    </label>
                    <select
                      id="service"
                      name="service"
                      required
                      value={formData.service}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-emerald-500 transition-colors ${isDark
                        ? 'bg-gray-800 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-800'
                        }`}
                    >
                      <option value="">Select a service</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Logo & Poster Design">Logo & Poster Design</option>
                      <option value="AI & ML Projects">AI & ML Projects</option>
                      <option value="Data Analytics">Data Analytics</option>
                      <option value="Business Automation">Business Automation</option>
                      <option value="Digital Marketing">Digital Marketing</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'
                        }`}
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-emerald-500 transition-colors resize-none ${isDark
                        ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
                        }`}
                      placeholder="Tell us about your project requirements..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center group shadow-lg btn-hover-effect hover:scale-105"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>

                  {/* Quick Action Buttons - 3 in one row */}
                  <div className="mt-4 flex gap-2">
                    <a
                      href="/about#client-reviews"
                      className="flex-1 flex items-center justify-center gap-1.5 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white px-3 py-3 rounded-lg font-semibold text-sm transition-all duration-300 shadow-lg hover:scale-105"
                    >
                      <Star className="h-4 w-4" />
                      Review
                    </a>
                    <a
                      href="tel:8015355914"
                      className="flex-1 flex items-center justify-center gap-1.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-3 py-3 rounded-lg font-semibold text-sm transition-all duration-300 shadow-lg hover:scale-105"
                    >
                      <Phone className="h-4 w-4" />
                      Call
                    </a>
                    <a
                      href="https://wa.me/918015355914"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-3 py-3 rounded-lg font-semibold text-sm transition-all duration-300 shadow-lg hover:scale-105"
                    >
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp
                    </a>
                  </div>
                </form>
              )}
            </InteractiveCard>
          </motion.div>
        </div>

        {/* Contact Our Team - Moved below form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-16 mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent">
            Contact Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {teamContacts.map((contact, index) => (
              <motion.div
                key={`team-bottom-${contact.role}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <InteractiveCard glowColor={contact.color as 'emerald' | 'purple'} className="p-6 text-center h-full">
                  <h3 className={`text-lg font-bold mb-2 ${getColorClasses(contact.color).split(' ')[0]}`}>
                    {contact.role}
                  </h3>
                  <h4 className={`text-md font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    {contact.name}
                  </h4>
                  <div className="space-y-2">
                    <a
                      href={`tel:${contact.phone.replace(/\s/g, '')}`}
                      className={`block text-sm transition-colors ${isDark ? 'text-gray-200' : 'text-gray-700'} ${getColorClasses(contact.color)}`}
                    >
                      {contact.phone}
                    </a>
                    <a
                      href={`mailto:${contact.email}`}
                      className={`block text-sm transition-colors break-words ${isDark ? 'text-gray-200' : 'text-gray-700'} ${getColorClasses(contact.color)}`}
                    >
                      {contact.email}
                    </a>
                    <div className="flex justify-center mt-4 pt-3 border-t border-gray-200/20">
                      <a
                        href={contact.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-lg transition-colors hover:bg-blue-500/20 hover:text-blue-400 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </InteractiveCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Business Hours */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-16"
        >
          <InteractiveCard className="p-8 text-center hover-3d">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent">
              Business Hours
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3
                  className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-800'
                    }`}
                >
                  Regular Hours
                </h3>
                <p className={isDark ? 'text-gray-200' : 'text-gray-700'}>
                  Monday - Saturday: 9:00 AM - 8:00 PM
                </p>
                <p className={isDark ? 'text-gray-200' : 'text-gray-700'}>
                  Sunday: 10:00 AM - 6:00 PM
                </p>
              </div>
              <div>
                <h3
                  className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-800'
                    }`}
                >
                  Emergency Support
                </h3>
                <p className={isDark ? 'text-gray-200' : 'text-gray-700'}>
                  24/7 WhatsApp support for urgent queries
                </p>
                <p className={isDark ? 'text-gray-200' : 'text-gray-700'}>
                  Response within 2-4 hours
                </p>
              </div>
            </div>
          </InteractiveCard>
        </motion.div>


      </div>
    </div>
  );
};

export default Contact;
