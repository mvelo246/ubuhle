import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import ArtistCard from '../components/ArtistCard'
import ModelCard from '../components/ModelCard'
import EventCard from '../components/EventCard'
import NewsSlider from '../components/NewsSlider'
import { artists, models, events, newsItems } from '../data/mockData'

// Newsletter Subscription Component
function NewsletterSubscription() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    if (!email.trim()) {
      setError('Please enter your email address')
      return
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    setIsSubmitting(true)

    // Simulate API call - replace with actual API endpoint
    try {
      // TODO: Replace with actual API call
      // await fetch('/api/subscribe', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // })
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setIsSuccess(true)
      setEmail('')
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false)
      }, 5000)
    } catch (err) {
      setError('Something went wrong. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="bg-gradient-to-br from-blue-600 to-indigo-700 py-12 sm:py-16 md:py-20 scroll-mt-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto">
            Subscribe to our newsletter and never miss out on the latest news, events, and updates from our artists and models.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-6 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 text-base sm:text-lg"
                disabled={isSubmitting}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-base sm:text-lg whitespace-nowrap"
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </button>
          </div>
          
          {error && (
            <p className="mt-4 text-center text-red-200 text-sm sm:text-base">
              {error}
            </p>
          )}
          
          {isSuccess && (
            <p className="mt-4 text-center text-white text-sm sm:text-base font-medium">
              ✓ Thank you for subscribing! You'll receive our latest updates.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}

function Home() {
  const upcomingEvents = events.filter(e => e.status === 'upcoming')
  
  // Artists auto-slide state
  const [artistIndex, setArtistIndex] = useState(0)
  // Only slide if there are MORE than 4 artists (5 or more)
  // If exactly 4 or fewer, do NOT slide
  // Using strict check: artists.length must be > 4 (not >= 4)
  const shouldSlideArtists = artists.length > 4
  const visibleArtists = artists.slice(0, 4)
  
  // Models auto-slide state
  const [modelIndex, setModelIndex] = useState(0)
  // Only slide if there are MORE than 4 models (5 or more)
  // If exactly 4 or fewer, do NOT slide
  const shouldSlideModels = models.length > 4
  const visibleModels = models.slice(0, 4)
  
  // Events auto-slide state
  const [eventIndex, setEventIndex] = useState(0)
  // Only slide if there are MORE than 3 events (4 or more)
  // If exactly 3 or fewer, do NOT slide
  const shouldSlideEvents = upcomingEvents.length > 3
  const visibleEvents = upcomingEvents.slice(0, 3)
  
  // Auto-slide for Artists
  useEffect(() => {
    // Strictly don't slide if there are 4 or fewer artists
    if (artists.length <= 4) {
      setArtistIndex(0)
      return () => {} // Return empty cleanup function
    }
    
    const interval = setInterval(() => {
      setArtistIndex((prevIndex) => {
        // Loop seamlessly using modulo - items repeat naturally
        return (prevIndex + 1) % artists.length
      })
    }, 6000) // Slide every 6 seconds - slower for better readability
    
    return () => clearInterval(interval)
  }, [artists.length])
  
  // Auto-slide for Models
  useEffect(() => {
    // Strictly don't slide if there are 4 or fewer models
    if (models.length <= 4) {
      setModelIndex(0)
      return () => {} // Return empty cleanup function
    }
    
    const interval = setInterval(() => {
      setModelIndex((prevIndex) => {
        // Loop seamlessly using modulo - items repeat naturally
        return (prevIndex + 1) % models.length
      })
    }, 6000) // Slide every 6 seconds - slower for better readability
    
    return () => clearInterval(interval)
  }, [models.length])
  
  // Auto-slide for Events
  useEffect(() => {
    // Strictly don't slide if there are 3 or fewer events
    if (upcomingEvents.length <= 3) {
      setEventIndex(0)
      return () => {} // Return empty cleanup function
    }
    
    const interval = setInterval(() => {
      setEventIndex((prevIndex) => {
        // Loop seamlessly using modulo - items repeat naturally
        return (prevIndex + 1) % upcomingEvents.length
      })
    }, 6000) // Slide every 6 seconds - slower for better readability
    
    return () => clearInterval(interval)
  }, [upcomingEvents.length])

  return (
    <>
      <Header />
      <Hero />
      
      {/* Artists Section */}
      <section className="bg-white py-8 sm:py-12 md:py-16 scroll-mt-20">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 md:mb-12 text-center md:text-left text-black">Artists</h1>
          <div className="flex items-center justify-center overflow-hidden relative">
            {/* Only slide if artists.length is STRICTLY greater than 4 (i.e., 5 or more) */}
            {/* Matching models section logic exactly */}
            {shouldSlideArtists && artists.length > 4 ? (
              <div className="relative w-full overflow-hidden">
                <div 
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{
                    transform: `translateX(-${(artistIndex % artists.length) * 100}%)`
                  }}
                >
                  {/* Create infinite loop - show groups of 4, looping through all artists */}
                  {/* This creates a group for EACH artist, ensuring ALL artists are shown */}
                  {/* Works with any number of artists - fully scalable */}
                  {artists.map((_, startIndex) => {
                    // For each starting position, create a group of 4 items
                    // Using modulo ensures we loop through ALL artists seamlessly
                    const groupItems = []
                    for (let i = 0; i < 4; i++) {
                      const itemIndex = (startIndex + i) % artists.length
                      groupItems.push(artists[itemIndex])
                    }
                    
                    return (
                      <div key={`group-${startIndex}`} className="min-w-full grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {groupItems.map((artist, i) => (
                          <ArtistCard key={`${artist.id}-${startIndex}-${i}`} artist={artist} />
                        ))}
                      </div>
                    )
                  })}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4 w-full">
                {visibleArtists.map((artist) => (
                  <ArtistCard key={artist.id} artist={artist} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Models Section */}
      <section className="bg-gray-50 py-8 sm:py-12 md:py-16 scroll-mt-20">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 md:mb-12 text-center md:text-left text-black">Models</h1>
          <div className="flex items-center justify-center overflow-hidden relative">
            {shouldSlideModels && models.length > 4 ? (
              <div className="relative w-full overflow-hidden">
                <div 
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{
                    transform: `translateX(-${(modelIndex % models.length) * 100}%)`
                  }}
                >
                  {/* Create infinite loop - show groups of 4, looping through all models */}
                  {/* This creates a group for EACH model, ensuring ALL models are shown */}
                  {/* Works with any number of models - fully scalable */}
                  {models.map((_, startIndex) => {
                    // For each starting position, create a group of 4 items
                    // Using modulo ensures we loop through ALL models seamlessly
                    const groupItems = []
                    for (let i = 0; i < 4; i++) {
                      const itemIndex = (startIndex + i) % models.length
                      groupItems.push(models[itemIndex])
                    }
                    
                    return (
                      <div key={`group-${startIndex}`} className="min-w-full grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {groupItems.map((model, i) => (
                          <ModelCard key={`${model.id}-${startIndex}-${i}`} model={model} />
                        ))}
                      </div>
                    )
                  })}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4 w-full">
                {visibleModels.map((model) => (
                  <ModelCard key={model.id} model={model} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="bg-white py-8 sm:py-12 md:py-16 scroll-mt-20">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 md:mb-12 text-center md:text-left text-black">Events</h1>
          <div className="container px-2 sm:px-5 mx-auto">
            <div className="flex items-center justify-center overflow-hidden relative">
              {shouldSlideEvents && upcomingEvents.length > 3 ? (
                <div className="relative w-full overflow-hidden">
                  <div 
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{
                      transform: `translateX(-${(eventIndex % upcomingEvents.length) * 100}%)`
                    }}
                  >
                    {/* Create infinite loop - show groups of 3, looping through all events */}
                    {/* This creates a group for EACH event, ensuring ALL events are shown */}
                    {/* Works with any number of events - fully scalable */}
                    {upcomingEvents.map((_, startIndex) => {
                      // For each starting position, create a group of 3 items
                      // Using modulo ensures we loop through ALL events seamlessly
                      const groupItems = []
                      for (let i = 0; i < 3; i++) {
                        const itemIndex = (startIndex + i) % upcomingEvents.length
                        groupItems.push(upcomingEvents[itemIndex])
                      }
                      
                      return (
                        <div key={`group-${startIndex}`} className="min-w-full flex flex-wrap -m-2 sm:-m-4">
                          {groupItems.map((event, i) => (
                            <div key={`${event.id}-${startIndex}-${i}`} className="p-2 sm:p-4 w-full sm:w-1/2 lg:w-1/3">
                              <EventCard event={event} />
                            </div>
                          ))}
                        </div>
                      )
                    })}
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap -m-2 sm:-m-4 w-full">
                  {visibleEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* News Slider Section */}
      <NewsSlider newsItems={newsItems} />

      {/* Newsletter Subscription Section */}
      <NewsletterSubscription />

      <Footer />
    </>
  )
}

export default Home

