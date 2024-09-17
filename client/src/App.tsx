import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { fetchUser } from './state/actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { RouterProvider } from 'react-router-dom'; // Correct import
import router from './routes/routers'; // Ensure correct path

function App() {
  const { isAuthenticated, isLoggedIn, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
console.log(user)
  useEffect(() => {
    if (!isAuthenticated && !isLoggedIn) {
      dispatch(fetchUser());
    }
  }, [dispatch, isLoggedIn, isAuthenticated, user]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={100}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        // transition="bounce" // Fixed this typo
      />
    </>
  );
}

export default App;
