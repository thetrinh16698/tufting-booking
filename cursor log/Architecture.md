# Tufting Booking System - Architecture Documentation

## 🏗️ System Overview

This is a **Next.js 13** application with **App Router** that provides a complete tufting booking system, migrated from Wix to be fully independent.

## 📋 Technology Stack

### Frontend
- **Next.js 13.4.9** - React framework with App Router
- **React 18.2.0** - UI library
- **TypeScript 4.9.5** - Type safety
- **Tailwind CSS 3.2.6** - Styling framework
- **Flowbite React 0.4.4** - UI components

### Backend & Database
- **Prisma 6.16.1** - Database ORM
- **SQLite** - Database (development)
- **PostgreSQL** - Database (production ready)

### Authentication
- **NextAuth.js 4.24.11** - Authentication framework
- **@auth/prisma-adapter 2.10.0** - Database adapter
- **bcryptjs 3.0.2** - Password hashing

### Payment Processing (Ready for Integration)
- **Stripe 18.5.0** - Payment processing
- **@stripe/stripe-js 7.9.0** - Stripe client library

### Development Tools
- **tsx 4.20.5** - TypeScript execution
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Playwright** - E2E testing

## 🗂️ Project Structure

```
tufting-booking/
├── app/                          # Next.js App Router
│   ├── api/                     # API Routes
│   │   ├── auth/[...nextauth]/  # NextAuth.js endpoints
│   │   ├── services/            # Service management APIs
│   │   ├── bookings/            # Booking management APIs
│   │   └── availability/        # Availability APIs
│   ├── auth/signin/             # Authentication pages
│   ├── services/                # Service pages
│   ├── components/              # React components
│   │   ├── Layout/              # Header, Footer, NavBar
│   │   ├── Login/               # Authentication components
│   │   ├── ServiceList/         # Service display components
│   │   ├── Calendar/            # Booking calendar
│   │   ├── Image/               # Media components
│   │   └── Provider/            # Context providers
│   ├── lib/                     # Utility libraries
│   │   ├── auth.ts              # NextAuth.js configuration
│   │   ├── db.ts                # Prisma client
│   │   ├── services.ts          # Service management
│   │   └── bookings.ts          # Booking system
│   ├── hooks/                   # Custom React hooks
│   ├── utils/                   # Utility functions
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Homepage
├── prisma/                      # Database schema & migrations
│   ├── schema.prisma            # Database schema
│   └── seed.ts                  # Database seeding
├── public/                      # Static assets
├── middleware.ts                 # Next.js middleware
└── package.json                 # Dependencies & scripts
```

## 🗄️ Database Schema

### Core Models

#### User Management
- **User** - User accounts and profiles
- **Account** - OAuth provider accounts
- **Session** - User sessions
- **VerificationToken** - Email verification

#### Business Logic
- **Category** - Service categories (Tufting, Workshops)
- **Service** - Tufting services and workshops
- **Availability** - Time slots for booking
- **Booking** - User bookings with status tracking
- **Plan** - Subscription plans
- **Subscription** - User subscriptions

### Relationships
```
User 1:N Account
User 1:N Session
User 1:N Booking
User 1:N Subscription

Category 1:N Service
Service 1:N Availability
Service 1:N Booking

Availability 1:1 Booking
Plan 1:N Subscription
```

## 🔐 Authentication Architecture

### NextAuth.js Configuration
- **Providers**: Google, GitHub, Credentials
- **Strategy**: JWT sessions
- **Database**: Prisma adapter
- **Pages**: Custom sign-in page

### Session Management
- Server-side session validation
- Client-side session hooks
- Protected route middleware
- Automatic token refresh

## 🌐 API Architecture

### RESTful Endpoints

#### Services API
- `GET /api/services` - List all services
- `GET /api/services/[slug]` - Get service by slug

#### Availability API
- `GET /api/availability` - Get available time slots

#### Bookings API
- `GET /api/bookings` - Get user bookings (authenticated)
- `POST /api/bookings` - Create booking (authenticated)
- `DELETE /api/bookings/[id]` - Cancel booking (authenticated)

#### Authentication API
- `GET /api/auth/[...nextauth]` - NextAuth.js endpoints

## 🎨 Frontend Architecture

### Component Hierarchy
```
App Layout
├── Providers (Session + React Query)
├── Header
│   ├── Logo
│   └── NavBar
│       └── Login Component
├── Main Content
│   ├── Homepage
│   ├── Services Pages
│   └── Authentication Pages
└── Footer
```

### State Management
- **NextAuth.js** - Authentication state
- **React Query** - Server state caching
- **React Context** - Global application state
- **Local State** - Component-specific state

### Routing
- **App Router** - File-based routing
- **Dynamic Routes** - `[slug]` parameters
- **Middleware** - Route protection
- **Redirects** - Authentication flows

## 🔧 Development Workflow

### Database Management
```bash
yarn db:generate    # Generate Prisma client
yarn db:push        # Push schema to database
yarn db:migrate     # Create migration
yarn db:studio      # Open Prisma Studio
yarn db:seed        # Seed database
```

### Application Scripts
```bash
yarn dev           # Development server
yarn build         # Production build
yarn start         # Production server
yarn lint          # Code linting
yarn test          # E2E tests
```

## 🚀 Deployment Architecture

### Environment Configuration
- **Development**: SQLite database
- **Production**: PostgreSQL database
- **Environment Variables**: Database URLs, API keys, secrets

### Build Process
1. TypeScript compilation
2. Next.js optimization
3. Static asset generation
4. Database migration
5. Application deployment

## 🔒 Security Architecture

### Authentication Security
- JWT token validation
- Secure session management
- OAuth provider integration
- Password hashing (bcrypt)

### API Security
- Route protection middleware
- Input validation
- SQL injection prevention (Prisma)
- CORS configuration

### Data Protection
- Environment variable encryption
- Secure database connections
- HTTPS enforcement
- Session timeout

## 📊 Performance Architecture

### Optimization Strategies
- **Server Components** - Reduced client bundle
- **Static Generation** - Pre-rendered pages
- **Image Optimization** - Next.js Image component
- **Code Splitting** - Automatic bundle splitting
- **Caching** - React Query caching

### Monitoring
- Build-time optimization
- Runtime performance tracking
- Database query optimization
- Bundle size analysis

## 🔄 Integration Points

### External Services
- **Google OAuth** - User authentication
- **GitHub OAuth** - User authentication
- **Stripe** - Payment processing (ready)
- **Email Service** - Notifications (ready)

### Future Integrations
- Calendar systems (Google Calendar, Outlook)
- Email services (SendGrid, Mailgun)
- Analytics (Google Analytics, Mixpanel)
- Monitoring (Sentry, LogRocket)

## 📈 Scalability Considerations

### Horizontal Scaling
- Stateless application design
- Database connection pooling
- CDN integration ready
- Microservices migration path

### Vertical Scaling
- Database optimization
- Caching strategies
- Image optimization
- Bundle size optimization

---

*This architecture supports a fully independent tufting booking system with no vendor lock-in, complete data ownership, and full customization capabilities.*
