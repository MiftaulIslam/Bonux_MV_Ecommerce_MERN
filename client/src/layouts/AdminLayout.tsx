import { Outlet, useNavigate } from "react-router-dom";
import { NavBar, Sidebar } from "../components";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { showAlert } from "../utils/showAlert";
import Loader from "../widgets/Loader";

const AdminLayout = () => {
  const navigate = useNavigate();
  const {isLoggedIn, user, loading} = useSelector((state)=> state.user)
  // useEffect(() => {
  //   console.log(user)

  //   if(user.role !== "admin" || !isLoggedIn) {
  //     showAlert(false, "Unauthorized access detected")  
  //     navigate('/')
  //   }
   
  // }, [])
  if(loading){
    return <Loader/>
  }
  return (

    <>
      <>
        <div className="bg-sky-900 ">
        <NavBar />
      </div>
      
      <div className="flex gap-4">
        <div className="hidden sm:block">
        <Sidebar/>

        </div>
        <div className="w-full min-h-screen flex-1 ">
          <Outlet />
        </div>
      </div>
      </>
      
    
    
    </>
  );
};

export default AdminLayout;
