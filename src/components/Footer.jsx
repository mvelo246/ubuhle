function Footer({ noTopMargin = false }) {
  return (
    <footer className={`relative ${noTopMargin ? '' : 'mt-12 sm:mt-16 md:mt-20'} bg-gray-900 px-4 pt-6 sm:pt-8 md:pt-10 w-full pb-6 sm:pb-8 md:pb-10`}>
      <div className="flex justify-center space-x-4 sm:space-x-5">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
            src="https://img.icons8.com/fluent/30/000000/facebook-new.png"
            alt="Facebook"
          />
        </a>

        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
            src="https://img.icons8.com/fluent/30/000000/instagram-new.png"
            alt="Instagram"
          />
        </a>

        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
            viewBox="0 0 24 24"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>
        <a
          href="https://tiktok.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
            viewBox="0 0 24 24"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
          </svg>
        </a>
      </div>

      <p className="py-6 sm:py-8 md:py-10 text-center text-gray-300 text-sm sm:text-base">
        © 2025 Momentum Code | All Rights Reserved
      </p>
    </footer>
  )
}

export default Footer

