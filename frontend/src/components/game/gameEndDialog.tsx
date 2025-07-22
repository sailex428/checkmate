import type { GameState } from "../../api/requestType.ts";
import { getGameEndMessage } from "../../api/chess.ts";

type GameEndDialogProps = {
  state: GameState;
};

export const GameEndDialog = ({ state }: GameEndDialogProps) => {
  const dialogMessage = getGameEndMessage(state);

  if (!dialogMessage) {
    return <></>;
  }

  return (
    <div>
      <dialog
        open
        className={"px-15 py-10 rounded-3xl m-auto text-2xl bg-black font-sans"}
      >
        {dialogMessage}
      </dialog>
    </div>
  );
};
