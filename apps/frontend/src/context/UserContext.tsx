"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import api from "../lib/api";

type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  xp: number;
};

const UserContext = createContext<User | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    console.log("USER PROVIDER MOUNTED");

    api
      .get("/auth/me")
      .then((res) => {
        console.log("USER FROM BACKEND:", res.data);
        setUser(res.data.data);
      })
      .catch((err) => {
        console.log("AUTH ME ERROR:", err?.response?.status);
        setUser(null);
      });
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  return useContext(UserContext);
};
