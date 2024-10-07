import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PostService } from "../../utils/HTTP/Post";
import { useLoader } from "../../hooks/LoaderProvider";

const Activation = () => {
  const navigate = useNavigate();
  const {showLoader, hideLoader} =useLoader()
  // Token coming from URL
  const { token } = useParams();

  // Validating Token
    const validateToken = async (token: string | undefined) => {
      showLoader()
   const data = await PostService(`user/activate/${token}`, true)
   
    hideLoader()
    navigate(`${data.role === 'seller' ? "/login?role=seller": "/login"}`)
   

    };

  useEffect(() => {
    if (token) validateToken(token);
    
  }, [token]);

  return (

    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-400 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-8 shadow-2xl">
        <div>
          
          <h2 className="mt-4 text-center text-2xl font-extrabold text-white">
            Account successfully activated
          </h2>
          <p className="text-sm text-center text-blue-100 my-2">
            Go back to login{" "}
            <Link
              className="font-medium text-[#ddd] hover:text-white"
              to={"/login"}
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Activation;
