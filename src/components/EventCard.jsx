import { Link } from 'react-router-dom'

function EventCard({ event }) {
  return (
    <div className="p-2 sm:p-4 w-full sm:w-1/2 lg:w-1/3">
      <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
        <img
          className="h-48 sm:h-56 md:h-64 lg:h-72 w-full object-cover object-center"
          src={event.image}
          alt={event.title}
        />
        <div className="p-4 sm:p-6 bg-white hover:bg-gradient-to-r hover:from-primary-600 hover:to-purple-600 hover:text-white transition duration-300 ease-in">
          <h2 className="text-sm sm:text-base font-medium text-primary-600 mb-1 group-hover:text-white">
            {event.date}
          </h2>
          <h1 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 text-gray-800 group-hover:text-white">{event.title}</h1>
          <p className="text-sm sm:text-base leading-relaxed mb-2 sm:mb-3 text-gray-600 group-hover:text-gray-100">{event.description}</p>
          <div className="flex items-center flex-wrap">
            <Link
              to={`/event/${event.id}`}
              className="text-primary-600 inline-flex items-center text-sm sm:text-base md:mb-2 lg:mb-0 hover:text-white font-semibold"
            >
              Read More
              <svg
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventCard

