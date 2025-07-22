import type { Color, PieceSymbol, Square } from "chess.js";
import { GameState } from "./requestType.ts";

export type MoveType = {
  from: string;
  to: string;
  promotion: string;
};

export const getSquareToGrid = (playerColor: Color) => {
  const squareToGrid: Record<string, { row: number; col: number }> = {};

  const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const ranks = ["1", "2", "3", "4", "5", "6", "7", "8"];

  const ranksOriented = playerColor === "w" ? ranks.slice().reverse() : ranks;
  const filesOriented = playerColor === "w" ? files : files.slice().reverse();

  ranksOriented.forEach((rank, rowIndex) => {
    filesOriented.forEach((file, colIndex) => {
      const square = `${file}${rank}`;
      squareToGrid[square] = { row: rowIndex, col: colIndex };
    });
  });

  return squareToGrid;
};

export type PieceType = {
  name: string;
  square: string;
  grid: { row: number; col: number };
};

export const getPieceToGridPosition = (
  playersColor: Color,
  board: ({ square: Square; type: PieceSymbol; color: Color } | null)[][],
): PieceType[] => {
  const pieceToGridPosition: PieceType[] = [];
  board.forEach((col) => {
    col.forEach((row) => {
      if (row != null) {
        const piece = `${row.color}${row.type}`;
        const grid = getSquareToGrid(playersColor)[row.square];
        pieceToGridPosition.push({ name: piece, grid, square: row.square });
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
