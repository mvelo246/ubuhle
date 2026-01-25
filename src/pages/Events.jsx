import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import EventCard from '../components/EventCard'
import { eventsAPI } from '../services/api'

function Events() {
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const [pastEvents, setPastEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const [upcomingRes, pastRes] = await Promise.all([
        eventsAPI.getUpcoming().catch(() => ({ data: { data: [] } })),
        eventsAPI.getPast().catch(() => ({ data: { data: [] } })),
      ])
      setUpcomingEvents(upcomingRes.data.data || [])
      setPastEvents(pastRes.data.data || [])
    } catch (error) {
      console.error('Failed to fetch events:', error)
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
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-center md:text-left text-black">Upcoming Events</h1>
          {upcomingEvents.length === 0 ? (
            <div className="text-center py-12 mb-12">
              <p className="text-gray-500 text-lg">No upcoming events.</p>
            </div>
          ) : (
            <section className="md:h-full flex items-center text-gray-600 mb-12 sm:mb-16">
              <div className="container px-2 sm:px-5 py-6 sm:py-8 mx-auto w-full">
                <div className="flex flex-wrap -m-2 sm:-m-4">
                  {upcomingEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </div>
            </section>
          )}

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-center md:text-left text-black">Past Events</h1>
          {pastEvents.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No past events.</p>
            </div>
          ) : (
            <section className="md:h-full flex items-center text-gray-600">
              <div className="container px-2 sm:px-5 py-6 sm:py-8 mx-auto w-full">
                <div className="flex flex-wrap -m-2 sm:-m-4">
                  {pastEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Events

