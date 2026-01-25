import { useState, useRef, useEffect } from 'react'

function MusicPlayer({ song }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef(null)

  // Use a placeholder audio URL - in production, this would come from your audio files
  const audioUrl = song?.audioUrl || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'

  // Update audio source when song changes
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.src = audioUrl
    audio.load()
    setIsPlaying(false)
    setCurrentTime(0)
    setDuration(0)
  }, [audioUrl])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
    }

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.play().catch((err) => {
        console.log('Play failed:', err)
        setIsPlaying(false)
      })
    } else {
      audio.pause()
    }
  }, [isPlaying])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleProgressChange = (e) => {
    const audio = audioRef.current
    if (!audio) return
    
    const newTime = (e.target.value / 100) * duration
    audio.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleSeekBack = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = Math.max(0, audio.currentTime - 10)
  }

  const handleSeekForward = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = Math.min(duration, audio.currentTime + 10)
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0
  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      <audio ref={audioRef} src={audioUrl} preload="metadata" />
      
      {/* Compact Horizontal Layout */}
      <div className="flex items-center gap-3 p-3">
        {/* Album Cover */}
        <div className="flex-shrink-0">
          <img
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover"
            src={song?.image || '/th.jpg'}
            alt={song?.name || 'Song'}
          />
        </div>

        {/* Song Info and Controls */}
        <div className="flex-1 min-w-0">
          {/* Song Name and Artist */}
          <div className="mb-2">
            <p className="font-semibold text-sm sm:text-base text-gray-900 truncate">
              {song?.name || 'Unknown Song'}
            </p>
            <p className="text-xs sm:text-sm text-gray-500 truncate">
              {song?.artist?.name || song?.artist || 'Unknown Artist'}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-2">
            <input
              type="range"
              value={progress}
              onChange={handleProgressChange}
              className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #4f46e5 0%, #4f46e5 ${progress}%, #e5e7eb ${progress}%, #e5e7eb 100%)`
              }}
              min="0"
              max="100"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={handleSeekBack}
              className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
              aria-label="Seek back 10 seconds"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#4f46e5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="11 19 2 12 11 5 11 19" />
                <polygon points="22 19 13 12 22 5 22 19" />
                <line x1="22" y1="12" x2="13" y2="12" />
              </svg>
            </button>
            
            <button
              onClick={handlePlayPause}
              className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full transition-all shadow-md hover:shadow-lg transform hover:scale-105"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              )}
            </button>

            <button
              onClick={handleSeekForward}
              className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
              aria-label="Seek forward 10 seconds"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#4f46e5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="13 19 22 12 13 5 13 19" />
                <polygon points="2 19 11 12 2 5 2 19" />
                <line x1="2" y1="12" x2="11" y2="12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MusicPlayer
