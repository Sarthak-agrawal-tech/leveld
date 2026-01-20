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
      <NavBar/>
      <div className="quest-container display-flex flex-col justify-start p-8 pl-15">
        <div className="top-container flex flex-row justify-between items-center mb-8">
          <p className="text-2xl font-inter">Quest</p>
          <button className="mr-20 bg-[#6D28D9] p-[8px] pr-8 pl-8 rounded-xl">View All</button>
        </div>
        <div className="cards-container flex flex-row mr-20">
          {data.goals.map(goal =>(
            <div className="card bg-[#1E2746] flex-1 h-35 rounded-xl p-6 mr-6 hover:scale-105 transition-transform cursor-pointer" key={goal.goalId}>
            <div className="flex flex-row">
              <div className="flex flex-col justify-between h-25 w-40">
                <p className="m-0 p-0">{goal.title}</p>
                <button className="bg-[#0B1020] p-[6px] rounded-xl">Continue</button>
              </div>
            </div>
          </div>
          ))}
          
          
        </div>
      </div>
    </div>
  );
}
