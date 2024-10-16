import { Outlet } from "react-router-dom";
import { Footer, NavBar } from "../components";
import { useEffect, useState } from "react";
import ResponsiveSidebar from './ResponsiveSidebar';
import VerticalMultiLevelDropDown from "../widgets/VerticalMultiLevelDropDown";
import { useSelector } from "react-redux";
import { GetService } from "../utils/HTTP/Get";
import { RootState } from "../state/store/store";

const HomeLayout = () => {
  const { isOpen } = useSelector((state:RootState) => state.togglebar);
  const [categories, setCategories] = useState<any>(null)
  const getCategories = async ()=>{
      const categories = await GetService(`category/categories-order`) 
      setCategories(categories.data.data)
     
  }
  useEffect(() => {
   getCategories()
  }, [])
  return (
    <>
      <div className="bg-blue-700 bg-opacity-85 ">
        <NavBar />
      </div>
      <div className={`w-full ${!isOpen && "hidden"}`}>
        <ResponsiveSidebar className={'w-4/5  z-10 bg-[#fff] shadow-lg h-full fixed overflow-y-auto top-15  left-0'}>
          <VerticalMultiLevelDropDown items={categories?.data}/>
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
