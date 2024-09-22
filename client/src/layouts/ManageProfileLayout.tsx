import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, Outlet, useLocation } from 'react-router-dom';

interface MenuItem {
  label: string
  href: string
  link?:string
  subItems?: MenuItem[]
}


const menuItems: MenuItem[] = [
  {
    label: 'Manage My Account',
    href: '',
    link:'user',
    subItems: [
      { label: 'My Profile', href: 'my' },
      { label: 'Address Book', href: 'addresses' },
      { label: 'My Payment Options', href: '/payment-options' },
      { label: 'Daraz Wallet', href: '/wallet' },
    ],
  },
  {
    label: 'My Orders',
    href: '/hgf',
    
    link:'order',
    subItems: [
      { label: 'My Returns', href: '/returns' },
      { label: 'My Cancellations', href: '/cancellations' },
    ],
  },
]

function MenuItem({ item }: { item: MenuItem }) {
  const [selectedItem, setselectedItem] = useState("Manage My Account")
    const location = useLocation()
  return (
    <div className="mb-2">
      {item.subItems ? (
        <>
          <Link to={item.href} onClick={()=>setselectedItem(item.label)} className={`${(selectedItem == item.label)?"text-blue-600":"text-gray-600"} font-medium `}>{item.label}</Link>
          <ul className="ml-4 space-y-1 mt-1">
            {item.subItems.map((subItem) => (
              <li key={subItem.href}>
                <Link to={subItem.href} onClick={()=>setselectedItem(subItem.label)} className={`${(selectedItem == subItem.label)?"text-blue-600":"text-gray-600"} hover:text-blue-600 text-sm`}>
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
    

      <div className="max-w-7xl mx-auto ">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <aside className="w-full md:w-1/6 p-4">
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <MenuItem key={item.label} item={item} />
              ))}
            </nav>
          </aside>

          {/* Main content */}
          <main className="w-full md:w-5/6 p-4">
            <Outlet/>
          </main>
        </div>
      </div>
    </div>
  )
}