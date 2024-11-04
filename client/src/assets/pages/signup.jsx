import { useState } from "react";
import { InputBox } from "../components/inputBox.jsx";
import { BottomWarning } from "../components/BottomWarning.jsx";
import { useNavigate } from "react-router-dom";
import { SignButton } from "../components/signButton.jsx";

export function Signup() {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="relative flex justify-center items-center h-screen font-sans text-gray-900 overflow-hidden">
      {/* 3D Triangular Prism Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 opacity-95">
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-4 transform scale-150">
          {[...Array(36)].map((_, index) => (
            <div
              key={index}
              className="relative w-24 h-24 overflow-hidden"
              style={{
                animation: `float ${5 + (index % 4)}s ease-in-out infinite`,
                transformOrigin: "center",
                animationDelay: `${index * 80}ms`,
              }}
            >
              {/* Triangular Prism Design */}
              <div
                className="absolute left-0 top-0 w-0 h-0 border-l-[1.5rem] border-r-[1.5rem] border-b-[2.5rem] border-transparent"
                style={{
                  borderBottomColor: index % 2 === 0 ? "#3b82f6" : "#8b5cf6",
                  transform: `rotateX(40deg) rotateY(${index % 2 === 0 ? 40 : -40}deg)`,
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>

      {/* Semi-transparent overlay for contrast */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Signup Form Container */}
      <div className="relative flex flex-col justify-center z-10">
        <div className="rounded-lg bg-white w-80 text-center p-6 px-8 shadow-lg border border-transparent hover:border-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105 flex flex-col gap-4">
          <h1 className="font-extrabold text-3xl text-blue-700 transition-colors duration-300">
            Sign Up
          </h1>

          <InputBox
            onChange={(e) => setFirstname(e.target.value)}
            label={"First Name"}
            placeholder="Enter your first name"
          />
          <InputBox
            onChange={(e) => setLastname(e.target.value)}
            label={"Last Name"}
            placeholder="Enter your last name"
          />
          <InputBox
            onChange={(e) => setEmail(e.target.value)}
            label={"Email"}
            placeholder="example@domain.com"
          />
          <InputBox
            onChange={(e) => setPassword(e.target.value)}
            label={"Password"}
            placeholder="At least 8 characters"
          />

          <SignButton
            text="Sign Up"
            className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 rounded-lg transition-transform duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-lg"
          ></SignButton>

          <BottomWarning
            text="Already have an account?"
            buttonText="Sign In"
            to="/signin"
            className="text-blue-600 font-semibold hover:underline mt-2"
          ></BottomWarning>
        </div>
      </div>

      {/* Styles for Font and 3D Animation */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');
          
          /* Applying the Poppins font */
          .font-sans {
            font-family: 'Poppins', sans-serif;
          }

          /* Float animation for triangular prisms */
          @keyframes float {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }
        `}
      </style>
    </div>
  );
}
