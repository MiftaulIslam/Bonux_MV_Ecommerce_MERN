import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { fetchUser } from './state/actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { RouterProvider } from 'react-router-dom'; // Correct import
import { LoaderProvider } from './hooks/LoaderProvider';
import router from './routes/routers'; // Ensure correct path
import { AppDispatch, RootState } from './state/store/store';

function App() {
  const { isAuthenticated, isLoggedIn} = useSelector((state:RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (!isAuthenticated && !isLoggedIn) {
      dispatch(fetchUser());
      
    }
  }, []);

  return (
    <>
    
    <LoaderProvider>


<RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
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
    </LoaderProvider>
    </>
  );
}

export default App;
