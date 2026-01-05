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

  return (
    <div className="bg-white rounded-lg drop-shadow p-3 sm:p-4 dark:bg-black dark:shadow-white">
      <audio ref={audioRef} src={audioUrl} preload="metadata" />
      <div className="flex flex-col justify-center items-center">
        <img
          className="rounded-lg aspect-square w-full max-w-48 sm:max-w-64"
          src={song?.image || '/th.jpg'}
          alt={song?.name || 'Song'}
        />
        <p className="mt-2 font-semibold text-sm sm:text-md text-gray-600 text-center">
          {song?.name || 'Umenzi'}
        </p>
        <p className="font-semibold text-xs text-gray-600 text-center">{song?.artist || 'Mzaca'}</p>
      </div>
      <div className="flex flex-col justify-center items-center my-3 sm:my-4">
        <input
          type="range"
          value={progress}
          onChange={handleProgressChange}
          className="rounded-lg overflow-hidden appearance-none bg-gray-200 h-1 w-full cursor-pointer"
          min="0"
          max="100"
        />
        <div className="flex justify-between w-full sm:w-3/5 items-center my-2 gap-2 sm:gap-0">
          <button
            onClick={handleSeekBack}
            className="aspect-square bg-white flex justify-center items-center rounded-full p-2 shadow-lg dark:bg-gray-800 hover:bg-gray-100 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="#816cfa"
                fillRule="evenodd"
                d="M7 6a1 1 0 0 1 2 0v4l6.4-4.8A1 1 0 0 1 17 6v12a1 1 0 0 1-1.6.8L9 14v4a1 1 0 1 1-2 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button
            onClick={handlePlayPause}
            className="aspect-square bg-white flex justify-center items-center rounded-full p-2 shadow-lg dark:bg-gray-800 hover:bg-gray-100 transition"
          >
            {isPlaying ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="#816cfa"
              >
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 512 512"
              >
                <path
                  fill="#816cfa"
                  d="M133 440a35.37 35.37 0 0 1-17.5-4.67c-12-6.8-19.46-20-19.46-34.33V111c0-14.37 7.46-27.53 19.46-34.33a35.13 35.13 0 0 1 35.77.45l247.85 148.36a36 36 0 0 1 0 61l-247.89 148.4A35.5 35.5 0 0 1 133 440"
                />
              </svg>
            )}
          </button>
          <button
            onClick={handleSeekForward}
            className="aspect-square bg-white flex justify-center items-center rounded-full p-2 shadow-lg dark:bg-gray-800 hover:bg-gray-100 transition"
          >
            <svg
              className="rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="#816cfa"
                fillRule="evenodd"
                d="M7 6a1 1 0 0 1 2 0v4l6.4-4.8A1 1 0 0 1 17 6v12a1 1 0 0 1-1.6.8L9 14v4a1 1 0 1 1-2 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default MusicPlayer

