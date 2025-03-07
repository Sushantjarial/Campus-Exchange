// src/components/NavBar.js
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import logo from './../images/logo2.png'; // Adjust the path if needed

export default function NavBar({ about ,sign }: { about?: boolean,
  sign?:string
 }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);



  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-3 shadow-lg border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <img src={logo} className="w-8 h-8 sm:w-10 sm:h-10 mx-2" alt="Logo" />
          <div  onClick={() => navigate("/")} className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200 hover:text-blue-700 dark:hover:text-blue-600 hover:scale-105 transition-all duration-200 hover:cursor-pointer ">
            Campus Exchange
          </div>
        </div>

        <div className="md:hidden">
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="focus:outline-none text-gray-800 dark:text-gray-200 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <svg 
              className={`w-6 h-6 transform transition-transform duration-200 ${menuOpen ? 'rotate-90' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        <div className="hidden md:flex space-x-4">
          <button 
            onClick={() => navigate("/home")} 
            className="text-base md:text-lg rounded-xl font-poppins text-gray-800 dark:text-gray-200 px-4 py-2 hover:bg-blue-700 dark:hover:bg-blue-600 transform hover:scale-105 transition-all duration-200"
          >
            Home
          </button>
          <button 
            onClick={() => navigate("/about")} 
            className={` text-base md:text-lg rounded-xl font-poppins text-gray-800 dark:text-gray-200 px-4 py-2 hover:bg-blue-700 dark:hover:bg-blue-600 transform hover:scale-105 transition-all duration-200 ${about ? "hidden" : ''}`}
          >
            About Us
          </button>
          <button 
            onClick={() => navigate(`/${sign}`)} 
            className="text-base md:text-lg font-poppins rounded-xl text-gray-800 dark:text-gray-200 px-4 py-2 hover:bg-blue-700 dark:hover:bg-blue-600 transform hover:scale-105 transition-all duration-200"
          >
            {sign}
          </button>
        </div>
      </div>

      <div 
        ref={menuRef}
        className={`md:hidden fixed top-16 right-4 z-40 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 transform transition-all duration-300 ease-in-out ${
          menuOpen 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <button 
          onClick={() => {
            navigate("/home");
            setMenuOpen(false);
          }} 
          className="block w-full text-left px-6 py-3 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 rounded-t-xl"
        >
          Home
        </button>
        <button 
          onClick={() => navigate("/about") } 
          className={`block w-full text-left px-6 py-3 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${about ? "hidden" : ''}`}
        >
          About Us
        </button>
        <button 
          onClick={() => {
            navigate(`/${sign}`);
            setMenuOpen(false);
          }} 
          className="block w-full text-left px-6 py-3 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 rounded-b-xl"
        >
       {sign}
        </button>
      </div>
    </>
  );
}
