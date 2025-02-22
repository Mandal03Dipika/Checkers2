import BoardContextProvider from "../context/BoardContextProvider";
import Board from "../components/Board/Board";

function Game() {
  return (
    <>
      <BoardContextProvider>
        <div className="w-full flex flex-col items-center max-w-[95vw] sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw] xl:max-w-[60vw] 2xl:max-w-[50vw]">
          <Board />
        </div>
      </BoardContextProvider>
    </>
  );
}

export default Game;
