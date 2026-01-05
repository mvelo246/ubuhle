import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import ArtistCard from '../components/ArtistCard'
import ModelCard from '../components/ModelCard'
import EventCard from '../components/EventCard'
import NewsSlider from '../components/NewsSlider'
import ImageSlider from '../components/ImageSlider'
import { artists, models, events, newsItems } from '../data/mockData'

function Home() {
  const location = useLocation()
  const upcomingEvents = events.filter(e => e.status === 'upcoming').slice(0, 3)

  // Handle scroll when navigating from other pages
  useEffect(() => {
    if (location.state?.scrollTo) {
      const sectionId = location.state.scrollTo
      setTimeout(() => {
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 500) // Wait for page to render
    }
  }, [location.state])

  return (
    <>
      <Header />
      <Hero />
      
      {/* Artists Section */}
      <section id="artists-section" className="bg-white py-8 sm:py-12 md:py-16 scroll-mt-20">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 md:mb-12 text-center md:text-left text-black">Artists</h1>
          <ImageSlider items={artists} CardComponent={ArtistCard} autoSlideInterval={4000} />
        </div>
      </section>

      {/* Models Section */}
      <section id="models-section" className="bg-gray-50 py-8 sm:py-12 md:py-16 scroll-mt-20">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 md:mb-12 text-center md:text-left text-black">Models</h1>
          <ImageSlider items={models} CardComponent={ModelCard} autoSlideInterval={4000} />
        </div>
      </section>

      {/* Events Section */}
      <section className="bg-white py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 md:mb-12 text-center md:text-left text-black">Events</h1>
          <div className="container px-2 sm:px-5 mx-auto">
            <div className="flex flex-wrap -m-2 sm:-m-4">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* News Slider Section */}
      <NewsSlider newsItems={newsItems} />

      <Footer />
    </>
  )
}

export default Home

