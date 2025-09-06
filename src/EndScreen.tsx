import React from "react";

interface Props {
  correctChars: number;
  errors: number;
  total: number;
}

export default function EndScreen({ correctChars, errors, total }: Props) {
  const wpm = Math.round(correctChars / 5);
  const accuracy = Math.round((correctChars / (correctChars + errors * 5)) * 100);

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-4">Finished!</h2>
      <p>WPM: {wpm}</p>
      <p>Accuracy: {accuracy}%</p>
      <button onClick={() => location.reload()} className="mt-4 px-4 py-2 bg-neutral-700 rounded">Retry</button>
    </div>
  );
}
