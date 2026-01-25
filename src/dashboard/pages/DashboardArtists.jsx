import { useState, useEffect } from 'react'
import { artistsAPI, songsAPI } from '../../services/api'
import { toast } from 'react-toastify'

function DashboardArtists() {
  const [artists, setArtists] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSongModalOpen, setIsSongModalOpen] = useState(false)
  const [editingArtist, setEditingArtist] = useState(null)
  const [selectedArtist, setSelectedArtist] = useState(null)
  const [songs, setSongs] = useState([])
  const [editingSong, setEditingSong] = useState(null)
  const [isAddingSong, setIsAddingSong] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [songFormData, setSongFormData] = useState({
    name: '',
    image: '',
    audioUrl: '',
    duration: 0,
  })
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    bio: '',
    email: '',
    phone: '',
    socialLinks: {
      facebook: '',
      instagram: '',
      twitter: '',
      tiktok: '',
    },
  })

  // Fetch artists on mount
  useEffect(() => {
    fetchArtists()
  }, [])

  const fetchArtists = async () => {
    try {
      setLoading(true)
      const response = await artistsAPI.getAll()
      setArtists(response.data.data)
    } catch (error) {
      toast.error('Failed to fetch artists')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const filteredArtists = artists.filter((artist) =>
    artist.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAdd = () => {
    setEditingArtist(null)
    setFormData({
      name: '',
      image: '',
      bio: '',
      email: '',
      phone: '',
      socialLinks: {
        facebook: '',
        instagram: '',
        twitter: '',
        tiktok: '',
      },
    })
    setIsModalOpen(true)
  }

  const handleEdit = (artist) => {
    setEditingArtist(artist)
    setFormData({
      name: artist.name || '',
      image: artist.image || '',
      bio: artist.bio || '',
      email: artist.email || '',
      phone: artist.phone || '',
      socialLinks: {
        facebook: artist.socialLinks?.facebook || '',
        instagram: artist.socialLinks?.instagram || '',
        twitter: artist.socialLinks?.twitter || '',
        tiktok: artist.socialLinks?.tiktok || '',
      },
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this artist?')) {
      try {
        await artistsAPI.delete(id)
        toast.success('Artist deleted successfully')
        fetchArtists()
      } catch (error) {
        toast.error('Failed to delete artist')
        console.error(error)
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingArtist) {
        await artistsAPI.update(editingArtist.id, formData)
        toast.success('Artist updated successfully')
      } else {
        await artistsAPI.create(formData)
        toast.success('Artist created successfully')
      }
      setIsModalOpen(false)
      fetchArtists()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save artist')
      console.error(error)
    }
  }

  const handleManageSongs = async (artist) => {
    setSelectedArtist(artist)
    setIsSongModalOpen(true)
    try {
      const response = await songsAPI.getByArtist(artist.id)
      setSongs(response.data.data || [])
    } catch (error) {
      toast.error('Failed to fetch songs')
      console.error(error)
    }
  }

  const handleAddSong = () => {
    setEditingSong(null)
    setIsAddingSong(true)
    setSongFormData({
      name: '',
      image: '',
      audioUrl: '',
      duration: 0,
    })
  }

  const handleEditSong = (song) => {
    setEditingSong(song)
    setIsAddingSong(false)
    setSongFormData({
      name: song.name || '',
      image: song.image || '',
      audioUrl: song.audioUrl || '',
      duration: song.duration || 0,
    })
  }

  const handleDeleteSong = async (id) => {
    if (window.confirm('Are you sure you want to delete this song?')) {
      try {
        await songsAPI.delete(id)
        toast.success('Song deleted successfully')
        const response = await songsAPI.getByArtist(selectedArtist.id)
        setSongs(response.data.data || [])
      } catch (error) {
        toast.error('Failed to delete song')
        console.error(error)
      }
    }
  }

  const handleSubmitSong = async (e) => {
    e.preventDefault()
    try {
      const songData = {
        ...songFormData,
        artistId: selectedArtist.id,
        duration: parseInt(songFormData.duration) || 0,
      }
      
      if (editingSong) {
        await songsAPI.update(editingSong.id, songData)
        toast.success('Song updated successfully')
      } else {
        await songsAPI.create(songData)
        toast.success('Song added successfully')
      }
      
      setEditingSong(null)
      setIsAddingSong(false)
      setSongFormData({ name: '', image: '', audioUrl: '', duration: 0 })
      const response = await songsAPI.getByArtist(selectedArtist.id)
      setSongs(response.data.data || [])
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save song')
      console.error(error)
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Artists Management</h1>
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Add Artist
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search artists..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredArtists.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                  No artists found
                </td>
              </tr>
            ) : (
              filteredArtists.map((artist) => (
                <tr key={artist.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={artist.image || '/logo.png'}
                      alt={artist.name}
                      className="h-12 w-12 rounded-full object-cover"
                      onError={(e) => {
                        e.target.src = '/logo.png'
                      }}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {artist.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {artist.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleEdit(artist)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleManageSongs(artist)}
                      className="text-green-600 hover:text-green-900"
                    >
                      Songs
                    </button>
                    <button
                      onClick={() => handleDelete(artist.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">
              {editingArtist ? 'Edit Artist' : 'Add Artist'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows="3"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Social Links
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Facebook"
                    value={formData.socialLinks.facebook}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, facebook: e.target.value },
                      })
                    }
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Instagram"
                    value={formData.socialLinks.instagram}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, instagram: e.target.value },
                      })
                    }
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Twitter"
                    value={formData.socialLinks.twitter}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, twitter: e.target.value },
                      })
                    }
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="TikTok"
                    value={formData.socialLinks.tiktok}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, tiktok: e.target.value },
                      })
                    }
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  {editingArtist ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Songs Management Modal */}
      {isSongModalOpen && selectedArtist && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">
                Manage Songs - {selectedArtist.name}
              </h2>
              <button
                onClick={() => {
                  setIsSongModalOpen(false)
                  setSelectedArtist(null)
                  setSongs([])
                  setEditingSong(null)
                  setIsAddingSong(false)
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* Add/Edit Song Form */}
            {(editingSong !== null || isAddingSong) && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">
                  {editingSong ? 'Edit Song' : 'Add New Song'}
                </h3>
                <form onSubmit={handleSubmitSong}>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Song Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={songFormData.name}
                        onChange={(e) => setSongFormData({ ...songFormData, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Duration (seconds)
                      </label>
                      <input
                        type="number"
                        value={songFormData.duration}
                        onChange={(e) => setSongFormData({ ...songFormData, duration: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image URL
                    </label>
                    <input
                      type="text"
                      value={songFormData.image}
                      onChange={(e) => setSongFormData({ ...songFormData, image: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Audio URL *
                    </label>
                    <input
                      type="text"
                      required
                      value={songFormData.audioUrl}
                      onChange={(e) => setSongFormData({ ...songFormData, audioUrl: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="https://..."
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingSong(null)
                        setIsAddingSong(false)
                        setSongFormData({ name: '', image: '', audioUrl: '', duration: 0 })
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      {editingSong ? 'Update' : 'Add'} Song
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Songs List */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold">Songs ({songs.length})</h3>
                  {!isAddingSong && editingSong === null && (
                    <button
                      onClick={handleAddSong}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                    >
                      + Add Song
                    </button>
                  )}
                </div>
              {songs.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No songs yet. Add your first song!</p>
              ) : (
                <div className="space-y-2">
                  {songs.map((song) => (
                    <div
                      key={song.id}
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-3 flex-1">
                        {song.image && (
                          <img
                            src={song.image}
                            alt={song.name}
                            className="h-12 w-12 rounded object-cover"
                            onError={(e) => {
                              e.target.src = '/logo.png'
                            }}
                          />
                        )}
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{song.name}</p>
                          <p className="text-sm text-gray-500">
                            {song.duration ? `${Math.floor(song.duration / 60)}:${String(song.duration % 60).padStart(2, '0')}` : 'No duration'}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditSong(song)}
                          className="text-blue-600 hover:text-blue-900 text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteSong(song.id)}
                          className="text-red-600 hover:text-red-900 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardArtists
