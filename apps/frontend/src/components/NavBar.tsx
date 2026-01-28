"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

const NavBar = () => {
  const router = useRouter();
  const user = useUser();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const handleGenerate = () => {
    router.push("/");
  };

  return (
    <div className="bg-[#0B1020] border-b border-[#1A2040]">
      <div className="flex justify-between items-center px-8 py-4">

        {/* Logo */}
        <h1
          className="text-3xl text-[#E6E9F2] font-bold cursor-pointer"
          onClick={() => router.push("/dashboard")}
        >
          LEVELD
        </h1>

        {/* Right Section */}
        {user && (
          <div className="flex items-center gap-4">

            {/* Generate */}
            <button
              onClick={handleGenerate}
              className="bg-[#6D28D9] px-4 py-2 rounded-lg text-white hover:opacity-90"
            >
              + Generate
            </button>

            {/* User Info */}
            <div className="flex flex-col items-end">
              <p className="text-[#E6E9F2] text-sm font-semibold">
                {user.name}
              </p>

              <p className="text-[#9AA3B2] text-xs">
                @{user.username}
              </p>
            </div>

            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-[#D9D9D9]" />

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="text-red-400 text-sm hover:underline"
            >
              Logout
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default NavBar;
