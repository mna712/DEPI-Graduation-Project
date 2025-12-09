import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";

import Navbar from "./Components/Navbar/Navbar";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";
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
<<<<<<< HEAD
import Overview from "./Components/Dashboard/Overview";
import Products from "./Components/Dashboard/Products";
import UserManagement from "./Components/Dashboard/UserMangement";



import Reports from "./Components/Dashboard/Reports";
import CategoriesPage from "./Components/Dashboard/CategoriesPage";
=======
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
>>>>>>> 8310b9d6 (updating)

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "cart", element: <Cart /> },
      { path: "categories", element: <Categories /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      { path: "profile", element: <Profile /> },
      { path: "product", element: <Product /> },
      { path: "product/:id", element: <ProductDetails /> },
      { path: "favourites", element: <FavouritePage /> },
<<<<<<< HEAD
      { path: "*", element: <Notfound /> },
=======
      { path: "chat/:productId", element: <ChatSystem /> },
      { path: "dashboard", element: <Overview /> },
      { path: "dashboard/products", element: <ProductsPage /> },
      { path: "dashboard/categories", element: <CategoriesPage /> },
      { path: "dashboard/users", element: <UserManagement /> },
      { path: "dashboard/reports", element: <Reports /> },
      { path: "*", element: <Notfound /> }
>>>>>>> 8310b9d6 (updating)
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      { index: true, element: <Overview /> },
      { path: "products", element: <Products /> },
      { path: "users", element: <Users /> },
      { path: "reports", element: <Reports /> },
      { path: "categories", element: <CategoriesPage /> },
    ],
  },
  { path: "*", element: <Notfound /> },
]);

function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
<<<<<<< HEAD
        <RouterProvider router={router} />
=======
        <ProductsProvider>
          <RouterProvider router={router} />
          <Toaster position="top-right" />
        </ProductsProvider>
>>>>>>> 8310b9d6 (updating)
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;