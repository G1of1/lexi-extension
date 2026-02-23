// src/App.tsx
import {HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/landing/Landing";

export default function App() {
  return (
      <Router>
      <div className="flex flex-col items-center justify-center w-[400px] h-[600px] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      </Router>
  );
}
