import React from 'react'
import style from './Navbar.module.css'
import { Link } from 'react-router-dom'


export default function Navbar() {
  return (
    <>
    

<nav className="bg-slate-400 fixed top-0 left-0 right-0 border-gray-200 ">
    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
      <div className='flex items-center gap-5'>
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
             <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
        </Link>
        <ul className='flex gap-4'>
                <li><Link className='text-black-600' to="/" >Home</Link></li>
                <li><Link className='text-black-600' to="/cart" >Cart</Link></li>
                <li><Link className='text-black-600' to="/product" >Product</Link></li>
                <li><Link className='text-black-600' to="/categories" >Categories</Link></li>
                <li><Link className='text-black-600' to="/prfile">Profile</Link></li>
              </ul>
      </div>
        
            
           
        





        <div className="flex items-center space-x-6 rtl:space-x-reverse">
             <ul className='flex gap-4'>
              <li><i className='fab fa-facebook'></i></li>
              <li><i className='fab fa-instagram'></i></li>
              <li><i className='fab fa-youtube'></i></li>
              <li><i className='fab fa-linkedin'></i></li>
              <li><i className='fab fa-twitter'></i></li>
            </ul>
             <ul className='flex gap-4'>
              <li><Link to="/login">Login</Link></li>
              
             </ul>
        </div>
    </div>
</nav>


    </>
  )
}
