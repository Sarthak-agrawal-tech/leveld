"use client";

import { useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

 const handleLogin = async () => {
  try {
    const res = await api.post("/auth/login", { email, password });

    console.log("LOGIN RESPONSE:", res.data);

    localStorage.setItem("token", res.data.data.token);
    router.push("/dashboard");
  } catch (error: any) {
    alert(error?.response?.data?.message || "Login failed");
  }
};



  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B1020]">
      <div className="w-full max-w-sm space-y-4 bg-[#1E2746] p-20 rounded-[20px]">
        <h1 className="text-2xl font-bold text-center mb-10">Login</h1>

        <input
          className="border p-2 w-full rounded-[14px]"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-2 w-full rounded-[14px]"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="bg-black text-white py-2 w-full rounded-[14px] mt-4"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}
