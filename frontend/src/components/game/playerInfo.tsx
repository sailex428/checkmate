import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChessKing } from "@fortawesome/free-solid-svg-icons";

type PlayerInfoProps = {
  playerName: string;
};

const PlayerInfo = ({ playerName }: PlayerInfoProps) => {
  return (
    <div className={"flex flex-row"}>
      <FontAwesomeIcon className={"size-7 mt-1"} icon={faChessKing} />
      <div className={"font-semibold text-lg"}>{playerName}</div>
    </div>
  );
};

export default PlayerInfo;
