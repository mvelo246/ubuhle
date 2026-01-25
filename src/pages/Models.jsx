import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ModelCard from '../components/ModelCard'
import { modelsAPI } from '../services/api'

function Models() {
  const [models, setModels] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchModels()
  }, [])

  const fetchModels = async () => {
    try {
      setLoading(true)
      const response = await modelsAPI.getAll()
      setModels(response.data.data || [])
    } catch (error) {
      console.error('Failed to fetch models:', error)
      setModels([])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <div className="bg-white py-8 sm:py-12">
          <div className="container mx-auto px-4">
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="bg-white py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-center md:text-left text-black">Models</h1>
          {models.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No models found.</p>
            </div>
          ) : (
            <div className="flex items-center justify-center bg-white">
              <div className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4 w-full">
                {models.map((model) => (
                  <ModelCard key={model.id} model={model} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Models

