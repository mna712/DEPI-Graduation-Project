
import React from "react";
import Categories from "../Categories/Categories";
import ProductRecentlyAdded from "../ProductRecentlyAdded/ProductRecentlyAdded";

export default function Home() {
  return (
    <main className="container p-4 mx-auto">
      <Categories />
      <ProductRecentlyAdded />
    </main>
  );
}
