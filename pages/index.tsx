import Link from "next/link";

const modes = [
  { label: "15 Seconds", type: "time", value: 15 },
  { label: "30 Seconds", type: "time", value: 30 },
  { label: "60 Seconds", type: "time", value: 60 },
  { label: "10 Words", type: "words", value: 10 },
  { label: "25 Words", type: "words", value: 25 },
  { label: "100 Words", type: "words", value: 100 },
];

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-8">Monkeytype Clone</h1>
      <div className="grid gap-4">
        {modes.map((mode) => (
          <Link
            key={mode.label}
            href={{
              pathname: "/test",
              query: { type: mode.type, value: mode.value },
            }}
            className="bg-neutral-800 px-6 py-3 rounded-lg text-xl hover:bg-neutral-700 transition"
          >
            {mode.label}
          </Link>
        ))}
      </div>
      <Link
        href="/stats"
        className="mt-8 text-lg underline hover:text-yellow-400"
      >
        View Stats
      </Link>
    </main>
  );
}
