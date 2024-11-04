// src/components/NavBar.js
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logo from './../images/logo2.png'; // Adjust the path if needed

export default function NavBar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScrollToAbout = () => {
    const aboutSection = document.getElementById("about-section");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="flex justify-between items-center bg-gray-300 dark:bg-gray-800 p-3 shadow-lg border-b border-gray-400 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <img src={logo} className="w-8 h-8 sm:w-10 sm:h-10 mx-2" alt="Logo" />
          <div className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Campus Exchange
          </div>
        </div>

        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none text-gray-800 dark:text-gray-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        <div className="hidden md:flex space-x-4">
          <button onClick={() => navigate("/home")} className="text-base md:text-lg  rounded-xl font-poppins text-gray-800 dark:text-gray-200 px-3 py-1 hover:bg-blue-700 dark:hover:bg-blue-600 transform hover:scale-105">
            Home
          </button>
          <button onClick={handleScrollToAbout} className="text-base md:text-lg rounded-xl font-poppins text-gray-800 dark:text-gray-200 px-3 py-1 hover:bg-blue-700 dark:hover:bg-blue-600 transform hover:scale-105">
            About Us
          </button>
          <button onClick={() => navigate("/signin")} className="text-base md:text-lg font-poppins rounded-xl text-gray-800 dark:text-gray-200 px-3 py-1 hover:bg-blue-700 dark:hover:bg-blue-600 transform hover:scale-105">
            Sign In
          </button>
        </div>
      </div>

      <div className={`md:hidden ${menuOpen ? "block" : "hidden"} bg-gray-300 dark:bg-gray-800`}>
        <button onClick={() => navigate("/signin")} className="block w-full text-left px-4 py-3 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-700">
          Home
        </button>
        <button onClick={handleScrollToAbout} className="block w-full text-left px-4 py-3 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-700">
          About Us
        </button>
        <button onClick={() => navigate("/signin")} className="block w-full text-left px-4 py-3 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-700">
          Sign In
        </button>
      </div>
    </>
  );
}
