import type { PieceType } from "../../api/chess.ts";

type PieceProps = {
  piece: PieceType;
};

export const Piece = ({ piece }: PieceProps) => {
  const name = piece.name;
  return (
    <div id={piece.name}>
      <img src={`/piece/${name}.png`} alt={name} />
    </div>
  );
};
