
import './App.css'
import { BrowserRouter, Routes, Route, } from 'react-router-dom'
import { Loginpage, SignupPage, Activation, RequestActivation, ForgotPassword, ConfirmPassword, Home } from './routes/routes'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeLayout from './layouts/HomeLayout';
import { useEffect } from 'react';
import { fetchUser } from './state/actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import AdminLayout from './layouts/AdminLayout';
import Admin from './pages/Admin/Admin';
import Category from './pages/Admin/Category';
import ProductDetail from './components/Helper/ProductDetail';
function App() {
  
  const { isAuthenticated, isLoggedIn, user, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if(!isAuthenticated && !isLoggedIn) {

      dispatch(fetchUser());
    }
  }, [dispatch, isLoggedIn]);

  return (
    <>
    <BrowserRouter>
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
transition: Bounce
/>
      <Routes>
        {/* Authentication */}
        <Route path="/login" element={<Loginpage />}/>
        <Route path="/signup" element={<SignupPage />}/>
        <Route path="/forgot-password" element={<ForgotPassword />}/>
        <Route path="/confirm-password/:token" element={<ConfirmPassword />}/>
        <Route path="/activation/:token" element={<Activation />}/>
        <Route path="/request-activation" element={<RequestActivation />}/>


        {/* For home */}
        <Route path="/" element={<HomeLayout/>}>
        <Route index element={<Home/>}/>
        <Route path="/product-detail" element={<ProductDetail/>}/>
        </Route> 

        {/* Admin */}
        <Route path="/admin" element={<AdminLayout/>}>
        <Route index element={<Admin/>}/>
        <Route path="category" element={<Category/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    
    
    </>
  )
}

export default App
