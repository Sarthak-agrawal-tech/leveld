"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import NavBar from "@/components/NavBar";
import LevelNode from "@/components/LevelNode";

export default function GoalPage() {
  const { goalId } = useParams();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    api
      .get(`/goals/${goalId}/quest-tree`)
      .then((res) => setData(res.data));
  }, [goalId]);

  if (!data) return <div className="p-6">Loading...</div>;


  return (
    <div>
      <NavBar></NavBar>
    </div>
  );
}
