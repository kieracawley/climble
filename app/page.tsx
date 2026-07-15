"use client";

import { useState } from "react";

const grades = [
  "V0", "V1", "V2", "V3",
  "V4", "V5", "V6", "V7",
  "V8", "V9", "V10", "V11",
  "V12", "V13", "V14", "V15",
  "V16", "V17"
];

export default function Home() {
  const [selectedGrade, setSelectedGrade] = useState("");

  return (
    <main className="min-h-screen bg-white text-black">

      <header className="border-b">
        <h1 className="text-3xl font-bold text-center py-5">
          🧗 Climble
        </h1>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-8">

        <h2 className="text-xl font-semibold mb-4">
          Today's Climb
        </h2>

        <video
          controls
          className="w-full rounded-xl shadow"
        >
          <source src="/videos/climb.mp4" type="video/mp4" />
        </video>

        <h3 className="text-lg font-medium mt-8 mb-4">
          Guess the grade
        </h3>

        <div className="grid grid-cols-4 gap-3">

          {grades.map((grade) => (

            <button
              key={grade}
              onClick={() => setSelectedGrade(grade)}
              className={`
                rounded-lg
                py-3
                font-semibold
                border
                transition

                ${
                  selectedGrade === grade
                    ? "bg-black text-white border-black"
                    : "bg-white hover:bg-gray-100"
                }
              `}
            >
              {grade}
            </button>

          ))}

        </div>

        <button
          className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg disabled:bg-gray-300"
          disabled={!selectedGrade}
          onClick={() => alert(`You guessed ${selectedGrade}`)}
        >
          Submit Guess
        </button>

      </div>

    </main>
  );
}