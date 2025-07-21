import {
  createContext,
  type PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { API_PATH } from "../api/paths.ts";
import type { SessionType } from "../types/session.ts";
import { useNavigate } from "react-router-dom";

const BACKEND_URL: string = import.meta.env.VITE_BACKEND_URL;

type UserContextType = {
  username: string;
  setUsername: (username: string) => void;
  isLoading: boolean;
};

const UserContext = createContext<UserContextType>({
  username: "",
  setUsername: () => null,
  isLoading: true,
});

export const UserContextProvider = (props: PropsWithChildren) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkSession() {
      try {
        console.log("");
        const res = await fetch(BACKEND_URL + API_PATH.SESSION, {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          const session = JSON.parse(data) as SessionType;
          setUsername(session.username);
        } else {
          setUsername("");
          navigate("/");
        }
      } finally {
        setIsLoading(false);
      }
    }
    checkSession();
  }, []);

  return (
    <UserContext.Provider value={{ username, setUsername, isLoading }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
