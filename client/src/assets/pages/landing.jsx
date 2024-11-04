// // import logo from './../assets/logo2.png';
// // import bgLogo from './../assets/bg_logo.jpg';  // Import background image

// // export default function Landing() {
// //     return (
// //       <>  
// //       <div className="flex justify-between bg-gradient-to-r from-black from-10% via-sky-500 via-30% to-blue-800 to-90%   ">
// //          <div className='transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-300'>
// //             <img src={logo} className="w-16 mx-3 my-2 " alt="Logo" />
// //          </div>
// //          <div >
// //          <button className="cursor-pointer text-black text-2xl m-3 mt-4 p-2 bg-transparent hover:bg-gradient-to-r from-pink-500 hover:to-orange-500 hover:rounded-full transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110  duration-300 ">
// //              Home
// //             </button>
// //             <button className="cursor-pointer text-black text-2xl m-3 mt-4 p-2 bg-transparent hover:bg-gradient-to-r from-pink-500 hover:to-orange-500 hover:rounded-full transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110  duration-300 ">
// //              About us
// //             </button>
// //             <button className="cursor-pointer text-black text-2xl m-3 mt-4 p-2 bg-transparent hover:bg-gradient-to-r from-pink-500 hover:to-orange-500 hover:rounded-full transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110  duration-300 ">
// //               Sign in
// //             </button>
// //          </div>
// //           </div>

// //         <div className="bottom  m-0 p-0 bg-cover bg-center h-screen" style={{ backgroundImage: `url(${bgLogo})` }}>
// //           <div className="flex flex-col pt-40 ml-16 text-6xl  font-bold  ">
// //             <div className='transform hover:hover:scale-105 hover:shadow-lg m-2 ease-out'>Your Campus,</div>
// //             <div className='transform hover:hover:scale-105 hover:shadow-lg m-2 ease-out'>Your Community,</div>
// //             <div className='transform hover:hover:scale-105 hover:shadow-lg m-2 ease-out '>Your Marketplace.</div>
// //           </div>

// //           <div className="button mt-4">
// //             <button
// //               type="button"
// //               className="bg-gradient-to-r from-pink-600 to-pink-300 m-3 p-3 px-4 text-white rounded-lg cursor-pointer ml-20 text-xl  transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110  duration-300  "
// //             >
// //               Get Started
// //             </button>
// //           </div>
// //         </div>
// //       </>
// //     );
// // }


// import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';
// import logo from './../logo2.png';
// import bgLogo from './../bg_logo.jpg';  // Import background image

// export default function Landing() {
//   const navigate=useNavigate();
//     const [menuOpen, setMenuOpen] = useState(false); // State to control dropdown menu

//     return (
//       <>  
//         {/* Navbar */}
//         <div className="flex justify-between items-center bg-gradient-to-r from-black from-10% via-sky-200 via-30% to-blue-500 to-90% p-4">
//           {/* Logo */}
//           <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
//             <img src={logo} className="w-16 mx-3 my-2" alt="Logo" />
//           </div>

//           {/* Hamburger menu for small screens */}
//           <div className="md:hidden">
//             <button 
//               onClick={() => setMenuOpen(!menuOpen)}
//               className="text-white focus:outline-none"
//             >
//               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
//               </svg>
//             </button>
//           </div>

//           {/* Navigation Links */}
//           <div className={`hidden md:flex space-x-4`}>
//             <button className="cursor-pointer text-black text-lg md:text-2xl m-3 p-2 bg-transparent hover:bg-gradient-to-r from-pink-500 hover:to-orange-500 hover:rounded-full transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-300">
//               Home
//             </button>
//             <button className="cursor-pointer text-black text-lg md:text-2xl m-3 p-2 bg-transparent hover:bg-gradient-to-r from-pink-500 hover:to-orange-500 hover:rounded-full transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-300">
//               About Us
//             </button>
//             <button className="cursor-pointer text-black text-lg md:text-2xl m-3 p-2 bg-transparent hover:bg-gradient-to-r from-pink-500 hover:to-orange-500 hover:rounded-full transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-300"   onClick={()=>{navigate("/signin")}}>
//               Sign In
//             </button>
//           </div>
//         </div>

