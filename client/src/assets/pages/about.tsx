// // src/components/About.js
// export default function About() {
//     return (
//       <section id="about-section" className="bg-white dark:bg-gray-800 p-10 text-center py-64">
//         <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4 ">About Us</h2>
//         <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
//           Campus Exchange is your go-to platform for connecting with fellow students to buy, sell, and exchange items. Whether you're looking for textbooks, gadgets, or
//           other essentials, Campus Exchange provides a safe and friendly marketplace designed exclusively for your campus community.
//         </p>
//       </section>
//     );
//   }

import NavBar from "../components/nav-bar";
import Footer from "../components/footer";
import { useEffect } from "react";

export default function About() {
  // Add animation classes on component mount
  useEffect(() => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-active');
        }
      });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => observer.observe(el));
    
    return () => {
      animatedElements.forEach(el => observer.unobserve(el));
    };
  }, []);
  
  return (
    <div className="">
      <NavBar sign="Signup" about={true} />
      <section id="about-section" className="bg-gray-800 p-16 text-center pt-10 b-40 w-full h-screen flex flex-col items-center justify-center">
        <h2 className="text-4xl md:text-5xl font-bold  font-sans animate-on-scroll opacity-0 transition-all duration-1000 transform translate-y-10 
         bg-clip-text bg-gradient-to-r from-blue-500 to-purple-400 via-pink-500 text-transparent"
          
          style={{ animationDelay: "200ms" }}>
          About Us
        </h2>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-serif md:pt-10 pt-40  pb-3 animate-on-scroll  transform translate-y-10"
           style={{ animationDelay: "400ms" }}>
          Welcome to <span className="  font-bold text-blue-600">Campus Exchange</span> - a platform created by students, for students! Campus Exchange is designed to make it easier for students to buy, sell, and trade items like textbooks, gadgets, and daily essentials within their college community.
        </p>
        <p className="mt-6 text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-serif animate-on-scroll opacity-0 transition-all duration-1000 transform translate-y-10"
           style={{ animationDelay: "600ms" }}>
          We prioritize security and a user-friendly experience, allowing you to connect with trusted peers on campus. Whether you're a freshman or a senior, Campus Exchange helps you find what you need while supporting a sustainable, community-driven marketplace.
        </p>
      </section>
      <div className="p-32 bg-gray-800"></div>
      
      {/* Add CSS for animations */}
      <style    >{`
        .animate-on-scroll {
          transition: opacity 1s ease, transform 1s ease;
        }
        
        .animate-active {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
      <Footer />
    </div>
  );
}

