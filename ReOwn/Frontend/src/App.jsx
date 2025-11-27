import { useState } from "react";
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
import Footer from "./Components/Footer/Footer";
import Notfound from "./Components/Notfound/Notfound";
import ProductDetails from "./Components/Product_Details/ProductDetails";
import { FavoritesProvider } from "./Components/Context/FavoritesContext";
import { AuthProvider } from "./Context/AuthContext";

let router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "cart", element: <Cart /> },
      { path: "categories", element: <Categories /> },
      { path: "product/:id", element: <ProductDetails /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      { path: "profile", element: <Profile /> },
      { path: "product", element: <Product /> },
      { path: "*", element: <Notfound /> },
    ],
  },
]);

function App() {
  const [count, setCount] = useState(0);

  return (
    <AuthProvider>
      <FavoritesProvider>
        <RouterProvider router={router}></RouterProvider>
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;