//         {/* Dropdown Menu for Small Screens */}
//         <div className={`md:hidden ${menuOpen ? "block" : "hidden"} bg-white`}>
//           <button className="block w-full text-left px-4 py-2 text-black hover:bg-gray-200">
//             Home
//           </button>
//           <button className="block w-full text-left px-4 py-2 text-black hover:bg-gray-200">
//             About Us
//           </button>
//           <button className="block w-full text-left px-4 py-2 text-black hover:bg-gray-200" onClick={()=>{navigate("/signin")}}>
//             Sign In
//           </button>
//         </div>
        
//       {/* Background image and content */}
//       <div className="bottom m-0 p-0 bg-cover bg-center h-screen flex flex-col justify-center items-start" style={{ backgroundImage: `url(${bgLogo})` }}>
//         <div className="flex flex-col text-white px-5 lg:px-16 lg:text-6xl text-3xl font-bold ">
//           <div className="transform hover:scale-105 hover:shadow-lg m-2 mt-40 lg:mt-2 ease-out">Your Campus,</div>
//           <div className="transform hover:scale-105 hover:shadow-lg m-2 ease-out">Your Community,</div>
//           <div className="transform hover:scale-105 hover:shadow-lg m-2 ease-out">Your Marketplace.</div>
//         </div>

//         <div className="button mt-4">
//           <button
//             type="button"
//             className="bg-gradient-to-r from-pink-600 to-pink-300 m-3 p-3 px-4 text-white rounded-lg cursor-pointer ml-20 text-xl lg:text-2xl transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-300" onClick={()=>{
//               navigate("/signup")
//             }}
//           >
//             Get Started
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }


import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logo from './../logo2.png';

export default function Landing() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <div className="flex justify-between items-center bg-gray-300 dark:bg-gray-800 p-3 shadow-lg border-b border-gray-400 dark:border-gray-700">
        {/* Logo and Title */}
        <div className="flex items-center space-x-3">
          <img src={logo} className="w-8 h-8 sm:w-10 sm:h-10 mx-2" alt="Logo" />
          <div className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Campus Exchange
          </div>
        </div>

        {/* Hamburger menu for small screens */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none text-gray-800 dark:text-gray-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-4">
          {["Home", "About Us", "Sign In"].map((text) => (
            <button
              key={text}
              onClick={() => text === "Sign In" ? navigate("/signin") : null}
              className="text-base md:text-lg font-poppins transition-all duration-300 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-700 transform hover:scale-105"
            >
              {text}
            </button>
          ))}
        </div>
      </div>

      {/* Dropdown Menu for Small Screens */}
      <div className={`md:hidden ${menuOpen ? "block" : "hidden"} bg-gray-300 dark:bg-gray-800`}>
        {["Home", "About Us", "Sign In"].map((text) => (
          <button
            key={text}
            onClick={() => text === "Sign In" ? navigate("/signin") : null}
            className="block w-full text-left px-4 py-3 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-700"
          >
            {text}
          </button>
        ))}
      </div>

      {/* Gradient background and animated text */}
      <div className="relative flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4">
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 opacity-85 animate-gradient-move"></div>

        {/* Landing Text */}
        <div className="z-10 flex flex-col items-center text-center space-y-3 sm:space-y-5 text-lg sm:text-2xl md:text-5xl font-extrabold px-3 lg:px-16">
          {["Your Campus,", "Your Community,", "Your Marketplace."].map((text, index) => (
            <div
              key={index}
              className={`transition duration-700 ease-out transform hover:scale-105 animate-fade-in delay-${index * 200}`}
            >
              {text}
            </div>
          ))}
        </div>

        {/* Call-to-Action Button */}
        <div className="z-10 mt-4 sm:mt-8">
          <button
            type="button"
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-4 sm:px-6 text-sm sm:text-lg lg:text-xl rounded-full shadow-md transition-transform ease-in-out duration-300 transform hover:-translate-y-1 hover:scale-105"
            onClick={() => navigate("/signup")}
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Animation Keyframes */}
      <style>
        {`
          /* Gradient animation */
          .animate-gradient-move {
            animation: gradientMove 10s ease infinite;
          }
          @keyframes gradientMove {
            0%, 100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }

          /* Fade-in animation */
          .animate-fade-in {
            opacity: 0;
            animation: fadeIn 1.2s forwards;
          }
          @keyframes fadeIn {
            to {
              opacity: 1;
            }
          }

          /* Poppins font for buttons */
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
          .font-poppins {
            font-family: 'Poppins', sans-serif;
          }
        `}
      </style>
    </>
  );
}
