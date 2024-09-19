import React from 'react'
import { useSelector } from 'react-redux';
import { Link, Outlet, useLocation } from 'react-router-dom';

interface MenuItem {
  label: string
  href: string
  subItems?: MenuItem[]
}


const menuItems: MenuItem[] = [
  {
    label: 'Manage My Account',
    href: '#',
    subItems: [
      { label: 'My Profile', href: 'my' },
      { label: 'Address Book', href: '/address-book' },
      { label: 'My Payment Options', href: '/payment-options' },
      { label: 'Daraz Wallet', href: '/wallet' },
    ],
  },
  {
    label: 'My Orders',
    href: '#',
    subItems: [
      { label: 'My Returns', href: '/returns' },
      { label: 'My Cancellations', href: '/cancellations' },
    ],
  },
  { label: 'My Reviews', href: '/reviews' },
  { label: 'My Wishlist & Followed Stores', href: '/wishlist' },
  { label: 'Sell On Daraz', href: '/sell' },
]

function MenuItem({ item }: { item: MenuItem }) {
    const location = useLocation()
  return (
    <div className="mb-2">
      {item.subItems ? (
        <>
          <h3 className="font-medium text-gray-700">{item.label}</h3>
          <ul className="ml-4 space-y-1 mt-1">
            {item.subItems.map((subItem) => (
              <li key={subItem.href}>
                <Link to={subItem.href} onClick={()=>console.log(location.pathname.split("/")[2] === subItem.href)} className={`${location.pathname.split("/")[2] === subItem.href?"text-blue-600":"text-gray-600"} hover:text-blue-600`}>
                  {subItem.label}
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <Link to={item.href} className={`${location.pathname === `user/${item.href}`?"text-blue-600":"text-gray-600"} hover:text-blue-600`}>
          {item.label}
        </Link>
      )}
    </div>
  )
}

export default function ManageProfileLayout() {
    

  return (
    <div className=" min-h-[90vh] bg-gray-100">
    

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <aside className="w-full md:w-1/4 p-4">
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <MenuItem key={item.label} item={item} />
              ))}
            </nav>
          </aside>

          {/* Main content */}
          <main className="w-full md:w-3/4 p-4">
            <Outlet/>
          </main>
        </div>
      </div>
    </div>
  )
}