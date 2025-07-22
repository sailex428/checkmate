import "./root.css";
import { UserContextProvider } from "./context/userContext.tsx";
import Home from "./pages/home.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout.tsx";
import Game from "./pages/game.tsx";
import { BoardContextProvider } from "./context/boardContext.tsx";
import { DndContext } from "@dnd-kit/core";

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <DndContext>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/game" element={<Game />} />
            </Route>
          </Routes>
        </DndContext>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
