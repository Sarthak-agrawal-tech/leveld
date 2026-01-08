"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";

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
    <div className="p-6">
      <h1 className="text-2xl font-bold">{data.goal.title}</h1>
      <pre className="mt-4 bg-green-800 p-4 rounded">
        {JSON.stringify(data.units, null, 2)}
      </pre>
    </div>
  );
}
