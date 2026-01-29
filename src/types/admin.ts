/**
 * Admin Panel Types - Astra Filmfare Awards Edition
 * 
 * Type definitions for team-based staff management.
 * 
 * Teams:
 *   🔴 super_admin     - Owner (Full access + manage roles)
 *   🟠 event_manager   - Event management team
 *   🟡 content_team    - Trailers, news, media
 *   🟢 ticketing_team  - Tickets, sales, refunds
 *   🔵 jury            - View & vote on submissions
 *   🟣 submission_team - Review film submissions
 * 
 * @version 3.0 (Astra Edition)
 */

// =============================================
// STAFF ROLES & STATUS
// =============================================

export type StaffRole = 
  | 'super_admin'      // Owner - full access
  | 'event_manager'    // Events, media, news
  | 'content_team'     // Trailers, news, gallery
  | 'ticketing_team'   // Tickets, sales, refunds
  | 'jury'             // Vote on submissions
  | 'submission_team'; // Review submissions

export type StaffStatus = 'active' | 'inactive' | 'suspended' | 'pending';

/**
 * Role metadata for UI display
 */
export const ROLE_CONFIG: Record<StaffRole, {
  label: string;
  description: string;
  color: string;
  icon: string;
}> = {
  super_admin: {
    label: 'Super Admin',
    description: 'Full access to everything + manage staff & settings',
    color: 'red',
    icon: 'Shield'
  },
  event_manager: {
    label: 'Event Manager',
    description: 'Create events, manage media, view sales',
    color: 'orange',
    icon: 'Calendar'
  },
  content_team: {
    label: 'Content Team',
    description: 'Upload trailers, create news, manage gallery',
    color: 'yellow',
    icon: 'Film'
  },
  ticketing_team: {
    label: 'Ticketing Team',
    description: 'Manage tickets, process refunds, view reports',
    color: 'green',
    icon: 'Ticket'
  },
  jury: {
    label: 'Jury Member',
    description: 'View submissions and cast votes',
    color: 'blue',
    icon: 'Star'
  },
  submission_team: {
    label: 'Submission Team',
    description: 'Review and manage film submissions',
    color: 'purple',
    icon: 'FileVideo'
  }
};

export const STATUS_CONFIG: Record<StaffStatus, {
  label: string;
  color: string;
}> = {
  active: { label: 'Active', color: 'green' },
  inactive: { label: 'Inactive', color: 'gray' },
  suspended: { label: 'Suspended', color: 'red' },
  pending: { label: 'Pending', color: 'yellow' }
};

// =============================================
// STAFF TYPES
// =============================================

export interface AdminStaff {
  id: string;
  user_id: string;
  name: string;
  email: string;
  role: StaffRole;
  status: StaffStatus;
  created_at: string;
  updated_at: string;
  last_activity_at?: string;
  user?: {
    full_name?: string;
    email?: string;
    avatar_url?: string;
  };
}

export interface StaffFormData {
  user_id: string;
  role: StaffRole;
  added_notes?: string;
}

export interface StaffRemoveData {
  removed_reason: string;
}

// =============================================
// PERMISSIONS TYPES
// =============================================

export type PermissionCategory = 
  | 'content'      // Movies, events, news, awards, gallery
  | 'sales'        // Tickets, orders, refunds
  | 'users'        // User management, messages
  | 'staff'        // Staff management
  | 'settings'     // Site settings
  | 'reports'      // Dashboard, analytics
  | 'submissions'; // Film submissions, jury

export interface AdminPermission {
  id: string;
  code: string;
  name: string;
  description: string | null;
  category: PermissionCategory;
  is_dangerous: boolean;
  sort_order: number;
}

export interface StaffPermission {
  id: string;
  staff_id: string;
  permission_code: string;
  is_granted: boolean;
  granted_by: string | null;
  granted_at: string;
  reason: string | null;
  expires_at: string | null;
}

// =============================================
// ACTIVITY & SESSIONS
// =============================================

export interface StaffActivity {
  id: string;
  staff_id: string;
  user_id: string;
  action_type: string;
  entity_type: string | null;
  entity_id: string | null;
  entity_name: string | null;
  old_data: Record<string, unknown> | null;
  new_data: Record<string, unknown> | null;
  changes_summary: string | null;
  ip_address: string | null;
  user_agent: string | null;
  status: 'success' | 'failed';
  created_at: string;
  
  // Joined
  staff?: {
    role: StaffRole;
    user?: {
      full_name: string | null;
      email: string | null;
    };
  };
}

export interface StaffSession {
  id: string;
  staff_id: string;
  user_id: string;
  session_token: string;
  ip_address: string | null;
  user_agent: string | null;
  device_type: 'desktop' | 'tablet' | 'mobile' | 'unknown';
  started_at: string;
  last_activity_at: string;
  ended_at: string | null;
  is_active: boolean;
}

