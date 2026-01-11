import { useParams, Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { newsItems } from '../data/mockData'

function NewsDetail() {
  const { id } = useParams()
  const news = newsItems.find((n) => n.id === parseInt(id))

  if (!news) {
    return (
      <>
        <Header />
        <div className="bg-white py-8 sm:py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-black">News Not Found</h1>
            <Link to="/news" className="text-blue-600 hover:text-blue-800 font-medium">
              Back to News
            </Link>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  const relatedNews = newsItems.filter((n) => n.id !== parseInt(id)).slice(0, 3)

  return (
    <>
      <Header />
      <div className="bg-white py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Back Link */}
            <Link
              to="/news"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mb-6 transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to News
            </Link>

            {/* News Content */}
            <article>
              <div className="mb-6">
                <div className="text-sm sm:text-base text-gray-500 mb-3">{news.date}</div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-black">{news.title}</h1>
              </div>

              {news.image && (
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-auto mb-8 rounded-lg shadow-lg"
                />
              )}

              <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none">
                <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-6">
                  {news.description}
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </p>
              </div>
            </article>
          </div>

          {/* Related News */}
          {relatedNews.length > 0 && (
            <section className="mt-16 pt-12 border-t border-gray-200">
              <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-black">Related News</h2>
              <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
                {relatedNews.map((item) => (
                  <Link
                    key={item.id}
                    to={`/news/${item.id}`}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-48 sm:h-56 object-cover"
                      />
                    )}
                    <div className="p-4 sm:p-6">
                      <div className="text-sm sm:text-base text-gray-500 mb-2">{item.date}</div>
                      <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-800">{item.title}</h3>
                      <p className="text-gray-600 text-sm sm:text-base line-clamp-3">{item.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default NewsDetail

