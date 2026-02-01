import { useParams, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { modelsAPI } from '../services/api'
import { useState, useEffect } from 'react'

function ModelDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [model, setModel] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [currentMainImageIndex, setCurrentMainImageIndex] = useState(0)
  const [imageOpacity, setImageOpacity] = useState(1)

  useEffect(() => {
    fetchModel()
  }, [id])

  const fetchModel = async () => {
    try {
      setLoading(true)
      const response = await modelsAPI.getById(id)
      setModel(response.data.data)
    } catch (error) {
      console.error('Failed to fetch model:', error)
      navigate('/model')
    } finally {
      setLoading(false)
    }
  }

  // Combine model image with gallery images for auto-rotation
  const galleryImages = model?.gallery || []
  const allImages = model?.image ? [model.image, ...galleryImages] : galleryImages

  // Auto-rotate main image every 6 seconds with fade effect
  useEffect(() => {
    if (allImages.length <= 1) return

    const interval = setInterval(() => {
      // Fade out
      setImageOpacity(0)

      // After fade out, change image and fade in
      setTimeout(() => {
        setCurrentMainImageIndex((prevIndex) => {
          return (prevIndex + 1) % allImages.length
        })
        setImageOpacity(1)
      }, 300) // Half of transition duration
    }, 6000) // Change every 6 seconds

    return () => clearInterval(interval)
  }, [allImages.length])

  const handleImageClick = (index) => {
    setActiveImageIndex(index)
    setIsGalleryOpen(true)
  }

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
        <Footer />
      </>
    )
  }

  if (!model) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Model not found</h1>
          <button
            onClick={() => navigate('/model')}
            className="text-purple-600 hover:text-purple-800"
          >
            Go back to Models
          </button>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="flex pt-20 pb-12 px-6 md:px-20 items-center justify-center min-h-[70vh]" style={{ backgroundColor: '#48545a' }}>
        <div className="flex flex-col gap-8 md:flex-row items-center max-w-7xl w-full">
          <div className="w-full md:w-1/2 lg:pr-12">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl text-center md:text-left text-white leading-tight font-bold mb-4">
              {model.name}
            </h1>
            <div className="h-1 w-20 bg-blue-400 mx-auto md:mx-0 mb-6"></div>
            <p className="text-lg lg:text-xl text-center md:text-left text-gray-200 font-light leading-relaxed">
              {model.bio || "I'm not just building a career; I'm building a legacy, breaking boundaries, and proving that strength and grace are the ultimate power duo."}
            </p>
          </div>
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <div className="relative w-full max-w-md overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl transform rotate-3 z-10 pointer-events-none"></div>
              <div className="relative rounded-2xl shadow-2xl overflow-hidden">
                <img
                  src={allImages[currentMainImageIndex]}
                  alt={model.name}
                  className="w-full h-auto object-cover transition-opacity duration-600 ease-in-out"
                  style={{ opacity: imageOpacity }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="px-4 py-16 mx-auto max-w-7xl bg-white">
        <div className="w-full mx-auto text-center">
          <h2 className="mb-4 text-3xl md:text-4xl font-bold leading-tight text-gray-900">
            Portfolio Gallery
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore a collection of professional photographs showcasing versatility, elegance, and artistic expression.
          </p>
        </div>
      </section>

      <section className="w-full h-full select-none bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 duration-1000 delay-300 select-none ease">
          {galleryImages.length > 0 ? (
            <ul id="gallery" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
              {galleryImages.map((img, index) => (
                <li key={index} className="w-full">
                  <img
                    onClick={() => handleImageClick(index)}
                    src={img}
                    alt={`Gallery ${index + 1}`}
                    className="object-cover select-none w-full h-full bg-gray-200 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-zoom-in aspect-[5/6] hover:scale-105"
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No gallery images available.</p>
            </div>
          )}
        </div>

        {isGalleryOpen && galleryImages.length > 0 && (
          <ImageGalleryModal
            images={galleryImages}
            activeIndex={activeImageIndex}
            onClose={() => setIsGalleryOpen(false)}
            onNext={() =>
              setActiveImageIndex((prev) =>
                prev === galleryImages.length - 1 ? 0 : prev + 1
              )
            }
            onPrev={() =>
              setActiveImageIndex((prev) =>
                prev === 0 ? galleryImages.length - 1 : prev - 1
              )
            }
          />
        )}
      </section>

      {/* Contact Section */}
      <div className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-xl p-8 sm:p-10 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Contact Section */}
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                    Book {model.name}
                  </h2>
                  <div className="space-y-4">
                    {(model.email || model.phone) ? (
                      <>
                        {model.email && (
                          <a
                            href={`mailto:${model.email}`}
                            className="flex items-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group"
                          >
                            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <div className="ml-4">
                              <p className="text-sm text-gray-500 font-medium">Email</p>
                              <p className="text-blue-600 font-semibold break-all">{model.email}</p>
                            </div>
                          </a>
                        )}
                        {model.phone && (
                          <a
                            href={`tel:${model.phone.replace(/\s/g, '')}`}
                            className="flex items-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group"
                          >
                            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                            </div>
                            <div className="ml-4">
                              <p className="text-sm text-gray-500 font-medium">Phone</p>
                              <p className="text-green-600 font-semibold">{model.phone}</p>
                            </div>
                          </a>
                        )}
                      </>
                    ) : (
                      <>
                        <a
                          href="mailto:Ubuhle@gmail.com"
                          className="flex items-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group"
                        >
                          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div className="ml-4">
                            <p className="text-sm text-gray-500 font-medium">Email</p>
                            <p className="text-blue-600 font-semibold break-all">Ubuhle@gmail.com</p>
                          </div>
                        </a>
                        <a
                          href="tel:0605503464"
                          className="flex items-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group"
                        >
                          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                          </div>
                          <div className="ml-4">
                            <p className="text-sm text-gray-500 font-medium">Phone</p>
                            <p className="text-green-600 font-semibold">060 550 3464</p>
                          </div>
                        </a>
                      </>
                    )}
                  </div>
                </div>

                {/* Social Section */}
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                    Follow {model.name}
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
                    <a
                      href="https://youtube.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-14 h-14 bg-white rounded-full shadow-md hover:shadow-lg hover:bg-blue-50 transition-all duration-300 group"
                      aria-label="YouTube"
                    >
                      <svg
                        className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform duration-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </a>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-14 h-14 bg-white rounded-full shadow-md hover:shadow-lg hover:bg-blue-50 transition-all duration-300 group"
                      aria-label="X (Twitter)"
                    >
                      <svg
                        className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform duration-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
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

function ImageGalleryModal({ images, activeIndex, onClose, onNext, onPrev }) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[99] flex items-center justify-center bg-black bg-opacity-50 select-none cursor-zoom-out"
    >
      <div
        className="relative flex items-center justify-center w-11/12 xl:w-4/5 h-11/12"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={(e) => {
            e.stopPropagation()
            onPrev()
          }}
          className="absolute left-0 flex items-center justify-center text-white translate-x-10 rounded-full cursor-pointer xl:-translate-x-24 2xl:-translate-x-32 bg-white/10 w-14 h-14 hover:bg-white/20"
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <img
          src={images[activeIndex]}
          alt={`Gallery image ${activeIndex + 1}`}
          className="object-contain object-center w-full h-full select-none cursor-zoom-out"
        />
        <button
          onClick={(e) => {
            e.stopPropagation()
            onNext()
          }}
          className="absolute right-0 flex items-center justify-center text-white -translate-x-10 rounded-full cursor-pointer xl:translate-x-24 2xl:translate-x-32 bg-white/10 w-14 h-14 hover:bg-white/20"
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default ModelDetail