// =============================================
// NOTIFICATIONS
// =============================================

export type NotificationType = 
  | 'order' | 'refund' | 'message' | 'staff' 
  | 'system' | 'submission' | 'vote';

export interface AdminNotification {
  id: string;
  target_staff_id: string | null;
  target_role: StaffRole | null;
  type: NotificationType;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  title: string;
  message: string;
  action_url: string | null;
  is_read: boolean;
  read_at: string | null;
  expires_at: string | null;
  created_at: string;
}

// =============================================
// SUBMISSIONS & JURY (Astra Awards Specific)
// =============================================

export type SubmissionStatus = 
  | 'pending'      // Just submitted
  | 'under_review' // Being reviewed
  | 'accepted'     // Accepted for consideration
  | 'rejected'     // Not accepted
  | 'nominated'    // Nominated for award
  | 'winner';      // Won the award

export interface AwardSubmission {
  id: string;
  award_id: string;
  
  // Film details
  film_title: string;
  film_year: number;
  director: string;
  producer: string | null;
  language: string;
  genre: string | null;
  runtime_minutes: number | null;
  synopsis: string | null;
  
  // Media
  poster_url: string | null;
  trailer_url: string | null;
  screening_link: string | null;
  
  // Submitter
  submitted_by_name: string;
  submitted_by_email: string;
  submitted_by_phone: string | null;
  
  // Categories
  categories: string[];
  
  // Status
  status: SubmissionStatus;
  reviewed_by: string | null;
  reviewed_at: string | null;
  review_notes: string | null;
  rejection_reason: string | null;
  
  // Scores
  jury_score: number | null;
  jury_votes_count: number;
  
  created_at: string;
  updated_at: string;
}

export interface JuryVote {
  id: string;
  submission_id: string;
  jury_staff_id: string;
  
  overall_score: number;
  story_score: number;
  direction_score: number;
  technical_score: number;
  
  comments: string | null;
  recommend_nomination: boolean;
  
  voted_at: string;
  
  // Joined
  submission?: AwardSubmission;
  jury_member?: {
    user?: {
      full_name: string | null;
    };
  };
}

// =============================================
// CONTENT TYPES
// =============================================

export interface AdminMovie {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  synopsis: string | null;
  image_url: string | null;
  status: 'coming-soon' | 'now-showing' | 'released';
  release_date: string | null;
  director: string | null;
  cast_members: string[] | null;
  genre: string | null;
  duration: string | null;
  youtube_url: string | null;
  bookmyshow_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AdminEvent {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  full_description: string | null;
  image_url: string | null;
  date: string;
  time: string;
  duration: string | null;
  venue: string;
  location: string;
  type: string;
  badge: string | null;
  has_tickets: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  // Computed
  ticket_categories?: TicketCategory[];
  total_seats?: number;
  available_seats?: number;
  tickets_sold?: number;
}

export interface TicketCategory {
  id: string;
  event_id: string;
  name: string;
  price: number;
  total_seats: number;
  available_seats: number;
  description: string | null;
  sort_order: number;
}

export interface AdminNews {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  content: string | null;
  image_url: string | null;
  youtube_url: string | null;
  published_at: string;
  is_active: boolean;
  created_at: string;
}

export interface AdminAward {
  id: string;
  year: number;
  title: string;
  description: string | null;
  hero_image_url: string | null;
  is_active: boolean;
  created_at: string;
  // Sub-tables
  categories?: AwardCategory[];
  hosts?: AwardHost[];
  gallery?: GalleryItem[];
  // Stats
  submission_count?: number;
}

export interface AwardCategory {
  id: string;
  award_id: string;
  name: string;
  icon: string | null;
  sort_order: number;
}

export interface AwardHost {
  id: string;
  award_id: string;
  name: string;
  image_url: string | null;
  role: string;
  sort_order: number;
}

export interface GalleryItem {
  id: string;
  image_url: string;
  title: string | null;
  type: 'photo' | 'video';
  youtube_url: string | null;
  sort_order: number;
}

// =============================================
// SALES TYPES
// =============================================

export interface AdminTicket {
  id: string;
  user_id: string;
  event_id: string;
  category_id: string;
  ticket_number: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'refunded' | 'used';
  qr_code_url: string;
  purchase_time: string;
  verified_at?: string | null;   // When ticket was scanned
  verified_by?: string | null;   // Who scanned it
  // Joined
  user?: { full_name: string | null; email: string | null; phone: string | null };
  event?: { title: string; date: string; venue: string };
  category?: { name: string };
}

export interface AdminOrder {
  id: string;
  user_id: string;
  event_id: string;
  razorpay_order_id: string;
  amount: number;
  currency: string;
  status: 'created' | 'paid' | 'failed' | 'refunded';
  payment_method: 'upi' | 'card' | null;
  created_at: string;
  // Joined
  user?: { id: string; full_name: string | null; email: string | null; phone: string | null };
  event?: { id: string; title: string; date: string };
  tickets?: AdminTicket[];
}

export interface AdminRefund {
  id: string;
  order_id: string;
  payment_id: string;
  razorpay_refund_id: string | null;
  reason: 'customer_request' | 'event_cancelled' | 'duplicate_payment' | 'other';
  amount: number;
  status: 'pending' | 'processed' | 'failed';
  requested_by: string;
  processed_at: string | null;
  processed_by: string | null;
  notes: string | null;
  created_at: string;
  // Joined
  order?: AdminOrder;
}

// =============================================
// USER & MESSAGE TYPES
// =============================================

export interface AdminUser {
  id: string;
  email: string | null;
  phone: string | null;
  full_name: string | null;
  avatar_url: string | null;
  phone_verified: boolean;
  created_at: string;
  // Stats
  ticket_count?: number;
  total_spent?: number;
}

export interface AdminMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
  replied_at?: string | null;
  replied_by?: string | null;
}

