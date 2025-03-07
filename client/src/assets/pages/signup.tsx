import { useState } from "react";
import { InputBox } from "../components/inputBox.jsx";
import { signupInput } from "@sushantjarial/blog-common";
import { useNavigate } from "react-router-dom";
import { SignButton } from "../components/signButton.jsx";
import { BACKEND_URL } from "../../../config.ts";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import NavBar from "../components/nav-bar.tsx";

export function Signup() {
  const navigate = useNavigate();
  const [signInput, setSignupInput] = useState<signupInput>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

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

  const sendRequest = async () => {
    try {
      if (!signInput.firstName || !signInput.lastName || !signInput.email || !signInput.password) {
        toast.error('All fields are required');
      } else {
        const res = await axios.post(`${BACKEND_URL}/user/signup`, signInput);
        toast.success("Successfully signed up");
        const { token } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("username", signInput.firstName);
        navigate("/home");
      }
    } catch (e: any) {
      e.response.data.error.map((errorr: any) => {
        toast.error(errorr.message);
      });
    }
  };

  return (


    <div>
        <NavBar sign="Signin" />
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden relative">
    
    
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      </div>

      {/* Main Content */}
      <div className="relative container mx-auto px-4 py-12 flex flex-col lg:flex-row items-center justify-center gap-12 mt-20">
        {/* Left Side - Information */}
        <div className="w-full lg:w-1/2 text-white space-y-8 animate-on-scroll opacity-0 transition-all duration-1000 transform translate-x-[-20px]">
          <div className="relative">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Join Campus Exchange
            </h1>
            <div className="absolute -bottom-2 left-0 md:w-24 w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>
          
          <p className="text-xl text-gray-300 leading-relaxed">
            Your trusted marketplace for buying, selling, and trading within your college community. Connect with fellow students and make the most of your campus experience.
          </p>
          
          {/* Features List */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 group">
              <div className="w-2 h-2 bg-blue-500 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
              <span className="group-hover:text-blue-400 transition-colors duration-300">100% Free to Use</span>
            </div>
            <div className="flex items-center space-x-3 group">
              <div className="w-2 h-2 bg-blue-500 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
              <span className="group-hover:text-blue-400 transition-colors duration-300">Verified Student Community</span>
            </div>
            <div className="flex items-center space-x-3 group">
              <div className="w-2 h-2 bg-blue-500 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
              <span className="group-hover:text-blue-400 transition-colors duration-300">Secure Transactions</span>
            </div>
            <div className="flex items-center space-x-3 group">
              <div className="w-2 h-2 bg-blue-500 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
              <span className="group-hover:text-blue-400 transition-colors duration-300">24/7 Support</span>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/10 transition-colors duration-300 group">
              <div className="text-2xl font-bold text-blue-400 group-hover:scale-110 transition-transform duration-300">1000+</div>
              <div className="text-sm text-gray-400">Active Users</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/10 transition-colors duration-300 group">
              <div className="text-2xl font-bold text-blue-400 group-hover:scale-110 transition-transform duration-300">500+</div>
              <div className="text-sm text-gray-400">Daily Listings</div>
            </div>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="w-full lg:w-1/2 max-w-md animate-on-scroll opacity-0 transition-all duration-1000 transform translate-x-[20px]">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20 hover:border-white/30 transition-colors duration-300">
            <h2 className="text-2xl font-bold text-white mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Create Your Account
            </h2>
            
            <div className="space-y-4">
              <InputBox
                onChange={(e) => setSignupInput({ ...signInput, firstName: e.target.value })}
                label="First Name"
                placeholder="Enter your first name"
              />
              <InputBox
                onChange={(e) => setSignupInput({ ...signInput, lastName: e.target.value })}
                label="Last Name"
                placeholder="Enter your last name"
              />
              <InputBox
                onChange={(e) => setSignupInput({ ...signInput, email: e.target.value })}
                label="Email"
                placeholder="example@domain.com"
              />
              <InputBox
                type="password"
                onChange={(e) => setSignupInput({ ...signInput, password: e.target.value })}
                label="Password"
                placeholder="At least 8 characters"
              />
            </div >

            <SignButton
              text="Create Account"
              onClick={sendRequest}
            />

           
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style>{`
        .animate-on-scroll {
          transition: opacity 1s ease, transform 1s ease;
        }
        
        .animate-active {
          opacity: 1 !important;
          transform: translateX(0) !important;
        }

        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
    </div>
  );
}
