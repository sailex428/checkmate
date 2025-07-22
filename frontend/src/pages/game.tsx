import {
  GAME_ID,
  initStompClient,
  publishMessage,
  subscribe,
} from "../api/stomp.ts";
import { API_PATH } from "../api/paths.ts";
import Spinner from "../components/game/spinner.tsx";
import {
  type ErrorMessageType,
  GameState,
  type GameStateType,
  type MatchUpdateType,
  type MoveUpdateType,
} from "../api/requestType.ts";
import { useContext, useEffect, useRef, useState } from "react";
import { Board } from "../components/game/board.tsx";
import type { Client } from "@stomp/stompjs";
import UserContext from "../context/userContext.tsx";
import ErrorBanner from "../components/errorBanner.tsx";
import { Chess } from "chess.js";
import type { MoveType } from "../api/chess.ts";
import { useNavigate, useSearchParams } from "react-router-dom";

type MatchingType = {
  isMatching: boolean;
  detail: string;
};

type GameType = {
  chess: Chess;
  state: GameState;
};

const Game = () => {
  const [game, setGame] = useState<GameType>({
    chess: new Chess(),
    state: GameState.DEFAULT,
  });
  const { isLoading } = useContext(UserContext);
  const stompClient = useRef<Client | null>(null);
  const [matching, setMatching] = useState<MatchingType>({
    isMatching: true,
    detail: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const stompConnect = () => {
    const client = initStompClient();
    client.onConnect = function () {
      subscribe<MatchUpdateType>({
        client,
        apiPath: API_PATH.MATCH_UPDATE,
        callback: (request) => {
          setMatching({ isMatching: true, detail: request.info });
        },
      });
      subscribe<ErrorMessageType>({
        client,
        apiPath: API_PATH.MATCH_ERRORS,
        callback: (request) => {
          setError(request.error);
        },
      });
      subscribe<MoveUpdateType>({
        client,
        apiPath: API_PATH.MOVE_UPDATE,
        callback: (request) => {
          updateFen(request.fen);
        },
      });
      subscribe<GameStateType>({
        client,
        apiPath: API_PATH.GAME_STATE,
        callback: (request) => {
          handleGameState(request);
        },
      });
      subscribe<ErrorMessageType>({
        client,
        apiPath: API_PATH.GAME_ERRORS,
        callback: (request) => {
          setError(request.error);
        },
      });
      const gameId = getGameIdFromSearchParams();
      if (gameId) {
        publishMessage({
          client,
          apiPath: API_PATH.GAME_UPDATE,
          placeHolder: gameId,
        });
      } else {
        publishMessage({ client, apiPath: API_PATH.MATCH_REQUEST });
      }
    };
    client.activate();
    stompClient.current = client;
  };

  useEffect(() => {
    stompConnect();
  }, []);

  const handleGameState = (request: GameStateType) => {
    setMatching({
      isMatching: false,
      detail: request.gameId,
    });
    if (request.state === GameState.DEFAULT) {
      navigate("/");
      return;
    } else if (request.state === GameState.START) {
      setSearchParams((prev) => {
        prev.set(GAME_ID, request.gameId);
        return prev;
      });
    }
    updateFen(request.fen);
  };

  const makeMove = (move: MoveType) => {
    const gameCopy = game;
    const result = gameCopy.chess.move(move);
    setGame(gameCopy);

    const valid = result !== null;
    if (valid) {
      const client = stompClient.current;
      const gameId = getGameIdFromSearchParams();

      if (client && gameId) {
        publishMessage({
          client,
          apiPath: API_PATH.GAME_MOVE,
          placeHolder: gameId,
        });
      }
    }
    return valid;
  };

  const updateFen = (fen: string) => {
    const newGame = game;
    newGame.chess.load(fen);
    setGame(newGame);
  };

  const getGameIdFromSearchParams = () => {
    return searchParams.get("gameId");
  };

  if (isLoading) {
    return <></>;
  }

  if (error) {
    return <ErrorBanner error={error} setError={setError} />;
  }

  return (
    <div className={"flex flex-col h-3/4 justify-center items-center gap-7"}>
      {matching.isMatching ? (
        <div>
          <Spinner />
          <div>{matching.detail}</div>
        </div>
      ) : (
        <Board state={game.state} game={game.chess} makeMove={makeMove} />
      )}
    </div>
  );
};

export default Game;
