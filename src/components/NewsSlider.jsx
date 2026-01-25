import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function NewsSlider({ newsItems }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (newsItems.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % newsItems.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [newsItems.length])

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? newsItems.length - 1 : prevIndex - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % newsItems.length)
  }

  if (newsItems.length === 0) return null

  return (
    <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-8 sm:py-12 md:py-16 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 sm:mb-10">
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-gray-800">
              Latest News
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto sm:mx-0 rounded-full"></div>
          </div>
          <Link
            to="/news"
            className="text-blue-600 hover:text-blue-800 font-semibold text-sm sm:text-base transition-colors inline-flex items-center"
          >
            View All News
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Slider Container */}
          <div className="relative h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden shadow-xl">
            <div
              className="flex transition-transform duration-500 ease-in-out h-full"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {newsItems.map((item, index) => (
                <div
                  key={index}
                  className="min-w-full h-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white relative"
                >
                  {/* Background Image if available */}
                  {item.image && (
                    <div className="absolute inset-0 opacity-20">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="relative z-10 px-6 sm:px-8 md:px-12 text-center max-w-3xl">
                    <div className="text-sm sm:text-base text-blue-200 mb-2 font-medium">
                      {item.date ? new Date(item.date).toLocaleDateString() : ''}
                    </div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                      {item.title}
                    </h3>
                    <p className="text-base sm:text-lg text-blue-100 leading-relaxed">
                      {item.description}
                    </p>
                    <Link
                      to={`/news/${item.id}`}
                      className="inline-block mt-6 px-6 py-2.5 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-blue-600 p-2 sm:p-3 rounded-full shadow-lg transition-all duration-200 z-10"
            aria-label="Previous slide"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-blue-600 p-2 sm:p-3 rounded-full shadow-lg transition-all duration-200 z-10"
            aria-label="Next slide"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {newsItems.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 sm:w-10 bg-blue-600'
                    : 'w-2 sm:w-2.5 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewsSlider


