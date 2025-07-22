import type { PieceType } from "../../api/chess.ts";

type PieceProps = {
  piece: PieceType;
};

export const Piece = ({ piece }: PieceProps) => {
  const name = piece.name;
  const grid = piece.grid;
  return (
    <div
      id={piece.name}
      style={{
        gridColumnStart: grid.col,
        gridRowStart: grid.row,
      }}
    >
      <img src={`/piece/${name}.png`} alt={name} />
    </div>
  );
};
