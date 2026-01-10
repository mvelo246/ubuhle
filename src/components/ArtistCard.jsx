import { Link } from 'react-router-dom'

function ArtistCard({ artist }) {
  return (
    <div className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30 w-full">
      <div className="h-64 sm:h-80 md:h-96 w-full max-w-xs mx-auto md:max-w-none md:w-72">
        <img
          className="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125"
          src={artist.image}
          alt={artist.name}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
      <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-4 sm:px-9 text-center transition-all duration-500 group-hover:translate-y-0">
        <h1 className="font-dmserif text-2xl sm:text-3xl font-bold text-white">{artist.name}</h1>
        <Link to={`/artist/${artist.id}`}>
          <button className="rounded-full bg-neutral-900 py-2 px-3.5 font-com text-xs sm:text-sm capitalize text-white shadow shadow-black/60 mt-2">
            See More
          </button>
        </Link>
      </div>
    </div>
  )
}

export default ArtistCard

