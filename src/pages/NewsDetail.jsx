import { useParams, Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { newsItems } from '../data/mockData'

function NewsDetail() {
  const { id } = useParams()
  const news = newsItems.find((n) => n.id === parseInt(id)) || newsItems[0]
  const relatedNews = newsItems.filter((n) => n.id !== parseInt(id)).slice(0, 3)

  return (
    <>
      <Header />
      <div className="bg-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Back Button */}
            <Link
              to="/news"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6 font-medium transition-colors"
            >
              <svg
                className="w-4 h-4 mr-2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5"></path>
                <path d="M12 19l-7-7 7-7"></path>
              </svg>
              Back to News
            </Link>

            {/* News Header */}
            <div className="mb-6 sm:mb-8">
              <p className="text-sm sm:text-base text-gray-500 mb-2">{news.date}</p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-black">
                {news.title}
              </h1>
            </div>

            {/* News Image */}
            {news.image && (
              <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}

            {/* News Content */}
            <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none">
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-4">
                {news.description}
              </p>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-4">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>
            </div>
          </div>

          {/* Related News Section */}
          {relatedNews.length > 0 && (
            <div className="mt-12 sm:mt-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center md:text-left text-black">
                Related News
                <span className="block w-24 h-1 bg-gradient-to-r from-primary-600 to-purple-600 mx-auto md:mx-0 mt-2"></span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {relatedNews.map((item) => (
                  <Link
                    key={item.id}
                    to={`/news/${item.id}`}
                    className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200"
                  >
                    {item.image && (
                      <div className="h-48 sm:h-64 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-4 sm:p-6">
                      <p className="text-sm text-gray-500 mb-2">{item.date}</p>
                      <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-800 hover:text-primary-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed line-clamp-3">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default NewsDetail

