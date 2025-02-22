import { useContext } from "react";
import Cell from "../Cell/Cell";
import BoardContext from "../../context/BoardContext";
import CellContextProvider from "../../context/CellContextProvider";
import Win from "../Modal/Win";
import Turn from "./Turn";

function Board() {
  const {
    board,
    restart,
    setBoard,
    isSilverTurn,
    setIsSilverTurn,
    gameOver,
    setGameOver,
    win,
    setWin,
    showWinModal,
  } = useContext(BoardContext);

  return (
    <>
      <CellContextProvider>
        <Turn />
        <div className="inline-block border-4 border-dashed border-white p-2 max-w-[95vw] sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw] xl:max-w-[60vw]">
          {board.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center">
              {row.map((cell, colIndex) => {
                const isEven = (rowIndex + 1) % 2 === (colIndex + 1) % 2;
                return (
                  <Cell
                    key={colIndex}
                    color={isEven ? "bg-white" : "bg-black"}
                    piece={board[rowIndex][colIndex].piece}
                    cell={board[rowIndex][colIndex]}
                    setBoard={setBoard}
                    board={board}
                    isSilverTurn={isSilverTurn}
                    setIsSilverTurn={setIsSilverTurn}
                    gameOver={gameOver}
                    setGameOver={setGameOver}
                    setWin={setWin}
                  />
                );
              })}
            </div>
          ))}
        </div>
        {showWinModal && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#373e44b1] p-4 sm:p-6 md:p-8 outline-2 outline-offset-2 outline-dashed outline-white">
            <Win restart={restart} win={win} />
          </div>
        )}
      </CellContextProvider>
    </>
  );
}

export default Board;
