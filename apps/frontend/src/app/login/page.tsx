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
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold text-center">Login</h1>

        <input
          className="border p-2 w-full"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="bg-black text-white py-2 w-full"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}
