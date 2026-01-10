import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import { newsItems } from '../data/mockData'

function News() {
  return (
    <>
      <Header />
      <div className="bg-white py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-center md:text-left text-black">
            Latest News
            <span className="block w-24 h-1 bg-gradient-to-r from-primary-600 to-purple-600 mx-auto md:mx-0 mt-2"></span>
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {newsItems.map((news) => (
              <div
                key={news.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200"
              >
                {news.image && (
                  <div className="h-48 sm:h-64 overflow-hidden">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-4 sm:p-6">
                  <p className="text-sm text-gray-500 mb-2">{news.date}</p>
                  <h2 className="text-xl sm:text-2xl font-bold mb-3 text-gray-800 hover:text-primary-600 transition-colors">
                    {news.title}
                  </h2>
                  <p className="text-gray-600 mb-4 text-sm sm:text-base leading-relaxed">
                    {news.description}
                  </p>
                  {news.link && news.link !== '#' && (
                    <Link
                      to={news.link}
                      className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold text-sm sm:text-base transition-colors"
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
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default News

