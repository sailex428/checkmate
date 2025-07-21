import { useEffect, useState } from "react";
import { API_PATH } from "./paths.ts";
import { useNavigate } from "react-router-dom";
import type { SessionType } from "../types/session.ts";

const BACKEND_URL: string = import.meta.env.VITE_BACKEND_URL;

export const useAuth = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch(BACKEND_URL + API_PATH.SESSION, {
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          const session = JSON.parse(data) as SessionType;
          setUsername(session.username);
        } else {
          navigate("/");
          setUsername("");
        }
      } finally {
        setLoading(false);
      }
    }
    checkSession();
  }, []);

  return { username, loading };
};
