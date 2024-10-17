import { Outlet } from "react-router-dom";
import { NavBar, Sidebar } from "../components";
import { useSelector } from "react-redux";
import Loader from "../widgets/Loader";
import { RootState } from "../state/store/store";

const AdminLayout = () => {
  const {loading} = useSelector((state:RootState)=> state.user)
  // useEffect(() => {

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
