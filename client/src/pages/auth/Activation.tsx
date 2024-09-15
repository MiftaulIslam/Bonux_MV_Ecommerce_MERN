import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PostService } from "../../utils/HTTP/Post";

const Activation = () => {
  const navigate = useNavigate();
  // check token validity
  const [valid, setValid] = useState<boolean>(false);
  // Initial Loading
  const [loading, setLoading] = useState<boolean>(true);

  // Token coming from URL
  const { token } = useParams();

  // Validating Token
  const validateToken = async (token: string | undefined) => {
 const data = await PostService(`user/activate/${token}`, true)
 if(data) {
  setLoading(false);
  setValid(true);
  navigate(`/login`)
 }
      
  };

  useEffect(() => {
    if (token) validateToken(token);
  }, [token]);

  return (
    <div className="flex h-[100vh] justify-center items-center">
      <div className="form_group bg-[#fff] rounded-lg shadow-md overflow-hidden m-auto flex flex-col sm:flex-row flex-wrap justify-center items-center w-[468px]">
        <div className="overlay-container w-full h-[380px]">
          <div className="overlay flex flex-col justify-center text-center items-center text-[#FFFFFF] h-full gap-2 px-2 bg-gradient-to-r from-red-500 to-pink-500">
            {/* Loading */}
            {loading && <h1 className="text-dark">Loading...</h1>}
            {/* After loading complete */}
            {!loading && valid && (
              <>
                <h1>Account successfully activated</h1>
                <p>Go back to login</p>
                <Link
                  to="/login"
                  className="anchor text-[#FFFFFF] uppercase font-bold inline-block text-sm py-3 px-11 rounded-2xl bg-opacity-0 border-2 border-[#FFFFFF]"
                >
                  Login
                </Link>
              </>
            )}
            {/* If error occured */}
            {!loading && !valid && <h1>Invalid token</h1>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activation;
