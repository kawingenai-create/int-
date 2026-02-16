import React, { useState } from 'react';
import { Star, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import StatusPopup from './StatusPopup';

interface Review {
    id: number;
    name: string;
    company?: string;
    service: string;
    rating: number;
    review: string;
    image: string;
    email: string;
}

interface ReviewFormModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ReviewFormModal: React.FC<ReviewFormModalProps> = ({ isOpen, onClose }) => {
    const { isDark } = useTheme();
    const [showStatusPopup, setShowStatusPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [popupType, setPopupType] = useState<'success' | 'error'>('success');

    const [formData, setFormData] = useState({
        name: '',
        company: '',
        email: '',
        phone: '',
        rating: 5,
        services: [] as string[],
        description: '',
        imageUrl: '',
    });

    const serviceOptions = [
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

    const handleServiceToggle = (service: string) => {
        setFormData((prev) => ({
            ...prev,
            services: prev.services.includes(service)
                ? prev.services.filter((s) => s !== service)
                : [...prev.services, service],
        }));
    };

    const handleSubmitReview = async (e: React.FormEvent) => {
        e.preventDefault();

        // Save to Supabase
        const { submitReviewForApproval } = await import('../lib/supabase');

        // Show status popup immediately
        setPopupMessage('Submitting review...');
        setPopupType('success');
        setShowStatusPopup(true);

        const success = await submitReviewForApproval({
            name: formData.name,
            company: formData.company,
            email: formData.email,
            phone: formData.phone,
            rating: formData.rating,
            services: formData.services.join(', '),
            review: formData.description,
            image_url: formData.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=random`,
        });

        if (success) {
            setPopupMessage('Thank you for your review! It will be listed after approval.');

            // Reset form
            setFormData({
                name: '',
                company: '',
                email: '',
                phone: '',
                rating: 5,
                services: [],
                description: '',
                imageUrl: '',
            });

            // Auto-close after delay
            setTimeout(() => {
                setShowStatusPopup(false);
                onClose();
            }, 2000);
        } else {
            setPopupMessage('Error submitting review. Please try again.');
            setPopupType('error');

            // Allow retry by closing popup after longer delay
            setTimeout(() => {
                setShowStatusPopup(false);
            }, 3000);
        }
    };

    if (!isOpen) return null;

    return (
        <>
            <div
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4"
                onClick={onClose}
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className={`w-full max-w-sm sm:max-w-lg lg:max-w-2xl max-h-[90vh] sm:max-h-[85vh] overflow-y-auto rounded-xl shadow-2xl ${isDark
                        ? 'bg-gray-900 border border-gray-700'
                        : 'bg-white border border-gray-200'
                        }`}
                >
                    <div className="p-3 sm:p-6">
                        <div className="flex justify-between items-center mb-3 sm:mb-4">
                            <h2
                                className={`text-base sm:text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'
                                    }`}
                            >
                                Give Your Review
                            </h2>
                            <button
                                onClick={onClose}
                                className={`p-1 rounded-full ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                                    }`}
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmitReview} className="space-y-3 sm:space-y-4">
                            {/* Name and Company - Side by side on PC */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label
                                        className={`block text-xs sm:text-sm font-medium mb-1 ${isDark ? 'text-gray-200' : 'text-gray-700'
                                            }`}
                                    >
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({ ...formData, name: e.target.value })
                                        }
                                        className={`w-full px-3 py-2 border rounded-lg text-sm ${isDark
                                            ? 'bg-gray-800 border-gray-600 text-white'
                                            : 'bg-white border-gray-300 text-gray-800'
                                            }`}
                                        placeholder="Your name"
                                    />
                                </div>

                                <div>
                                    <label
                                        className={`block text-xs sm:text-sm font-medium mb-1 ${isDark ? 'text-gray-200' : 'text-gray-700'
                                            }`}
                                    >
                                        Company (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.company}
                                        onChange={(e) =>
                                            setFormData({ ...formData, company: e.target.value })
                                        }
                                        className={`w-full px-3 py-2 border rounded-lg text-sm ${isDark
                                            ? 'bg-gray-800 border-gray-600 text-white'
                                            : 'bg-white border-gray-300 text-gray-800'
                                            }`}
                                        placeholder="Company name"
                                    />
                                </div>
                            </div>

                            {/* Email and Phone - Side by side on PC */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label
                                        className={`block text-xs sm:text-sm font-medium mb-1 ${isDark ? 'text-gray-200' : 'text-gray-700'
                                            }`}
                                    >
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({ ...formData, email: e.target.value })
                                        }
                                        className={`w-full px-3 py-2 border rounded-lg text-sm ${isDark
                                            ? 'bg-gray-800 border-gray-600 text-white'
                                            : 'bg-white border-gray-300 text-gray-800'
                                            }`}
                                        placeholder="Email address"
                                    />
                                </div>

                                <div>
                                    <label
                                        className={`block text-xs sm:text-sm font-medium mb-1 ${isDark ? 'text-gray-200' : 'text-gray-700'
                                            }`}
                                    >
                                        Phone *
                                    </label>
                                    <input
                                        type="tel"
                                        required
                                        value={formData.phone}
                                        onChange={(e) =>
                                            setFormData({ ...formData, phone: e.target.value })
                                        }
                                        className={`w-full px-3 py-2 border rounded-lg text-sm ${isDark
                                            ? 'bg-gray-800 border-gray-600 text-white'
                                            : 'bg-white border-gray-300 text-gray-800'
                                            }`}
                                        placeholder="Phone number"
                                    />
                                </div>
                            </div>

                            {/* Rating and Services - Side by side on PC */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label
                                        className={`block text-xs sm:text-sm font-medium mb-1 ${isDark ? 'text-gray-200' : 'text-gray-700'
                                            }`}
                                    >
                                        Rating *
                                    </label>
                                    <div className="flex space-x-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, rating: star })}
                                            >
                                                <Star
                                                    className={`h-5 w-5 sm:h-6 sm:w-6 ${star <= formData.rating
                                                        ? 'text-yellow-400 fill-current'
                                                        : 'text-gray-300'
                                                        }`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label
                                        className={`block text-xs sm:text-sm font-medium mb-1 ${isDark ? 'text-gray-200' : 'text-gray-700'
                                            }`}
                                    >
                                        Services *
                                    </label>
                                    <div className="grid grid-cols-2 gap-1">
                                        {serviceOptions.map((service) => (
                                            <label key={service} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.services.includes(service)}
                                                    onChange={() => handleServiceToggle(service)}
                                                    className="mr-1.5 h-3 w-3"
                                                />
                                                <span
                                                    className={`text-xs ${isDark ? 'text-gray-200' : 'text-gray-700'
                                                        }`}
                                                >
                                                    {service}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Review text */}
                            <div>
                                <label
                                    className={`block text-xs sm:text-sm font-medium mb-1 ${isDark ? 'text-gray-200' : 'text-gray-700'
                                        }`}
                                >
                                    Your Review *
                                </label>
                                <textarea
                                    required
                                    rows={2}
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({ ...formData, description: e.target.value })
                                    }
                                    className={`w-full px-3 py-2 border rounded-lg resize-none text-sm ${isDark
                                        ? 'bg-gray-800 border-gray-600 text-white'
                                        : 'bg-white border-gray-300 text-gray-800'
                                        }`}
                                    placeholder="Tell us about your experience..."
                                />
                            </div>

                            {/* Profile Image URL - Optional */}
                            <div>
                                <label
                                    className={`block text-xs sm:text-sm font-medium mb-1 ${isDark ? 'text-gray-200' : 'text-gray-700'
                                        }`}
                                >
                                    Profile Image URL (Optional)
                                </label>
                                <input
                                    type="url"
                                    value={formData.imageUrl}
                                    onChange={(e) =>
                                        setFormData({ ...formData, imageUrl: e.target.value })
                                    }
                                    className={`w-full px-3 py-2 border rounded-lg text-sm ${isDark
                                        ? 'bg-gray-800 border-gray-600 text-white'
                                        : 'bg-white border-gray-300 text-gray-800'
                                        }`}
                                    placeholder="https://example.com/photo.jpg"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-4 py-2.5 sm:py-3 rounded-lg font-medium transition-all duration-300 text-sm sm:text-base"
                            >
                                Submit Review
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Status Popup */}
            {showStatusPopup && (
                <StatusPopup
                    message={popupMessage}
                    type={popupType}
                    onClose={() => {
                        setShowStatusPopup(false);
                        onClose();
                    }}
                />
            )}
        </>
    );
};

export default ReviewFormModal;
