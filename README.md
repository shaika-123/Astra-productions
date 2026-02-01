<div align="center">
  
# 🎬 Astra Production Platform

### A Premium Movie & Events Ticketing Experience

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-astraproductions.in-ff6b35?style=for-the-badge)](https://astraproductions.in/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)

<br/>

<p align="center">
  <strong>A modern, full-stack ticketing platform for film festivals and entertainment events</strong>
</p>

<p align="center">
  <a href="https://astraproductions.in/">View Live Site</a> •
  <a href="#-features">Features</a> •
  <a href="#%EF%B8%8F-tech-stack">Tech Stack</a> •
  <a href="#-architecture">Architecture</a>
</p>

---


</div>

---

## 🌟 Overview

**Astra Film Festival Platform** is a comprehensive entertainment ecosystem that handles everything from movie showcases to live event ticketing. Built with modern web technologies, it delivers a seamless user experience for discovering events, purchasing tickets, and managing digital passes.

> **📌 Note:** This repository showcases the frontend architecture, UI components, and client-side implementation. Backend services, API routes, and business logic are maintained in a private company repository.

### 📂 What's Included in This Repository

```
✅ INCLUDED FILES:
├── package.json (sanitized)
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── eslint.config.js
├── components.json
├── README.md
├── .gitignore
├── .env.example
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── providers.tsx
│   ├── globals.css
│   └── not-found.tsx
├── src/
│   ├── components/
│   │   ├── ui/*          # 40+ Shadcn/UI components
│   │   ├── layout/*      # Navbar, Footer, Layout
│   │   ├── skeletons/*   # Loading states
│   │   ├── home/*        # Homepage sections
│   │   ├── NavLink.tsx
│   │   └── ErrorBoundary.tsx
│   ├── hooks/*           # Custom React hooks
│   ├── types/
│   │   ├── razorpay.ts
│   │   ├── supabase.ts
│   │   └── database.types.ts
│   └── lib/
│       ├── utils.ts
│       ├── supabase/
│       └── phoneValidation.ts
└── public/
    ├── robots.txt
    └── assets/
```

> ⚠️ **Not Included:** Admin panel, API routes, database migrations, payment webhooks, and serverless functions are proprietary and maintained in a private company repository.

---

## ✨ Features

### 🎫 **Ticketing System**
- Real-time seat availability tracking
- Multi-category ticket selection (VIP, Premium, Standard)
- Dynamic pricing based on event demand
- Digital QR-code tickets with PDF download
- Secure checkout with Razorpay integration

### 🎬 **Content Management**
- Dynamic movie listings with trailers
- Event schedules with venue information
- Award ceremony management
- News and announcements feed
- Rich media galleries

### 🔐 **Authentication**
- Phone OTP verification via MSG91
- Email/password authentication
- Secure session management
- User profile with ticket history

### 🎨 **User Experience**
- Fully responsive design (mobile-first)
- Dark theme with gold accents
- Smooth animations and transitions
- Auto-rotating hero carousel
- Loading skeletons for better UX

---

## 🛠️ Tech Stack

### **Frontend Framework**
```
Next.js 15          │  React framework with App Router & Server Components
TypeScript 5        │  Type-safe development with strict mode
React 18            │  Latest React with Concurrent Features
```

### **Styling & UI**
```
Tailwind CSS 3.4    │  Utility-first CSS framework
Shadcn/UI           │  Accessible, customizable component library
Radix UI            │  Headless UI primitives for accessibility
Lucide Icons        │  Beautiful, consistent icon set
```

### **State Management & Data**
```
TanStack Query      │  Server state management with caching
React Context       │  Client-side state (Auth, Admin)
React Hook Form     │  Performant form handling
Zod                 │  Runtime type validation
```

### **Backend Services**
```
Supabase            │  PostgreSQL database + Auth + Edge Functions
Razorpay            │  Payment gateway (INR transactions)
MSG91               │  SMS OTP delivery service
```

### **Developer Experience**
```
ESLint              │  Code quality enforcement
PostCSS             │  CSS processing pipeline
```

---

## 📁 Project Structure

```
📦 astra-film-festival
├── 📂 app/                          # Next.js App Router
│   ├── 📄 layout.tsx                # Root layout with metadata
│   ├── 📄 page.tsx                  # Homepage with sections
│   ├── 📄 providers.tsx             # Global providers wrapper
│   ├── 📄 globals.css               # CSS variables & global styles
│   └── 📄 not-found.tsx             # Custom 404 page
│
├── 📂 src/
│   ├── 📂 components/
│   │   ├── 📂 ui/                   # 40+ Shadcn/UI components
│   │   │   ├── button.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── card.tsx
│   │   │   ├── toast.tsx
│   │   │   └── ... (40+ components)
│   │   │
│   │   ├── 📂 home/                 # Homepage sections
│   │   │   ├── HeroSection.tsx      # Auto-rotating carousel
│   │   │   ├── MoviesSection.tsx    # Movie showcase grid
│   │   │   ├── EventsSection.tsx    # Upcoming events
│   │   │   ├── VisionSection.tsx    # Company mission
│   │   │   ├── TrailersSection.tsx  # Video trailers
│   │   │   └── ContactSection.tsx   # Contact form
│   │   │
│   │   ├── 📂 layout/               # Layout components
│   │   │   ├── Layout.tsx           # Main layout wrapper
│   │   │   ├── Navbar.tsx           # Responsive navigation
│   │   │   └── Footer.tsx           # Site footer
│   │   │
│   │   ├── 📂 skeletons/            # Loading states
│   │   └── 📄 EventTicket.tsx       # Digital ticket component
│   │
│   ├── 📂 hooks/                    # Custom React hooks
│   │   ├── useEvents.ts             # Events data fetching
│   │   ├── useMovies.ts             # Movies data fetching
│   │   ├── useTickets.ts            # Ticket management
│   │   ├── useAwards.ts             # Awards data
│   │   ├── useProfile.ts            # User profile
│   │   └── useOtpRateLimit.ts       # OTP rate limiting
│   │
│   ├── 📂 contexts/                 # React Context providers
│   │   └── AuthContext.tsx          # Authentication state
│   │
│   ├── 📂 lib/                      # Utilities & configs
│   │   ├── 📂 supabase/
│   │   │   ├── client.ts            # Browser Supabase client
│   │   │   └── server.ts            # Server Supabase client
│   │   ├── utils.ts                 # Helper functions (cn, etc.)
│   │   ├── navigation.tsx           # Client-side navigation
│   │   ├── phoneValidation.ts       # E.164 phone validation
│   │   ├── downloadTicket.ts        # PDF ticket generation
│   │   └── logger.ts                # Development logging
│   │
│   └── 📂 types/                    # TypeScript definitions
│       ├── database.types.ts        # Supabase schema types
│       ├── razorpay.ts              # Payment gateway types
│       └── supabase.ts              # Client types
│
└── 📂 public/                       # Static assets
    ├── logo.svg
    ├── robots.txt
    └── 📂 herosection/              # Hero images
```

---

## 🏗️ Architecture Deep Dive

### **Component Architecture**

```
┌─────────────────────────────────────────────────────────────┐
│                         App Shell                           │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                    Providers                          │  │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────────┐  │  │
│  │  │QueryClient  │ │AuthProvider │ │TooltipProvider  │  │  │
│  │  │  Provider   │ │             │ │                 │  │  │
│  │  └─────────────┘ └─────────────┘ └─────────────────┘  │  │
│  │                                                       │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │                   Layout                        │  │  │
│  │  │  ┌─────────┐  ┌─────────────────┐  ┌────────┐  │  │  │
│  │  │  │ Navbar  │  │     Content     │  │ Footer │  │  │  │
│  │  │  └─────────┘  └─────────────────┘  └────────┘  │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### **Data Flow Pattern**

```typescript
// Custom hooks with TanStack Query for server state management
export function useEvents() {
  return useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const supabase = getClientSupabase();
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('is_active', true)
        .order('date', { ascending: true });
      
      if (error) throw error;
      return data as Event[];
    },
    staleTime: 5 * 60 * 1000, // 5 min cache
  });
}
```

### **Authentication Flow**

```
┌──────────┐     ┌──────────┐     ┌──────────────┐     ┌─────────┐
│  Phone   │────▶│ Supabase │────▶│ Edge Function│────▶│  MSG91  │
│  Input   │     │   Auth   │     │ (SMS Hook)   │     │   SMS   │
└──────────┘     └──────────┘     └──────────────┘     └─────────┘
     │                                                       │
     │                    ┌──────────────┐                   │
     │                    │ User enters  │◀──────────────────┘
     │                    │    OTP       │
     │                    └──────────────┘
     │                           │
     ▼                           ▼
