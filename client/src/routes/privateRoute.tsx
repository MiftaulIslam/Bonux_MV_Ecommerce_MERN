import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { showAlert } from "../utils/showAlert";
import Loader from "../widgets/Loader";

const PrivateRoute = ({ role }) => {
  const { user, loading } = useSelector((state) => state.user);
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  useEffect(() => {
    if (!loading) {
      setIsUserLoaded(true);
    }
  }, [loading]);

  if (loading || !isUserLoaded) {
    return <Loader/>; 
  }
  if(user){
    
  const isAuthorized = user?.role === role || user?.role === "admin";
  
  if (role === "admin" || role === "seller") {
    if (isAuthorized) {
      return <Outlet />;
    } else {
      showAlert(false, "Unauthorized access detected");
      return <Navigate to="/" />;
    }
  }

  if (role === "user") {
    if (isAuthorized) {
      return <Outlet />;
    } else {
      showAlert(false, "You must login");
      return <Navigate to="/login" />;
    }
  }

  }
};

export default PrivateRoute;
