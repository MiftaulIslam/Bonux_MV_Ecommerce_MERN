
import { useLocation } from "react-router-dom";
import Signup from "../../components/auth/Signup";
// Utility to parse query parameters
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
const SignupPage = () => {
  const query = useQuery();
  const role = query.get("role") || "user"; // Default role is 'user'

  return (
      <Signup role={role} />

  );
};

export default SignupPage;
