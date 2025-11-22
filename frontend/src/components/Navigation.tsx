import { Link, useLocation } from "react-router-dom";
import { MessageCircleMore, KeyRound, BrainCircuit } from "lucide-react";

export default function Sidebar() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <aside className="bg-[#009485] text-white shadow-lg w-64 min-h-screen flex flex-col">
      {/* Logo/Header */}
      <div className="p-6 border-b border-[#007a6e]">
        <h1 className="flex text-xl font-bold text-center items-center justify-center gap-2">
          <BrainCircuit />
          LearnIA
        </h1>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Link
              to="/"
              className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors gap-2 ${
                isActive("/")
                  ? "bg-[#007a6e] text-white shadow-md"
                  : "text-white opacity-80 hover:bg-[#007a6e] hover:opacity-100"
              }`}
            >
              <KeyRound />
              API Keys
            </Link>
          </li>
          <li>
            <Link
              to="/chat"
              className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors gap-2 ${
                isActive("/chat")
                  ? "bg-[#007a6e] text-white shadow-md"
                  : "text-white opacity-80 hover:bg-[#007a6e] hover:opacity-100"
              }`}
            >
              <MessageCircleMore />
              Chat
            </Link>
          </li>
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[#007a6e]">
        <p className="text-xs text-white opacity-70 text-center">
          Desenvolvido por <a href="github.com/Lucasgdbs">LucasGdbs</a>
        </p>
      </div>
    </aside>
  );
}
