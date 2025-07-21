import "./root.css";
import { UserContextProvider } from "./context/userContext.tsx";
import Home from "./pages/home.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout.tsx";

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
