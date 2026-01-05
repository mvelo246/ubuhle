import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ImageGallery from '../components/ImageGallery'
import { models, modelGalleryImages } from '../data/mockData'
import { useState } from 'react'

function ModelDetail() {
  const { id } = useParams()
  const model = models.find((m) => m.id === parseInt(id)) || models[0]
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const handleImageClick = (index) => {
    setActiveImageIndex(index)
    setIsGalleryOpen(true)
  }

  return (
    <>
      <Header />
      <div className="flex pt-12 px-6 md:px-20 items-center justify-center bg-hero md:h-screen overflow-hidden">
        <div className="flex flex-col gap-6 md:flex-row items-center max-w-8xl">
          <div className="w-full md:w-1/2 lg:pr-32">
            <h2 className="text-4xl lg:text-5xl text-center md:text-left text-blue-900 leading-tight font-medium">
              Ubuhle Benkonjane Model Shine Indoni Yamanzi
            </h2>
            <h3 className="mt-6 md:mt-10 text-md lg:text-xl text-center md:text-left text-gray-700 font-light tracking-wider leading-relaxed">
              I'm not just building a career; I'm building a legacy, breaking
              boundaries, and proving that strength and grace are the ultimate
              power duo.
            </h3>
          </div>
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <img
              src={model.image}
              alt={model.name}
            />
          </div>
        </div>
      </div>

      <section className="px-4 py-24 mx-auto max-w-7xl">
        <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
          <h1 className="mb-6 text-4xl font-extrabold leading-none tracking-normal text-blue-900 md:text-6xl md:tracking-tight">
            <span className="block w-full">My Passion 😎👌🔥</span>
          </h1>
        </div>
      </section>

      <section className="w-full h-full select-none">
        <div className="max-w-6xl mx-auto duration-1000 delay-300 select-none ease">
          <ul id="gallery" className="grid grid-cols-2 gap-5 lg:grid-cols-5">
            {modelGalleryImages.map((img, index) => (
              <li key={index}>
                <img
                  onClick={() => handleImageClick(index)}
                  src={img}
                  alt={`Gallery ${index + 1}`}
                  className="object-cover select-none w-full h-auto bg-gray-200 rounded cursor-zoom-in aspect-[5/6] lg:aspect-[2/3] xl:aspect-[3/4]"
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

