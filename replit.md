# PM Internship Hub

## Overview

This is a modern full-stack web application built for connecting students with product management internship opportunities. The platform features a React frontend with 3D animations powered by React Three Fiber, an Express.js backend API, and PostgreSQL database managed through Drizzle ORM. The application provides internship search functionality, user authentication, and company management features with a focus on modern UI/UX design patterns.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client is built with React 18 and TypeScript, using Vite as the build tool. The UI leverages Radix UI components with Tailwind CSS for styling, following a modern component-based architecture. The application features advanced 3D visualizations using React Three Fiber (@react-three/fiber) with drei helpers for enhanced user experience. State management is handled through TanStack Query for server state and local React state for UI state.

**Key Design Decisions:**
- **Component Library**: Radix UI provides accessible, unstyled components that can be customized with Tailwind CSS
- **3D Graphics**: React Three Fiber enables WebGL-powered 3D scenes with graceful fallbacks for unsupported devices
- **Animation**: Framer Motion handles page transitions and micro-interactions
- **Styling**: Tailwind CSS with custom design system using CSS variables for theming

### Backend Architecture
The server uses Express.js with TypeScript in ESM module format. The API follows RESTful conventions with structured route handlers and centralized error handling. Database operations are abstracted through a storage interface pattern, making the codebase more maintainable and testable.

**Key Design Decisions:**
- **Database Access**: Interface-based storage pattern allows for easy testing and potential database swapping
- **Type Safety**: Shared schema definitions between client and server ensure type consistency
- **Error Handling**: Centralized error middleware with structured error responses
- **Development Experience**: Hot reload setup with Vite integration for rapid development

### Database Schema
PostgreSQL database with four main entities managed through Drizzle ORM:

1. **Users**: Authentication and profile information with bcrypt password hashing
2. **Companies**: Organization details including industry, size, and branding
3. **Internships**: Job postings with filtering capabilities (location, remote work, company)
4. **Applications**: User applications with status tracking and timestamps

**Key Design Decisions:**
- **Schema Validation**: Zod schemas provide runtime validation and TypeScript types
- **Relationships**: Foreign key constraints ensure data integrity across entities
- **Indexing Strategy**: Primary keys and unique constraints on critical fields for performance

### Authentication and Authorization
Basic username/password authentication using bcrypt for password hashing. User sessions are managed through the application layer with plans for more robust authentication mechanisms.

**Security Considerations:**
- Password hashing with bcrypt prevents plain text storage
- Input validation through Zod schemas prevents injection attacks
- Environment-based configuration keeps sensitive data secure

## External Dependencies

### Database and ORM
- **PostgreSQL**: Primary database with Neon serverless hosting (@neondatabase/serverless)
- **Drizzle ORM**: Type-safe database toolkit with migration support
- **Database URL**: Environment variable configuration for connection management

### UI and Styling
- **Radix UI**: Comprehensive component library for accessible UI primitives
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Lucide React**: Icon library for consistent iconography
- **Framer Motion**: Animation library for smooth transitions and interactions

### 3D Graphics and WebGL
- **React Three Fiber**: React renderer for Three.js enabling 3D scenes
- **Drei**: Helper library for common Three.js patterns and components
- **Three.js**: Core 3D graphics library with WebGL rendering
- **Post-processing**: Advanced visual effects through @react-three/postprocessing

### Development Tools
- **Vite**: Fast build tool with hot module replacement and plugin ecosystem
- **TypeScript**: Static typing for both client and server code
- **ESBuild**: Fast JavaScript bundler for production builds
- **TSX**: TypeScript execution for development server

### State Management and Data Fetching
- **TanStack Query**: Server state management with caching and synchronization
- **React Hook Form**: Form state management with validation
- **Zod**: Schema validation for runtime type checking