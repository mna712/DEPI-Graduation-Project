import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { IoMdSearch } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdClose } from "react-icons/md";

const Menu = [
  { id: 1, name: "Home", link: "/#" },
  { id: 2, name: "About", link: "/#" },
  { id: 3, name: "Profile", link: "/#" },
  { id: 4, name: "Dashbord", link: "/#" },
];

const DropdownLinks = [
  { id: 1, name: "Home & Kitchen tools", link: "/#" },
  { id: 2, name: "Clothes & Accessories", link: "/#" },
  { id: 3, name: "Electronics & Gadgets", link: "/#" },
  { id: 4, name: "Books & Games", link: "/#" },
  { id: 5, name: "Home Decors & Gifts", link: "/#" },
  { id: 6, name: "Baby & Kids items", link: "/#" },
  { id: 7, name: "Sports & Hobbies", link: "/#" },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleOrderPopup = () => {
    console.log("Order popup");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setMobileCategoriesOpen(false);
  };

  const toggleMobileCategories = () => {
    setMobileCategoriesOpen(!mobileCategoriesOpen);
  };

  return (
    <div className="relative z-40 text-black bg-white shadow-md">
      {/* Upper Navbar */}
      <div className="py-2 bg-primary/50">
        <div className="container flex items-center justify-between w-full px-3 mx-auto sm:px-6 lg:px-8">
          {/* Logo & Site Name */}
          <a
            href="#"
            className="flex items-center gap-2 text-xl font-bold sm:gap-3 sm:text-2xl lg:text-3xl"
          >
            <img
              src="./public/images/Logo_Img.png"
              className="w-8 sm:w-10 lg:w-12"
              alt="Logo"
            />
            <span className="whitespace-nowrap">ReOwn</span>
          </a>

          {/* Search bar - Desktop only  */}
          <div className="flex items-center justify-between gap-4">
            <div className="relative hidden group lg:block">
              <input
                type="text"
                placeholder="search"
                className="w-[300px] group-hover:w-[500px] transition-all duration-300 rounded-full border border-highlight px-2 py-1 focus:outline-none focus:border-1 focus:border-secondary  bg-secondary/20"
              />
              <IoMdSearch className="absolute text-gray-500 -translate-y-1/2 group-hover:text-secondary top-1/2 right-3" />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* order button */}
            <button
              onClick={() => handleOrderPopup()}
              className="flex items-center gap-3 px-4 py-1 text-white transition-all rounded-full duration-2000 bg-gradient-to-r from-highlight to-secondary group"
            >
              <span className="hidden transition-all duration-200 group-hover:block">
                Order
              </span>
              <FaCartShopping className="text-xl text-white cursor-pointer drop-shadow-sm" />
            </button>
            {/* Login / SignUp - Hidden on small screens */}
            <div className="items-center hidden gap-2 md:flex">
              <a
                href="/login"
                className="px-3 py-1 text-sm font-medium text-green-800 transition border border-green-800 rounded-full whitespace-nowrap hover:bg-green-800 hover:text-white"
              >
                Log In
              </a>
              <a
                href="/signup"
                className="px-3 py-1 text-sm font-medium text-white transition bg-green-800 rounded-full whitespace-nowrap hover:bg-green-700"
              >
                Sign Up
              </a>
            </div>
            {/* Hamburger Menu - Mobile only */}
            <button
              onClick={toggleMobileMenu}
              className="text-2xl lg:hidden focus:outline-none"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {mobileMenuOpen ? (
                <MdClose
                  style={{
                    display: "inline-block",
                    transition: "transform 0.5s ease-in-out",
                    transform: isHovered ? "rotate(360deg)" : "rotate(0deg)",
                  }}
                />
              ) : (
                <HiMenuAlt3 />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Lower Navbar - Desktop */}
      <div className="hidden bg-white shadow-sm lg:block">
        <div className="container px-4 mx-auto sm:px-8">
          <ul className="flex items-center justify-center gap-4 py-2 xl:gap-6">
            {Menu.map((item) => (
              <li key={item.id}>
                <a
                  href={item.link}
                  className="px-3 py-2 text-base transition xl:text-lg hover:text-secondary whitespace-nowrap"
                >
                  {item.name}
                </a>
              </li>
            ))}

            {/* Dropdown */}
            <li className="relative cursor-pointer group">
              <a
                href="#"
                className="flex items-center gap-1 px-3 py-2 text-base transition xl:text-lg hover:text-secondary whitespace-nowrap"
              >
                Categories
                <FaCaretDown className="transition-all group-hover:rotate-180" />
              </a>
              <div className="absolute z-50 hidden p-2 text-black rounded-md shadow-lg text-2lg group-hover:block bg-textPrimary w-60">
                <ul>
                  {DropdownLinks.map((link) => (
                    <li key={link.id}>
                      <a
                        href={link.link}
                        className="block p-2 text-sm transition rounded-md hover:bg-secondary"
                      >
                        {link.name}
                      </a>
                      {link.id !== DropdownLinks.length && (
                        <hr className="my-1 bg-gray-500" />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden bg-white shadow-lg transition-all duration-300 ease-in-out ${
          mobileMenuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="container px-4 py-3 mx-auto">
          {/* Search bar - Mobile */}
          <div className="relative mb-4 group">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 transition-all duration-300 border rounded-full border-highlight focus:outline-none focus:border-secondary bg-secondary/20"
            />
            <IoMdSearch className="absolute text-xl text-gray-500 -translate-y-1/2 group-hover:text-secondary top-1/2 right-3" />
          </div>

          {/* Menu Items */}
          <ul className="space-y-2">
            {Menu.map((item) => (
              <li key={item.id}>
                <a
                  href={item.link}
                  className="block px-4 py-2 transition rounded-md hover:bg-secondary/10 hover:text-secondary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              </li>
            ))}

            {/* Categories Dropdown - Mobile */}
            <li>
              <button
                onClick={toggleMobileCategories}
                className="flex items-center justify-between w-full px-4 py-2 transition rounded-md hover:bg-secondary/10 hover:text-secondary"
              >
                <span>Categories</span>
                <FaCaretDown
                  className={`transition-all duration-300 ${
                    mobileCategoriesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Categories List */}
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  mobileCategoriesOpen
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <ul className="mt-2 ml-4 space-y-1">
                  {DropdownLinks.map((link) => (
                    <li key={link.id}>
                      <a
                        href={link.link}
                        className="block px-4 py-2 text-sm transition rounded-md hover:bg-secondary/20 hover:text-secondary"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>

          {/* Login / SignUp - Mobile */}
          <div className="flex gap-3 pt-4 mt-4 border-t border-gray-200 md:hidden">
            <a
              href="/login"
              className="flex-1 px-4 py-2 text-sm font-medium text-center text-green-800 transition border border-green-800 rounded-full hover:bg-green-800 hover:text-white"
            >
              Log In
            </a>
            <a
              href="/signup"
              className="flex-1 px-4 py-2 text-sm font-medium text-center text-white transition bg-green-800 rounded-full hover:bg-green-700"
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
