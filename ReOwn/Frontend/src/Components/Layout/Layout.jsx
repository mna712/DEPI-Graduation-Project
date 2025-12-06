import React from 'react'
import Navbar from './../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <Navbar />


      <div className='w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8'>
        <Outlet />
      </div>

      <Footer />
    </>
  )
}
