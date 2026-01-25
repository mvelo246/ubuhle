import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ArtistCard from '../components/ArtistCard'
import { artistsAPI } from '../services/api'

function Artists() {
  const [artists, setArtists] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchArtists()
  }, [])

  const fetchArtists = async () => {
    try {
      setLoading(true)
      const response = await artistsAPI.getAll()
      setArtists(response.data.data || [])
    } catch (error) {
      console.error('Failed to fetch artists:', error)
      setArtists([])
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
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-center md:text-left text-black">Artists</h1>
          {artists.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No artists found.</p>
            </div>
          ) : (
            <div className="flex items-center justify-center bg-white">
              <div className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4 w-full">
                {artists.map((artist) => (
                  <ArtistCard key={artist.id} artist={artist} />
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

export default Artists

