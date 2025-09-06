import { useEffect, useState } from "react";

interface Stats {
  [key: string]: { wpm: number; accuracy: number };
}

export default function StatsPage() {
  const [stats, setStats] = useState<Stats>({});

  useEffect(() => {
    const saved = localStorage.getItem("typingStats");
    if (saved) {
      setStats(JSON.parse(saved));
    }
  }, []);

  return (
    <main className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Personal Bests</h1>
      {Object.keys(stats).length === 0 ? (
        <p>No stats yet — go type!</p>
      ) : (
        <table className="table-auto border-collapse border border-neutral-700">
          <thead>
            <tr>
              <th className="border border-neutral-700 px-4 py-2">Mode</th>
              <th className="border border-neutral-700 px-4 py-2">WPM</th>
              <th className="border border-neutral-700 px-4 py-2">Accuracy</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(stats).map(([mode, { wpm, accuracy }]) => (
              <tr key={mode}>
                <td className="border border-neutral-700 px-4 py-2">{mode}</td>
                <td className="border border-neutral-700 px-4 py-2">{wpm}</td>
                <td className="border border-neutral-700 px-4 py-2">
                  {accuracy}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
