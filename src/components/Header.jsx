import { useState } from 'react'
import { Link } from 'react-router-dom'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="px-4 bg-white shadow sticky top-0 z-10">
      <div className="relative mx-auto flex max-w-screen-lg flex-col py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link to="/" className="flex items-center text-2xl font-black">
          <span className="mr-2 text-3xl text-blue-600">
            <img className="w-1/3 h-1/3" src="/logo.png" alt="Logo" />
          </span>
        </Link>
        <input
          className="peer hidden"
          type="checkbox"
          id="navbar-open"
          checked={isMenuOpen}
          onChange={(e) => setIsMenuOpen(e.target.checked)}
        />
        <label
          className="absolute right-0 mt-1 cursor-pointer text-xl sm:hidden"
          htmlFor="navbar-open"
        >
          <span className="sr-only">Toggle Navigation</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="0.88em"
            height="1em"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M0 96c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zm0 160c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zm448 160c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h384c17.7 0 32 14.3 32 32z"
            />
          </svg>
        </label>
        <nav
          aria-label="Header Navigation"
          className={`${isMenuOpen ? 'block' : 'hidden'} pl-2 py-6 sm:block sm:py-0`}
        >
          <ul className="flex flex-col gap-y-4 sm:flex-row sm:gap-x-8">
            <li>
              <Link to="/artist" className="text-gray-600 hover:text-blue-600">
                Artist
              </Link>
            </li>
            <li>
              <Link to="/model" className="text-gray-600 hover:text-blue-600">
                Model
              </Link>
            </li>
            <li>
              <Link to="/event" className="text-gray-600 hover:text-blue-600">
                Events
              </Link>
            </li>
            <li>
              <Link to="/news" className="text-gray-600 hover:text-blue-600">
                News
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-600 hover:text-blue-600">
                About
              </Link>
            </li>
            <li className="mt-2 sm:mt-0">
              <Link
                to="/contact"
                className="rounded-xl border-2 border-blue-600 px-6 py-2 font-medium text-blue-600 hover:bg-blue-600 hover:text-white"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header

