import { useContext, useEffect, useState } from "react";
import Piece from "../Piece/Piece";
import CellComputerContext from "../../context/CellComputerContext";
import CellComputerContextProvider from "../../context/CellComputerContextProvider";

function CellComputer({
  color,
  piece,
  cell,
  setBoard,
  board,
  isSilverTurn,
  setIsSilverTurn,
  gameOver,
  setGameOver,
  setWin,
}) {
  const { highlightedCells, handleClick, computerMove } = useContext(
    CellComputerContext
  );

  const isHighlighted =
    highlightedCells.some(
      (highlight) => highlight.row === cell.row && highlight.col === cell.col
    ) && cell.piece == null;

  const moves = isHighlighted ? "border-4 border-dashed border-red-500" : "";

  const isCurrentPlayerPiece =
    (isSilverTurn && piece === "grey") ||
    (!isSilverTurn && piece === "gold") ||
    (isSilverTurn && piece === "grey_king") ||
    (!isSilverTurn && piece === "gold_king");

  const [computerMoved, setComputerMoved] = useState(false);

  useEffect(() => {
    if (isSilverTurn && computerMoved) {
      const timer = setTimeout(() => {
        computerMove(
          setBoard,
          board,
          isSilverTurn,
          setIsSilverTurn,
          setGameOver,
          setWin
        );
      }, 1000);
      setComputerMoved(false);
      return () => clearTimeout(timer);
    }
  }, [isSilverTurn, board]);

  return (
    <>
      <div
        className={`text-white min-w-[40px] sm:min-w-[50px] md:min-w-[60px] aspect-square flex items-center justify-center border border-white text-sm sm:text-base md:text-lg
        ${color} ${moves}
        ${window.innerWidth <= 375 ? "min-w-[40px] text-xs" : ""}
        ${window.innerWidth <= 360 ? "min-w-[45px] text-sm" : ""}
        ${window.innerWidth <= 344 ? "min-w-[50px] text-base" : ""}`}
        onClick={() => {
          if (isCurrentPlayerPiece || isHighlighted) {
            handleClick(
              cell,
              setBoard,
              board,
              isSilverTurn,
              setIsSilverTurn,
              gameOver,
              setGameOver,
              setWin,
              setComputerMoved
            );
          }
        }}
      >
        <Piece
          piece={piece}
          isHighlighted={isHighlighted}
          isSilverTurn={isSilverTurn}
          color={color}
        />
      </div>
    </>
  );
}

export default CellComputer;
