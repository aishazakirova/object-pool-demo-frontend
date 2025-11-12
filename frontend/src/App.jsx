import { useState } from "react";
import PoolStatus from "./poolStatus";

export default function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3002/api/fetch");
      const data = await res.json();
      setResult(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 flex items-center justify-center p-6">
      <div className="bg-white/30 backdrop-blur-xl shadow-xl rounded-2xl p-8 w-full max-w-md border border-white/40">
        <h1 className="text-4xl font-extrabold text-center mb-6 text-gray-800 drop-shadow-sm">
          🧩 Object Pool Demo
        </h1>

        <div className="flex flex-col items-center">
          <button
            onClick={fetchData}
            disabled={loading}
            className={`px-6 py-3 rounded-lg text-lg font-semibold text-white shadow-md transition-transform transform hover:scale-105 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600"
            }`}
          >
            {loading ? "⏳ Processing..." : "🔁 Make Request"}
          </button>

          {result && (
            <p className="mt-6 text-lg text-gray-800 bg-white/40 px-4 py-2 rounded-lg shadow-sm">
              Response from <span className="font-bold">Client {result.client}</span>
            </p>
          )}
        </div>

        <div className="mt-8 border-t border-white/40 pt-4">
          <PoolStatus />
        </div>
      </div>
    </div>
  );
}
