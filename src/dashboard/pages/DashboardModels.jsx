import { useState, useEffect } from 'react'
import { modelsAPI } from '../../services/api'
import { toast } from 'react-toastify'

function DashboardModels() {
  const [models, setModels] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingModel, setEditingModel] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    email: '',
    phone: '',
    bio: '',  
    gallery: [],
    socialLinks: {
      facebook: '',
      instagram: '',
      twitter: '',
      tiktok: '',
    },
  })

  useEffect(() => {
    fetchModels()
  }, [])

  const fetchModels = async () => {
    try {
      setLoading(true)
      const response = await modelsAPI.getAll()
      setModels(response.data.data)
    } catch (error) {
      toast.error('Failed to fetch models')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const filteredModels = models.filter((model) =>
    model.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAdd = () => {
    setEditingModel(null)
    setFormData({
      name: '',
      image: '',
      email: '',
      phone: '',
      bio: '',
      gallery: [],
      socialLinks: {
        facebook: '',
        instagram: '',
        twitter: '',
        tiktok: '',
      },
    })
    setIsModalOpen(true)
  }

  const handleEdit = (model) => {
    setEditingModel(model)
    setFormData({
      name: model.name || '',
      image: model.image || '',
      email: model.email || '',
      phone: model.phone || '',
      bio: model.bio || '',
      gallery: model.gallery || [],
      socialLinks: {
        facebook: model.socialLinks?.facebook || '',
        instagram: model.socialLinks?.instagram || '',
        twitter: model.socialLinks?.twitter || '',
        tiktok: model.socialLinks?.tiktok || '',
      },
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this model?')) {
      try {
        await modelsAPI.delete(id)
        toast.success('Model deleted successfully')
        fetchModels()
      } catch (error) {
        toast.error('Failed to delete model')
        console.error(error)
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingModel) {
        await modelsAPI.update(editingModel.id, formData)
        toast.success('Model updated successfully')
      } else {
        await modelsAPI.create(formData)
        toast.success('Model created successfully')
      }
      setIsModalOpen(false)
      fetchModels()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save model')
      console.error(error)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    )

  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Models Management</h1>
        <button
          onClick={handleAdd}
          className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition"
        >
          Add Model
        </button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search models..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

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
                Bio
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredModels.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                  No models found
                </td>
              </tr>
            ) : (
              filteredModels.map((model) => (
                <tr key={model.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={model.image || '/logo.png'}
                      alt={model.name}
                      className="h-12 w-12 rounded-full object-cover"
                      onError={(e) => {
                        e.target.src = '/logo.png'
                      }}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {model.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                    {model.bio}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleEdit(model)}
                      className="text-purple-600 hover:text-purple-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(model.id)}
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">
              {editingModel ? 'Edit Model' : 'Add Model'}
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Main Image URL
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gallery Images (Multiple Images)
                </label>
                <div className="space-y-2">
                  {formData.gallery && formData.gallery.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      {formData.gallery.map((img, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={img}
                            alt={`Gallery ${index + 1}`}
                            className="w-full h-24 object-cover rounded border border-gray-300"
                            onError={(e) => {
                              e.target.src = '/logo.png'
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newGallery = formData.gallery.filter((_, i) => i !== index)
                              setFormData({ ...formData, gallery: newGallery })
                            }}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter image URL and press Enter"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          const url = e.target.value.trim()
                          if (url) {
                            setFormData({
                              ...formData,
                              gallery: [...(formData.gallery || []), url],
                            })
                            e.target.value = ''
                          }
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault()
                        const input = e.target.previousElementSibling
                        const url = input.value.trim()
                        if (url) {
                          setFormData({
                            ...formData,
                            gallery: [...(formData.gallery || []), url],
                          })
                          input.value = ''
                        }
                      }}
                      className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                    >
                      Add
                    </button>
                  </div>
                  <p className="text-xs text-gray-500">
                    Add multiple images to the gallery. Enter URL and press Enter or click Add.
                  </p>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="model@example.com"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="+27 11 234 5678"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
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
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
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
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
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
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
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
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
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
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                >
                  {editingModel ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardModels
