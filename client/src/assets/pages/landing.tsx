// src/pages/Landing.js
import { useNavigate } from 'react-router-dom';
import Footer from './../components/footer';
import NavBar from './../components/nav-bar';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <>
      <NavBar sign="Signup" />
      
      {/* Hero Section */}
      <main className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 scroll-smooth">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-4 h-screen flex flex-col justify-center items-center text-center">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            <span className="block mb-2">Your Campus,</span>
            <span className="block mb-2">Your Community,</span>
            <span className="block text-blue-400">Your Marketplace.</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8 animate-pulse ">
            Buy, sell, and trade with verified students on your campus. 
            Fast, safe, and completely free to use.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate("/signup")}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Get Started - Create your account"
            >
              Get Started
            </button>
            <button
              onClick={() => navigate("/home")}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2"
              aria-label="Browse Items - View available listings"
            >
              Browse Items
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-gray-400">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-white">100%</span>
              <span className="text-sm">Free to Use</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-white">24/7</span>
              <span className="text-sm">Support</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-white">100+</span>
              <span className="text-sm">Active Users</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-white">100%</span>
              <span className="text-sm">Verified Students</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg 
            className="w-6 h-6 text-white/50" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            aria-hidden="true"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </main>

      {/* About Us Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Empowering Campus Communities
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Campus Exchange was founded with a simple mission: to create a sustainable, 
                community-driven marketplace for  students in the RJIT campus. We believe in the power of 
                peer-to-peer commerce and the positive impact it can have on campus life.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Our platform connects students across campus, making it easy to buy, sell, 
                and trade items while building lasting connections within your college community.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => navigate("/about")}
                  className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors"
                >
                  Learn More
                </button>
                {/* <button
                  onClick={() => navigate("/contact")}
                  className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-colors"
                >
                  Contact Us
                </button> */}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/students.webp" 
                  alt="Students interacting on campus" 
                  className="object-cover w-full h-full hover:scale-105 transition-all duration-300 hover:cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "List Your Items",
                description: "Upload photos and details of items you want to sell. Our smart listing system makes it easy to create attractive listings in minutes.",
                icon: "📱",
                image: "/students1.webp"
              },
              {
                title: "Connect with Buyers",
                description: "Chat with interested buyers through our secure messaging system. Negotiate prices and arrange meetups on campus.",
                icon: "💬",
                image: "/students2.webp"
              },
              {
                title: "Complete the Sale",
                description: "Meet up on campus, exchange items, and get paid. Simple!",
                icon: "🤝",
                image: "/students3.webp"
              }
            ].map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="relative w-full mb-6">
                  <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg">
                    <img 
                      src={step.image} 
                      alt={step.title}
                      className="object-cover w-full h-fit hover:scale-105 transition-all duration-300 hover:cursor-pointer"
                    />
                  </div>
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-2xl">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />

      {/* SEO Meta Tags */}
      <head>
        <title>Campus Exchange - Your College Marketplace</title>
        <meta name="description" content="Buy, sell, and trade with verified students on your campus. Fast, safe, and completely free to use." />
        <meta name="keywords" content="college marketplace, student marketplace, campus trading, student exchange" />
        <meta property="og:title" content="Campus Exchange - Your College Marketplace" />
        <meta property="og:description" content="Buy, sell, and trade with verified students on your campus. Fast, safe, and completely free to use." />
        <meta property="og:type" content="website" />
      </head>
    </>
  );
}
