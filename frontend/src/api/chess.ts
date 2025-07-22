import type { Color, PieceSymbol, Square } from "chess.js";
import { GameState } from "./requestType.ts";

export type MoveType = {
  from: string;
  to: string;
  promotion: string;
};

export const squareToGrid: Record<string, { row: number; col: number }> = {};

const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
const ranks = ["8", "7", "6", "5", "4", "3", "2", "1"];

ranks.forEach((rank, rowIndex) => {
  files.forEach((file, colIndex) => {
    const square = `${file}${rank}`;
    squareToGrid[square] = { row: rowIndex + 1, col: colIndex + 1 };
  });
});

export type PieceType = {
  name: string;
  grid: { row: number; col: number };
};

export const getPieceToGridPosition = (
  board: ({ square: Square; type: PieceSymbol; color: Color } | null)[][],
): PieceType[] => {
  const pieceToGridPosition: PieceType[] = [];
  board.forEach((col) => {
    col.forEach((row) => {
      if (row != null) {
        const piece = `${row.color}${row.type}`;
        const grid = squareToGrid[row.square];
        pieceToGridPosition.push({ name: piece, grid });
      }
    });
  });
  return pieceToGridPosition;
};

export const getGameEndMessage = (state: GameState) => {
  switch (state) {
    case GameState.DRAW:
      return "Draw";
    case GameState.BLACK_WON:
      return "Black wins!";
    case GameState.WHITE_WON:
      return "White wins!";
    default:
      return null;
  }
};
