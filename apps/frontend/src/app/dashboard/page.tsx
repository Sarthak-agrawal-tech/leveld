"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import Link from "next/link";
import NavBar from "@/components/NavBar";

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
    <div className="flex flex-col bg-[#0B1020] min-h-screen">
      <NavBar />
      <div className="quest-container flex flex-col justify-start p-8 pl-15">
        <div className="top-container flex flex-row justify-between items-center mb-8">
          <p className="text-2xl font-mono text-bold">Quest</p>
          <button className="mr-20 bg-[#6D28D9] p-[8px] pr-8 pl-8 rounded-xl">
            View All
          </button>
        </div>
        <div className="cards-container flex flex-row mr-20">
          {data.goals.map((goal) => (
            <div
              className="card bg-[#1E2746] flex-1 h-35 rounded-xl p-6 mr-6 hover:scale-105 transition-transform cursor-pointer"
              key={goal.goalId}
            >
              <div className="flex flex-row">
                <div className="flex flex-col justify-between h-25 w-40">
                  <p className="m-0 p-0">{goal.title}</p>
                  <div>
                    <button className="bg-[#0B1020] p-[6px] pl-[12px] pr-[12px] rounded-xl cursor-pointer hover:opacity-80">
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="task-streak-container flex flex-row justify-start mr-20">
        <div className="task-container display-flex flex-col p-8 pl-15 mb-8 flex-1">
          <div>
            <p className="font-mono text-2xl text-bold">Task</p>
          </div>
          <div className="task-card flex flex-col bg-[#1E2746] rounded-xl p-6 mt-4 ">
            <div className="card min-h-15">
              <div className="title-container flex flex-col justify-between h-14">
                <p className="text-[16px] font-bold">Full stack Developer</p>
                <p className="text-[13px] text-[#9AA3B2]">Create your first Auth middleware</p>
              </div>
              <button className="color-[]">Go to task</button>
            </div>
          </div>
        </div>
        <div className="streaks-container flex-3">
          <div>
            <p className="font-mono text-2xl text-bold p-8">Your Streak</p>

          </div>
          <div className="streak-card"></div>
        </div>
      </div>
    </div>
  );
}
