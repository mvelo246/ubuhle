---
name: Convert PHP to React with Dashboard
overview: Convert the existing PHP-based "Ubuhle Bekonjana" website to a frontend-only React application with Tailwind CSS, plus add a comprehensive admin dashboard for managing artists, models, and events.
todos:
  - id: setup-project
    content: Initialize React project with Vite, install dependencies (react-router-dom, tailwindcss), and configure Tailwind CSS
    status: pending
  - id: create-core-components
    content: Create Header, Footer, and Hero components from PHP files
    status: pending
    dependencies:
      - setup-project
  - id: create-page-components
    content: "Create main page components: Home, Artists, Models, Events, About, Contact"
    status: pending
    dependencies:
      - create-core-components
  - id: create-detail-pages
    content: "Create detail page components: ArtistDetail, ModelDetail, EventDetail"
    status: pending
    dependencies:
      - create-page-components
  - id: convert-interactive-features
    content: Convert Alpine.js features to React hooks (image gallery, mobile menu, music player)
    status: pending
    dependencies:
      - create-core-components
  - id: setup-routing
    content: Set up React Router with all public routes
    status: pending
    dependencies:
      - create-page-components
      - create-detail-pages
  - id: create-dashboard-layout
    content: Create dashboard layout component with sidebar navigation
    status: pending
    dependencies:
      - setup-project
  - id: create-dashboard-overview
    content: Create dashboard overview/home page with stats cards and charts (mock data)
    status: pending
    dependencies:
      - create-dashboard-layout
  - id: create-dashboard-artists
    content: Create dashboard Artists management page with table and add/edit forms (UI only)
    status: pending
    dependencies:
      - create-dashboard-layout
  - id: create-dashboard-models
    content: Create dashboard Models management page with table and add/edit forms (UI only)
    status: pending
    dependencies:
      - create-dashboard-layout
  - id: create-dashboard-events
    content: Create dashboard Events management page with table and add/edit forms (UI only)
    status: pending
    dependencies:
      - create-dashboard-layout
  - id: setup-dashboard-routing
    content: Set up dashboard routes and navigation, add dashboard route to main router
    status: pending
    dependencies:
      - create-dashboard-overview
      - create-dashboard-artists
      - create-dashboard-models
      - create-dashboard-events
  - id: migrate-assets
    content: Copy all images and assets to public folder
    status: pending
    dependencies:
      - setup-project
  - id: test-and-polish
    content: Test all pages, routes, and features
    status: pending
    dependencies:
      - setup-routing
      - setup-dashboard-routing
      - convert-interactive-features
---

# Convert PHP Website to React Application with Dashboard

## Overview

Convert the existing PHP-based website for "Ubuhle Bekonjana" (artist/model/events platform) to a **frontend-only** React single-page application with Tailwind CSS, plus add a comprehensive admin dashboard. The project currently uses PHP includes, Tailwind CSS via CDN, and Alpine.js for interactivity.

**Focus: Frontend-only conversion** - All data will be static/hardcoded in components. No backend integration, API calls, or database connections. Dashboard will have full UI with mock data.

## Current Structure Analysis

- **Pages**: Home, Artist, Model, Event, About, Contact
- **Detail Pages**: About Artist, About Model, About Event
- **Components**: Header, Footer, Hero, Artist Home, Model Home, Event Home
- **Features**: Image gallery with modal (Alpine.js), contact form, music player, responsive navigation
- **Styling**: Tailwind CSS (via CDN), custom animations and transforms

## Implementation Plan

### Part 1: Public Website Conversion

#### 1. Project Setup
- Initialize a new React project using Vite
- Set up Tailwind CSS with proper configuration
- Install React Router for navigation
- Set up project structure (components, pages, assets)

#### 2. Core Components
Convert shared PHP components to React:
- **Header** ([header.php](header.php)) - Navigation with mobile menu
- **Footer** ([footer.php](footer.php)) - Social links and copyright
- **Hero** ([hero.php](hero.php)) - Landing section

#### 3. Page Components
Convert PHP pages to React route components:
- **Home** ([home.php](home.php)) - Combines hero, artist_home, model_home, event_home
- **Artist** ([artist.php](artist.php)) - Artist listing page
- **Model** ([model.php](model.php)) - Model listing page  
- **Event** ([event.php](event.php)) - Event listing with upcoming/past sections
- **About** ([about.php](about.php)) - About page
- **Contact** ([contact.php](contact.php)) - Contact form page

#### 4. Detail Pages
Convert detail pages to React components:
- **AboutArtist** ([about_Artist.php](about_Artist.php)) - Artist detail page with music player
- **AboutModel** ([about_model.php](about_model.php)) - Model detail with image gallery
- **AboutEvent** ([about_event.php](about_event.php)) - Event detail page

#### 5. Special Features
- **Image Gallery** - Convert Alpine.js gallery to React state/hooks
- **Music Player** - Convert song player to React component (UI only)
- **Contact Form** - Convert to static React form component

