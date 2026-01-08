"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

type GoalProgress = {
  goalId: string;
  title: string;
  progress: number;
};

type ProgressSummary = {
  totalXp: number;
  totalGoals: number;
  completedGoals: number;
  activeGoals: number;
  goals: GoalProgress[];
};

export default function DashboardPage() {
  const [data, setData] = useState<ProgressSummary | null>(null);

  useEffect(() => {
    api.get("/progress/summary").then((res) => {
      setData(res.data);
    });
  }, []);

  if (!data) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* XP */}
      <div className="bg-black text-white p-4 rounded">
        <p className="text-sm">Total XP</p>
        <p className="text-2xl font-bold">{data.totalXp}</p>
      </div>

      {/* Goals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.goals.map((goal) => (
          <div
            key={goal.goalId}
            className="border p-4 rounded space-y-2"
          >
            <h3 className="font-semibold">{goal.title}</h3>

            <div className="w-full bg-gray-200 h-2 rounded">
              <div
                className="bg-black h-2 rounded"
                style={{ width: `${goal.progress}%` }}
              />
            </div>

            <p className="text-sm">{goal.progress}% complete</p>
          </div>
        ))}
      </div>
    </div>
  );
}
