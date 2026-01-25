import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import EventCard from '../components/EventCard'
import { eventsAPI } from '../services/api'

function EventDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [event, setEvent] = useState(null)
  const [relatedEvents, setRelatedEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEventData()
  }, [id])

  const fetchEventData = async () => {
    try {
      setLoading(true)
      const [eventResponse, allEventsResponse] = await Promise.all([
        eventsAPI.getById(id),
        eventsAPI.getAll().catch(() => ({ data: { data: [] } })),
      ])
      setEvent(eventResponse.data.data)
      // Get related events (excluding current event)
      const allEvents = allEventsResponse.data.data || []
      setRelatedEvents(allEvents.filter((e) => e.id !== parseInt(id)).slice(0, 3))
    } catch (error) {
      console.error('Failed to fetch event:', error)
      navigate('/event')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
        <Footer />
      </>
    )
  }

  if (!event) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Event not found</h1>
          <button
            onClick={() => navigate('/event')}
            className="text-green-600 hover:text-green-800"
          >
            Go back to Events
          </button>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="py-8">
            <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
            <p className="text-gray-500 text-sm">
              on <time dateTime={event.date}>{new Date(event.date).toLocaleDateString()}</time>
            </p>
          </div>

          <img
            src={event.image}
            alt={event.title}
            className="w-full h-auto mb-8"
          />

          <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto">
            <p>{event.description}</p>
            <p>
              Nullam vitae sapien non est suscipit blandit quis sit amet ipsum.
              Aliquam euismod accumsan nunc, in convallis felis luctus in. Sed
              rhoncus metus a elit rutrum aliquam.
            </p>
            <p>
              Integer ullamcorper leo nulla, nec commodo metus vehicula eget.
              Duis vel vestibulum tellus, eget mattis quam. Nullam euismod
              libero sed nibh tristique, vel eleifend risus sagittis. In hac
              habitasse platea dictumst. Sed dapibus magna at arcu euismod, a
              pulvinar turpis tristique. Suspendisse imperdiet velit nec lectus
              rutrum varius.
            </p>
          </div>
        </div>
      </div>

      <h1 className="ml-35 mt-15 text-5xl font-bold">Related Events</h1>
      <section className="md:h-full flex items-center text-gray-600">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {relatedEvents.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default EventDetail

