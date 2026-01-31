function MusicPlayer({ song }) {
  const getYouTubeVideoId = (url) => {
    if (!url) return null
    const patterns = [
      /(?:youtube\.com\/watch\?v=)([^&\s]+)/,
      /(?:youtu\.be\/)([^?\s]+)/,
      /(?:youtube\.com\/embed\/)([^?\s]+)/,
      /(?:youtube\.com\/shorts\/)([^?\s]+)/,
    ]
    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match) return match[1]
    }
    return null
  }

  const videoId = getYouTubeVideoId(song?.youtubeUrl)

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      <div className="flex items-center gap-3 p-3">
        {/* Album Cover */}
        <div className="flex-shrink-0">
          <img
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover"
            src={song?.image || '/th.jpg'}
            alt={song?.name || 'Song'}
          />
        </div>

        {/* Song Info */}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm sm:text-base text-gray-900 truncate">
            {song?.name || 'Unknown Song'}
          </p>
          <p className="text-xs sm:text-sm text-gray-500 truncate">
            {song?.artist?.name || song?.artist || 'Unknown Artist'}
          </p>
        </div>
      </div>

      {/* YouTube Player */}
      <div className="w-full aspect-video">
        {videoId ? (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={song?.name || 'YouTube video player'}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-sm">
            No YouTube link available
          </div>
        )}
      </div>
    </div>
  )
}

export default MusicPlayer
