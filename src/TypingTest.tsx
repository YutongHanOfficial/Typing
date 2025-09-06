import { useEffect, useState, useRef } from "react";
import EndScreen from "./EndScreen";

export default function TypingTest() {
  const [words, setWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [errors, setErrors] = useState(0);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [correctChars, setCorrectChars] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/monkeytypegame/monkeytype/master/frontend/static/languages/english_1k.json")
      .then((res) => res.json())
      .then((data) => {
        const pool = data.words || ["hello", "world", "typing"];
        const gen = Array(100).fill(0).map(() => pool[Math.floor(Math.random() * pool.length)]);
        setWords(gen);
      });
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!started) setStarted(true);
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      const current = words[currentWordIndex];
      if (typed.trim() !== current) setErrors(errors + 1);
      else setCorrectChars(correctChars + current.length);
      setTyped("");
      setCurrentWordIndex(currentWordIndex + 1);
      if (currentWordIndex + 1 >= words.length) setFinished(true);
    }
  };

  if (finished) return <EndScreen correctChars={correctChars} errors={errors} total={words.length} />;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-wrap gap-2 text-xl bg-neutral-800 p-4 rounded-lg max-w-3xl">
        {words.map((w, i) => (
          <span key={i} className={i === currentWordIndex ? "underline" : ""}>{w}</span>
        ))}
      </div>
      <input
        ref={inputRef}
        value={typed}
        onChange={(e) => setTyped(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
        className="bg-neutral-700 px-4 py-2 rounded outline-none"
      />
    </div>
  );
}
