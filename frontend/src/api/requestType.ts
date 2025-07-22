export type GameMoveType = {
  move: string;
};

export type MatchUpdateType = {
  info: string;
  username: string;
};

export type MoveUpdateType = {
  fen: string;
};

//used for game move errors and match errors
export type ErrorMessageType = {
  error: string;
};

export type GameStateType = {
  gameId: string;
  state: GameState;
  fen: string;
  whitePlayer: string;
  blackPlayer: string;
};

export const GameState = {
  DEFAULT: "DEFAULT",
  START: "START",
  ONGOING: "ONGOING",
  WHITE_WON: "WHITE_WON",
  BLACK_WON: "BLACK_WON",
  DRAW: "DRAW",
};

export type GameState = (typeof GameState)[keyof typeof GameState];
