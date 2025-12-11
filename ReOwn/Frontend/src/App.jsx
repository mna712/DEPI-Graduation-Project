import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";

import Navbar from "./Components/Navbar/Navbar";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Categories from "./Components/Categories/Categories";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
import Profile from "./Components/Profile/Profile";
import Product from "./Components/Product/Product";
import ProductDetails from "./Components/Product_Details/ProductDetails";
import Footer from "./Components/Footer/Footer";
import Notfound from "./Components/Notfound/Notfound";
import FavouritePage from "./Components/Favourite/Favourite";

import { AuthProvider } from "./Context/AuthContext";
import { FavoritesProvider } from "./Components/Context/FavoritesContext";
import { ProductsProvider } from "./Context/ProductsContext";
import ChatSystem from "./Components/ChatSystem/ChatSystem";
import EditProfile from "./Components/Profile/EditProfile/EditProfile";
import SellAd from "./Components/SellAds/SellAds";
import Products from "./Components/Products";
import All_Category from "./Components/All_Category";
import SearchResults from "./Components/SearchResults/SearchResults";
import Overview from "./Components/Dashboard/Overview";
import ProductsPage from "./Components/Dashboard/Products";
import CategoriesPage from "./Components/Dashboard/CategoriesPage";
import UserManagement from "./Components/Dashboard/UserManagement";
import Reports from "./Components/Dashboard/Report";
import DashboardLayout from "./Components/Dashboard/Dashboardlayout";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "categories", element: <Categories /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      { path: "/forgetpassword", element: <ForgetPassword /> },
      { path: "profile", element: <Profile /> },
      { path: "product", element: <Product /> },
      { path: "product/:id", element: <ProductDetails /> },
      { path: "favourites", element: <FavouritePage /> },
      { path: "chat/:productId", element: <ChatSystem /> },
      { path: "dashboard", element: <Overview /> },
      { path: "dashboard/products", element: <ProductsPage /> },
      { path: "dashboard/categories", element: <CategoriesPage /> },
      { path: "dashboard/users", element: <UserManagement /> },
      { path: "dashboard/reports", element: <Reports /> },
      {path:"dashboard/layout",element :<DashboardLayout/>},
      { path: "*", element: <Notfound /> }
    ],
  },
  // {
  //   path: "dashboard",
  //   element: < />,
  //   children: [
  //     { index: true, element: <Overview /> },
  //     { path: "products", element: <Products /> },
  //     { path: "users", element: <Users /> },
  //     { path: "reports", element: <Reports /> },
  //     { path: "categories", element: <CategoriesPage /> },
  //   ],
  // },
  { path: "*", element: <Notfound /> },
]);

function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <ProductsProvider>
          <RouterProvider router={router} />
          <Toaster position="top-right" />
        </ProductsProvider>
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;