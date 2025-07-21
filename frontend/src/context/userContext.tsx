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
  loggedIn: boolean;
};

const UserContext = createContext<UserContextType>({
  username: "",
  setUsername: () => null,
  isLoading: true,
  loggedIn: false,
});

export const UserContextProvider = (props: PropsWithChildren) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch(BACKEND_URL + API_PATH.SESSION, {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          const session = (await res.json()) as SessionType;
          setUsername(session.username);
          setLoggedIn(true);
        } else {
          setUsername("");
          navigate("/");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    checkSession();
  }, []);

  return (
    <UserContext.Provider
      value={{ username, setUsername, isLoading, loggedIn }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
