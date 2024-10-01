import React from 'react'
import Loader from '../../widgets/Loader';
import { useSelector } from 'react-redux';
import { default_src } from '../../static/data';

const StorePreview = () => {
    
  const {  loading, store } = useSelector((state) => state.store);
  if(loading) return <Loader/>
  return (
    <div className="bg-gray-100 w-full min-h-screen">
      {/* Cover Photo */}
      <div className="relative w-full h-44 sm:h-80  bg-gray-300">
        
      <img className='w-full h-full object-cover object-center' src={`${default_src}${store?.media.banner}`} alt={store.name} />
        {/* <Image
          src="/placeholder.svg?height=320&width=1200"
          alt="Cover Photo"
          layout="fill"
          objectFit="cover"
        /> */}
        <button className="absolute bottom-4 right-4 bg-white text-black px-4 py-2 rounded-md text-sm">
          Edit cover photo
        </button>
      </div>

      {/* Profile Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 sm:-mt-16">
        <div className="sm:flex sm:items-end sm:space-x-5">
          <div className="relative">
            <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-full ring-4 ring-white bg-gray-300 overflow-hidden">
                <img className='w-full h-full object-cover object-center' src={`${default_src}${store?.media.logo}`} alt={store.name} />

              {/* <Image
                src="/placeholder.svg?height=128&width=128"
                alt="Profile Picture"
                layout="fill"
                objectFit="cover"
              /> */}
            </div>
          </div>
          <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="sm:hidden md:block mt-6 min-w-0 flex-1">
              <h1 className="text-2xl font-bold text-gray-900 truncate">
                Miftaul Islam Ariyan
              </h1>
              <p className="text-sm text-gray-500">(il professore)</p>
            </div>
            <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
              <button className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                + Add to story
              </button>
              <button className="inline-flex justify-center px-4 py-2 text-sm font-medium text-black bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                Edit profile
              </button>
            </div>
          </div>
        </div>
        <div className="hidden sm:block md:hidden mt-6 min-w-0 flex-1">
          <h1 className="text-2xl font-bold text-gray-900 truncate">
            Miftaul Islam Ariyan
          </h1>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-6 border-t border-gray-200 sticky top-0 bg-white z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex flex-wrap -mb-px" aria-label="Tabs">
            {['Reviews', 'About', 'Friends', 'Photos', 'Videos', 'Check-ins', 'Products'].map((item) => (
              <a
                key={item}
                href="#"
                className={`${
                  item === 'Reviews'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm mr-8 mb-2`}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">About</h2>
              <p className="text-gray-600">Information about the user would go here.</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Reviews</h2>
              <p className="text-gray-600">User reviews would be listed here.</p>
            </div>
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Products</h2>
              <p className="text-gray-600">User products would be displayed here.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StorePreview