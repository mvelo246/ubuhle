# Ubuhle Bekonjana - React Application

A modern React application for managing artists, models, and events with an admin dashboard.

## Features

### Public Website
- Home page with hero section
- Artist listing and detail pages
- Model listing and detail pages  
- Event listing and detail pages (upcoming/past)
- About page
- Contact form
- Responsive design with Tailwind CSS

### Admin Dashboard
- Dashboard overview with statistics
- Artists management (CRUD operations)
- Models management (CRUD operations)
- Events management (CRUD operations)
- Search and filter functionality
- Modern UI with Tailwind CSS

## Tech Stack

- React 18
- React Router DOM
- Tailwind CSS
- Vite (build tool)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
  components/          # Reusable components (Header, Footer, Cards, etc.)
  pages/              # Page components (Home, Artists, Models, etc.)
  dashboard/          # Dashboard components and pages
    components/       # Dashboard-specific components
    pages/           # Dashboard pages
  data/              # Mock data files
  App.jsx            # Main app component with routing
  main.jsx           # Entry point
  index.css          # Tailwind CSS imports
```

## Routes

### Public Routes
- `/` - Home page
- `/artist` - Artists listing
- `/artist/:id` - Artist detail
- `/model` - Models listing
- `/model/:id` - Model detail
- `/event` - Events listing
- `/event/:id` - Event detail
- `/about` - About page
- `/contact` - Contact page

### Dashboard Routes
- `/dashboard` - Dashboard overview
- `/dashboard/artists` - Artists management
- `/dashboard/models` - Models management
- `/dashboard/events` - Events management

## Notes

- This is a **frontend-only** application
- All data is stored in React state (mock data)
- CRUD operations are UI-only (data resets on page refresh)
- No backend integration or database connections
- Images are loaded from URLs or the public folder

## Development

The application uses:
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **React Router** for navigation
- React Hooks for state management

## License

All Rights Reserved - Momentum Code © 2025

