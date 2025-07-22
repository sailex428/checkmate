import { Piece } from "./piece.tsx";
import type { PieceType } from "../../api/chess.ts";
import { useDraggable } from "@dnd-kit/core";

type DraggablePieceProps = {
  piece: PieceType;
  draggable: boolean;
};

const DraggablePiece = ({ piece, draggable }: DraggablePieceProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: piece.square,
  });

  const style = {
    top: `${piece.grid.row * 12.5}%`,
    left: `${piece.grid.col * 12.5}%`,
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    transition: transform ? "none" : "transform 150ms ease",
  };

  const pieceSizing = "absolute w-[12.5%] h-[12.5%]";

  if (!draggable) {
    return (
      <div className={pieceSizing} style={style}>
        <Piece piece={piece} />
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className={pieceSizing}
    >
      <Piece piece={piece} />
    </div>
  );
};
export default DraggablePiece;
