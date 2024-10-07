
import Login from '../../components/auth/Login'
import {  useLocation } from 'react-router-dom'
// Utility to parse query parameters
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
const Loginpage = () => {
 
  const query = useQuery();
  const role = query.get("role") || "user"; // Default role is 'user'
  return (
 
        <Login role={role}/>
  )
}

export default Loginpage