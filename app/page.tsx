"use client";

import { useEffect, useState } from "react";

type Climb = {
  date: string;
  video: string;
  grade: string;
};

const grades = [
  "V0", "V1", "V2", "V3",
  "V4", "V5", "V6", "V7",
  "V8", "V9", "V10", "V11",
  "V12", "V13", "V14", "V15",
  "V16", "V17"
];

const MAX_GUESSES = 5;

export default function Home() {

  const [climb, setClimb] = useState<Climb | null>(null);
  const [loading, setLoading] = useState(true);

  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [result, setResult] = useState("");
  const [gameOver, setGameOver] = useState(false);


  // Load today's climb
  useEffect(() => {

    async function getClimb() {

      try {

        const response = await fetch(
          "https://mjhzq70jg2.execute-api.us-east-2.amazonaws.com/today"
        );

        const data = await response.json();

        setClimb(data);

      } catch (error) {

        console.error(
          "Failed to load climb:",
          error
        );

      } finally {

        setLoading(false);

      }
    }

    getClimb();

  }, []);



  function submitGuess() {

  if (!climb || !guess || gameOver) {
    return;
  }


  const updatedGuesses = [
    ...guesses,
    guess
  ];

  setGuesses(updatedGuesses);


  if (guess === climb.grade) {

    setResult(
      "🎉 Correct! Great eye!"
    );

    setGameOver(true);

  } 
  
  else if (updatedGuesses.length >= MAX_GUESSES) {

    setResult(
      `❌ Out of guesses!`
    );

    setGameOver(true);

  }


  // Clears selected button
  setGuess("");

}



  if (loading) {

    return (
      <main className="min-h-screen flex items-center justify-center">
        Loading today's climb...
      </main>
    );

  }



  if (!climb) {

    return (
      <main className="min-h-screen flex items-center justify-center">
        No climb available today
      </main>
    );

  }



  return (

  <main className="
    min-h-screen
    bg-gray-100
    max-w-2xl
    mx-auto
    p-6
  ">

    <h1 className="
      text-4xl
      font-bold
      mb-6
      text-center
      text-gray-900
    ">
      🧗 Climble
    </h1>


   {/* Video */}

<div className="
  flex
  justify-center
">

  <video
    controls
    className="
      w-full
      max-w-md
      aspect-video
      rounded-xl
      shadow-md
      bg-black
    "
  >

    <source
      src={`https://climble-videos.s3.us-east-2.amazonaws.com/${climb.video}`}
      type="video/mp4"
    />

  </video>

</div>


    {/* Guess counter */}

    <div className="
      flex
      justify-center
      gap-3
      mt-6
    ">

      {Array.from({ length: MAX_GUESSES }).map((_, index) => (

        <div
          key={index}
          className={`
            w-4
            h-4
            rounded-full
            border

            ${
              index < guesses.length
              ? "bg-[#787c7e] border-[#787c7e]"
              : "bg-white border-gray-400"
            }
          `}
        />

      ))}

    </div>



    <h3 className="
      text-xl
      font-bold
      mt-8
      mb-4
      text-center
      text-gray-800
    ">
      Guess the grade
    </h3>



    {/* Grade buttons */}

    <div className="
      grid
      grid-cols-4
      gap-3
    ">

      {grades.map((grade) => {

        const alreadyGuessed =
          guesses.includes(grade);


        return (

          <button

            key={grade}

            disabled={
              alreadyGuessed ||
              gameOver
            }

            onClick={() =>
              setGuess(grade)
            }

            className={`

              rounded-md
              py-3
              font-bold
              border-2
              transition

              ${
                alreadyGuessed

                ? 
                "bg-[#787c7e] text-white border-[#787c7e]"

                :

                guess === grade

                ?
                "bg-[#c9b458] text-white border-[#c9b458]"

                :

                "bg-white text-gray-900 border-gray-300 hover:bg-gray-200"

              }

            `}

          >

            {grade}

          </button>

        );

      })}

    </div>



    {/* Submit button */}

    <button

      onClick={submitGuess}

      disabled={
        !guess ||
        gameOver
      }

      className="
        w-full
        mt-6
        bg-[#6aaa64]
        hover:bg-[#5c9957]
        disabled:bg-gray-300
        text-white
        py-4
        rounded-md
        font-bold
        transition
      "

    >

      Submit Guess

    </button>

    {/* End Game Popup */}

{gameOver && (

  <div
    className="
      fixed
      inset-0
      bg-black/50
      flex
      items-center
      justify-center
      z-50
    "
  >

    <div
      className="
        bg-white
        rounded-xl
        shadow-xl
        p-8
        text-center
        max-w-sm
        mx-4
      "
    >

      <h2
        className="
          text-3xl
          font-bold
          mb-4
          text-gray-900
        "
      >
        {result.includes("Correct")
          ? "🧗 Send!"
          : "😢 Projected"}
      </h2>


      <p
        className="
          text-lg
          text-gray-700
        "
      >
        {result}
      </p>


      {!result.includes("Correct") && (

        <p
          className="
            mt-4
            text-xl
            font-bold
            text-[#6aaa64]
          "
        >
          Answer: {climb.grade}
        </p>

      )}


      <button

        onClick={() =>
          window.location.reload()
        }

        className="
          mt-6
          bg-[#6aaa64]
          hover:bg-[#5c9957]
          text-white
          px-6
          py-3
          rounded-md
          font-bold
        "

      >
        Done

      </button>


    </div>

  </div>

)}

  </main>

  );
}