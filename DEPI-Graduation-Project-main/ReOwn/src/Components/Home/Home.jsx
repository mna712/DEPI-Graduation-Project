import React from "react";
import MainSlider from "./MainSlider/MainSlider";
import Categories from "./Categories/Categoriesslide";
import ProductRecentlyAdded from "./ProductRecentlyAdded/ProductRecentlyAdded";
export default function Home() {
  return (
    <div>
      <MainSlider />
      <Categories />
      <ProductRecentlyAdded />
    </div>
  );
}
