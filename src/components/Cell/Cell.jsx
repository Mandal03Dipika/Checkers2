import { useContext } from "react";
import CellContext from "../../context/CellContext";
import Piece from "../Piece/Piece";

function Cell({
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
  const { highlightedCells, handleClick } = useContext(CellContext);

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
              setWin
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

export default Cell;
