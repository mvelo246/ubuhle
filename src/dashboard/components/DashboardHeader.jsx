import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function DashboardHeader() {
  const { logout, user } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/dashboard/login')
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">{user?.username || user?.email}</span>
          <Link
            to="/"
            className="text-gray-600 hover:text-blue-600 px-4 py-2 rounded"
          >
            View Site
          </Link>
          <button
            onClick={handleLogout}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader

