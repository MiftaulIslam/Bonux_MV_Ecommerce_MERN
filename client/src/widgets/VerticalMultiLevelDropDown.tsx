import React from "react";
import { Link } from "react-router-dom";
import  Plus  from "./icons/Plus";
import  Subtract  from "./icons/Subtract";
import { verticalMultiLevelDropDownProp } from "../models/PropType";

const VerticalMultiLevelDropDown:React.FC<verticalMultiLevelDropDownProp> = ({ items, className }) => {
  const [activeItems, setActiveItems] = React.useState<any>({});

  const handleItemClick = (item:any) => {
    setActiveItems((prevActiveItems:any) => {
      if (prevActiveItems[item.name]) {
        delete prevActiveItems[item.name];
      } else {
        prevActiveItems[item.name] = true;
      }
      return { ...prevActiveItems };
    });
    
  };

  return (
    <ul className={`${className}`}>
      {items?.map((item:any, index:number) => (
        <li
          key={index}
          className="hover:bg-[#f8f6f2] cursor-pointer duration-200"
        >
          {item.children && item.level < 1 ? (
            <div
              className={`flex items-center ${
                item.level > 0 ? "hover:bg-[#ffff] rounded-md shadow-sm" : ""
              } py-1 px-4`}
              onClick={() => handleItemClick(item)}
            >
              <span className="flex-grow">{item.name}</span>

              <span className="ml-2">
                {activeItems[item.name] ? <Subtract width={"28px"} height={"25px"} color={"#000000"}/> : <Plus width={"28px"} height={"25px"} color={"#000000"}/>}
                
              </span>
            </div>
          ) : (
            <div
              className={`flex  justify-between ${
                item.level > 0 ? "hover:bg-[#ffff] rounded-md shadow-sm" : ""
              } py-1 px-4`}
              onClick={() => handleItemClick(item)}
            >
              <Link to={item.slug} className="block py-1 px-4">
                {item.name}
              </Link>
              {item.children.length !== 0 ? (
                <span className="ml-2">
                
                {activeItems[item.name] ? <Subtract width={"28px"} height={"25px"} color={"#000000"}/> : <Plus width={"28px"} height={"25px"} color={"#000000"}/>}
                </span>
              ) : (
                ""
              )}
            </div>
          )}
          {item.children && activeItems[item.name] && (
            <VerticalMultiLevelDropDown items={item.children} className="" />
          )}
        </li>
      ))}
    </ul>
  );
};

export default VerticalMultiLevelDropDown;
