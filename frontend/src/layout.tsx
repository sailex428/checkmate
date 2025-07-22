import Navbar from "./components/navbar.tsx";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className={"flex flex-col items-center bg-black text-white"}>
      <div className={"w-full max-w-xl h-svh"}>
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}
