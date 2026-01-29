# 🎬 Astra Film Festival - Movie & Events Platform

A modern, full-stack ticketing and events management platform built with cutting-edge web technologies. This repository showcases the frontend architecture, UI components, and client-side logic.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=flat-square&logo=supabase)

---

## 🌟 Project Overview

A comprehensive movie and events ticketing platform featuring:

- 🎫 **Real-time Ticket Booking** - Dynamic seat selection and instant booking
- 🎬 **Movie & Event Listings** - Rich media content with filtering and search
- 💳 **Secure Payments** - Razorpay integration for seamless transactions
- 📱 **Responsive Design** - Mobile-first approach with adaptive layouts
- 🔐 **Phone OTP Authentication** - Secure user verification
- 🏆 **Awards & Recognition** - Film festival award management system

> **Note:** This is a showcase repository demonstrating architecture and UI implementation. Backend APIs and business logic are maintained in a private repository.

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **Next.js 15** | React framework with App Router |
| **TypeScript** | Type-safe development |
| **Tailwind CSS** | Utility-first styling |
| **Shadcn/UI** | Accessible component library |
| **Radix UI** | Headless UI primitives |

### State Management & Data Fetching
| Technology | Purpose |
|------------|---------|
| **TanStack Query** | Server state management |
| **React Context** | Client state management |
| **React Hook Form** | Form handling with Zod validation |

### Backend (Architecture Reference)
| Technology | Purpose |
|------------|---------|
| **Supabase** | PostgreSQL database, Auth, Edge Functions |
| **Razorpay** | Payment gateway integration |

---

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Landing page
│   ├── providers.tsx       # Context providers wrapper
│   ├── globals.css         # Global styles & CSS variables
│   └── not-found.tsx       # 404 error page
│
├── src/
│   ├── components/         # React components
│   │   ├── ui/             # Shadcn/UI base components
│   │   ├── home/           # Homepage sections
│   │   ├── layout/         # Layout components (Navbar, Footer)
│   │   └── skeletons/      # Loading state components
│   │
│   ├── hooks/              # Custom React hooks
│   │   ├── useEvents.ts    # Events data fetching
│   │   ├── useMovies.ts    # Movies data fetching
│   │   ├── useTickets.ts   # Ticket management
│   │   └── useProfile.ts   # User profile management
│   │
│   ├── lib/                # Utilities & configurations
│   │   ├── supabase/       # Supabase client setup
│   │   ├── utils.ts        # Helper functions
│   │   └── logger.ts       # Development logging
│   │
│   └── types/              # TypeScript definitions
│       ├── database.types.ts
│       ├── razorpay.ts
│       └── supabase.ts
│
└── public/                 # Static assets
```

---

## 🎨 UI Components

### Component Library
Built on **Shadcn/UI** with custom theming:

- **Accordion** - Collapsible content sections
- **Dialog/Modal** - Overlay interactions
- **Toast** - Notification system
- **Form Controls** - Input, Select, Checkbox, Radio
- **Navigation** - Responsive navbar with mobile drawer
- **Cards** - Content containers with variants
- **Tables** - Data display with sorting/filtering

### Design System
- **Color Palette:** Dark theme with gold accents (#D4AF37)
- **Typography:** Modern sans-serif with hierarchical scaling
- **Spacing:** 4px base unit system
- **Animations:** Subtle transitions with Tailwind

---

## 🔧 Key Features Implementation

### 1. Authentication Flow
```
Phone Input → OTP Request → Verification → Session Creation
```
- Rate-limited OTP requests
- Secure token-based sessions
- Persistent login state

### 2. Ticket Booking Flow
```
Event Selection → Category/Seat Selection → Cart → Payment → E-Ticket
```
- Real-time availability checking
- PDF ticket generation
- QR code for entry validation

### 3. Data Fetching Pattern
```typescript
// TanStack Query with Supabase
const { data, isLoading, error } = useQuery({
  queryKey: ['events', filters],
  queryFn: () => fetchEvents(filters),
  staleTime: 5 * 60 * 1000, // 5 minutes
});
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account (for backend)

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
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Payment (Optional for development)
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key
```

---

## 📱 Screenshots

| Home Page | Events | Tickets |
|-----------|--------|---------|
| Hero section with dynamic content | Event listings with filters | Digital ticket with QR |

---

## 🏗️ Architecture Highlights

### Server Components
- Leverages Next.js 15 App Router
- Server-side rendering for SEO
- Streaming with Suspense boundaries

### Performance Optimizations
- Image optimization with next/image
- Code splitting per route
- Prefetching for navigation

### Type Safety
- End-to-end TypeScript
- Supabase generated types
- Zod schema validation

---

## 📄 License

This project is for **demonstration purposes only**. The codebase showcases frontend architecture and UI implementation patterns.

---

## 👨‍💻 Author

**Your Name**  
Full-Stack Developer

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=flat-square&logo=linkedin)](https://linkedin.com/in/yourprofile)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-green?style=flat-square&logo=google-chrome)](https://yourportfolio.com)

---

<p align="center">
  <i>Built with ❤️ using Next.js, TypeScript, and Tailwind CSS</i>
</p>
