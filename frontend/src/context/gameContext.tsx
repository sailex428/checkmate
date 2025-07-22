import {
  createContext,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
  useState,
} from "react";
import { Chess, type Color } from "chess.js";
import { GameState } from "../api/requestType.ts";

type GameType = {
  chess: Chess;
  state: GameState;
  whitePlayer: string;
  blackPlayer: string;
  playersColor: Color;
};

export type GameContextType = {
  game: GameType;
  setGame: Dispatch<SetStateAction<GameType>>;
};

const GameContext = createContext<GameContextType>({
  game: {
    chess: new Chess(),
    state: GameState.DEFAULT,
    whitePlayer: "",
    blackPlayer: "",
    playersColor: "w",
  },
  setGame: () => {},
});

export const GameContextProvider = (props: PropsWithChildren) => {
  const [game, setGame] = useState<GameType>({
    chess: new Chess(),
    state: GameState.DEFAULT,
    whitePlayer: "",
    blackPlayer: "",
    playersColor: "w",
  });

  return (
    <GameContext.Provider value={{ game, setGame }}>
      {props.children}
    </GameContext.Provider>
  );
};

export default GameContext;
