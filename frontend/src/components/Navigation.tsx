import { Link, useLocation } from "react-router-dom";
import {
  MessageCircleMore,
  KeyRound,
  BrainCircuit,
  Menu,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Sidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {/* Overlay para mobile quando sidebar está aberta */}
      {isMobile && !isCollapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`
        bg-[#009485] text-white shadow-lg min-h-screen flex flex-col transition-all duration-300 z-50
        ${isMobile ? "fixed" : "relative"}
        ${isCollapsed && isMobile ? "-translate-x-full" : "translate-x-0"}
        ${isCollapsed && !isMobile ? "w-16" : "w-64"}
      `}
      >
        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-6 bg-[#009485] hover:bg-[#007a6e] text-white rounded-full p-1 shadow-md transition-colors z-10 md:hidden"
        >
          {isCollapsed ? <Menu size={16} /> : <X size={16} />}
        </button>

        {/* Logo/Header */}
        <div className="p-6 border-b border-[#007a6e]">
          {isCollapsed && !isMobile ? (
            <div className="flex justify-center">
              <BrainCircuit className="w-6 h-6" />
            </div>
          ) : (
            <h1 className="flex text-xl font-bold text-center items-center justify-center gap-2">
              <BrainCircuit />
              LearnIA
            </h1>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className={`flex items-center py-3 rounded-lg text-sm font-medium transition-colors gap-2 ${
                  isCollapsed && !isMobile ? "px-2 justify-center" : "px-4"
                } ${
                  isActive("/")
                    ? "bg-[#007a6e] text-white shadow-md"
                    : "text-white opacity-80 hover:bg-[#007a6e] hover:opacity-100"
                }`}
                title="API Keys"
                onClick={() => isMobile && setIsCollapsed(true)}
              >
                <KeyRound className="shrink-0" />
                {(!isCollapsed || isMobile) && <span>API Keys</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/chat"
                className={`flex items-center py-3 rounded-lg text-sm font-medium transition-colors gap-2 ${
                  isCollapsed && !isMobile ? "px-2 justify-center" : "px-4"
                } ${
                  isActive("/chat")
                    ? "bg-[#007a6e] text-white shadow-md"
                    : "text-white opacity-80 hover:bg-[#007a6e] hover:opacity-100"
                }`}
                title="Chat"
                onClick={() => isMobile && setIsCollapsed(true)}
              >
                <MessageCircleMore className="shrink-0" />
                {(!isCollapsed || isMobile) && <span>Chat</span>}
              </Link>
            </li>
          </ul>
        </nav>

        {/* Desktop Toggle Button */}
        {!isMobile && (
          <div className="p-4 border-t border-[#007a6e]">
            <button
              onClick={toggleSidebar}
              className="w-full flex items-center justify-center py-2 text-white opacity-70 hover:opacity-100 transition-opacity"
              title={isCollapsed ? "Expandir sidebar" : "Recolher sidebar"}
            >
              {isCollapsed ? <Menu size={20} /> : <X size={20} />}
            </button>
          </div>
        )}

        {/* Footer */}
        {(!isCollapsed || isMobile) && (
          <div className="p-4 border-t border-[#007a6e]">
            <p className="text-xs text-white opacity-70 text-center">
              Desenvolvido por{" "}
              <a
                href="https://github.com/Lucasgdbs"
                className="hover:opacity-100 transition-opacity"
              >
                LucasGdbs
              </a>
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
