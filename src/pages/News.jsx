import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { newsAPI } from '../services/api'
import { Link } from 'react-router-dom'

function News() {
  const [newsItems, setNewsItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      setLoading(true)
      const response = await newsAPI.getAll()
      setNewsItems(response.data.data || [])
    } catch (error) {
      console.error('Failed to fetch news:', error)
      setNewsItems([])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <div className="bg-white py-8 sm:py-12">
          <div className="container mx-auto px-4">
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="bg-white py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-center md:text-left text-black">News</h1>
          {newsItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No news found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {newsItems.map((news) => (
              <div key={news.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {news.image && (
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-48 sm:h-56 object-cover"
                  />
                )}
                <div className="p-4 sm:p-6">
                  <div className="text-sm sm:text-base text-gray-500 mb-2">{new Date(news.date).toLocaleDateString()}</div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-3 text-gray-800">{news.title}</h2>
                  <p className="text-gray-600 mb-4 text-sm sm:text-base">{news.description}</p>
                  <Link
                    to={`/news/${news.id}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    Read More
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default News

