import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Artists from './pages/Artists'
import Models from './pages/Models'
import Events from './pages/Events'
import News from './pages/News'
import NewsDetail from './pages/NewsDetail'
import About from './pages/About'
import Contact from './pages/Contact'
import ArtistDetail from './pages/ArtistDetail'
import ModelDetail from './pages/ModelDetail'
import EventDetail from './pages/EventDetail'
import DashboardHome from './dashboard/pages/DashboardHome'
import DashboardArtists from './dashboard/pages/DashboardArtists'
import DashboardModels from './dashboard/pages/DashboardModels'
import DashboardEvents from './dashboard/pages/DashboardEvents'
import DashboardLayout from './dashboard/components/DashboardLayout'

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/artist" element={<Artists />} />
        <Route path="/model" element={<Models />} />
        <Route path="/event" element={<Events />} />
        <Route path="/news" element={<News />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/artist/:id" element={<ArtistDetail />} />
        <Route path="/model/:id" element={<ModelDetail />} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/news/:id" element={<NewsDetail />} />

        {/* Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <DashboardHome />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/artists"
          element={
            <DashboardLayout>
              <DashboardArtists />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/models"
          element={
            <DashboardLayout>
              <DashboardModels />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/events"
          element={
            <DashboardLayout>
              <DashboardEvents />
            </DashboardLayout>
          }
        />
      </Routes>
    </Router>
  )
}

export default App

