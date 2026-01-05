import Header from '../components/Header'
import Footer from '../components/Footer'
import ModelCard from '../components/ModelCard'
import { models } from '../data/mockData'

function Models() {
  return (
    <>
      <Header />
      <div className="bg-white py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-center md:text-left text-black">Models</h1>
          <div className="flex items-center justify-center bg-white">
            <div className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4 w-full">
              {models.map((model) => (
                <ModelCard key={model.id} model={model} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Models

