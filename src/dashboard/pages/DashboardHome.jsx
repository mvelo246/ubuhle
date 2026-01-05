import { Link } from 'react-router-dom'
import StatsCard from '../components/StatsCard'
import { artists, models, events } from '../../data/mockData'

function DashboardHome() {
  const totalArtists = artists.length
  const totalModels = models.length
  const totalEvents = events.length
  const upcomingEvents = events.filter(e => e.status === 'upcoming').length

  const recentItems = [
    ...artists.slice(0, 3).map(a => ({ ...a, type: 'artist' })),
    ...models.slice(0, 2).map(m => ({ ...m, type: 'model' })),
    ...events.slice(0, 2).map(e => ({ ...e, type: 'event' })),
  ].sort((a, b) => b.id - a.id).slice(0, 5)

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
          value={totalArtists}
          icon="🎤"
          color="blue"
        />
        <StatsCard
          title="Total Models"
          value={totalModels}
          icon="👤"
          color="purple"
        />
        <StatsCard
          title="Total Events"
          value={totalEvents}
          icon="🎉"
          color="green"
        />
        <StatsCard
          title="Upcoming Events"
          value={upcomingEvents}
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
                  ID
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentItems.map((item) => (
                <tr key={`${item.type}-${item.id}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.name || item.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.id}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default DashboardHome

