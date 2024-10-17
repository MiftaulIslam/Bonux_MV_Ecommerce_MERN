import {ChangeEvent,
  FC} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import  SearchIcon  from './icons/SearchIcon';

interface NavSearchProps {
  term: string;
  data: any | null;
  className?:string;
  setsearchTerm?:any;
  setsearchData?:any;
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
}

const NavSearch: FC<NavSearchProps> = ({
  term,
  data,
  className,
  setsearchTerm,
  setsearchData,
  handleSearch,
}) => {
  const navigate = useNavigate()
  
  return (
    <div
      className={`${className}`}
    >
      <input
        type="text"
        onChange={handleSearch}
        value={term}
        className="w-full rounded-lg h-full text-sm font-semibold text-gray-500 border-2 focus:outline-none px-2 pr-7"
        placeholder="Search..."
      />
      <span className="absolute cursor-pointer top-[0.5rem] right-2 h-full text-[#555555]  " onClick={()=> {navigate(`/search?q=${term}`); setsearchTerm(''); setsearchData(null); window.location.reload()}}>
        <SearchIcon />
      </span>
      {data && data.length!== 0 && (
        <div className="absolute min-h-[30vh] rounded  w-1/3 bg-slate-50 shadow-md z-[9]">
          {data &&
            data.slice(0,5).map((i:any, index:any) => {
              const name = i.title;
              const productName = name.replace(/\s+/g, "-");
              return (
                <>
                <Link key={index} to={`/product-detail/${productName}/${i?.id}`} onClick={()=> {setsearchTerm(''); setsearchData(null)}}>
                  <div key={index} className="w-full flex items-center py-2 px-3 hover:bg-gray-100">
                    <img
                      src={i.images[0]}
                      alt={name}
                      className="w-[40px] h-[40px] rounded-full object-contain mr-[19px]"
                    />
                    <p className="font-semibold text-gray-700 text-sm">{name}</p>
                  </div>
                </Link>
                <hr />
                </ >
              );
            })}
        </div>
      )}
    </div>
  );
};

export default NavSearch;