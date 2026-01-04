import { useNavigate } from "react-router-dom";
import NavBarHome from "../components/nav-bar_home";

export default function MessageSeller() {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-900 min-h-screen">
      <NavBarHome messageSeller={true} />
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
        <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full text-center shadow-2xl border border-gray-700">
          {/* Server Down Icon */}
          <div className="mb-6">
            <svg
              className="w-20 h-20 mx-auto text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          {/* Message */}
          <h1 className="text-2xl font-bold text-white mb-3">
            Messaging Server Unavailable
          </h1>
          <p className="text-gray-400 mb-8">
            Our messaging service is currently down. Please try again later.
          </p>

          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/30"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
