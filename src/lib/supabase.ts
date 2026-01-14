import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

// Debug logging
// Debug logging
// console.log('🔧 [Supabase] URL:', supabaseUrl);
// console.log('🔧 [Supabase] Key exists:', supabaseAnonKey ? 'YES' : 'NO');
// console.log('🔧 [Supabase] Key length:', supabaseAnonKey?.length || 0);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Test connection on load
(async () => {
    try {
        const { error } = await supabase.from('user_analytics').select('count').limit(1);
        if (error) {
            console.error('❌ [Supabase] Connection test FAILED:', error.message);
        } else {
            // console.log('✅ [Supabase] Connection test SUCCESS - Table exists!');
        }
    } catch (e) {
        console.error('❌ [Supabase] Connection error:', e);
    }
})();

// Analytics functions
export interface PageVisit {
    id?: number;
    page_path: string;
    visit_time: string;
    time_spent: number;
    device_type: string;
    browser: string;
    created_at?: string;
}

export interface PendingReview {
    id: number;
    name: string;
    company?: string;
    email: string;
    phone: string;
    rating: number;
    services: string;
    review: string;
    image_url?: string;
    status: 'pending' | 'approved' | 'rejected';
    created_at: string;
}

// Helper to update existing analytics record
const performUpdate = async (existingRecord: any, columnName: string, visitorId: string) => {
    const currentCount = (existingRecord[columnName] as number) || 0;
    const { data, error } = await supabase
        .from('user_analytics')
        .update({
            [columnName]: currentCount + 1,
            last_visit: new Date().toISOString(),
            updated_at: new Date().toISOString()
        })
        .eq('user_id', visitorId)
        .select()
        .single();

    if (error) {
        console.error('Error updating user analytics:', error);
        return existingRecord.id as number;
    }
    return (data?.id as number) || (existingRecord.id as number);
};

// Track page visit with user_analytics table (one row per user)
export const trackPageVisit = async (pagePath: string, visitorId: string): Promise<number | null> => {
    const deviceType = /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'mobile' : 'desktop';
    const browser = navigator.userAgent.includes('Chrome') ? 'Chrome' :
        navigator.userAgent.includes('Firefox') ? 'Firefox' :
            navigator.userAgent.includes('Safari') ? 'Safari' : 'Other';

    // Map page paths to column names
    const pageColumnMap: { [key: string]: string } = {
        '/': 'home_visits',
        '/services': 'services_visits',
        '/contact': 'contact_visits',
        '/about': 'about_visits',
        '/products': 'products_visits',
        '/projects': 'projects_visits',
        '/admin': 'admin_visits'
    };

    const columnName = pageColumnMap[pagePath.toLowerCase()] || 'home_visits';

    try {
        // Check if user exists
        const { data: existing } = await supabase
            .from('user_analytics')
            .select('id, ' + columnName)
            .eq('user_id', visitorId)
            .maybeSingle();

        if (existing) {
            // Update existing user - increment page visit count
            return await performUpdate(existing, columnName, visitorId);
        } else {
            // Create new user record
            const { data, error } = await supabase
                .from('user_analytics')
                .insert({
                    user_id: visitorId,
                    [columnName]: 1,
                    device_type: deviceType,
                    browser: browser,
                    first_visit: new Date().toISOString(),
                    last_visit: new Date().toISOString()
                })
                .select()
                .single();

            if (error) {
                // If duplicate key error (User created by another request in the meantime)
                if (error.code === '23505') {
                    // Fetch the record that was just created by the other request
                    const { data: retryExisting } = await supabase
                        .from('user_analytics')
                        .select('id, ' + columnName)
                        .eq('user_id', visitorId)
                        .maybeSingle();

                    if (retryExisting) {
                        return await performUpdate(retryExisting, columnName, visitorId);
                    }
                }

                console.error('Error creating user analytics:', error);
                return null;
            }
            return data?.id || null;
        }
    } catch (err) {
        console.error('Supabase connection error:', err);
        return null;
    }
};

// Update time spent on page
export const updateTimeSpent = async (visitId: number, timeSpent: number) => {
    if (!visitId) return;
    try {
        // Get visitor_id from localStorage
        const visitorId = localStorage.getItem('visitor_id');
        if (!visitorId) return;

        // Update total_time_spent
        const { data: existing } = await supabase
            .from('user_analytics')
            .select('total_time_spent')
            .eq('user_id', visitorId)
            .single();

        if (existing) {
            await supabase
                .from('user_analytics')
                .update({
                    total_time_spent: (existing.total_time_spent || 0) + timeSpent,
                    updated_at: new Date().toISOString()
                })
                .eq('user_id', visitorId);
        }
    } catch (err) {
        console.error('Error updating time spent:', err);
    }
};

