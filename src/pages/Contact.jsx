import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Frontend only - just reset form
    setFormData({ name: '', email: '', message: '' })
    alert('Form submitted (frontend only - no backend)')
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <>
      <Header />
      
  
      {/* Main Content */}
      <div className="bg-gray-50 py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              
              {/* Contact Information */}
              <div className="order-2 lg:order-1">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-xl p-8 sm:p-10 h-full">
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                    Contact Information
                  </h2>
                  <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-8"></div>
                  
                  <div className="space-y-6">
                    {/* Phone */}
                    <a
                      href="tel:0605503464"
                      className="flex items-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group"
                    >
                      <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-7 h-7 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-gray-500 font-medium">Phone</p>
                        <p className="text-green-600 font-semibold text-lg">060 550 3464</p>
                      </div>
                    </a>

                    {/* Email */}
                    <a
                      href="mailto:Ubuhle@gmail.com"
                      className="flex items-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group"
                    >
                      <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-7 h-7 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-gray-500 font-medium">Email</p>
                        <p className="text-blue-600 font-semibold text-lg break-all">Ubuhle@gmail.com</p>
                      </div>
                    </a>
                  </div>

                  {/* Additional Info */}
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <p className="text-gray-700 leading-relaxed">
                      Whether you're an artist looking to join our platform, a model seeking opportunities, or simply want to get in touch, we're here to help. Reach out to us through any of the channels above.
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="order-1 lg:order-2">
                <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10">
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                    Send us a Message
                  </h2>
                  <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-8"></div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Field */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 text-gray-900"
                        required
                      />
                    </div>

                    {/* Email Field */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 text-gray-900"
                        required
                      />
                    </div>

                    {/* Message Field */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                        Message
                      </label>
                      <textarea
                        name="message"
                        id="message"
                        rows="6"
                        placeholder="Enter your message..."
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 text-gray-900 resize-none"
                        required
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Contact
