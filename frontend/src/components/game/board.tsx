import { type Chess, Move } from "chess.js";
import { getPieceToGridPosition, type MoveType } from "../../api/chess.ts";
import { Piece } from "./piece.tsx";
import { useDroppable } from "@dnd-kit/core";
import type { GameState } from "../../api/requestType.ts";
import { GameEndDialog } from "./gameEndDialog.tsx";

type BoardProps = {
  state: GameState;
  game: Chess;
  makeMove: (move: MoveType) => boolean;
};

export const Board = ({ game, state, makeMove }: BoardProps) => {
  // const { isOver, setNodeRef } = useDroppable({
  //   id: "droppable",
  // });
  const onDrop = (sourceSquare: string, targetSquare: string) => {
    return makeMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to queen for simplicity
    });
  };

  const pieceToPostion = getPieceToGridPosition(game.board());

  return (
    <div
      className={
        "grid grid-cols-8 grid-rows-8 bg-[url(/board.png)] bg-cover rounded-3xl mx-3"
      }
    >
      <GameEndDialog state={state} />
      {pieceToPostion.map((piece, index) => (
        <Piece piece={piece} key={index} />
      ))}
    </div>
  );
};
