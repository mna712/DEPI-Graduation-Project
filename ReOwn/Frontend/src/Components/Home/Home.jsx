
import React from "react";
import Categories from "../Categories/Categories";
import ProductRecentlyAdded from "../ProductRecentlyAdded/ProductRecentlyAdded";

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <Categories />
      <ProductRecentlyAdded />
    </main>
  );
}
