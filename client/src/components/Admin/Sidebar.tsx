import { useState } from "react";
import { Link } from "react-router-dom";
import { adminMenus } from "../../static/data";

const Sidebar = () => {
  //Sidebar toggle button state
  const [isOpen, setisOpen] = useState(false);

  return (
    //Default width
    <div
      className={`relative duration-200 ${isOpen ? "w-72" : "w-20"
        }  min-w-12 min-h-screen bg-sky-900 text-slate-50`}
    >


      {/* Toggle button */}
      <div
        onClick={() => setisOpen(!isOpen)}
        className="w-7 h-7 border-2 cursor-pointer border-sky-900 absolute right-[-0.8rem] top-5 text-center rounded-full bg-white text-[#000]"
      >
        <h1 className="text-[20px] w-full h-full leading-5">
          {isOpen ? "<" : ">"}
        </h1>
      </div>


      {/* Sidebar Menus coming from a static file*/}
      <ul>


        {adminMenus.map((item, index) => (
          <li
            className={`  hover:bg-sky-700 hover:rounded ${item.gap ? "mt-7" : ""
              } cursor-pointer p-2`}
            key={index}
          >

            <Link
              to={`${item.title}`}
              className={`flex gap-4 items-center ${!isOpen && "justify-center"
                } `}
            >
              {/* Menu Icon */}
              <span className="text-2xl">
                <i className={item.src}></i>
              </span>
              {/* Menu Title */}
              <h3 className={`${!isOpen && "hidden"} text-sm text-gray-300`}>
                {item.title}
              </h3>
            </Link>

          </li>
        ))}


      </ul>
      
    </div>
  );
};

export default Sidebar;
