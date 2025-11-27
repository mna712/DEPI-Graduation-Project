
import React from "react";
import Categories from "./Categories/Categoriesslide"
import MainSlider from "./MainSlider/MainSlider";

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <MainSlider/>
      <Categories />
    </main>
  );
}
