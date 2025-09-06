import Link from "next/link";
import { useEffect } from "react";

interface Props {
  words: string[];
  mode: { type: string; value: number };
  errors: number;
  correctChars: number;
  timeTaken: number;
}

export default function EndScreen({ words, mode, errors, correctChars, timeTaken }: Props) {
  const totalChars = words.slice(0, mode.type === "words" ? mode.value : words.length).join(" ").length;
  const rawWPM = Math.round((correctChars / 5) / (mode.type === "time" ? mode.value / 60 : timeTaken / 60));
  const accuracy = Math.round(((correctChars) / (correctChars + errors * 5)) * 100);

  useEffect(() => {
    const key = `${mode.value}${mode.type}`;
    const stats = JSON.parse(localStorage.getItem("typingStats") || "{}");
    if (!stats[key] || rawWPM > stats[key].wpm) {
      stats[key] = { wpm: rawWPM, accuracy };
      localStorage.setItem("typingStats", JSON.stringify(stats));
    }
  }, []);

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-4">Test Finished!</h2>
      <p>WPM: {rawWPM}</p>
      <p>Accuracy: {accuracy}%</p>
      <div className="mt-6 flex justify-center gap-4">
        <Link href="/" className="bg-neutral-700 px-4 py-2 rounded">Home</Link>
        <Link href="/stats" className="bg-neutral-700 px-4 py-2 rounded">Stats</Link>
      </div>
    </div>
  );
}
