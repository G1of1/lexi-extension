import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full px-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Welcome to PolicyPal AI</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Your AI-powered assistant for analyzing Terms of Service & Privacy
        Policies.
      </p>
      <Link
        to="/login"
        className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
      >
        Get Started
      </Link>
    </div>
  );
}