#### 6. Public Routing
Set up React Router with routes:
- `/` - Home
- `/artist` - Artists list
- `/model` - Models list
- `/event` - Events list
- `/about` - About page
- `/contact` - Contact page
- `/artist/:id` - Artist detail
- `/model/:id` - Model detail
- `/event/:id` - Event detail

### Part 2: Admin Dashboard

#### 7. Dashboard Layout
Create dashboard layout component:
- **Sidebar Navigation** - Dashboard menu with icons
- **Top Bar** - Header with user info, notifications, logout
- **Main Content Area** - Container for dashboard pages
- **Responsive Design** - Collapsible sidebar for mobile

#### 8. Dashboard Overview Page
Create dashboard home/overview page:
- **Stats Cards** - Total artists, models, events, bookings (mock data)
- **Quick Actions** - Add new artist/model/event buttons
- **Recent Activity** - Recent items table (mock data)
- **Charts/Graphs** - Visual statistics (optional, UI only)

#### 9. Artists Management Page
Create artists management interface:
- **Artists Table** - List all artists with image, name, details
- **Add Artist Form** - Form to add new artist (UI only, no submission)
- **Edit Artist Modal** - Modal to edit artist details
- **Delete Confirmation** - Delete button with confirmation (UI only)
- **Search/Filter** - Search and filter functionality (client-side)

#### 10. Models Management Page
Create models management interface:
- **Models Table** - List all models with image, name, details
- **Add Model Form** - Form to add new model (UI only)
- **Edit Model Modal** - Modal to edit model details
- **Delete Confirmation** - Delete button with confirmation
- **Image Upload UI** - File input for model images (UI only)

#### 11. Events Management Page
Create events management interface:
- **Events Table** - List all events with date, title, status
- **Add Event Form** - Form to add new event (UI only)
- **Edit Event Modal** - Modal to edit event details
- **Delete Confirmation** - Delete button with confirmation
- **Date Picker UI** - Date selection for events (UI only)
- **Status Badges** - Upcoming/Past status indicators

#### 12. Dashboard Routing
Set up dashboard routes:
- `/dashboard` - Dashboard overview
- `/dashboard/artists` - Artists management
- `/dashboard/models` - Models management
- `/dashboard/events` - Events management
- Add dashboard link to main navigation (optional)

## Files to Create

### Public Website Structure
```
src/
  components/
    Header.jsx
    Footer.jsx
    Hero.jsx
    ImageGallery.jsx
    MusicPlayer.jsx
    ArtistCard.jsx
    ModelCard.jsx
    EventCard.jsx
  pages/
    Home.jsx
    Artists.jsx
    Models.jsx
    Events.jsx
    About.jsx
    Contact.jsx
    ArtistDetail.jsx
    ModelDetail.jsx
    EventDetail.jsx
  App.jsx
  main.jsx
  index.css
```

### Dashboard Structure
```
src/
  dashboard/
    components/
      DashboardLayout.jsx
      DashboardSidebar.jsx
      DashboardHeader.jsx
      StatsCard.jsx
      DataTable.jsx
      FormModal.jsx
    pages/
      DashboardHome.jsx
      DashboardArtists.jsx
      DashboardModels.jsx
      DashboardEvents.jsx
  App.jsx (includes dashboard routes)
```

## Dashboard Features (Frontend Only)

### Data Management
- All data stored in React state (useState)
- Mock data arrays for artists, models, events
- CRUD operations simulated in UI (add/edit/delete updates local state only)
- No persistence - data resets on page refresh

### UI Components
- Modern dashboard design with Tailwind CSS
- Responsive tables with sorting
- Modal dialogs for forms
- Toast notifications (UI only)
- Loading states (simulated)
- Empty states for no data

### Dashboard Features
- Statistics overview with mock numbers
- Full CRUD interface (UI only)
- Search and filter functionality
- Image upload UI (no actual upload)
- Form validation (client-side only)
- Responsive design

## Key Conversions

### PHP Includes → React Components
- `<?php include("header.php");?>` → `<Header />`
- `<?php include("footer.php");?>` → `<Footer />`
- `<?php include("hero.php");?>` → `<Hero />`

### Alpine.js → React Hooks
- `x-data` object → `useState` hooks
- `x-show` → conditional rendering
- `x-on:click` → `onClick` handlers
- `x-transition` → CSS transitions

### Dashboard State Management
- Artists/Models/Events stored in `useState` arrays
- Form inputs managed with `useState`
- Modal open/close state with `useState`
- Search/filter with filtered arrays

## Dependencies Needed
- `react`
- `react-dom`
- `react-router-dom`
- `tailwindcss`
- `autoprefixer`
- `postcss`
- `@vitejs/plugin-react`
- `lucide-react` or `react-icons` (for dashboard icons)

## Considerations

- **Frontend Only**: No backend, APIs, or database - all data is static
- **Dashboard Data**: All CRUD operations are UI-only, data stored in component state
- Maintain exact visual design and layout for public site
- Preserve all animations and hover effects
- Dashboard should have modern, professional design
- Ensure responsive behavior matches original
- Maintain accessibility features
- All data resets on page refresh (no persistence)
- Dashboard can use local state or Context API for shared state
- Form validations are client-side only