┌──────────────────────────────────────────┐
│           Session Created                │
│     (JWT stored in httpOnly cookie)      │
└──────────────────────────────────────────┘
```

### **Ticket Booking Flow**

```
┌─────────┐   ┌─────────┐   ┌─────────┐   ┌──────────┐   ┌─────────┐
│ Browse  │──▶│ Select  │──▶│  Cart   │──▶│ Razorpay │──▶│ E-Ticket│
│ Events  │   │ Tickets │   │ Review  │   │ Payment  │   │   PDF   │
└─────────┘   └─────────┘   └─────────┘   └──────────┘   └─────────┘
                  │                             │
                  ▼                             ▼
           ┌──────────────┐             ┌──────────────┐
           │ Real-time    │             │ Webhook      │
           │ Availability │             │ Verification │
           └──────────────┘             └──────────────┘
```

---

## 🎨 UI Component Library

Built on **Shadcn/UI** with custom theming for a premium look:

| Category | Components |
|----------|------------|
| **Layout** | Card, Dialog, Sheet, Drawer, Separator |
| **Forms** | Input, Select, Checkbox, Radio, Switch, Slider |
| **Feedback** | Toast, Alert, Progress, Skeleton |
| **Navigation** | Tabs, Navigation Menu, Breadcrumb, Pagination |
| **Data Display** | Table, Avatar, Badge, Carousel |
| **Overlay** | Dialog, Popover, Tooltip, Dropdown Menu |

### **Design Tokens**

```css
/* Color System */
--primary: hsl(43, 74%, 49%);      /* Gold accent */
--background: hsl(0, 0%, 4%);       /* Deep black */
--foreground: hsl(0, 0%, 95%);      /* Off-white text */
--muted: hsl(0, 0%, 15%);           /* Subtle backgrounds */
--accent: hsl(0, 60%, 40%);         /* Red highlights */

