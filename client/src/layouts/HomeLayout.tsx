import { Outlet } from "react-router-dom";
import { Footer, NavBar } from "../components";
import { useEffect, useState } from "react";
import ResponsiveSidebar from './ResponsiveSidebar';
import VerticalMultiLevelDropDown from "../widgets/VerticalMultiLevelDropDown";
import { categoriesData } from "../static/data";
import { useSelector } from "react-redux";
import { GetService } from "../utils/HTTP/Get";

const HomeLayout = () => {
  const { isOpen } = useSelector((state) => state.togglebar);
  const [categories, setCategories] = useState(null)
  const getCategories = async ()=>{
      const categories = await GetService(`category/categories-order`, true) 
      if(categories){
          setCategories(categories.data);
      }
  }
  useEffect(() => {
   getCategories()
  }, [])
  return (
    <>
      <div className="bg-sky-900 ">
        <NavBar />
      </div>
      <div className={`w-full ${!isOpen && "hidden"}`}>
        <ResponsiveSidebar className={'w-4/5  z-10 bg-[#fff] shadow-lg h-full fixed overflow-y-auto top-15  left-0'}>
          <VerticalMultiLevelDropDown items={categories}/>
        </ResponsiveSidebar>
      </div>
      <div className="container">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default HomeLayout;
