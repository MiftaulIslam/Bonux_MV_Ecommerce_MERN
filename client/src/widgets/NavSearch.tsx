import {ChangeEvent,
  FC} from 'react';
import { Link } from 'react-router-dom';
import { SearchIcon } from './icons/index';

interface NavSearchProps {
  width: string;
  display: string;
  top?: string;
  right?: string;
  position?: string;
  smallMedia?: string;
  term: string;
  data: any[] | null;
  className:string;
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
}

const NavSearch: FC<NavSearchProps> = ({
  term,
  data,
  className,
  handleSearch,
}) => {
  return (
    <div
      className={`${className}`}
    >
      <input
        type="text"
        onChange={handleSearch}
        value={term}
        className="w-full rounded-lg h-full border-2 focus:outline-none px-2 pr-7"
        placeholder="Search..."
      />
      <span className="flex items-center absolute cursor-pointer right-2 h-full text-[#555555] top-0 ">
        <SearchIcon />
      </span>
      {data && data.length!== 0 && (
        <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
          {data &&
            data.map((i, index) => {
              const name = i.name;
              const productName = name.replace(/\s+/g, "-");
              return (
                <Link key={index} to={`/product/${productName}`}>
                  <div key={index} className="w-full flex items-start py-3">
                    <img
                      src={i.image_Url[0].url}
                      alt={i.name}
                      className="w-[40px] h-[40px] rounded-full mr-[19px]"
                    />
                    <p className="font-bold">{i.name}</p>
                  </div>
                </Link>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default NavSearch;