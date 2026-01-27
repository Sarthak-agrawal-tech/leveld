"use client";

import { useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleRegister = async () => {
    try {
      const res = await api.post("/auth/register", {
        name,
        username,
        email,
        password,
      });

      localStorage.setItem("token", res.data.data.token);

      router.push("/dashboard");
    } catch (error: any) {
      alert(error?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B1020]">
      <div className="w-full max-w-sm space-y-4 bg-[#1E2746] p-20 rounded-[20px]">

        <h1 className="text-2xl font-bold text-center mb-10">
          Register
        </h1>

        <input
          className="border p-2 w-full rounded-[14px]"
          placeholder="Full Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border p-2 w-full rounded-[14px]"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

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

        <Link
          href="/login"
          className="text-gray-400 text-sm hover:text-white"
        >
          Already have an account? Login
        </Link>

        <button
          className="bg-black text-white py-2 w-full rounded-[14px] mt-4"
          onClick={handleRegister}
        >
          Register
        </button>

      </div>
    </div>
  );
}
