import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
import Overview from "./Components/Dashboard/Overview";
import Products from "./Components/Dashboard/Products";
import UserManagement from "./Components/Dashboard/UserMangement";



import Reports from "./Components/Dashboard/Reports";
import CategoriesPage from "./Components/Dashboard/CategoriesPage";

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
      { path: "*", element: <Notfound /> },
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
        <RouterProvider router={router} />
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;