import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  NavSearch,
  ProfileDropdownMenus,
  UserProfile,
  NavButton,
} from "../../widgets/index";
// import { productData } from "../../static/data.ts";
import  SearchIcon  from "../../widgets/icons/SearchIcon";
import { flex_Center } from "../../static/style.ts";
import { Togglebar } from "../../state/reducers/responsiveToggleSidebarSlice.ts";
import { RootState } from "../../state/store/store.ts";
const NavBar = () => {
  
  const { isOpen } = useSelector((state:RootState) => state.togglebar);
  const dispatch = useDispatch();
  // Getting user info from redux
  const { isAuthenticated, user, loading } = useSelector((state:RootState) => state.user);
  //Search Input Value
  const [SearchTerm, setSearchTerm] = useState("");

  //Searched Data on page
  const [searchData, setSearchData] = useState(null);

  //Toggle Profile click dropdown
  const [dropdownVisible, setDropdownVisible] = useState(false);

  //Toggle Responsive Search bar
  const [showSearch, setshowSearch] = useState(false);

  //Search Input Handle
  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    const data = await fetch(`https://dummyjson.com/products/search?q=${term}`)
    //Going to add Database later ----------Warning--------------
    // const  filteredData:any =
    //   productData &&
    //   productData.filter((x:any) => {
    //     return x.name.toLowerCase().includes(term.toLowerCase());
    //   });
    const jsonData = await data.json()
    //Storing all of the matched data to the searchData
    setSearchData(jsonData.products);

    //When the search input field is blank make the term null
    if (term === "") setSearchData(null);
  };
  return (
    <>
      <div className="container-lg  h-[60px] relative gap-4 flex items-center justify-between">
        <div className="flex md:hidden flex-col cursor-pointer gap-1" onClick={()=> dispatch(Togglebar())}>
          {
            isOpen ? (
              <span className="text-[#ddd] duration-200 bold text-2xl">X</span>

            ):(
<>
              <span className="w-6 h-[2px] bg-[#ddd]"></span>
              <span className="w-6 h-[2px] bg-[#ddd]"></span>
              <span className="w-6 h-[2px] bg-[#ddd]"></span>
              </>          
            )
          }</div>
        {/* Logo */}
        <div>
          <Link className="header text-white" to={"/"}>
            Bonux
          </Link>
        </div>

        {/* Search */}

        <NavSearch
          className={"relative h-10 sm:block hidden w-3/6"}
          term={SearchTerm}
          data={searchData}
          setsearchTerm = {setSearchTerm}
          setsearchData = {setSearchData}
          handleSearch={handleSearchChange}       />

        {/* search responsive */}

        {showSearch && (
          <NavSearch 
            term={SearchTerm}
            data={searchData}
          
            setsearchTerm = {setSearchTerm}
            setsearchData = {setSearchData}
            className={'w-full  top-[3.75rem]  h-12 absolute right-0 block sm:hidden z-20'}
            handleSearch={handleSearchChange}
          />
        )}

        {/* Buttons */}
        <div className={`${flex_Center} gap-2`}>
          <div>
            <NavButton
              text={"Become a Seller"}
              display={"hidden"}
              bold={true}
              color={"#fff"}
              to={"login?role=seller"}
              smallMedia={"sm:block"}
              hover={"hover:text-[#ddd]"}
            />
          </div>
          {isAuthenticated && !loading ? (
            <div className="flex items-center relative cursor-pointer justify-center gap-2">
              <span
                onClick={() =>
                  showSearch ? setshowSearch(false) : setshowSearch(true)
                }
                className="cursor-pointer block sm:hidden text-[#fff]"
              >
                <SearchIcon />
              </span>
              <div
                className="flex items-center justify-center gap-2"
                onClick={() =>
                  dropdownVisible
                    ? setDropdownVisible(false)
                    : setDropdownVisible(true)
                }
              >
                {/* User Profile */}
                <UserProfile user={user} />
              </div>
            </div>
          ) : (
            <div className={`${flex_Center} gap-2`}>
              <NavButton
                text={"Login"}
                display={"inline-block"}
                bold={true}
                paddingX={"py-2"}
                paddingY={"px-4"}
                color={"#fff"}
                round={"rounded-lg"}
                to={"login"}
                smallMedia={"sm:block"}
                hover={"hover:bg-[rgba(0,0,0,.1)]"}
                extra={"link"}
              />
              <span className="text-white">|</span>
              <NavButton
                text={"Signup"}
                display={"inline-block"}
                bold={true}
                paddingX={"py-2"}
                paddingY={"px-4"}
                color={"#fff"}
                round={"rounded-lg"}
                to={"signup"}
                smallMedia={"sm:block"}
                hover={"hover:bg-[rgba(0,0,0,.1)]"}
                extra={"link"}
              />
            </div>
          )}
        </div>
        {/* dropdown menu */}
        {dropdownVisible && (
          <div className="absolute text-center z-50 bg-white rounded-sm shadow-lg border w-[250px] px-4 top-16 right-0">
            <ProfileDropdownMenus data={user}/>
          </div>
        )}
      </div>
    </>
  );
};

export default NavBar;
