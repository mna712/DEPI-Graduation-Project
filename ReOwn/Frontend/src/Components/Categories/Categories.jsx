import React, { useState, useRef } from 'react';
import Banner from '../Banner';
import Search_Arrow from '../Search_Arrow';
import All_Category from '../All_Category';

const Categories = () => {


  return (
    <div className="min-h-screen bg-gray-50">
      <Search_Arrow/>
      <Banner/>
      <All_Category/>
     
    </div>
  );
};

export default Categories;
