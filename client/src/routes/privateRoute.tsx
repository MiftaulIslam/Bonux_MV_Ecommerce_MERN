import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { showAlert } from "../utils/showAlert";
import Loader from "../widgets/Loader";

const PrivateRoute = ({ role }) => {
  const { user, loading } = useSelector((state) => state.user);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  console.log(user)

  useEffect(() => {
    if (!loading) {
      setIsUserLoaded(true);
    }
  }, [loading]);

  if (loading || !isUserLoaded) {
    return <Loader />; 
  }
  if(user){
    
  const isAuthorized = user?.role === role || user?.role === "admin";
  console.log(isAuthorized)

    if (isAuthorized) {
      return <Outlet />;
    } else {
      showAlert(false, "Unauthorized access");
      if(user.role === 'user'){
        return <Navigate to="/" />;
      }else{
        return <Navigate to="/seller" />;
      }
    }
    
    
  }else{
    return <Navigate to="/login" />;

  }
};

export default PrivateRoute;
