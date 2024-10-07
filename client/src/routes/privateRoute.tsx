import { Navigate, Outlet } from "react-router-dom";
import { showAlert } from "../utils/showAlert";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loader from "../widgets/Loader";
import { privateRouteProp } from "../models/PropType";
import { RootState } from "../state/store/store";

const PrivateRoute:React.FC<privateRouteProp> = ({ role }) => {
  const { user, loading } = useSelector((state:RootState) => state.user);
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  useEffect(() => {
    if (!loading) {
      setIsUserLoaded(true);
    }
  }, [loading, user]);
  if (loading || !isUserLoaded) {
    return <Loader />;
  }
  
  if (user) {
    const isAuthorized = user?.role === role || user?.role === "admin";

    if (isAuthorized) {
      return <Outlet />;
    } else {
      showAlert(false, "Unauthorized access");
      return user.role === 'user' ? <Navigate to="/" /> : <Navigate to="/seller" />;
    }
  } else {
    return <Navigate to="/login" />;
  }
};
export default PrivateRoute