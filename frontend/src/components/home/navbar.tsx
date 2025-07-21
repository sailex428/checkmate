import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChessBishop } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <nav className="flex items-center mx-3 mt-3 px-6 py-4 gap-2 border border-gray-800 rounded-full">
      <FontAwesomeIcon icon={faChessBishop} className={"text-sky-500"} />
      <a href={"/"} className={"font-semibold"}>
        Checkmate
      </a>
    </nav>
  );
};

export default Navbar;
