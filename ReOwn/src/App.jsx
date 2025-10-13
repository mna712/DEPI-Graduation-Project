import { useState } from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home';
import Cart from './Components/Cart/Cart';
import Categories from './Components/Categories/Categories';
import Login from './Components/Login/Login';
import Profile from './Components/Profile/Profile';
import Product from './Components/Product/Product';
import Footer from './Components/Footer/Footer';
import Notfound from './Components/Notfound/Notfound';

let router = createBrowserRouter([
  {path:"" , element:<Layout /> , children:[
    {index:"true" , element:<Home />},
    {path:"cart" , element:<Cart />},
    {path:"categories", element:<Categories />},
    {path:"login" , element:<Login />},
    {path:"prfile" , element:<Profile />},
    {path:"product" , element:<Product />},
    {path:"*" , element:<Notfound />}

  ]

  },
])

function App() {
  const [count, setCount] = useState(0)

  return <RouterProvider router={router}></RouterProvider>
    
  
}

export default App
