import Header from '../components/Header'
import Footer from '../components/Footer'
import EventCard from '../components/EventCard'
import { events } from '../data/mockData'

function Events() {
  const upcomingEvents = events.filter(e => e.status === 'upcoming')
  const pastEvents = events.filter(e => e.status === 'past')

  return (
    <>
      <Header />
      <div className="bg-white py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-center md:text-left text-black">Upcoming Events</h1>
          <section className="md:h-full flex items-center text-gray-600 mb-12 sm:mb-16">
            <div className="container px-2 sm:px-5 py-6 sm:py-8 mx-auto w-full">
              <div className="flex flex-wrap -m-2 sm:-m-4">
                {upcomingEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          </section>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-center md:text-left text-black">Past Events</h1>
          <section className="md:h-full flex items-center text-gray-600">
            <div className="container px-2 sm:px-5 py-6 sm:py-8 mx-auto w-full">
              <div className="flex flex-wrap -m-2 sm:-m-4">
                {pastEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Events

