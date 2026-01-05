import Header from '../components/Header'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import ArtistCard from '../components/ArtistCard'
import ModelCard from '../components/ModelCard'
import EventCard from '../components/EventCard'
import NewsSlider from '../components/NewsSlider'
import { artists, models, events, newsItems } from '../data/mockData'

function Home() {
  const upcomingEvents = events.filter(e => e.status === 'upcoming').slice(0, 3)

  return (
    <>
      <Header />
      <Hero />
      
      {/* Artists Section */}
      <section className="bg-white py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 md:mb-12 text-center md:text-left text-black">Artists</h1>
          <div className="flex items-center justify-center">
            <div className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4 w-full">
              {artists.slice(0, 4).map((artist) => (
                <ArtistCard key={artist.id} artist={artist} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Models Section */}
      <section className="bg-gray-50 py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 md:mb-12 text-center md:text-left text-black">Models</h1>
          <div className="flex items-center justify-center">
            <div className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4 w-full">
              {models.slice(0, 4).map((model) => (
                <ModelCard key={model.id} model={model} />
              ))}
            </div>
          </div>
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

