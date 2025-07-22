import { type Chess, type Color } from "chess.js";
import {
  getPieceToGridPosition,
  getSquareToGrid,
  type MoveType,
  type PieceType,
} from "../../api/chess.ts";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { useEffect, useMemo, useState } from "react";
import DroppableSquare from "./droppableSquare.tsx";
import DraggablePiece from "./draggablePiece.tsx";

type BoardProps = {
  game: Chess;
  makeMove: (move: MoveType) => boolean;
  playersColor: Color;
};

export const Board = ({ game, makeMove, playersColor }: BoardProps) => {
  const pieces = useMemo(
    () => getPieceToGridPosition(playersColor, game.board()),
    [game],
  );
  const [displayPieces, setDisplayPieces] = useState<PieceType[]>(pieces);

  useEffect(() => {
    setDisplayPieces(pieces);
  }, [pieces]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const from = active.id.toString();
    const to = over.id.toString();

    const success = makeMove({
      from,
      to,
      promotion: "q", //promote to queen to keep it simple
    });

    if (!success) {
      setDisplayPieces(pieces);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div
        className={`grid grid-cols-8 grid-rows-8 bg-[url(/board.png)] bg-cover rounded-3xl relative w-full max-w-lg aspect-square`}
      >
        {Object.entries(getSquareToGrid(playersColor)).map(([square]) => (
          <DroppableSquare key={square} id={square} />
        ))}
        {displayPieces.map((piece, index) => (
          <DraggablePiece
            key={index}
            piece={piece}
            draggable={piece.name.startsWith(playersColor)}
          />
        ))}
      </div>
    </DndContext>
  );
};