/* Typography */
--font-display: 'Playfair Display', serif;
--font-sans: 'Inter', sans-serif;
```

---

## 🚀 Key Technical Highlights

### **1. Server Components with Streaming**
```tsx
// Leveraging Next.js 15 App Router
export default function Page() {
  return (
    <Layout>
      <Suspense fallback={<HeroSkeleton />}>
        <HeroSection />
      </Suspense>
      <Suspense fallback={<MoviesSkeleton />}>
        <MoviesSection />
      </Suspense>
    </Layout>
  );
}
```

### **2. Type-Safe Database Queries**
```typescript
// Auto-generated types from Supabase
export interface Event {
  id: string;
  slug: string;
  title: string;
  date: string;
  venue: string;
  has_tickets: boolean;
  is_active: boolean;
}
```

### **3. Optimistic UI Updates**
```typescript
const { mutate } = useMutation({
  mutationFn: purchaseTicket,
  onMutate: async (newTicket) => {
    // Optimistically update UI
    await queryClient.cancelQueries(['tickets']);
    const prev = queryClient.getQueryData(['tickets']);
    queryClient.setQueryData(['tickets'], (old) => [...old, newTicket]);
    return { prev };
  },
  onError: (err, _, context) => {
    // Rollback on error
    queryClient.setQueryData(['tickets'], context.prev);
  },
});
```

### **4. PDF Ticket Generation**
```typescript
// Client-side PDF generation with jsPDF
export async function downloadTicketPDF(ticket: TicketData) {
  const pdf = new jsPDF();
  // Render ticket with QR code, event details, branding
  pdf.save(`ticket-${ticket.ticket_number}.pdf`);
}
```

---

## 📱 Responsive Design

| Breakpoint | Target | Features |
|------------|--------|----------|
| `< 640px` | Mobile | Hamburger menu, stacked layouts, touch-optimized |
| `640-1024px` | Tablet | Hybrid navigation, 2-column grids |
| `> 1024px` | Desktop | Full navigation, multi-column layouts, hover states |

---

## 🔧 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/astra-film-festival.git

# Navigate to project
cd astra-film-festival

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

### Environment Variables

```env
# Supabase (Required)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Razorpay (For payments)
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key
```

---

## 📊 Performance

- ⚡ **Lighthouse Score:** 90+ Performance
- 🎯 **First Contentful Paint:** < 1.5s
- 📦 **Bundle Size:** Optimized with code splitting
- 🔄 **Data Caching:** 5-minute stale time with background refresh

---

## 🎯 Future Roadmap

- [ ] PWA support with offline ticket access
- [ ] Real-time notifications for event updates
- [ ] Social sharing for events
- [ ] Multi-language support (i18n)
- [ ] Seat map selection for venues

---

## 📄 License

This project is for **demonstration and portfolio purposes**. The codebase showcases frontend architecture and UI implementation patterns.

---

## 👨‍💻 Author

**AFIFA SHAIK**  
Full-Stack Developer | Building Digital Experiences

<p align="left">
  <a href="https://www.linkedin.com/in/afifa-shaik-470072268/">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/>
  </a>
</p>

---

<div align="center">
  <br/>
  <p>
    <strong>Built with ❤️ using Next.js, TypeScript, and Tailwind CSS</strong>
  </p>
  <p>
    <a href="https://astraproductions.in/">🌐 Visit Live Site</a>
  </p>
  <br/>
  <img src="https://img.shields.io/badge/Made%20in-India-orange?style=flat-square" alt="Made in India"/>
</div>
