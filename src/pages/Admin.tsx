import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
    Lock,
    Eye,
    EyeOff,
    CheckCircle,
    XCircle,
    Star,
    Users,
    BarChart3,
    Clock,
    Monitor,
    TrendingUp,
    RefreshCw,
    Download,
    Mail,
} from 'lucide-react';
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    AreaChart,
    Area,
} from 'recharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useTheme } from '../contexts/ThemeContext';
import InteractiveCard from '../components/InteractiveCard';

interface Review {
    id: number;
    name: string;
    company?: string;
    email: string;
    rating: number;
    review: string;
    service: string;
    image: string;
    status?: 'pending' | 'approved' | 'rejected';
}

interface Enquiry {
    id: number;
    name: string;
    phone: string;
    email: string;
    service: string;
    message: string;
    status: string;
    created_at: string;
}

interface AnalyticsData {
    totalVisits: number;
    todayVisits: number;
    uniqueVisitors: number;
    mobileVisits: number;
    desktopVisits: number;
    pageViews: { page: string; views: number; avgTime: number }[];
    browserStats: { browser: string; count: number }[];
    weeklyVisits: { day: string; visits: number }[];
    hourlyVisits: { hour: string; visits: number }[];
    avgTimeSpent: number;
    timeOfDay: { morning: number; afternoon: number; evening: number; night: number };
}

