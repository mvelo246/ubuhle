import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MusicPlayer from '../components/MusicPlayer'
import { artists, songs } from '../data/mockData'

function ArtistDetail() {
  const { id } = useParams()
  const artist = artists.find((a) => a.id === parseInt(id)) || artists[0]
  const artistSongs = songs.filter((s) => s.artistId === parseInt(id))

  const handleScrollToMusic = () => {
    const element = document.getElementById('music')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <div className="relative min-h-[600px] sm:min-h-[700px] flex items-center overflow-hidden" style={{ backgroundColor: '#48545a' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 sm:py-16">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Image Section */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-purple-500/30 rounded-2xl transform rotate-3"></div>
                <img 
                  src={artist.image} 
                  alt={artist.name} 
                  className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 object-cover rounded-2xl shadow-2xl border-4 border-white/20"
                />
              </div>
            </div>
            
            {/* Content Section */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
                {artist.name}
              </h1>
              <div className="h-1 w-20 bg-blue-400 mx-auto lg:mx-0 mb-6"></div>
              <p className="text-lg sm:text-xl text-gray-200 mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {artist.bio}
              </p>
              <button
                onClick={handleScrollToMusic}
                className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 rounded-xl font-semibold text-base sm:text-lg hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <svg 
                  className="w-5 h-5 sm:w-6 sm:h-6 mr-2" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                </svg>
                Listen to Music
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Music Section */}
      <div id="music" className="bg-gray-50 py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
              Discography
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>
          
          {artistSongs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {artistSongs.map((song) => (
                <MusicPlayer key={song.id} song={song} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <MusicPlayer song={{ name: 'Umenzi', artist: artist.name, image: artist.image }} />
              <MusicPlayer song={{ name: 'Random Song', artist: artist.name, image: artist.image }} />
              <MusicPlayer song={{ name: 'Another Song', artist: artist.name, image: artist.image }} />
            </div>
          )}
        </div>
      </div>

      {/* Booking & Contact Section */}
      <div className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-xl p-8 sm:p-10 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Booking Section */}
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                    Book {artist.name}
                  </h2>
                  <div className="space-y-4">
                    <a
                      href={`mailto:${artist.email}`}
                      className="flex items-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-gray-500 font-medium">Email</p>
                        <p className="text-blue-600 font-semibold break-all">{artist.email}</p>
                      </div>
                    </a>
                    {artist.phone && (
                      <a
                        href={`tel:${artist.phone.replace(/\s/g, '')}`}
                        className="flex items-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group"
                      >
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm text-gray-500 font-medium">Phone</p>
                          <p className="text-green-600 font-semibold">{artist.phone}</p>
                        </div>
                      </a>
                    )}
                  </div>
                </div>

                {/* Social Section */}
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                    Follow {artist.name}
                  </h2>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-14 h-14 bg-white rounded-full shadow-md hover:shadow-lg hover:bg-blue-50 transition-all duration-300 group"
                      aria-label="Facebook"
                    >
                      <svg
                        className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform duration-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-14 h-14 bg-white rounded-full shadow-md hover:shadow-lg hover:bg-blue-50 transition-all duration-300 group"
                      aria-label="LinkedIn"
                    >
                      <svg
                        className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform duration-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-14 h-14 bg-white rounded-full shadow-md hover:shadow-lg hover:bg-blue-50 transition-all duration-300 group"
                      aria-label="Instagram"
                    >
                      <svg
                        className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform duration-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                    <a
                      href="https://tiktok.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-14 h-14 bg-white rounded-full shadow-md hover:shadow-lg hover:bg-blue-50 transition-all duration-300 group"
                      aria-label="TikTok"
                    >
                      <svg
                        className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform duration-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default ArtistDetail
