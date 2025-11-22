import { Link, useLocation } from "react-router-dom";
<<<<<<< HEAD
import { MessageCircleMore, KeyRound, BrainCircuit } from "lucide-react";
=======
>>>>>>> f93cb51d22004d7c1a150af41159423b57038f01

export default function Sidebar() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
<<<<<<< HEAD
    <aside className="bg-[#009485] text-white shadow-lg w-64 min-h-screen flex flex-col">
      {/* Logo/Header */}
      <div className="p-6 border-b border-[#007a6e]">
        <h1 className="flex text-xl font-bold text-center items-center justify-center gap-2">
          <BrainCircuit />
          LearnIA
        </h1>
=======
    <aside className="bg-blue-600 text-white shadow-lg w-64 min-h-screen flex flex-col">
      {/* Logo/Header */}
      <div className="p-6 border-b border-blue-500">
        <h1 className="text-xl font-bold text-center">LearnIA</h1>
>>>>>>> f93cb51d22004d7c1a150af41159423b57038f01
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Link
              to="/"
<<<<<<< HEAD
              className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors gap-2 ${
                isActive("/")
                  ? "bg-[#007a6e] text-white shadow-md"
                  : "text-white opacity-80 hover:bg-[#007a6e] hover:opacity-100"
              }`}
            >
              <KeyRound />
=======
              className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive("/")
                  ? "bg-blue-700 text-white shadow-md"
                  : "text-blue-100 hover:bg-blue-700 hover:text-white"
              }`}
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v-2l-4.257-2.257A6 6 0 0111 7h4zm-5 8a2 2 0 100-4 2 2 0 000 4z"
                />
              </svg>
>>>>>>> f93cb51d22004d7c1a150af41159423b57038f01
              API Keys
            </Link>
          </li>
          <li>
            <Link
              to="/chat"
<<<<<<< HEAD
              className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors gap-2 ${
                isActive("/chat")
                  ? "bg-[#007a6e] text-white shadow-md"
                  : "text-white opacity-80 hover:bg-[#007a6e] hover:opacity-100"
              }`}
            >
              <MessageCircleMore />
=======
              className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive("/chat")
                  ? "bg-blue-700 text-white shadow-md"
                  : "text-blue-100 hover:bg-blue-700 hover:text-white"
              }`}
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
>>>>>>> f93cb51d22004d7c1a150af41159423b57038f01
              Chat
            </Link>
          </li>
        </ul>
      </nav>

      {/* Footer */}
<<<<<<< HEAD
      <div className="p-4 border-t border-[#007a6e]">
        <p className="text-xs text-white opacity-70 text-center">
          Desenvolvido por <a href="github.com/Lucasgdbs">LucasGdbs</a>
=======
      <div className="p-4 border-t border-blue-500">
        <p className="text-xs text-blue-200 text-center">
          Desenvolvido com <a href="github.com/Lucasgdbs">LucasGdbs</a>
>>>>>>> f93cb51d22004d7c1a150af41159423b57038f01
        </p>
      </div>
    </aside>
  );
}
