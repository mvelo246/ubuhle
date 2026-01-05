import { useState, useEffect } from 'react'

function ImageSlider({ items, CardComponent, autoSlideInterval = 4000 }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const itemsPerView = 4
  const maxIndex = Math.max(0, items.length - itemsPerView)

  // Auto-slide functionality
  useEffect(() => {
    if (isPaused || items.length <= itemsPerView) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        return prevIndex >= maxIndex ? 0 : prevIndex + 1
      })
    }, autoSlideInterval)

    return () => clearInterval(interval)
  }, [isPaused, items.length, maxIndex, autoSlideInterval])

  const goToNext = () => {
    if (items.length <= itemsPerView) return
    setCurrentIndex((prevIndex) => {
      return prevIndex >= maxIndex ? 0 : prevIndex + 1
    })
  }

  const goToPrev = () => {
    if (items.length <= itemsPerView) return
    setCurrentIndex((prevIndex) => {
      return prevIndex <= 0 ? maxIndex : prevIndex - 1
    })
  }

  // If we have 4 or fewer items, just show them all in a grid
  if (items.length <= itemsPerView) {
    return (
      <div className="flex items-center justify-center">
        <div className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4 w-full">
          {items.map((item) => (
            <CardComponent key={item.id} {...(item.artist !== undefined ? { artist: item } : { model: item })} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div 
      className="relative w-full px-12 sm:px-16"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Navigation Buttons */}
      <button
        onClick={goToPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg backdrop-blur-sm"
        aria-label="Previous"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={goToNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg backdrop-blur-sm"
        aria-label="Next"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slider Container */}
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-700 ease-in-out"
          style={{ 
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`
          }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 px-2"
            >
              <CardComponent {...(item.artist !== undefined ? { artist: item } : { model: item })} />
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      {maxIndex > 0 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-8 bg-blue-600'
                  : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ImageSlider
