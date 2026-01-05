import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import EventCard from '../components/EventCard'
import { events } from '../data/mockData'

function EventDetail() {
  const { id } = useParams()
  const event = events.find((e) => e.id === parseInt(id)) || events[0]
  const relatedEvents = events.filter((e) => e.id !== parseInt(id)).slice(0, 3)

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="py-8">
            <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
            <p className="text-gray-500 text-sm">
              on <time dateTime={event.date}>{event.date}</time>
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

