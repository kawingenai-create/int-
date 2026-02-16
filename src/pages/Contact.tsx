import React, { useState, useEffect } from 'react';
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
  XCircle,
} from 'lucide-react';
import InteractiveCard from '../components/InteractiveCard';
import { useTheme } from '../contexts/ThemeContext';
import ReviewFormModal from '../components/ReviewFormModal';

const Contact = () => {
  const { isDark } = useTheme();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: [] as string[], // Changed to array for multi-select
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [showServiceDropdown, setShowServiceDropdown] = useState(false);

  // Auto-scroll to form if hash is present
  useEffect(() => {
    if (window.location.hash === '#contact-form') {
      setTimeout(() => {
        document.getElementById('contact-form')?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 100);
    }
  }, []);

  // Validation function
  const validateForm = (): boolean => {
    setValidationError('');

    // Name validation (text only)
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(formData.name.trim())) {
      setValidationError('Name must contain only letters and spaces');
      return false;
    }

    // Phone validation (exactly 10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone.trim())) {
      setValidationError('Phone number must be exactly 10 digits');
      return false;
    }

    // Service validation (at least one selected)
    if (formData.service.length === 0) {
      setValidationError('Please select at least one service');
      return false;
    }

    // Message validation (min 25 characters)
    if (formData.message.trim().length < 10) {
      setValidationError('Message must be at least 10 characters long');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setValidationError('');

    try {
      // Submit to database
      const { submitContactForm } = await import('../lib/supabase');
      const success = await submitContactForm({
        ...formData,
        service: formData.service.join(', ') // Convert array to string
      });

      if (success) {
        setIsSubmitted(true);

        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: '',
            phone: '',
            email: '',
            service: [],
            message: '',
          });
        }, 3000);
      } else {
        setValidationError('Failed to submit enquiry. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setValidationError('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
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

  // Handle service checkbox toggle
  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      service: prev.service.includes(service)
        ? prev.service.filter(s => s !== service)
        : [...prev.service, service]
    }));
  };

  const services = [
    'Web Development',

    'AI Apps & Integration (Chatbot)',
    'Final Year Projects',
    'Digital Marketing',
    'Video/Logo Designing',
    'Portfolio (Students/Employees)',
    'Billing Software',
    'Mobile App Development',
    'Data Analytics'
  ];

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
            : 'bg-gradient-to-r from-purple-900 via-indigo-800 to-emerald-800 bg-clip-text text-transparent'
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
            <h2 className={`text-3xl font-bold mb-8 bg-gradient-to-r bg-clip-text text-transparent ${isDark
              ? 'from-emerald-400 to-purple-400'
              : 'from-purple-800 to-emerald-700'
              }`}>
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
                  <Youtube className={`h-8 w-8 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
                  <div>
                    <h3
                      className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'
                        }`}
                    >
                      YouTube Channel
                    </h3>
                    <a
                      href="https://www.youtube.com/@integer-io"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`transition-colors ${isDark ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-500'}`}
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
                        Offline Clients: Madurai, Coimbatore, Chennai
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
                    Enquiry Submitted Successfully!
                  </h3>
                  <p
                    className={`${isDark ? 'text-gray-200' : 'text-gray-700'}`}
                  >
                    We'll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <>
                  {validationError && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg">
                      <p className="text-red-500 text-sm">{validationError}</p>
                    </div>
                  )}
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
                        className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'
                          }`}
                      >
                        Services Interested In * ({formData.service.length} selected)
                      </label>
                      <div className="relative">
                        {/* Selected Services Display */}
                        <div
                          onClick={() => setShowServiceDropdown(!showServiceDropdown)}
                          className={`w-full min-h-[48px] px-3 py-2 border rounded-lg cursor-pointer focus:outline-none focus:border-emerald-500 transition-colors ${isDark
                            ? 'bg-gray-800 border-gray-600'
                            : 'bg-white border-gray-300'
                            }`}
                        >
                          {formData.service.length === 0 ? (
                            <div className={`py-1.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              Select services
                            </div>
                          ) : (
                            <div className="flex flex-wrap gap-2">
                              {formData.service.map((service) => (
                                <span
                                  key={service}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 text-white text-sm rounded-full font-medium"
                                >
                                  {service}
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleServiceToggle(service);
                                    }}
                                    className="flex items-center justify-center w-4 h-4 bg-red-500 hover:bg-red-600 rounded-full transition-colors"
                                  >
                                    <svg
                                      className="w-3 h-3"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                  </button>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Dropdown Menu */}
                        {showServiceDropdown && (
                          <div
                            className={`absolute z-10 w-full mt-2 rounded-lg shadow-lg border max-h-64 overflow-y-auto ${isDark
                              ? 'bg-gray-800 border-gray-600'
                              : 'bg-white border-gray-300'
                              }`}
                          >
                            <div className="sticky top-0 right-0 flex justify-end p-2 bg-inherit z-20 border-b border-inherit">
                              <button
                                type="button"
                                onClick={() => setShowServiceDropdown(false)}
                                className={`p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                              >
                                <XCircle className="w-5 h-5" />
                              </button>
                            </div>
                            {services.map((service) => (
                              <label
                                key={service}
                                className={`flex items-center px-4 py-3 cursor-pointer hover:bg-opacity-10 transition-colors ${isDark
                                  ? 'hover:bg-white'
                                  : 'hover:bg-gray-900'
                                  }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={formData.service.includes(service)}
                                  onChange={() => handleServiceToggle(service)}
                                  className="w-4 h-4 text-emerald-500 border-gray-300 rounded focus:ring-emerald-500"
                                />
                                <span className={`ml-3 text-sm ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                                  {service}
                                </span>
                              </label>
                            ))}
                          </div>
                        )}
                      </div>
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
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Enquiry
                          <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>

                    {/* Quick Action Buttons - 3 in one row */}
                    <div className="mt-4 flex gap-2">
                      <button
                        type="button"
                        onClick={() => setShowReviewForm(true)}
                        className="flex-1 flex items-center justify-center gap-1.5 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-3 py-3 rounded-lg font-semibold text-sm transition-all duration-300 shadow-lg hover:scale-105"
                      >
                        <Star className="h-4 w-4" />
                        Add Review
                      </button>
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
                </>
              )}
            </InteractiveCard>
          </motion.div>
        </div>

        {/* Business Hours */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-16"
        >
          <InteractiveCard className="p-8 text-center hover-3d">
            <h2 className={`text-2xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent ${isDark
              ? 'from-emerald-400 to-purple-400'
              : 'from-purple-800 to-emerald-700'
              }`}>
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

        {/* Review Form Modal */}
        <ReviewFormModal
          isOpen={showReviewForm}
          onClose={() => setShowReviewForm(false)}
        />

      </div>
    </div>
  );
};

export default Contact;
