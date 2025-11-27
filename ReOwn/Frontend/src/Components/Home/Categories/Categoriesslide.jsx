import React from 'react';

const categories = [
  { name: "Electronics", image: "/images/elctro.jpg", link: "#" },
  { name: "Furniture",   image: "/images/furn.jpg", link: "#" },
  { name: "Books",       image: "/images/bookss.jpg", link: "#" },
  { name: "Clothes",     image: "/images/Clothess.jpg", link: "#" },
];

function Categories() {
  return (
    <section className="w-full py-12 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">

        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#141111B0]">
            Categories
          </h2>

          <a href="#" className="text-blue-500 hover:underline">
            View more
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <div key={category.name} className="cursor-pointer">
              <div className="aspect-square overflow-hidden rounded-xl shadow-md mb-3">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="text-center text-base md:text-lg font-medium text-[#141111B0]">
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;