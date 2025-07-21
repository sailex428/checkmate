import { useContext, useState } from "react";
import type { SessionType } from "../../types/session.ts";
import { useNavigate } from "react-router-dom";
import { API_PATH } from "../../api/paths.ts";
import UserContext from "../../context/userContext.tsx";

const BACKEND_URL: string = import.meta.env.VITE_BACKEND_URL;

const PlayerLoginForm = () => {
  const { username, setUsername, isLoading } = useContext(UserContext);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const onPlay = async () => {
    const url = new URL(BACKEND_URL + API_PATH.LOGIN);
    url.searchParams.set("username", username);

    const response = await fetch(url, {
      method: "POST",
      credentials: "include", //needed to get the cookie
    });
    if (response.ok) {
      const json = await response.json();
      setUsername((json as SessionType).username);
      navigateToGame();
    } else {
      const text = await response.text();
      setError(text);
    }
  };

  const navigateToGame = () => {
    navigate("/game");
  };

  if (isLoading) {
    return <></>;
  }

  return (
    <div className={"flex justify-center gap-5"}>
      {!username ? (
        <div>
          <input
            id={"username-input"}
            className={`rounded-2xl px-5 py-3 w-70 ${
              error
                ? "border-2 border-rose-500"
                : "border border-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
            }`}
            type={"text"}
            onChange={(e) => {
              setError(null);
              setUsername(e.target.value);
            }}
            placeholder={"username"}
            value={username}
          />
          <div className={"h-4 text-rose-500 text-xs"}>
            {error && <span>{error}</span>}
          </div>
        </div>
      ) : (
        <></>
      )}
      <div>
        <button
          className={
            "rounded-2xl px-10 py-3 bg-sky-500 hover:bg-sky-400 transition-colors duration-200"
          }
          type={"button"}
          onClick={onPlay}
        >
          Play
        </button>
      </div>
    </div>
  );
};

export default PlayerLoginForm;
