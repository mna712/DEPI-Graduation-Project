import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
import Notfound from "./Components/Notfound/Notfound";
import FavouritePage from "./Components/Favourite/Favourite";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import { AuthProvider } from "./Context/AuthContext";
import { FavoritesProvider } from "./Components/Context/FavoritesContext";
import ChatSystem from "./Components/ChatSystem/ChatSystem";
import EditProfile from "./Components/Profile/EditProfile/EditProfile";
import SellAd from "./Components/SellAds/SellAds";
import Products from "./Components/Products";
import All_Category from "./Components/All_Category";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
     { path: "categories", element: <Categories /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      { path: "forgetPassword", element: <ForgetPassword/> },
      { path: "profile", element: <Profile /> },
      { path: "product", element: <Product /> },
      { path: "product/:id", element: <ProductDetails /> },
      { path: "favourites", element: <FavouritePage /> },
      { path: "/chat/:productId", element: <ChatSystem /> },
      {path:"/profile",element:<Profile/>},
      {path:"/editPofile",element:<EditProfile/>},
      {path:"/sell",element:<SellAd/>},
      {path:"/products",element:<Products/>},
      {path:"All_Category",element:<All_Category/>},
      { path: "*", element: <Notfound /> }

    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <RouterProvider router={router} />
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;
