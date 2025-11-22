import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Navigation";
import ApiKeysPage from "./pages/ApiKeysPage";
import ChatPage from "./pages/ChatPage";

export default function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 overflow-hidden">
          <Routes>
            <Route path="/" element={<ApiKeysPage />} />
            <Route path="/chat" element={<ChatPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
