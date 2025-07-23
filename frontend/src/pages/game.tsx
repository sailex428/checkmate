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
  type GameMoveType,
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
import { Chess, type Color } from "chess.js";
import type { MoveType } from "../api/chess.ts";
import { useNavigate, useSearchParams } from "react-router-dom";
import PlayerInfo from "../components/game/playerInfo.tsx";
import GameContext from "../context/gameContext.tsx";
import { GameEndDialog } from "../components/game/gameEndDialog.tsx";

type MatchingType = {
  isMatching: boolean;
  detail: string;
};

const Game = () => {
  const { game, setGame } = useContext(GameContext);
  const { username, isLoading } = useContext(UserContext);
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
          handleMoveUpdate(request);
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
    const newChess = new Chess(request.fen);
    setGame({
      chess: newChess,
      state: request.state,
      whitePlayer: request.whitePlayer,
      blackPlayer: request.blackPlayer,
      playersColor: request.playersColor.toLowerCase() as Color,
    });
  };

  const makeMove = (move: MoveType) => {
    const newChess = new Chess(game.chess.fen());
    const result = newChess.move(move);
    setGame((prevGame) => {
      return {
        ...prevGame,
        chess: newChess,
      };
    });

    const valid = result !== null;
    if (valid) {
      const client = stompClient.current;
      const gameId = getGameIdFromSearchParams();

      if (client && gameId) {
        publishMessage<GameMoveType>({
          client,
          apiPath: API_PATH.GAME_MOVE,
          placeHolder: gameId,
          body: { move: result.lan },
        });
      }
    }
    return valid;
  };

  const handleMoveUpdate = (request: MoveUpdateType) => {
    const newChess = new Chess(request.fen);
    setGame((prevGame) => {
      return {
        ...prevGame,
        chess: newChess,
      };
    });
  };

  const getGameIdFromSearchParams = () => {
    return searchParams.get(GAME_ID);
  };

  if (isLoading) {
    return <></>;
  }

  if (error) {
    return <ErrorBanner error={error} setError={setError} />;
  }

  return (
    <div className={"flex flex-col h-5/6 justify-center items-center gap-7"}>
      {matching.isMatching ? (
        <div className={"flex flex-col items-center gap-7"}>
          <Spinner />
          <div className={"font-semibold"}>{matching.detail}</div>
        </div>
      ) : (
        <>
          <PlayerInfo
            playerName={
              username == game.whitePlayer ? game.blackPlayer : game.whitePlayer
            }
          />
          <GameEndDialog state={game.state} />
          <Board
            game={game.chess}
            makeMove={makeMove}
            playersColor={game.playersColor}
          />
          <PlayerInfo playerName={username} />
        </>
      )}
    </div>
  );
};

export default Game;