// =============================================
// DASHBOARD TYPES
// =============================================

export interface DashboardStats {
  totals: {
    users: number;
    staff: number;
    movies: number;
    events: number;
    active_events: number;
    tickets_sold: number;
    total_revenue: number;
    pending_refunds: number;
    unread_messages: number;
    pending_submissions: number;
    pending_orders: number;
  };
  revenue_chart: { date: string; revenue: number; orders: number }[];
  recent_orders: AdminOrder[];
  recent_activity: StaffActivity[];
  pending_submissions?: AwardSubmission[];
}

// =============================================
// API TYPES
// =============================================

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationInfo;
}

export interface ApiError {
  error: string;
  code?: string;
}

export interface ApiSuccess<T = unknown> {
  success: true;
  data?: T;
  message?: string;
}

// =============================================
// FILTER TYPES
// =============================================

export interface BaseFilters {
  page?: number;
  limit?: number;
  search?: string;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface StaffFilters extends BaseFilters {
  role?: StaffRole;
  status?: StaffStatus;
}

export interface SubmissionFilters extends BaseFilters {
  status?: SubmissionStatus;
  award_id?: string;
  language?: string;
}

export interface TicketFilters extends BaseFilters {
  event_id?: string;
  status?: string;
  date_from?: string;
  date_to?: string;
}

// =============================================
// UI TYPES
// =============================================

export interface NavItem {
  title: string;
  href: string;
  icon: string;
  permission?: string;
  badge?: number;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

/**
 * Admin navigation structure based on roles
 */
export const ADMIN_NAV: NavSection[] = [
  {
    title: 'Overview',
    items: [
      { title: 'Dashboard', href: '/admin', icon: 'LayoutDashboard', permission: 'dashboard.view' },
      { title: 'Hero Section', href: '/admin/homepage', icon: 'Sparkles', permission: 'gallery.read' }
    ]
  },
  {
    title: 'Content',
    items: [
      { title: 'Movies/Trailers', href: '/admin/movies', icon: 'Film', permission: 'movies.read' },
      { title: 'Events', href: '/admin/events', icon: 'Calendar', permission: 'events.read' },
      { title: 'News', href: '/admin/news', icon: 'Newspaper', permission: 'news.read' },
      { title: 'Awards', href: '/admin/awards', icon: 'Trophy', permission: 'awards.read' },
      { title: 'Gallery', href: '/admin/gallery', icon: 'Images', permission: 'gallery.read' },
      { title: 'Our Story', href: '/admin/our-story', icon: 'BookOpen', permission: 'gallery.read' }
    ]
  },
  {
    title: 'Sales',
    items: [
      { title: 'Tickets', href: '/admin/tickets', icon: 'Ticket', permission: 'tickets.read' },
      { title: 'Orders', href: '/admin/orders', icon: 'ShoppingCart', permission: 'orders.read' },
      { title: 'Refunds', href: '/admin/refunds', icon: 'RefreshCcw', permission: 'refunds.read' },
      { title: 'Reports', href: '/admin/reports', icon: 'BarChart3', permission: 'reports.read' }
    ]
  },
  {
    title: 'Users',
    items: [
      { title: 'Users', href: '/admin/users', icon: 'Users', permission: 'users.read' },
      { title: 'Messages', href: '/admin/messages', icon: 'Mail', permission: 'messages.read' }
    ]
  },
  {
    title: 'Admin',
    items: [
      { title: 'Staff', href: '/admin/staff', icon: 'UserCog', permission: 'staff.read' },
      { title: 'Activity Log', href: '/admin/activity', icon: 'History', permission: 'activity.read_all' },
      { title: 'Settings', href: '/admin/settings', icon: 'Settings', permission: 'settings.read' }
    ]
  }
];
