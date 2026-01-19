"use client";

import { useUser } from "../context/UserContext";
import { useEffect, useState } from "react";
import api from "@/lib/api";

const NavBar = () => {
  const user = useUser();
  const [data, setData] = useState<any>(null);
  useEffect(()=>{
    api.get(`/goals/${user?.id}/quest-tree`).then((res) => {
      setData(res.data);
    })
  })

  return (
    <div className="quest-tree-container bg-[#0B1020] min-h-screen display-flex flex-col justify-center text-center">
      <div className="nav-bar-container flex justify-between items-center align-middle p-4">
        <h1 className="logo text-3xl text-[#E6E9F2] font-bold pl-4">LEVELD</h1>
        <div className="user-info-container align-right pr-4 flex items-center align-middle flex-row">
          <div className="name-container flex flex-col items-end">
            <p className="name pr-4 text-[#E6E9F2] text-xl">{user?.name}</p>
            <p className="username text-[#9AA3B2] pr-4 text-sm">
              {user?.username}
            </p>
          </div>
          <div className="w-16 h-16 rounded-full bg-[#D9D9D9]"></div>
        </div>

      </div>
      <div>
        <p className="text-2xl font-bold mt-13">Quest Tree</p>
      </div>
      <div className="quest-container"> 
        <p>{data}</p>
      </div>
    </div>
  );
};

export default NavBar;
