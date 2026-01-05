function Hero() {
  return (
    <main>
      <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 h-screen min-h-[500px] text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://media.istockphoto.com/id/485376989/photo/condenser-microphone-on-boom-stand-with-headphones-in-dark-studio.webp?a=1&b=1&s=612x612&w=0&k=20&c=uud9gtvty6JCYwuLo1bvuE-NIfRIi9Jth4i0SQo2htE="
            alt="Background"
            className="object-cover object-center w-full h-full"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 text-white drop-shadow-lg">
            Welcome to Ubuhle Bekonjana
          </h1>
          <p className="text-base sm:text-lg text-white/95 mb-8 max-w-2xl drop-shadow-md">
            Music is powerful. As people listen to it, they can be affected.
            They respond.
          </p>
        </div>
      </div>
    </main>
  )
}

export default Hero

