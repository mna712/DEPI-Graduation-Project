// import React, { useState } from 'react'

import { NavLink } from "react-router-dom"

function DeleteAccount({ display ,setDisplay}) {
    

  return (
<>
  {/* Overlay */}
  <div 
    className="fixed inset-0 bg-black/30" 
    style={{display: display}} 
  />

  {/* Modal Center Wrapper */}
  <div 
    style={ { display: display ,marginTop:"150px"}} 
    className="  fixed inset-0 flex items-center justify-center z-10 px-4"
  >
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden max-w-md w-full">

      {/* Header */}
      <div className="flex items-start justify-between px-6 py-4 border-b border-gray-100">
        <div className="mt-5">
        <h3 className="text-lg font-semibold text-gray-800 mt-5 ms-4">Are you sure you want to delete your account ? </h3>
        <div>
        <NavLink to="edit">
        <button className="bg-teal-600 text-white px-10 py-3 rounded-full ms-10 mt-5 ">
        Cancel
        </button>
        </NavLink>
        <button className="bg-red-600 text-white px-10 py-3 rounded-full ms-5 ">
        Delete account
        </button>
        </div>

        </div>
        

        <button 
          onClick={()=>{setDisplay("none")}} 
          type="button" 
          aria-label="Close" 
          className="text-gray-400 hover:text-gray-600 "
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" 
          viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" 
            strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

    </div>
  </div>

</>
  )
}

export default DeleteAccount
