import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChessBishop } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between m-3 px-6 py-4 border border-gray-800 rounded-full">
      <a href={"/"} className={"flex items-center gap-2 font-semibold"}>
        <FontAwesomeIcon icon={faChessBishop} className={"text-sky-500"} />
        Checkmate
      </a>
      <a
        href={"https://github.com/sailex428/checkmate"}
        className={"font-semibold"}
        target={"_blank"}
      >
        <FontAwesomeIcon icon={faGithub} className={"text-sky-500"} />
      </a>
    </nav>
  );
};

export default Navbar;
