import { createBrowserRouter } from "react-router-dom";
import LoginPage from '../pages/auth/Loginpage'
import SignupPage from '../pages/auth/SignupPage'
import ForgotPassword from '../pages/auth/ForgotPassword'
import ConfirmPassword from '../pages/auth/ConfirmPassword'
import Activation from '../pages/auth/Activation'
import RequestActivation from '../pages/auth/RequestActivation'
import Home from '../pages/Home/Home'
import Category from '../pages/Admin/Category'
import ProductDetail from '../components/Helper/ProductDetail'
import HomeLayout from '../layouts/HomeLayout'
import AdminLayout from '../layouts/AdminLayout'
import PrivateRoute from "./privateRoute";
import Admin from "../pages/Admin/Admin";
import SellerLayout from "../layouts/SellerLayout";
import ManageProfileLayout from "../layouts/ManageProfileLayout";
import MyProfile from "../components/ManageProfile/MyProfile";
import ManageProfile from "../components/ManageProfile/ManageProfile";
import ManageAddresses from "../components/ManageProfile/ManageAddresses";
import AddressForm from "../components/Helper/AddressForm";
import SellerHome from "../pages/Seller/SellerHome";
import StoreSettings from "../pages/Seller/StoreSetting";
import AddProduct from "../pages/Seller/AddProduct";
import StorePreview from "../pages/Seller/StorePreview";
import Checkout from "../pages/Home/Checkout";
import ProductSearch from "../pages/Home/ProductSearch";
import CategoryProducts from "../pages/Home/CategoryProducts";
import ManageProduct from "../components/Store/ManageProduct";


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
    element: <ForgotPassword />,
  },
  {
    path: "/confirm-password/:token",
    element: <ConfirmPassword />,
  },
  {
    path: "/activation/:token",
    element: <Activation />,
  },
  {
    path: "/request-activation",
    element: <RequestActivation />,
  },
  {
    element: <PrivateRoute role="user"/>,
    children: [
      {
        path: "/",
        element: <HomeLayout />,
        // errorElement: <ErrorPage />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          
          {
            path: "checkout/:productname/:id",
            element: <Checkout/>,
          },
          {
            path: "search",
            element: <ProductSearch/>,
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
            element: <ProductDetail />,
          },
          {
            path: "/category",
            element: <CategoryProducts />,
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
        element: <AdminLayout />,
        // errorElement: <ErrorPage />,
        children: [
          {
            path: "/admin",
            element: <Admin />,
          },{
            path: "category",
            element: <Category />,
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
        element: <SellerLayout />,
        // errorElement: <ErrorPage />,
        children: [
          {
            path: "/seller",
            element: <SellerHome />,
          },
          {
            path: "product-add",
            element: <AddProduct />,
          },
          {
            path: "store-settings",
            element: <StoreSettings />,
          },
          {
            path: "store-preview",
            element: <StorePreview />,
          },
          {
            path: "products",
            element: <ManageProduct />,
          },
        ],
      },
    ],
  },
]);

export default router;
