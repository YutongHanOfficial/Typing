import { useEffect, useState, useRef } from "react";
import EndScreen from "./EndScreen";

interface Props {
  mode: { type: string; value: number };
}

export default function TypingTest({ mode }: Props) {
  const [words, setWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [errors, setErrors] = useState<number>(0);
  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(mode.type === "time" ? mode.value : 0);
  const [finished, setFinished] = useState(false);
  const [correctChars, setCorrectChars] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // fetch wordlist
  useEffect(() => {
    fetch("https://raw.githubusercontent.com/monkeytypegame/monkeytype/master/frontend/static/languages/english_1k.json")
      .then(res => res.json())
      .then(data => {
        const pool = data.words || ["hello", "world", "test", "typing"];
        const gen = Array(200).fill(0).map(() => pool[Math.floor(Math.random() * pool.length)]);
        setWords(gen);
      });
  }, []);

  // timer
  useEffect(() => {
    if (mode.type === "time" && started && !finished) {
      const t = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(t);
            finishTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(t);
    }
  }, [started]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!started) setStarted(true);

    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      checkWord();
    }
  };

  const checkWord = () => {
    const current = words[currentWordIndex];
    if (typed.trim() !== current) {
      setErrors(errors + 1);
    } else {
      setCorrectChars(correctChars + current.length);
    }
    setTyped("");
    setCurrentWordIndex(currentWordIndex + 1);

    if (mode.type === "words" && currentWordIndex + 1 >= mode.value) {
      finishTest();
    }
  };

  const finishTest = () => {
    setFinished(true);
  };

  if (finished) {
    const timeTaken = mode.type === "time" ? mode.value : (Date.now() / 1000);
    return <EndScreen words={words} mode={mode} errors={errors} correctChars={correctChars} timeTaken={timeTaken} />;
  }

  return (
    <div className="flex flex-col items-center gap-4 max-w-3xl">
      {mode.type === "time" && <div className="text-2xl">{timeLeft}s</div>}
      <div className="flex flex-wrap gap-2 text-xl bg-neutral-800 p-4 rounded-lg">
        {words.map((word, i) => (
          <span key={i} className={`${i === currentWordIndex ? "underline" : ""}`}>
            {word}
          </span>
        ))}
      </div>
      <input
        ref={inputRef}
        value={typed}
        onChange={(e) => setTyped(e.target.value)}
        onKeyDown={handleKeyDown}
        className="bg-neutral-700 px-4 py-2 rounded outline-none"
        autoFocus
      />
    </div>
  );
}
