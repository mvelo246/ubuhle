import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ImageGallery from '../components/ImageGallery'
import { models, modelGalleryImages } from '../data/mockData'
import { useState, useEffect } from 'react'

function ModelDetail() {
  const { id } = useParams()
  const model = models.find((m) => m.id === parseInt(id)) || models[0]
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  
  // Combine model image with gallery images for auto-rotation
  const allImages = [model.image, ...modelGalleryImages]
  const [currentMainImageIndex, setCurrentMainImageIndex] = useState(0)
  const [imageOpacity, setImageOpacity] = useState(1)

  // Auto-rotate main image every 6 seconds with fade effect
  useEffect(() => {
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
          <ul id="gallery" className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
            {modelGalleryImages.map((img, index) => (
              <li key={index}>
                <img
                  onClick={() => handleImageClick(index)}
                  src={img}
                  alt={`Gallery ${index + 1}`}
                  className="object-cover select-none w-full h-auto bg-gray-200 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-zoom-in aspect-[5/6] lg:aspect-[2/3] xl:aspect-[3/4] hover:scale-105"
                />
              </li>
            ))}
          </ul>
        </div>

        {isGalleryOpen && (
          <ImageGalleryModal
            images={modelGalleryImages}
            activeIndex={activeImageIndex}
            onClose={() => setIsGalleryOpen(false)}
            onNext={() =>
              setActiveImageIndex((prev) =>
                prev === modelGalleryImages.length - 1 ? 0 : prev + 1
              )
            }
            onPrev={() =>
              setActiveImageIndex((prev) =>
                prev === 0 ? modelGalleryImages.length - 1 : prev - 1
              )
            }
          />
        )}
      </section>

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

