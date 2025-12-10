import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, ExternalLink } from 'lucide-react';
import InteractiveCard from '../components/InteractiveCard';
import ModernProjectCarousel from '../components/ModernProjectCarousel';
import { useTheme } from '../contexts/ThemeContext';

// Import project images from assets/services
import acImg from '../assets/services/ac.webp';
import sasImg from '../assets/services/sas.webp';
import floqImg from '../assets/services/floq.webp';
import karpagamImg from '../assets/services/karpagam.webp';
import busImg from '../assets/services/bus.webp';

const portfolioProjects = [
  {
    id: 1,
    title: 'SAS Impex Services',
    description:
      'Professional business website for SAS Impex featuring comprehensive services, detailed contact information, and integrated Google Maps for easy location access. Built with modern web technologies to ensure optimal performance and user experience.',
    image: sasImg,
    link: 'https://sas-impex.netlify.app/',
    category: 'Web Development',
    technologies: ['React', 'Tailwind CSS', 'JSX', 'Responsive Design'],
  },
  {
    id: 2,
    title: 'Cooling Services',
    description:
      'Responsive service website for multi-brand washing machine repairs and installations. Features service booking, technician locator, and comprehensive repair guides with real-time availability checking.',
    image: acImg,
    link: 'https://multibrandwashingmachineservice.in/',
    category: 'Web Development',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
  },
  {
    id: 3,
    title: 'floq pump',
    description:
      'Professional informational consulting website for bus operators featuring clean HTML design, service details, and consultation booking system with integrated contact forms and business analytics.',
    image: floqImg,
    link: 'https://demo.floqpumps.com/',
    category: 'Web Development',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'PHP'],
  },
  {
    id: 4,
    title: 'Sri Karpagam Brand',
    description:
      "Modern React website showcasing Sri Karpagam's premium product highlights and brand story. Features interactive product galleries, brand heritage sections, and customer testimonials with smooth animations.",
    image: karpagamImg,
    link: 'https://sri-karpagam.netlify.app/',
    category: 'Web Development',
    technologies: ['React', 'Tailwind CSS', 'JSX', 'Framer Motion'],
  },
  {
    id: 5,
    title: 'Bus Consulting Services',
    description:
      'Professional informational consulting website for bus operators featuring clean HTML design, service details, and consultation booking system with integrated contact forms and business analytics.',
    image: busImg,
    link: 'https://www.busconsulting.in/',
    category: 'Web Development',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'PHP'],
  },
];

// Import PDFs from assets/pdf
import DataSciencePDF from '../assets/pdf/Data_Science_Projects.pdf';
import AiMlPDF from '../assets/pdf/AI_ML_Projects.pdf';
import WebDevPDF from '../assets/pdf/Web_Development_Projects.pdf';

