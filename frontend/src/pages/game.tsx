import { initStompClient, publishMessage, subscribe } from "../api/stomp.ts";
import { API_PATH } from "../api/paths.ts";
import Spinner from "../components/game/spinner.tsx";
import {
  type ErrorMessageType,
  GameState,
  type GameStateType,
  type MatchUpdateType,
  type MoveUpdateType,
} from "../api/requestType.ts";
import { useEffect, useRef, useState } from "react";
import { Board } from "../components/game/board.tsx";
import type { Client } from "@stomp/stompjs";
import { useAuth } from "../api/auth.ts";

type Game = {
  gameState: GameState;
  infoString: string;
};

const Game = () => {
  const { username, isLoading } = useAuth();
  const stompClient = useRef<Client | null>(null);
  const [game, setGame] = useState<Game>({
    gameState: GameState.DEFAULT,
    infoString: "",
  });

  const stompConnect = () => {
    const client = initStompClient();
    client.onConnect = function () {
      subscribe<MatchUpdateType>({
        client,
        apiPath: API_PATH.MATCH_UPDATE,
        callback: (request) => {
          console.log("matchUpdate", request);
          setGame({ gameState: GameState.MATCHING, infoString: request.info });
        },
      });
      subscribe<ErrorMessageType>({
        client,
        apiPath: API_PATH.MATCH_ERRORS,
        callback: (request) => {
          alert(request.error);
        },
      });
      subscribe<MoveUpdateType>({
        client,
        apiPath: API_PATH.MOVE_UPDATE,
        callback: (request) => {},
      });
      subscribe<GameStateType>({
        client,
        apiPath: API_PATH.GAME_STATE,
        callback: (request) => {
          setGame({ gameState: request.gameState, infoString: request.gameId });
        },
      });
      subscribe<ErrorMessageType>({
        client,
        apiPath: API_PATH.GAME_ERRORS,
        callback: (request) => {
          alert(request.error);
        },
      });
      publishMessage({ client, apiPath: API_PATH.MATCH_REQUEST });
    };
    client.activate();
    stompClient.current = client;
  };

  useEffect(() => {
    stompConnect();
  }, []);

  if (isLoading) {
    return <></>;
  }

  return (
    <div className={"flex flex-col h-3/4 justify-center items-center gap-12"}>
      {game.gameState == GameState.MATCHING ? (
        <div>
          <p>{game.infoString}</p>
          <Spinner />
        </div>
      ) : (
        <></>
      )}
      <Board />
    </div>
  );
};

export default Game;
