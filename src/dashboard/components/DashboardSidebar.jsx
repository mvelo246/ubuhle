import { Link, useLocation } from 'react-router-dom'

function DashboardSidebar() {
  const location = useLocation()

  const menuItems = [
    { path: '/dashboard', label: 'Overview', icon: '📊' },
    { path: '/dashboard/artists', label: 'Artists', icon: '🎤' },
    { path: '/dashboard/models', label: 'Models', icon: '👤' },
    { path: '/dashboard/events', label: 'Events', icon: '🎉' },
    { path: '/dashboard/news', label: 'News', icon: '📰' },
  ]

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen">
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-2 rounded-lg transition ${
                location.pathname === item.path
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  )
}

export default DashboardSidebar

