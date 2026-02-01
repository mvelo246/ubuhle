function VideoPlayer({ song }) {
  const videoUrl = song?.youtubeUrl || ''

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null
    const patterns = [
      /(?:youtube\.com\/watch\?v=)([^&\s]+)/,
      /(?:youtu\.be\/)([^?\s]+)/,
      /(?:youtube\.com\/embed\/)([^?\s]+)/,
      /(?:youtube\.com\/shorts\/)([^?\s]+)/,
    ]
    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match) return `https://www.youtube.com/embed/${match[1]}`
    }
    return null
  }

  const embedUrl = getYouTubeEmbedUrl(videoUrl)

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">

      {/* YouTube Player */}
      <div className="w-full aspect-video">
        {embedUrl ? (
          <iframe
            className="w-full h-full"
            src={embedUrl}
            title={song?.name || 'YouTube video player'}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-sm">
            No YouTube link available
          </div>
        )}
      </div>
    </div>
  )
}

export default VideoPlayer
