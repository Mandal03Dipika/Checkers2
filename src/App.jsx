import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Game from "./pages/Game";
import GameComputer from "./pages/GameComputer";

function App() {
  return (
    <>
      <div className="bg-[url(/images/2.png)] min-h-screen bg-cover bg-center flex flex-col items-center justify-center px-2 sm:px-4 md:px-6 lg:px-8 relative">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/game" element={<Game />} />
          <Route path="/computer" element={<GameComputer />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
