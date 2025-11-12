import { useEffect, useState } from "react";

export default function PoolStatus() {
  const [status, setStatus] = useState([]);

  const loadStatus = async () => {
    const res = await fetch("http://localhost:3002/api/status");
    setStatus(await res.json());
  };

  useEffect(() => {
    loadStatus();
    const interval = setInterval(loadStatus, 2000);
    return () => clearInterval(interval);
  }, []);

  const allFree = status.length > 0 && status.every((c) => !c.busy);
  const allBusy = status.length > 0 && status.every((c) => c.busy);

  return (
    <div className="text-center">
      <h3 className="text-xl font-semibold mb-3 text-gray-800">
        Пул статусы
      </h3>

      {allFree && (
        <p className="text-green-600 font-semibold mb-2">
          ✅ Барлығы дайын (All clients free)
        </p>
      )}
      {allBusy && (
        <p className="text-yellow-600 font-semibold mb-2">
          ⚠️ Барлық клиенттер бос емес
        </p>
      )}

      <ul className="flex justify-center flex-wrap gap-3">
        {status.map((c) => (
          <li
            key={c.id}
            className={`px-4 py-2 rounded-xl shadow-sm font-medium text-sm transition-all duration-300 ${
              c.busy
                ? "bg-yellow-200/80 text-yellow-800"
                : "bg-green-200/80 text-green-800"
            }`}
          >
            Client {c.id}: {c.busy ? "🟡 Busy" : "🟢 Free"}
          </li>
        ))}
      </ul>
    </div>
  );
}
