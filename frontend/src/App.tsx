import "./root.css";
import { UserContextProvider } from "./context/userContext.tsx";
import Home from "./pages/home.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout.tsx";
import Game from "./pages/game.tsx";
import { GameContextProvider } from "./context/gameContext.tsx";

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <GameContextProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/game" element={<Game />} />
            </Route>
          </Routes>
        </GameContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
