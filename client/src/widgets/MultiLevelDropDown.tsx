import React from 'react';
import { Link } from 'react-router-dom';

const MultiLevelDropDown = ({ items, className }:{className:string}) => {
  const [hoveredItem, setHoveredItem] = React.useState(null);

  const handleMouseEnter = (item) => {
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };


  return (
    <div>
      <ul className={`${className}`}>
        {items?.map((item, index) => (
          <li
            key={index}
            className="px-2 py-2 cursor-pointer hover:bg-[#ddd] duration-300"
            onMouseEnter={() => handleMouseEnter(item)}
            onMouseLeave={handleMouseLeave}
          >   {item.level === 0 ? (
            <span>{item.name}</span>
          ) : (
            <Link to={item.slug} className='block'  >
              {item.name}
            </Link>
          )}
            {item.children.length > 0 && hoveredItem === item && (
              <MultiLevelDropDown
                items={item.children}
                className="py-1 absolute z-10 shadow-md top-[-1px] left-[270px] w-[280px] h-[400px] bg-white border"
              
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MultiLevelDropDown;