// Get analytics data from user_analytics table
export const getAnalytics = async () => {
    try {
        const { data: users, error } = await supabase
            .from('user_analytics')
            .select('*')
            .order('last_visit', { ascending: false })
            .limit(1000);

        if (error) throw error;
        return users || [];
    } catch (err) {
        console.error('Error fetching analytics:', err);
        return [];
    }
};

// Submit review for approval
export const submitReviewForApproval = async (review: Omit<PendingReview, 'id' | 'created_at' | 'status'>) => {
    try {
        const { error } = await supabase.from('pending_reviews').insert({
            ...review,
            status: 'pending',
        });

        if (error) throw error;
        return true;
    } catch (err) {
        console.error('Error submitting review:', err);
        return false;
    }
};

// Get pending reviews (admin)
export const getPendingReviews = async () => {
    try {
        const { data, error } = await supabase
            .from('pending_reviews')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
    } catch (err) {
        console.error('Error fetching reviews:', err);
        return [];
    }
};

// Update review status (admin)
export const updateReviewStatus = async (id: number, status: 'approved' | 'rejected') => {
    try {
        const { error } = await supabase
            .from('pending_reviews')
            .update({ status })
            .eq('id', id);

        if (error) throw error;
        return true;
    } catch (err) {
        console.error('Error updating review:', err);
        return false;
    }
};

// Contact Form Interface
export interface ContactEnquiry {
    id?: number;
    name: string;
    phone: string;
    email: string;
    service: string;
    message: string;
    status?: string;
    created_at?: string;
}

// Submit contact form
export const submitContactForm = async (data: ContactEnquiry): Promise<boolean> => {
    try {
        const { error } = await supabase
            .from('contact_enquiries')
            .insert({
                name: data.name,
                phone: data.phone,
                email: data.email,
                service: data.service,
                message: data.message,
                status: 'new'
            });

        if (error) throw error;
        return true;
    } catch (err) {
        console.error('Error submitting contact form:', err);
        return false;
    }
};

// Get contact enquiries
export const getContactEnquiries = async (): Promise<ContactEnquiry[]> => {
    try {
        let { data, error } = await supabase
            .from('contact_enquiries')
            .select('*')
            .order('created_at', { ascending: false });

        // If contact_enquiries is empty, try 'enquiries' table as fallback
        if ((!data || data.length === 0) && !error) {
            const fallbackResult = await supabase
                .from('enquiries')
                .select('*')
                .order('created_at', { ascending: false });

            if (!fallbackResult.error && fallbackResult.data && fallbackResult.data.length > 0) {
                return fallbackResult.data;
            }
        }

        if (error) {
            console.error('[Supabase] Error fetching enquiries:', error);
            throw error;
        }

        return data || [];
    } catch (err) {
        console.error('[Supabase] Connection error fetching enquiries:', err);
        return [];
    }
};

// Update enquiry status
export const updateEnquiryStatus = async (enquiryId: number, status: string): Promise<boolean> => {
    try {
        const { error } = await supabase
            .from('contact_enquiries')
            .update({ status, updated_at: new Date().toISOString() })
            .eq('id', enquiryId);

        if (error) throw error;
        return true;
    } catch (err) {
        console.error('Error updating enquiry status:', err);
        return false;
    }
};

// Delete contact enquiry
export const deleteContactEnquiry = async (enquiryId: number): Promise<boolean> => {
    try {
        const { error } = await supabase
            .from('contact_enquiries')
            .delete()
            .eq('id', enquiryId);

        if (error) throw error;
        return true;
    } catch (err) {
        console.error('Error deleting enquiry:', err);
        return false;
    }
};

// Get approved reviews for carousel
export const getApprovedReviews = async () => {
    try {
        const { data, error } = await supabase
            .from('pending_reviews')
            .select('*')
            .eq('status', 'approved')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
    } catch (err) {
        console.error('Error fetching approved reviews:', err);
        return [];
    }
};

// Update an approved review (admin)
export const updateApprovedReview = async (id: number, data: Partial<PendingReview>): Promise<boolean> => {
    try {
        const { error } = await supabase
            .from('pending_reviews')
            .update({
                name: data.name,
                company: data.company,
                rating: data.rating,
                review: data.review,
                services: data.services,
            })
            .eq('id', id)
            .eq('status', 'approved');

        if (error) throw error;
        return true;
    } catch (err) {
        console.error('Error updating approved review:', err);
        return false;
    }
};

// Delete an approved review (admin)
export const deleteApprovedReview = async (id: number): Promise<boolean> => {
    try {
        const { error } = await supabase
            .from('pending_reviews')
            .delete()
            .eq('id', id)
            .eq('status', 'approved');

        if (error) throw error;
        return true;
    } catch (err) {
        console.error('Error deleting approved review:', err);
        return false;
    }
};
