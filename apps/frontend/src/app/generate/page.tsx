"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function GeneratePage() {
  const router = useRouter();
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);

  // Protect page
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
    }
  }, []);

  const handleGenerate = async () => {
    if (!goal.trim()) return alert("Enter a goal");

    try {
      setLoading(true);

      await api.post("/goals", {
        title: goal,
      });

      router.push("/dashboard");

    } catch (err: any) {
      alert("Failed to generate quest");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1020] flex items-center justify-center">

      <div className="bg-[#1E2746] p-10 rounded-xl w-full max-w-xl">

        <h1 className="text-3xl text-white font-bold mb-6 text-center">
          Generate Your Quest
        </h1>

        <input
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="Enter your goal..."
          className="w-full p-4 rounded-lg bg-[#0B1020] text-white mb-6"
        />

        <button
          disabled={loading}
          onClick={handleGenerate}
          className="w-full bg-purple-600 py-3 rounded-lg text-white hover:opacity-90"
        >
          {loading ? "Generating..." : "Generate"}
        </button>

      </div>
    </div>
  );
}