const Admin: React.FC = () => {
    const { isDark } = useTheme();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState<'reviews' | 'analytics' | 'enquiries'>('reviews');
    const [reviews, setReviews] = useState<Review[]>([]);
    const [enquiries, setEnquiries] = useState<Enquiry[]>([]); // Added enquiries state
    const [replyText, setReplyText] = useState<{ [key: number]: string }>({}); // Added replyText state
    const [analytics, setAnalytics] = useState<AnalyticsData>({
        totalVisits: 0,
        todayVisits: 0,
        uniqueVisitors: 0,
        mobileVisits: 0,
        desktopVisits: 0,
        pageViews: [],
        browserStats: [],
        weeklyVisits: [],
        hourlyVisits: [],
        avgTimeSpent: 0,
        timeOfDay: { morning: 0, afternoon: 0, evening: 0, night: 0 },
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
    const dashboardRef = useRef<HTMLDivElement>(null);

    const ADMIN_PASSWORD = 'kawin235';

    // Check if already authenticated
    useEffect(() => {
        const authStatus = sessionStorage.getItem('adminAuth');
        if (authStatus === 'true') {
            setIsAuthenticated(true);
            loadData();
        }
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            sessionStorage.setItem('adminAuth', 'true');
            setError('');
            loadData();
        } else {
            setError('Incorrect password');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem('adminAuth');
        setPassword('');
    };

    const loadData = async () => {
        setIsLoading(true);
        try {
            // Import Supabase functions dynamically
            const { getPendingReviews, getAnalytics, getContactEnquiries } = await import('../lib/supabase');

            // Load pending reviews from Supabase
            const reviewsData = await getPendingReviews();
            const enquiriesData = await getContactEnquiries(); // Fetch enquiries
            setReviews(reviewsData.map((r: any) => ({
                id: r.id,
                name: r.name,
                company: r.company,
                email: r.email,
                rating: r.rating,
                review: r.review,
                service: r.services, // Note: DB column is 'services', UI expects 'service'
                image: r.image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(r.name)}`,
                status: r.status,
            })));
            setEnquiries(enquiriesData); // Set enquiries state

            // Load analytics from Supabase
            const users = await getAnalytics();

            if (users && users.length > 0) {
                const today = new Date().toDateString();

                // Total unique visitors
                const uniqueVisitors = users.length;

                // Calculate total visits across all pages
                const totalVisits = users.reduce((sum: number, u: any) => {
                    return sum + (u.home_visits || 0) + (u.services_visits || 0) +
                        (u.contact_visits || 0) + (u.about_visits || 0) +
                        (u.products_visits || 0) + (u.projects_visits || 0) +
                        (u.admin_visits || 0);
                }, 0);

                // Today's visitors (users who visited today)
                const todayVisits = users.filter((u: any) =>
                    new Date(u.last_visit).toDateString() === today
                ).length;

                // Device breakdown
                const mobileVisits = users.filter((u: any) =>
                    u.device_type === 'mobile' || u.device_type === 'tablet'
                ).length;

                // Page view counts
                const pageViews = [
                    {
                        page: 'Home',
                        views: users.reduce((sum: number, u: any) => sum + (u.home_visits || 0), 0),
                        avgTime: 0
                    },
                    {
                        page: 'Services',
                        views: users.reduce((sum: number, u: any) => sum + (u.services_visits || 0), 0),
                        avgTime: 0
                    },
                    {
                        page: 'Contact',
                        views: users.reduce((sum: number, u: any) => sum + (u.contact_visits || 0), 0),
                        avgTime: 0
                    },
                    {
                        page: 'About',
                        views: users.reduce((sum: number, u: any) => sum + (u.about_visits || 0), 0),
                        avgTime: 0
                    },
                    {
                        page: 'Products',
                        views: users.reduce((sum: number, u: any) => sum + (u.products_visits || 0), 0),
                        avgTime: 0
                    },
                    {
                        page: 'Projects',
                        views: users.reduce((sum: number, u: any) => sum + (u.projects_visits || 0), 0),
                        avgTime: 0
                    }
                ].sort((a, b) => b.views - a.views);

                // Average time spent
                const totalTime = users.reduce((sum: number, u: any) => sum + (u.total_time_spent || 0), 0);
                const avgTimeSpent = users.length > 0 ? Math.round(totalTime / users.length) : 0;

                // Browser stats
                const browserCounts: { [key: string]: number } = {};
                users.forEach((u: any) => {
                    const browser = u.browser || 'Other';
                    browserCounts[browser] = (browserCounts[browser] || 0) + 1;
                });
                const browserStats = Object.entries(browserCounts)
                    .map(([browser, count]) => ({ browser, count }))
                    .sort((a, b) => b.count - a.count);

                // Monthly visits (last 30 days)
                const monthlyVisits: { day: string; visits: number }[] = [];
                for (let i = 29; i >= 0; i--) {
                    const date = new Date();
                    date.setDate(date.getDate() - i);
                    const dayStr = date.toDateString();
                    const dayVisits = users.filter((u: any) =>
                        new Date(u.last_visit).toDateString() === dayStr
                    ).length;
                    monthlyVisits.push({
                        day: `${date.getDate()}/${date.getMonth() + 1}`,
                        visits: dayVisits,
                    });
                }

                // Hourly visits (simplified - using last_visit hour)
                const hourlyCounts = new Array(24).fill(0);
                users.forEach((u: any) => {
                    const date = new Date(u.last_visit);
                    const hour = date.getHours();
                    hourlyCounts[hour]++;
                });

                const hourlyVisits = hourlyCounts.map((count, hour) => ({
                    hour: `${hour}:00`,
                    visits: count
                }));

                setAnalytics({
                    totalVisits,
                    todayVisits,
                    uniqueVisitors,
                    mobileVisits,
                    desktopVisits: uniqueVisitors - mobileVisits,
                    pageViews,
                    browserStats,
                    weeklyVisits: monthlyVisits,
                    hourlyVisits,
                    avgTimeSpent,
                    timeOfDay: { morning: 0, afternoon: 0, evening: 0, night: 0 },
                });
            }
        } catch (err) {
            console.error('Error loading data:', err);
        }
        setIsLoading(false);
    };

    const handleApproveReview = async (id: number) => {
        const { updateReviewStatus } = await import('../lib/supabase');
        const success = await updateReviewStatus(id, 'approved');
        if (success) {
            setReviews(reviews.filter(r => r.id !== id));
        }
    };

    const handleRejectReview = async (id: number) => {
        const { updateReviewStatus } = await import('../lib/supabase');
        const success = await updateReviewStatus(id, 'rejected');
        if (success) {
            setReviews(reviews.filter(r => r.id !== id));
        }
    };

    const handleDeleteEnquiry = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this enquiry?')) {
            try {
                const { deleteContactEnquiry } = await import('../lib/supabase');
                const success = await deleteContactEnquiry(id);
                if (success) {
                    setEnquiries(enquiries.filter(e => e.id !== id));
                } else {
                    alert('Failed to delete enquiry.');
                }
            } catch (error) {
                console.error('Error deleting enquiry:', error);
                alert('An error occurred while deleting the enquiry.');
            }
        }
    };

    const generatePDF = async () => {
        setIsGeneratingPDF(true);
        try {
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            let yPosition = 20;

            // Header
            pdf.setFontSize(24);
            pdf.setFont('helvetica', 'bold');
            pdf.text('Integer.IO Analytics Report', pageWidth / 2, yPosition, { align: 'center' });

            yPosition += 10;
            pdf.setFontSize(10);
            pdf.setFont('helvetica', 'normal');
            pdf.setTextColor(100);
            pdf.text(`Generated on ${new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`, pageWidth / 2, yPosition, { align: 'center' });

            yPosition += 15;
            pdf.setLineWidth(0.5);
            pdf.line(20, yPosition, pageWidth - 20, yPosition);
            yPosition += 10;

            // Executive Summary
            pdf.setFontSize(16);
            pdf.setFont('helvetica', 'bold');
            pdf.setTextColor(0);
            pdf.text('Executive Summary', 20, yPosition);
            yPosition += 8;

            pdf.setFontSize(10);
            pdf.setFont('helvetica', 'normal');

            const summaryData = [
                [`Total Visits: ${analytics.totalVisits.toLocaleString()}`, `Unique Visitors: ${analytics.uniqueVisitors.toLocaleString()}`],
                [`Today's Visits: ${analytics.todayVisits}`, `Avg. Time: ${Math.floor(analytics.avgTimeSpent / 60)}m ${analytics.avgTimeSpent % 60}s`],
                [`Mobile: ${analytics.mobileVisits} (${Math.round((analytics.mobileVisits / analytics.totalVisits) * 100)}%)`, `Desktop: ${analytics.desktopVisits} (${Math.round((analytics.desktopVisits / analytics.totalVisits) * 100)}%)`],
            ];

            summaryData.forEach(row => {
                pdf.text(row[0], 25, yPosition);
                pdf.text(row[1], pageWidth / 2 + 10, yPosition);
                yPosition += 6;
            });

            yPosition += 10;

            // Capture charts if dashboard ref exists
            if (dashboardRef.current) {
                const charts = dashboardRef.current.querySelectorAll('.recharts-wrapper');

                for (let i = 0; i < Math.min(charts.length, 2); i++) {
                    if (yPosition > pageHeight - 80) {
                        pdf.addPage();
                        yPosition = 20;
                    }

                    const chart = charts[i] as HTMLElement;
                    const canvas = await html2canvas(chart, {
                        backgroundColor: isDark ? '#1f2937' : '#ffffff',
                        scale: 2,
                        logging: false,
                        useCORS: true,
                    });

                    const imgData = canvas.toDataURL('image/png');
                    const imgWidth = pageWidth - 40;
                    const imgHeight = (canvas.height * imgWidth) / canvas.width;

                    pdf.addImage(imgData, 'PNG', 20, yPosition, imgWidth, imgHeight);
                    yPosition += imgHeight + 10;
                }
            }

            // Page Performance Table
            if (yPosition > pageHeight - 60) {
                pdf.addPage();
                yPosition = 20;
            }

            pdf.setFontSize(14);
            pdf.setFont('helvetica', 'bold');
            pdf.text('Top Pages Performance', 20, yPosition);
            yPosition += 8;

            pdf.setFontSize(9);
            pdf.setFont('helvetica', 'normal');

            analytics.pageViews.slice(0, 5).forEach((page, idx) => {
                pdf.text(`${idx + 1}. ${page.page}`, 25, yPosition);
                pdf.text(`${page.views} visits`, pageWidth / 2, yPosition);
                pdf.text(`${page.avgTime}s avg`, pageWidth - 50, yPosition);
                yPosition += 6;
            });

            // Footer
            pdf.setFontSize(8);
            pdf.setTextColor(150);
            pdf.text('Integer.IO Services - Confidential', pageWidth / 2, pageHeight - 10, { align: 'center' });

            // Save PDF
            pdf.save(`Integer-IO-Analytics-${new Date().toISOString().split('T')[0]}.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Failed to generate PDF. Please try again.');
        } finally {
            setIsGeneratingPDF(false);
        }
    };

    // Login Screen
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen pt-20 flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-sm"
                >
                    <InteractiveCard glowColor="purple" className="p-6 sm:p-8">
                        <div className="text-center mb-6">
                            <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${isDark ? 'bg-purple-500/20' : 'bg-purple-100'
                                }`}>
                                <Lock className={`h-8 w-8 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
                            </div>
                            <h1 className={`text-xl sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                Admin Access
                            </h1>
                            <p className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                Enter password to continue
                            </p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter password"
                                    className={`w-full px-4 py-3 pr-12 border rounded-lg text-sm ${isDark
                                        ? 'bg-gray-800 border-gray-600 text-white'
                                        : 'bg-white border-gray-300 text-gray-800'
                                        }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-400" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400" />
                                    )}
                                </button>
                            </div>

                            {error && (
                                <p className="text-red-500 text-sm text-center">{error}</p>
                            )}

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white py-3 rounded-lg font-semibold transition-all duration-300"
                            >
                                Login
                            </button>
                        </form>
                    </InteractiveCard>
                </motion.div>
            </div>
        );
    }

    // Admin Dashboard
    return (
        <div className="min-h-screen pt-20 px-4 pb-12">
            <div className="max-w-7xl mx-auto">
                {/* Print-Only Report Header (hidden on screen, visible on print) */}
                <div className="hidden print:block text-center mb-8 pb-6 border-b-2 border-gray-300">
                    <div className="flex items-center justify-center gap-3 mb-2">
                        <BarChart3 className="h-10 w-10" />
                        <span className="text-3xl font-bold">Integer.IO</span>
                    </div>
                    <h1 className="text-2xl font-semibold">Analytics Report</h1>
                    <p className="text-sm text-gray-600">Generated on {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4 print:hidden"
                >
                    <div>
                        <h1 className={`text-2xl sm:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                            Admin Dashboard
                        </h1>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            Manage reviews and view analytics
                        </p>
                    </div>

                    <div className="flex gap-2 printable-hidden">
                        <button
                            onClick={generatePDF}
                            disabled={isGeneratingPDF || activeTab !== 'analytics'}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${isDark
                                ? 'bg-emerald-600 hover:bg-emerald-700 text-white disabled:bg-gray-700 disabled:text-gray-500'
                                : 'bg-emerald-500 hover:bg-emerald-600 text-white disabled:bg-gray-300 disabled:text-gray-500'
                                } disabled:cursor-not-allowed`}
                        >
                            {isGeneratingPDF ? (
                                <>
                                    <RefreshCw className="h-4 w-4 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <Download className="h-4 w-4" />
                                    Export PDF
                                </>
                            )}
                        </button>
                        <button
                            onClick={handleLogout}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${isDark
                                ? 'bg-gray-800 hover:bg-gray-700 text-gray-200'
                                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                                }`}
                        >
                            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                            Refresh
                        </button>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-all"
                        >
                            Logout
                        </button>
                    </div>
                </motion.div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6">
                    <button
                        onClick={() => setActiveTab('reviews')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'reviews'
                            ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white'
                            : isDark
                                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        <Star className="h-4 w-4" />
                        Reviews ({reviews.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('analytics')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'analytics'
                            ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white'
                            : isDark
                                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        <BarChart3 className="h-4 w-4" />
                        Analytics
                    </button>
                    <button
                        onClick={() => setActiveTab('enquiries')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'enquiries'
                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' // Changed color for enquiries tab
                            : isDark
                                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        <Mail className="h-4 w-4" />
                        Enquiries ({enquiries.length})
                    </button>
                </div>

                {/* Reviews Tab */}
                {
                    activeTab === 'reviews' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-4"
                        >
                            {reviews.length === 0 ? (
                                <InteractiveCard className="p-8 text-center">
                                    <Star className={`h-12 w-12 mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
                                    <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                                        No reviews yet
                                    </p>
                                </InteractiveCard>
                            ) : (
                                <div className="grid gap-4">
                                    {reviews.map((review) => (
                                        <InteractiveCard key={review.id} className="p-4 sm:p-6">
                                            <div className="flex flex-col sm:flex-row gap-4">
                                                <img
                                                    src={review.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}`}
                                                    alt={review.name}
                                                    className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                                        <div>
                                                            <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                                                {review.name}
                                                            </h3>
                                                            {review.company && (
                                                                <p className="text-sm text-emerald-400">{review.company}</p>
                                                            )}
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    className={`h-4 w-4 ${i < review.rating
                                                                        ? 'text-yellow-400 fill-current'
                                                                        : 'text-gray-300'
                                                                        }`}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                                        Service: {review.service}
                                                    </p>
                                                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                                        "{review.review}"
                                                    </p>
                                                    <div className="flex gap-2 mt-4">
                                                        <button
                                                            onClick={() => handleApproveReview(review.id)}
                                                            className="flex items-center gap-1 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm transition-all"
                                                        >
                                                            <CheckCircle className="h-4 w-4" />
                                                            Approve
                                                        </button>
                                                        <button
                                                            onClick={() => handleRejectReview(review.id)}
                                                            className="flex items-center gap-1 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm transition-all"
                                                        >
                                                            <XCircle className="h-4 w-4" />
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </InteractiveCard>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )
                }

                {/* Analytics Tab */}
                {
                    activeTab === 'analytics' && (
                        <motion.div
                            ref={dashboardRef}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                <InteractiveCard glowColor="emerald" className="p-4 sm:p-6">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 sm:p-3 rounded-lg ${isDark ? 'bg-emerald-500/20' : 'bg-emerald-100'}`}>
                                            <Users className={`h-5 w-5 sm:h-6 sm:w-6 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                                        </div>
                                        <div>
                                            <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Total Visitors</p>
                                            <p className={`text-xl sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                                {analytics.uniqueVisitors}
                                            </p>
                                        </div>
                                    </div>
                                </InteractiveCard>


                                <InteractiveCard glowColor="blue" className="p-4 sm:p-6">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 sm:p-3 rounded-lg ${isDark ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
                                            <BarChart3 className={`h-5 w-5 sm:h-6 sm:w-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                                        </div>
                                        <div>
                                            <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Total Page Views</p>
                                            <p className={`text-xl sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                                {analytics.totalVisits}
                                            </p>
                                        </div>
                                    </div>
                                </InteractiveCard>

                                <InteractiveCard glowColor="blue" className="p-4 sm:p-6">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 sm:p-3 rounded-lg ${isDark ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
                                            <TrendingUp className={`h-5 w-5 sm:h-6 sm:w-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                                        </div>
                                        <div>
                                            <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Today's Page Views</p>
                                            <p className={`text-xl sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                                {analytics.todayVisits}
                                            </p>
                                        </div>
                                    </div>
                                </InteractiveCard>

                                <InteractiveCard glowColor="purple" className="p-4 sm:p-6">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 sm:p-3 rounded-lg ${isDark ? 'bg-purple-500/20' : 'bg-purple-100'}`}>
                                            <Clock className={`h-5 w-5 sm:h-6 sm:w-6 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
                                        </div>
                                        <div>
                                            <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Avg Time</p>
                                            <p className={`text-xl sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                                {Math.floor(analytics.avgTimeSpent / 60)}m {analytics.avgTimeSpent % 60}s
                                            </p>
                                        </div>
                                    </div>
                                </InteractiveCard>

                                <InteractiveCard glowColor="pink" className="p-4 sm:p-6">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 sm:p-3 rounded-lg ${isDark ? 'bg-pink-500/20' : 'bg-pink-100'}`}>
                                            <Monitor className={`h-5 w-5 sm:h-6 sm:w-6 ${isDark ? 'text-pink-400' : 'text-pink-600'}`} />
                                        </div>
                                        <div>
                                            <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Desktop</p>
                                            <p className={`text-xl sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                                {analytics.desktopVisits}
                                            </p>
                                        </div>
                                    </div>
                                </InteractiveCard>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Hourly Visits Chart */}
                                <InteractiveCard className="p-6">
                                    <h3 className={`text-lg font-semibold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                        Visits by Hour (24h)
                                    </h3>
                                    <div className="h-64 w-full" style={{ minHeight: '256px' }}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={analytics.hourlyVisits}>
                                                <defs>
                                                    <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} vertical={false} />
                                                <XAxis
                                                    dataKey="hour"
                                                    stroke={isDark ? '#9ca3af' : '#6b7280'}
                                                    fontSize={12}
                                                    tickLine={false}
                                                    axisLine={false}
                                                    interval={3}
                                                />
                                                <YAxis
                                                    stroke={isDark ? '#9ca3af' : '#6b7280'}
                                                    fontSize={12}
                                                    tickLine={false}
                                                    axisLine={false}
                                                />
                                                <Tooltip
                                                    contentStyle={{
                                                        backgroundColor: isDark ? '#1f2937' : '#ffffff',
                                                        borderColor: isDark ? '#374151' : '#e5e7eb',
                                                        borderRadius: '0.5rem',
                                                        color: isDark ? '#ffffff' : '#000000',
                                                    }}
                                                />
                                                <Area
                                                    type="monotone"
                                                    dataKey="visits"
                                                    stroke="#10b981"
                                                    fillOpacity={1}
                                                    fill="url(#colorVisits)"
                                                    strokeWidth={2}
                                                />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </InteractiveCard>

                                {/* Monthly Visits Bar Chart */}
                                <InteractiveCard className="p-6">
                                    <h3 className={`text-lg font-semibold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                        Monthly Overview (Last 30 Days)
                                    </h3>
                                    <div className="h-64 w-full" style={{ minHeight: '256px' }}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={analytics.weeklyVisits}>
                                                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} vertical={false} />
                                                <XAxis
                                                    dataKey="day"
                                                    stroke={isDark ? '#9ca3af' : '#6b7280'}
                                                    fontSize={12}
                                                    tickLine={false}
                                                    axisLine={false}
                                                />
                                                <YAxis
                                                    stroke={isDark ? '#9ca3af' : '#6b7280'}
                                                    fontSize={12}
                                                    tickLine={false}
                                                    axisLine={false}
                                                />
                                                <Tooltip
                                                    cursor={{ fill: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}
                                                    contentStyle={{
                                                        backgroundColor: isDark ? '#1f2937' : '#ffffff',
                                                        borderColor: isDark ? '#374151' : '#e5e7eb',
                                                        borderRadius: '0.5rem',
                                                        color: isDark ? '#ffffff' : '#000000',
                                                    }}
                                                />
                                                <Bar dataKey="visits" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </InteractiveCard>
                            </div>

                            {/* Updated Page Views & Time of Day */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Page Views with Time */}
                                <InteractiveCard className="p-6">
                                    <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                        Top Pages by Duration
                                    </h3>
                                    {analytics.pageViews.length === 0 ? (
                                        <p className={`text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                            No data available
                                        </p>
                                    ) : (
                                        <div className="space-y-4">
                                            {analytics.pageViews.slice(0, 5).map((pv, idx) => (
                                                <div key={idx} className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                                                            }`}>
                                                            {idx + 1}
                                                        </span>
                                                        <div>
                                                            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                                                {pv.page}
                                                            </p>
                                                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                                                {pv.views} visits
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className={`text-sm font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                                                            {pv.avgTime}s
                                                        </p>
                                                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                                            avg time
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </InteractiveCard>

                                {/* Visit History Table */}
                                <InteractiveCard className="p-6 col-span-full">
                                    <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                        Recent Visits
                                    </h3>
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                                                    <th className={`text-left py-3 px-4 text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                                        Page
                                                    </th>
                                                    <th className={`text-left py-3 px-4 text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                                        Visit Time
                                                    </th>
                                                    <th className={`text-left py-3 px-4 text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                                        Time Spent
                                                    </th>
                                                    <th className={`text-left py-3 px-4 text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                                        Device
                                                    </th>
                                                    <th className={`text-left py-3 px-4 text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                                        Browser
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {analytics.pageViews.slice(0, 10).map((pv, idx) => (
                                                    <tr
                                                        key={idx}
                                                        className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'} hover:bg-opacity-5 ${isDark ? 'hover:bg-white' : 'hover:bg-gray-900'}`}
                                                    >
                                                        <td className={`py-3 px-4 text-sm ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                                                            {pv.page}
                                                        </td>
                                                        <td className={`py-3 px-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                                            {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
                                                        </td>
                                                        <td className={`py-3 px-4 text-sm ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                                                            {Math.floor(pv.avgTime / 60)}m {pv.avgTime % 60}s
                                                        </td>
                                                        <td className={`py-3 px-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                                            Mobile
                                                        </td>
                                                        <td className={`py-3 px-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                                            Safari
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </InteractiveCard>
                            </div>
                        </motion.div>
                    )}

                {/* Enquiries Tab */}
                {
                    activeTab === 'enquiries' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="grid gap-6">
                                {enquiries.length === 0 ? (
                                    <InteractiveCard className="p-12 text-center">
                                        <Mail className={`h-16 w-16 mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
                                        <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                            No Enquiries Yet
                                        </h3>
                                        <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                                            Contact form submissions will appear here
                                        </p>
                                    </InteractiveCard>
                                ) : (
                                    enquiries.map((enquiry) => (
                                        <InteractiveCard key={enquiry.id} className="p-6">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                                        {enquiry.name}
                                                    </h3>
                                                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                                        {new Date(enquiry.created_at).toLocaleString()}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => handleDeleteEnquiry(enquiry.id)}
                                                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm transition-colors"
                                                >
                                                    Delete
                                                </button>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-4 mb-4">
                                                <div>
                                                    <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                                        Email
                                                    </p>
                                                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                                        {enquiry.email}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                                        Phone
                                                    </p>
                                                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                                        {enquiry.phone}
                                                    </p>
                                                </div>
                                                <div className="md:col-span-2">
                                                    <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                                        Service
                                                    </p>
                                                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                                        {enquiry.service}
                                                    </p>
                                                </div>
                                                <div className="md:col-span-2">
                                                    <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                                        Message
                                                    </p>
                                                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                                        {enquiry.message}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="mt-4">
                                                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                                    Reply
                                                </label>
                                                <textarea
                                                    value={replyText[enquiry.id] || ''}
                                                    onChange={(e) => setReplyText({ ...replyText, [enquiry.id]: e.target.value })}
                                                    placeholder="Type your reply here..."
                                                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-emerald-500 transition-colors ${isDark
                                                        ? 'bg-gray-800 border-gray-600 text-white'
                                                        : 'bg-white border-gray-300 text-gray-800'
                                                        }`}
                                                    rows={3}
                                                />
                                                <button
                                                    onClick={() => {
                                                        const reply = replyText[enquiry.id] || '';
                                                        const subject = `Re: ${enquiry.service} Enquiry`;
                                                        const body = `${reply}%0D%0A%0D%0A--- Original Message ---%0D%0AFrom: ${enquiry.name}%0D%0AEmail: ${enquiry.email}%0D%0APhone: ${enquiry.phone}%0D%0AService: ${enquiry.service}%0D%0AMessage: ${enquiry.message}`;
                                                        window.open(`mailto:${enquiry.email}?subject=${subject}&body=${body}`);
                                                    }}
                                                    className="mt-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                                                >
                                                    <Mail className="h-4 w-4" />
                                                    Send Reply
                                                </button>
                                            </div>
                                        </InteractiveCard>
                                    ))
                                )}
                            </div>
                        </motion.div>
                    )
                }
            </div>
        </div >
    );
};

export default Admin;
