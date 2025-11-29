import React, { useState } from "react";
import Banner from "../Banner";
import Search_Arrow from "../Search_Arrow";
import Products from "../Products";


export default function Product() {
  

  return (
    <div className="container w-full min-h-screen mx-auto overflow-x-hidden bg-gray-50 ">
      <Search_Arrow/>

      <Banner/>

      <Products/>
    </div>
  );
}