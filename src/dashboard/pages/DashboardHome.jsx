import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import StatsCard from '../components/StatsCard'
import { dashboardAPI } from '../../services/api'
import { toast } from 'react-toastify'

function DashboardHome() {
  const [stats, setStats] = useState({
    totalArtists: 0,
    totalModels: 0,
    totalEvents: 0,
    upcomingEvents: 0,
    totalSongs: 0,
    totalNews: 0,
  })
  const [recentItems, setRecentItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const [statsResponse, recentResponse] = await Promise.all([
        dashboardAPI.getStats(),
        dashboardAPI.getRecent(),
      ])
      setStats(statsResponse.data.data)
      setRecentItems(recentResponse.data.data)
    } catch (error) {
      toast.error('Failed to fetch dashboard data')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-600 mt-2">Welcome to the admin dashboard</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Artists"
          value={stats.totalArtists}
          icon="🎤"
          color="blue"
        />
        <StatsCard
          title="Total Models"
          value={stats.totalModels}
          icon="👤"
          color="purple"
        />
        <StatsCard
          title="Total Events"
          value={stats.totalEvents}
          icon="🎉"
          color="green"
        />
        <StatsCard
          title="Upcoming Events"
          value={stats.upcomingEvents}
          icon="📅"
          color="orange"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/dashboard/artists"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Add Artist
          </Link>
          <Link
            to="/dashboard/models"
            className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition"
          >
            Add Model
          </Link>
          <Link
            to="/dashboard/events"
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Add Event
          </Link>
          <Link
            to="/dashboard/news"
            className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition"
          >
            Add News
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentItems.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                    No recent activity
                  </td>
                </tr>
              ) : (
                recentItems.map((item, index) => (
                  <tr key={`${item.type}-${item.id || index}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {item.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.name || item.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default DashboardHome