const Projects = () => {
  const { isDark } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [downloading, setDownloading] = useState('');

  const projectCategories = [
    {
      name: 'Data Science',
      description:
        'Advanced data analysis, visualization, and predictive modeling projects',
      projects: [
        'Sales Forecasting using Machine Learning',
        'Customer Segmentation Analysis',
        'Market Research Data Analysis',
        'Financial Risk Assessment',
        'Healthcare Data Analytics',
        'Social Media Sentiment Analysis',
      ],
      color: 'emerald',
      pdfName: 'Data_Science_Projects.pdf',
      pdfUrl: DataSciencePDF,
    },
    {
      name: 'AI & ML',
      description: 'Artificial Intelligence and Machine Learning solutions',
      projects: [
        'Face Recognition Attendance System',
        'AI Chatbot for Customer Service',
        'Image Classification Systems',
        'Natural Language Processing Tools',
        'Recommendation Engines',
        'Fraud Detection Systems',
      ],
      color: 'purple',
      pdfName: 'AI_ML_Projects.pdf',
      pdfUrl: AiMlPDF,
    },
    {
      name: 'Web Development',
      description: 'Modern web applications and responsive websites',
      projects: [
        'E-commerce Platforms',
        'School Management Systems',
        'Portfolio Websites',
        'Booking & Reservation Systems',
        'Content Management Systems',
        'Real Estate Platforms',
      ],
      color: 'blue',
      pdfName: 'Web_Development_Projects.pdf',
      pdfUrl: WebDevPDF,
    },
  ];

  const categories = ['All', 'Data Science', 'AI & ML', 'Web Development'];

  const filteredCategories =
    selectedCategory === 'All'
      ? projectCategories
      : projectCategories.filter(
        (category) => category.name === selectedCategory
      );

  const handlePdfDownload = async (pdfUrl: string, pdfName: string, categoryName: string) => {
    setDownloading(pdfName);
    try {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = pdfName;
      link.setAttribute('download', pdfName);
      link.setAttribute('target', '_self');
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => {
        console.log(`${categoryName} PDF download initiated successfully!`);
      }, 100);
    } catch (error) {
      console.error('Download failed:', error);
      try {
        const response = await fetch(pdfUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const fallbackLink = document.createElement('a');
        fallbackLink.href = blobUrl;
        fallbackLink.download = pdfName;
        fallbackLink.style.display = 'none';
        document.body.appendChild(fallbackLink);
        fallbackLink.click();
        document.body.removeChild(fallbackLink);
        window.URL.revokeObjectURL(blobUrl);
      } catch (fallbackError) {
        console.error('Fallback download also failed:', fallbackError);
        alert(
          `Download failed for ${categoryName} PDF. Please check if the file exists or try again later.`
        );
      }
    } finally {
      setTimeout(() => {
        setDownloading('');
      }, 1000);
    }
  };

  const handleEmailRequest = (pdfName: string, categoryName: string) => {
    const subject = `Request for ${categoryName} Projects PDF`;
    const body = `Hi,%0D%0A%0D%0AI would like to request the ${categoryName} projects PDF (${pdfName}).%0D%0A%0D%0APlease send me the detailed project list and information.%0D%0A%0D%0AThank you!`;
    window.open(`mailto:mskawin2004@gmail.com?subject=${subject}&body=${body}`);
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
            Our Projects
          </h1>
          <p
            className={`text-xl max-w-3xl mx-auto font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'
              }`}
          >
            Explore our portfolio and download comprehensive project collections
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent">
            Our Client Projects
          </h2>

          <ModernProjectCarousel projects={portfolioProjects} />
        </motion.div>

        {/* Rest of your existing code for PDF categories... */}
        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg ${selectedCategory === category
                ? 'bg-emerald-500 text-white shadow-emerald-500/25'
                : isDark
                  ? 'bg-gray-800 text-gray-200 hover:bg-gray-700 shadow-gray-800/25'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 shadow-gray-200/25'
                }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Project Categories */}
        <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {filteredCategories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <InteractiveCard glowColor={category.color as 'emerald' | 'purple' | 'blue'} className="h-full">
                <div className="mb-6">
                  <h3
                    className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-800'
                      }`}
                  >
                    {category.name}
                  </h3>
                  <p
                    className={`mb-4 ${isDark ? 'text-gray-200' : 'text-gray-700'
                      }`}
                  >
                    {category.description}
                  </p>
                </div>

                <div className="mb-6">
                  <h4
                    className={`text-lg font-semibold mb-3 ${isDark ? 'text-gray-100' : 'text-gray-800'
                      }`}
                  >
                    Sample Projects:
                  </h4>
                  <ul className="space-y-2">
                    {category.projects.slice(0, 4).map((project, idx) => (
                      <li
                        key={idx}
                        className={`flex items-center text-sm ${isDark ? 'text-gray-200' : 'text-gray-700'
                          }`}
                      >
                        <div
                          className={`w-2 h-2 bg-${category.color}-400 rounded-full mr-3`}
                        />
                        {project}
                      </li>
                    ))}
                    {category.projects.length > 4 && (
                      <li
                        className={`text-sm italic ${isDark ? 'text-gray-400' : 'text-gray-500'
                          }`}
                      >
                        +{category.projects.length - 4} more projects...
                      </li>
                    )}
                  </ul>
                </div>

                {/* Download Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() =>
                      handlePdfDownload(
                        category.pdfUrl,
                        category.pdfName,
                        category.name
                      )
                    }
                    disabled={downloading === category.pdfName}
                    className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg btn-hover-effect disabled:opacity-50 disabled:cursor-not-allowed ${category.color === 'emerald'
                      ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/25'
                      : category.color === 'purple'
                        ? 'bg-purple-500 hover:bg-purple-600 text-white shadow-purple-500/25'
                        : 'bg-blue-500 hover:bg-blue-600 text-white shadow-blue-500/25'
                      }`}
                  >
                    {downloading === category.pdfName ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: 'linear',
                          }}
                          className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        Downloading...
                      </>
                    ) : (
                      <>
                        <Download className="h-5 w-5" />
                        Download PDF
                      </>
                    )}
                  </button>

                  <button
                    onClick={() =>
                      handleEmailRequest(category.pdfName, category.name)
                    }
                    className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 border-2 ${isDark
                      ? 'border-gray-600 text-gray-200 hover:border-gray-500 hover:bg-gray-800'
                      : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-100'
                      }`}
                  >
                    <FileText className="h-5 w-5" />
                    Request via Email
                  </button>
                </div>
              </InteractiveCard>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <div
            className={`p-8 rounded-2xl ${isDark ? 'bg-gray-800/50' : 'bg-gray-100/50'
              } backdrop-blur-sm`}
          >
            <h3
              className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'
                }`}
            >
              Need a Custom Project?
            </h3>
            <p className={`mb-6 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
              Let's discuss your requirements and create something amazing
              together
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-purple-500 hover:from-emerald-600 hover:to-purple-600 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/contact#contact-form';
              }}
            >
              <ExternalLink className="h-5 w-5" />
              Get in Touch
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;
