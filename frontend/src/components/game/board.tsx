import { type Chess, type Color } from "chess.js";
import {
  getPieceToGridPosition,
  getSquareToGrid,
  type MoveType,
} from "../../api/chess.ts";
import {
  DndContext,
  type DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import DroppableSquare from "./droppableSquare.tsx";
import DraggablePiece from "./draggablePiece.tsx";

type BoardProps = {
  game: Chess;
  makeMove: (move: MoveType) => boolean;
  playersColor: Color;
};

export const Board = ({ game, makeMove, playersColor }: BoardProps) => {
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const sensors = useSensors(mouseSensor, touchSensor);

  const pieces = getPieceToGridPosition(playersColor, game.board());

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const from = active.id.toString();
    const to = over.id.toString();

    makeMove({
      from,
      to,
      promotion: "q", //promote to queen to keep it simple
    });
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div
        className={`grid grid-cols-8 grid-rows-8 bg-[url(/board.png)] bg-cover 
        rounded-3xl relative w-full max-w-lg aspect-square`}
      >
        {Object.entries(getSquareToGrid(playersColor)).map(([square]) => (
          <DroppableSquare key={square} id={square} />
        ))}
        {pieces.map((piece, index) => (
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
