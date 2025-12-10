import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import InteractiveCard from '../components/InteractiveCard';
import { useTheme } from '../contexts/ThemeContext';

// Import product images
import chatzImg from '../assets/products/chatz.io.webp';
import imgGenImg from '../assets/products/img_gen.webp';

const Products = () => {
    const { isDark } = useTheme();

    const products = [
        {
            id: 1,
            title: 'Chatz.IO',
            subtitle: 'AI Chat Assistant for Students',
            image: chatzImg,
            description: 'An intelligent AI-powered chat assistant designed specifically for students. Get instant help with your studies, research assistance, exam preparation, and academic guidance. Features smart conversation, knowledge base integration, and study support tools.',
            features: [
                'AI-powered study assistance and tutoring',
                'Research and academic writing support',
                'Exam preparation and practice questions',
                'Multi-subject knowledge integration',
            ],
            visitUrl: 'https://chatz-io.netlify.app/',
            color: 'emerald' as const,
            badge: 'NEW',
            isComingSoon: false,
        },
        {
            id: 2,
            title: 'Dips.IO',
            subtitle: 'Next-Gen Digital Platform',
            image: imgGenImg,
            description: 'An innovative digital platform coming soon! Dips.IO will revolutionize how you interact with digital content. Stay tuned for more exciting features and capabilities that will transform your digital experience.',
            features: [
                'Revolutionary digital experience',
                'Advanced AI integration',
                'Seamless user interface',
                'Cross-platform compatibility',
            ],
            visitUrl: '',
            color: 'purple' as const,
            badge: 'COMING SOON',
            isComingSoon: true,
        },
    ];

    return (
        <div className="relative min-h-screen pt-20">
            <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
                {/* Page Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1
                        className={`text-4xl md:text-6xl font-bold mb-6 ${isDark
                            ? 'bg-gradient-to-r from-emerald-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'
                            : 'text-gray-900'
                            }`}
                    >
                        Our Products
                    </h1>
                    <p
                        className={`text-xl max-w-3xl mx-auto font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'
                            }`}
                    >
                        Discover our flagship digital solutions designed to transform your business operations and drive growth
                    </p>
                </motion.div>

                {/* Products Grid */}
                <div className="space-y-16">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                        >
                            <InteractiveCard glowColor={product.color} className="overflow-hidden">
                                <div className={`flex flex-col lg:flex-row ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''} gap-8 p-6 lg:p-8`}>
                                    {/* Product Image - Simple Clean Display */}
                                    <div className="lg:w-1/2">
                                        <div className="relative overflow-hidden rounded-2xl">
                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                loading="lazy"
                                                className="w-full h-64 sm:h-80 lg:h-96 object-cover transition-transform duration-500 hover:scale-105"
                                            />
                                            <div className="absolute top-3 right-3">
                                                <span className={`px-3 py-1.5 ${product.color === 'emerald' ? 'bg-emerald-500' : 'bg-purple-500'} text-white text-xs font-bold rounded-full shadow-lg`}>
                                                    {product.badge}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Product Details */}
                                    <div className="lg:w-1/2 flex flex-col justify-center">
                                        <span className={`text-${product.color}-400 text-sm font-semibold uppercase tracking-wider mb-2`}>
                                            {product.subtitle}
                                        </span>
                                        <h2
                                            className={`text-3xl lg:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'
                                                }`}
                                        >
                                            {product.title}
                                        </h2>
                                        <p
                                            className={`text-base lg:text-lg leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'
                                                }`}
                                        >
                                            {product.description}
                                        </p>

                                        {/* Features List */}
                                        <ul className={`space-y-3 mb-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                            {product.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-center gap-3">
                                                    <div className={`w-2 h-2 ${product.color === 'emerald' ? 'bg-emerald-400' : 'bg-purple-400'} rounded-full flex-shrink-0`} />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* Visit Button or Coming Soon */}
                                        {product.isComingSoon ? (
                                            <div
                                                className={`inline-flex items-center justify-center gap-2 bg-gray-500 cursor-not-allowed text-white px-8 py-4 rounded-lg font-semibold shadow-lg w-full sm:w-auto`}
                                            >
                                                Coming Soon
                                            </div>
                                        ) : (
                                            <a
                                                href={product.visitUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`inline-flex items-center justify-center gap-2 ${product.color === 'emerald'
                                                    ? 'bg-emerald-500 hover:bg-emerald-600'
                                                    : 'bg-purple-500 hover:bg-purple-600'
                                                    } text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg w-full sm:w-auto`}
                                            >
                                                <ExternalLink className="h-5 w-5" />
                                                Visit Product
                                                <ArrowRight className="h-5 w-5" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </InteractiveCard>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mt-20"
                >
                    <InteractiveCard className="p-12 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent">
                            Need a Custom Solution?
                        </h2>
                        <p
                            className={`text-xl mb-8 ${isDark ? 'text-gray-200' : 'text-gray-700'
                                }`}
                        >
                            We can build tailored products to match your specific business needs.
                        </p>
                        <a
                            href="/contact"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-purple-600 hover:from-emerald-600 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                        >
                            Contact Us
                            <ArrowRight className="h-5 w-5" />
                        </a>
                    </InteractiveCard>
                </motion.div>
            </div>
        </div >
    );
};

export default Products;
