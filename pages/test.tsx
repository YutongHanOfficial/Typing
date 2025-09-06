import { useRouter } from "next/router";
import TypingTest from "../components/TypingTest";

export default function TestPage() {
  const router = useRouter();
  const { type, value } = router.query;

  if (!type || !value) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <TypingTest mode={{ type: type as string, value: Number(value) }} />
    </main>
  );
}
