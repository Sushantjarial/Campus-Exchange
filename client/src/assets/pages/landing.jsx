// src/pages/Landing.js
import { useNavigate } from 'react-router-dom';
import NavBar from './../components/nav-bar';
import About from './about';
import Footer from './../components/footer';
export default function Landing() {
  const navigate = useNavigate();

  return (
    <>
      <NavBar />
      
      <div className="relative flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 opacity-85 animate-gradient-move"></div>

        <div className="z-10 flex flex-col items-center text-center space-y-3 sm:space-y-5 text-2xl sm:text-2xl md:text-5xl font-extrabold ">
          {["Your Campus,", "Your Community,", "Your Marketplace."].map((text, index) => (
            <div key={index} className={`transition duration-700 ease-out transform hover:scale-105 animate-fade-in delay-${index * 200}`}>
              {text}
            </div>
          ))}
        </div>

        <div className="z-10 mt-4 mb-32 sm:mt-8">
          <button
            type="button"
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-4 sm:px-6 text-sm sm:text-lg lg:text-xl rounded-full shadow-md transition-transform ease-in-out duration-300 transform hover:-translate-y-1 hover:scale-105"
            onClick={() => navigate("/signup")}
          >
            Get Started
          </button>
        </div>
      </div>

      <About />
      <hr></hr>
      <Footer />
      <style>
        {`
          .animate-gradient-move { animation: gradientMove 10s ease infinite; }
          @keyframes gradientMove { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; }}
          .animate-fade-in { opacity: 0; animation: fadeIn 1.2s forwards; }
          @keyframes fadeIn { to { opacity: 1; }}
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
          .font-poppins { font-family: 'Poppins', sans-serif; }
        `}
      </style>
    </>
  );
}
