import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);


  const toggleDarkMode = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        {/* Logo title*/}
        <Link
          to="/"
          className="text-2xl font-bold text-purple-500 dark:text-blue-400"
        >
          YegnaBlog
        </Link>

       

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 items-center">
          <Link
            to="/"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-500"
          >
            Home
          </Link>
          <Link
            to="/login"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-500"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-500"
          >
            Register
          </Link>
          <button
            onClick={toggleDarkMode}
            className="text-xl text-gray-700 dark:text-gray-200 hover:text-yellow-400"
          >
            {dark ? <FiSun /> : <FiMoon />}
          </button>
        </nav>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-2xl text-gray-700 dark:text-gray-200"
          >
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white dark:bg-gray-900">
          <Link
            to="/"
            onClick={toggleMobileMenu}
            className="block text-gray-700 dark:text-gray-200"
          >
            Home
          </Link>
          <Link
            to="/login"
            onClick={toggleMobileMenu}
            className="block text-gray-700 dark:text-gray-200"
          >
            Login
          </Link>
          <Link
            to="/register"
            onClick={toggleMobileMenu}
            className="block text-gray-700 dark:text-gray-200"
          >
            Register
          </Link>
          <button
            onClick={toggleDarkMode}
            className="text-lg text-gray-700 dark:text-gray-200 flex items-center gap-2"
          >
            {dark ? <FiSun /> : <FiMoon />} 
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
