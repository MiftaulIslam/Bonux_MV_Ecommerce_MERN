import React, { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import LoginPage from '../pages/auth/Loginpage'
import SignupPage from '../pages/auth/SignupPage'
import PrivateRoute from "./privateRoute";
import ManageProfileLayout from "../layouts/ManageProfileLayout";
import MyProfile from "../components/ManageProfile/MyProfile";
import ManageProfile from "../components/ManageProfile/ManageProfile";
import ManageAddresses from "../components/ManageProfile/ManageAddresses";
import AddressForm from  "../components/Helper/AddressForm"
import Loader from '../widgets/Loader';

// Lazy loaded components

const ForgotPassword = lazy(()=> import( '../pages/auth/ForgotPassword'))
const ConfirmPassword = lazy(()=> import( '../pages/auth/ConfirmPassword'))
const Activation = lazy(()=> import( '../pages/auth/Activation'))
const RequestActivation = lazy(()=> import( '../pages/auth/RequestActivation'))
const Admin = lazy(()=>import( "../pages/Admin/Admin"));
const Home = lazy(()=>import( '../pages/Home/Home'))
const Category = lazy(()=>import( '../pages/Admin/Category'))
const ProductDetail = lazy(()=>import( '../components/Helper/ProductDetail'))
const SellerHome = lazy(()=>import( "../pages/Seller/SellerHome"))
const StoreSettings = lazy(()=>import( "../pages/Seller/StoreSetting"))
const AddProduct = lazy(()=>import( "../pages/Seller/AddProduct"))
const StorePreview = lazy(()=>import( "../pages/Seller/StorePreview"))
const Checkout = lazy(()=>import( "../pages/Home/Checkout"))
const CategoryProducts =lazy(()=>import( "../pages/Home/CategoryProducts"));
const ManageProduct =lazy(()=>import( "../components/Store/ManageProduct"));
const ProductSearch = lazy(()=> import( "../pages/Home/ProductSearch"));
// Lazy Layouts

const HomeLayout = lazy(()=> import( '../layouts/HomeLayout'))
const AdminLayout = lazy(()=> import( '../layouts/AdminLayout'))
const SellerLayout = lazy(()=> import( "../layouts/SellerLayout"));

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },{
    path: "/forgot-password",
    element: (      
      <Suspense fallback={<Loader/>}>
      <ForgotPassword />
    </Suspense>
    )
  },
  {
    path: "/confirm-password/:token",
    element: (<Suspense fallback={<Loader/>}><ConfirmPassword /></Suspense>),
  },
  {
    path: "/activation/:token",
    element: (<Suspense fallback={<Loader/>}><Activation /></Suspense>),
  },
  {
    path: "/request-activation",
    element: (<Suspense fallback={<Loader/>}><RequestActivation /></Suspense>),
  },
  {
    element: <PrivateRoute role="user"/>,
    children: [
      {
        path: "/",
        element: (
        <Suspense fallback={<Loader/>}>

          <HomeLayout />
        </Suspense>

        ),
        // errorElement: <ErrorPage />,
        children: [
          {
            path: "/",
            element: (
              <Suspense fallback={<Loader/>}>
            <Home/></Suspense> ),
          },
          
          {
            path: "checkout/:productname/:id",
            element: ( 
              <Suspense fallback={<Loader/>}>
            <Checkout/></Suspense> ),
          },
          {
            path: "search",
            element: (
              <Suspense fallback={<Loader/>}>
            <ProductSearch/></Suspense> ),
          },
          {
            path:"/user",
            element:<ManageProfileLayout/>,
            children:[
              {
                path: "/user",
                element: <ManageProfile/>,
              },
              {
                path: "my",
                element: <MyProfile/>,
              },
              {
                path: "addresses",
                element: <ManageAddresses/>,
              },
              {
                path: "addresses/add",
                element: <AddressForm/>,
              },
              {
                path: "addresses/edit",
                element: <AddressForm/>,
              },
              {
                path: "orders",
                element: <ManageProfileLayout/>,
              },
              {
                path: "products",
                element: <ManageProfileLayout/>,
              },
            ]
          },
          {
            path: "/product-detail/:productname/:id",
            element: (<Suspense fallback={<Loader/>}><ProductDetail /></Suspense>) ,
          },
          {
            path: "/category",
            element: (<Suspense fallback={<Loader/>}>

              <CategoryProducts />
            </Suspense> 
          ) ,
          },
        ],
      },
    ],
  },
  {
    // path:"/admin",
    element: <PrivateRoute role="admin"/>,
    children: [
      {
        path: "admin",
        element: (
        <Suspense fallback={<Loader/>}>

          <AdminLayout />
        </Suspense>

        ),
        // errorElement: <ErrorPage />,
        children: [
          {
            path: "/admin",
            element: (<Suspense fallback={<Loader/>}>

              <Admin />
            </Suspense>
          ),
          },{
            path: "category",
            element: (<Suspense fallback={<Loader/>}>

              <Category />
            </Suspense>
          ),
          },
        ],
      },
    ],
  },
  {
    // path:"/seller",
    element: <PrivateRoute role="seller"/>,
    children: [
      {
        path: "/seller",
        element: (
        <Suspense fallback={<Loader/>}>

          <SellerLayout />
        </Suspense>

        ),
        // errorElement: <ErrorPage />,
        children: [
          {
            path: "/seller",
            element: (
              <Suspense fallback={<Loader/>}>

                <SellerHome />
              </Suspense>
          ),
          },
          {
            path: "product-add",
            element: (
              <Suspense fallback={<Loader/>}>

                <AddProduct />
              </Suspense>
          ),
          },
          {
            path: "store-settings",
            element: (
              <Suspense fallback={<Loader/>}>

                <StoreSettings />
              </Suspense>
          ),
          },
          {
            path: "store-preview",
            element: (
              <Suspense fallback={<Loader/>}>

                <StorePreview />
              </Suspense>
          ),
          },
          {
            path: "products",
            element: (
              <Suspense fallback={<Loader/>}>

                <ManageProduct />
              </Suspense>
          ),
          },
        ],
      },
    ],
  },
]);

export default router;
