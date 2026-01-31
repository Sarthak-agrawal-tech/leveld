"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [goal, setGoal] = useState("");

  const handleGenerate = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      // Not logged in → send to login
      router.push("/login");
      return;
    }

    // Logged in → go to dashboard / generate
    router.push("/generate");
  };

  return (
    <div className="min-h-screen bg-[#0B1020] flex flex-col">

      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6">
        <h1 className="text-3xl font-bold text-white">LEVELD</h1>

        <button
          onClick={() => router.push("/login")}
          className="bg-purple-600 px-4 py-2 rounded text-white"
        >
          Login
        </button>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">

        <h2 className="text-4xl font-bold text-white mb-3">
          What do you want to level up?
        </h2>

        <p className="text-gray-400 mb-8">
          Turn your goal into a structured quest
        </p>

        <input
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="Enter your goal..."
          className="w-full max-w-xl p-4 rounded-full bg-[#1E2746] text-white mb-6 outline-none"
        />

        <button
          onClick={handleGenerate}
          className="bg-purple-600 px-8 py-3 rounded-lg text-white text-lg hover:bg-purple-700"
        >
          Generate Your Quest
        </button>

        {!localStorage.getItem("token") && (
          <p className="mt-4 text-gray-400 text-sm">
            Login required to generate quests
          </p>
        )}

      </main>
    </div>
  );
}
