import Header from '../components/Header'
import Footer from '../components/Footer'

function About() {
  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 py-16 sm:py-20 lg:py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-block text-blue-200 text-sm sm:text-base font-semibold uppercase tracking-wider mb-4">
              About Us
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              About <span className="text-yellow-300">Ubuhle Bekonjana</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/90 leading-relaxed">
              Celebrating talent, creativity, and excellence in music, modeling, and entertainment
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16">
              {/* Image Section */}
              <div className="order-2 lg:order-1">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl transform rotate-3 opacity-20"></div>
                  <img
                    src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop"
                    alt="About Ubuhle Bekonjana - Music and Entertainment"
                    className="relative rounded-2xl shadow-2xl w-full h-auto object-cover"
                  />
                </div>
              </div>

              {/* Text Content */}
              <div className="order-1 lg:order-2">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                      Our Story
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6"></div>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Ubuhle Bekonjana is a premier platform dedicated to showcasing exceptional talent in the entertainment industry. We pride ourselves on discovering, nurturing, and promoting artists, models, and performers who bring unique perspectives and creativity to their craft.
                  </p>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Our mission is to create opportunities for talented individuals to shine and connect with audiences worldwide. Through our platform, we celebrate diversity, creativity, and the power of artistic expression.
                  </p>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Whether you're looking for amazing music, stunning fashion, or unforgettable events, Ubuhle Bekonjana is your gateway to the best in entertainment.
                  </p>
                </div>
              </div>
            </div>

            {/* Features/Values Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-16">
              {/* Feature 1 */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                    />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                  Music Excellence
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  We showcase talented artists and musicians, providing a platform for their voices to be heard and their music to reach new audiences.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                  Fashion & Modeling
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Discover stunning models and fashion talent, bringing style and elegance to every project and event we showcase.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                  Memorable Events
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  We organize and promote unforgettable events that bring together artists, models, and audiences for extraordinary experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Join Our Community
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Be part of a vibrant community of artists, models, and entertainment enthusiasts. 
              Discover talent, connect with creatives, and experience the best in entertainment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Get In Touch
              </a>
              <a
                href="/artist"
                className="inline-flex items-center justify-center px-8 py-3 bg-transparent border-2 border-white text-white rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300"
              >
                Explore Artists
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default About
