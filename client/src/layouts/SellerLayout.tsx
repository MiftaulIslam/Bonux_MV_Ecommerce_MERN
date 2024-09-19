import { useState, ReactNode } from 'react'
import { Outlet } from 'react-router-dom'

type SellerLayoutProps = {
  children: ReactNode
}

export default function SellerLayout() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [openMenus, setOpenMenus] = useState<string[]>([])
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true)

  const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen)
  const toggleLeftSidebar = () => setIsLeftSidebarOpen(!isLeftSidebarOpen)

  const toggleMenu = (menu: string) => {
    setOpenMenus(prevOpenMenus =>
      prevOpenMenus.includes(menu)
        ? prevOpenMenus.filter(item => item !== menu)
        : [...prevOpenMenus, menu]
    )
  }

  const isMenuOpen = (menu: string) => openMenus.includes(menu)

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left sidebar */}
      <div className={`${isLeftSidebarOpen ? 'w-64' : 'w-16'} bg-white shadow-lg overflow-y-auto transition-all duration-300 ease-in-out`}>
        <div className="flex items-center justify-between h-16 border-b px-4">
          {isLeftSidebarOpen && (
            <>
              <svg className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <span className="ml-2 text-xl font-semibold">Bonux Seller Center</span>
            </>
          )}
          <button onClick={toggleLeftSidebar} className="p-1 rounded-full hover:bg-gray-200">
            <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        {isLeftSidebarOpen && (
          <nav className="mt-6">
            {['Products', 'Orders and Reviews', 'Marketing Center', 'Finance'].map((item) => (
              <div key={item}>
                <button
                  onClick={() => toggleMenu(item)}
                  className="flex items-center justify-between w-full px-6 py-3 text-gray-700 hover:bg-gray-200"
                >
                  <div className="flex items-center">
                    <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    {item}
                  </div>
                  <svg
                    className={`h-4 w-4 transition-transform ${isMenuOpen(item) ? 'transform rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isMenuOpen(item) && (
                  <div className="bg-gray-100 py-2 px-6">
                    <a href="#" className="block py-2 text-sm text-gray-700 hover:text-gray-900">Submenu 1</a>
                    <a href="#" className="block py-2 text-sm text-gray-700 hover:text-gray-900">Submenu 2</a>
                    <a href="#" className="block py-2 text-sm text-gray-700 hover:text-gray-900">Submenu 3</a>
                  </div>
                )}
              </div>
            ))}
          </nav>
        )}
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex justify-between items-center p-4 bg-white border-b">
          <h1 className="text-2xl font-semibold">Seller Dashboard</h1>
          <div className="flex space-x-2">
            <button className="px-4 py-2 border rounded hover:bg-gray-100">Product Data</button>
            <button className="px-4 py-2 border rounded hover:bg-gray-100">Bulk Manage</button>
            <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">+ New Product</button>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {/* Outlet for child components */}
          <Outlet/>
        </main>
      </div>

      {/* Right sidebar */}
      <div className="w-16 bg-white shadow-lg flex flex-col items-center py-4">
        <button className="mb-4">
          <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
        <button className="mb-4">
          <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
        <button onClick={toggleSettings}>
          <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>

      {/* Settings panel */}
      <div
        className={`fixed inset-y-0 right-0 w-64 bg-white shadow-lg p-6 transform transition-all duration-300 ease-in-out ${
          isSettingsOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">My Account</h2>
          <button onClick={toggleSettings}>
            <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav>
          <ul className="space-y-2">
            {['Profile', 'User Management', 'Account Settings', 'Chat Settings'].map((item) => (
              <li key={item}>
                <a href="#" className="flex items-center justify-between text-gray-700 hover:bg-gray-100 px-2 py-1 rounded">
                  {item}
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-4 pt-4 border-t">
          <a href="#" className="flex items-center text-red-500 hover:bg-red-100 px-2 py-1 rounded">
            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </a>
        </div>
        <div className="mt-8">
          <h3 className="text-sm font-semibold mb-2">Countries</h3>
          <div className="grid grid-cols-3 gap-2">
            {['PK', 'BD', 'MM', 'NP', 'LK'].map((country) => (
              <div key={country} className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full">
                <span className="text-xs">{country}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}