import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";


import { LogoutButton } from "../widgets";
import { fetchStore } from "../state/actions/storeAction";
import { useDispatch, useSelector } from "react-redux";
import BellIcon from "../widgets/icons/BellIcon";
import BrifcaseIcon from "../widgets/icons/BrifcaseIcon";
import Close from "../widgets/icons/Close";
import LogOutIcon from "../widgets/icons/LogoutIcon";
import MenuIcon from "../widgets/icons/MenuIcon";
import MessageSquareIcon from "../widgets/icons/MessageSquareIcon";
import ProductIcon from "../widgets/icons/ProductIcon";
import RightArrow from "../widgets/icons/RightArrow";
import SellerCenterIcon from "../widgets/icons/SellerCenterIcon";
import SettingIcon from "../widgets/icons/SettingIcon";
import StoreIcon from "../widgets/icons/StoreIcon";
import { AppDispatch, RootState } from "../state/store/store";


export default function SellerLayout() {
  
  const { user } = useSelector((state:RootState) => state.user)
  const {   store } = useSelector((state:RootState) => state.store);
  const dispatch = useDispatch<AppDispatch>()
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen);
  const toggleLeftSidebar = () => setIsLeftSidebarOpen(!isLeftSidebarOpen);
  const toggleRightSidebar = () => setIsRightSidebarOpen(!isRightSidebarOpen);
  const closeRightSidebar = () => setIsRightSidebarOpen(false);

  const toggleMenu = (menu: string) => {
    setOpenMenus((prevOpenMenus) =>
      prevOpenMenus.includes(menu)
        ? prevOpenMenus.filter((item) => item !== menu)
        : [...prevOpenMenus, menu]
    );
  };
  useEffect(() => {
    if(!store ){
      dispatch(fetchStore(user?.store))

    }
  }, [])
  
  const isMenuOpen = (menu: string) => openMenus.includes(menu);

  const rightMenuItems = [
    { label: "Notifications", element: <BellIcon /> },
    { label: "Message", element: <MessageSquareIcon /> },
    { label: "Settings", element: <SettingIcon /> },
  ];

  const leftMenuItems = [
    {
      label: "Products",
      level: 0,
      href: 'products',
      element: <ProductIcon/>,
      children: [
        {
          label: 'Manage Products',
          level: 1,
          href: 'products'
        },
        {
          label: 'Add Products',
          level: 1,
          href: 'product-add'
        },
        {
          label: 'Brands Management',
          level: 1,
          href: 'Brands'
        },
      ]
    },
    {
      label: "Orders and Reviews",
      level: 0,
      href: 'orders-reviews',
      children: [
        {
          label: 'Order Management',
          level: 1,
          href: 'orders'
        },
        {
          label: 'Handle Return',
          level: 1,
          href: 'return'
        },
        {
          label: 'Reviews',
          level: 1,
          href: 'review'
        },
      ]
    },
    {
      label: "Manage Store",
      level: 0,
      href: 'store',
      element: <StoreIcon/>,
      children: [
        {
          label: 'Store Preview',
          level: 1,
          href: 'store-preview'
        },
        {
          label: 'Store Settings',
          level: 1,
          href: 'store-settings'
        },
      ]
    },
    {
      label: "Finance",
      level: 0,
      href: 'finance',
      element: <BrifcaseIcon/>,
      children: [
        {
          label: 'Income',
          level: 1,
          href: 'income'
        },
      ]
    }
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b p-4 flex justify-between items-center">
        <div className="flex items-center">
          <button type="button" onClick={toggleLeftSidebar} className="mr-4 lg:hidden text-gray-500">
            <MenuIcon />
          </button>
          <div className="flex items-center">
            <span>
              <SellerCenterIcon width={40} height={40} />
            </span>
            <Link to={"/seller"} className="text-2xl font-semibold">Bonux Seller Center</Link>
          </div>
        </div>

        <div className="flex items-center">
          <div className="hidden lg:flex space-x-2 mr-4">
            <Link to={' '} className="px-4 py-2 border rounded hover:bg-gray-100">
              Product Data
            </Link>
            <Link to={' '} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              + New Product
            </Link>
          </div>
          <button type="button" onClick={toggleRightSidebar} className="md:hidden">
            <MenuIcon />
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg overflow-y-auto transition-transform duration-300 ease-in-out transform ${
            isLeftSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:relative lg:translate-x-0`}
        >
          {/* Left Sidebar Header */}
          <div className="flex lg:hidden items-center justify-between h-16 border-b px-4">
            <div className="flex items-center">
              <span>
                <SellerCenterIcon width={40} height={40} />
              </span>
              <span className="ml-2 text-xl font-semibold">
                Bonux Seller Center
              </span>
            </div>
            <button
              type="button"
              onClick={toggleLeftSidebar}
              className="lg:hidden p-1 rounded-full hover:bg-gray-200"
            >
              <Close />
            </button>
          </div>


          
            {/* Left Sidebar menus */}
          <nav className="mt-6">
            {leftMenuItems.map((item) => (
              <div key={item.href}>
                <button
                  onClick={() => toggleMenu(item.label)}
                  className="flex items-center justify-between w-full px-6 py-3 text-gray-700 hover:bg-gray-200"
                >
                  <div className="flex gap-4 items-center">
                    {
                      item.element ? item.element : 
                      <MenuIcon  /> 
                    }
                    {item.label}
                  </div>
                  <RightArrow
                    className={`h-4 w-4 transition-transform ${
                      isMenuOpen(item.label) ? "transform rotate-90" : ""
                    }`}
                  />
                </button>
                {isMenuOpen(item.label) && item.children && (
                  <div className="bg-gray-100 py-2 px-6">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        className="block py-2 text-sm text-gray-700 hover:text-gray-900"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Main content area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {/* Outlet for child components */}
          <Outlet />
        </main>

        {/* Right sidebar -  for larger screens */}
        <div className="hidden md:block w-16 bg-white shadow-lg">
          <div className="flex flex-col items-center py-4">
            <button 
              type="button" className="mb-4">
              <BellIcon  />
            </button>
            <button 
              type="button" className="mb-4">
              <MessageSquareIcon  />
            </button>
            <button 
              type="button" onClick={toggleSettings}>
              <SettingIcon />
            </button>
          </div>
        </div>

        {/* Right sidebar -  for mobile screens */}
        <div
          className={`md:hidden fixed inset-y-0 right-0 z-30 w-64 bg-white shadow-lg overflow-y-auto transition-transform duration-300 ease-in-out transform ${
            isRightSidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h2 className="text-lg font-semibold">Menu</h2>
              <button
              type="button"
                onClick={closeRightSidebar}
                className="p-1 rounded-full hover:bg-gray-200"
              >
                <Close />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {rightMenuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={
                    item.label === "Settings" ? toggleSettings : undefined
                  }
                  className="w-full flex justify-start items-center gap-4 duration-200 text-left px-6 py-3 text-gray-700 hover:bg-gray-200 border-b"
                >
                  <span>{item.element}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>



      {/* Settings panel */}
      <div
        className={`fixed inset-y-0 right-0 z-40 w-64 bg-white shadow-lg p-6 transform transition-all duration-300 ease-in-out ${
          isSettingsOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">My Account</h2>
          <button type="button" onClick={toggleSettings}>
            <Close  />
          </button>
        </div>
        <nav>
          <ul className="space-y-2">
            {[
              "Profile",
              "User Management",
              "Account Settings",
              "Chat Settings",
            ].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="flex items-center justify-between text-gray-700 hover:bg-gray-100 px-2 py-1 rounded"
                >
                  {item}
                  <RightArrow className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-4 pt-4 border-t">
          <a
            href="#"
            className="flex items-center gap-4 text-red-500 hover:bg-red-100 px-2 py-1 rounded"
          >
            <LogOutIcon />
            <LogoutButton/>
          </a>
        </div>
        
      </div>
    </div>
  );
}
