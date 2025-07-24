import { GameState } from "../../api/requestType.ts";
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
    <dialog
      open
      className={
        "px-15 py-10 rounded-3xl m-auto bg-black opacity-90 font-sans z-1"
      }
    >
      <span className="relative mx-2 inline-block">
        <span className="bg-sky-900 absolute inset-0 origin-center translate-y-[1px] -rotate-[3deg] scale-110 transform rounded-md"></span>
        <span className="relative px-2 text-2xl text-white">
          {dialogMessage}
        </span>
      </span>
    </dialog>
  );
};
