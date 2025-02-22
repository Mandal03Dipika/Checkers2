import { useState } from "react";
import CellContext from "./CellContext";
import useSound from "use-sound";
import sound from "/sounds/move-self.mp3";

const CellContextProvider = ({ children }) => {
  const movementUp = [
    [1, -1],
    [1, 1],
  ];

  const movementDown = [
    [-1, -1],
    [-1, 1],
  ];

  const movementKing = [
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];

  const [highlightedCells, setHighlightedCells] = useState([]);

  const [selectedPiece, setSelectedPiece] = useState(null);

  const [play] = useSound(sound);

  const handleClick = (
    cell,
    setBoard,
    board,
    isSilverTurn,
    setIsSilverTurn,
    gameOver,
    setGameOver,
    setWin
  ) => {
    if (gameOver) {
      return;
    }
    if (
      (cell.piece !== null && selectedPiece === null) ||
      (cell.piece !== null && selectedPiece !== null)
    ) {
      let possibleMoves = [];
      const movement = moves(cell.piece);
      movement.forEach((move) => {
        let row = cell.row + move[0];
        let col = cell.col + move[1];
        if (row >= 0 && row < 8 && col >= 0 && col < 8) {
          if (board[row][col].piece === null) {
            possibleMoves.push({ row, col });
          } else if (
            (cell.piece === "grey" && board[row][col].piece === "gold") ||
            (cell.piece === "gold" && board[row][col].piece === "grey") ||
            (cell.piece === "grey_king" && board[row][col].piece === "gold") ||
            (cell.piece === "gold_king" && board[row][col].piece === "grey") ||
            (cell.piece === "grey_king" &&
              board[row][col].piece === "gold_king") ||
            (cell.piece === "gold_king" &&
              board[row][col].piece === "grey_king") ||
            (cell.piece === "gold" && board[row][col].piece === "grey_king") ||
            (cell.piece === "grey" && board[row][col].piece === "gold_king")
          ) {
            let jumpRow = row + move[0];
            let jumpCol = col + move[1];
            if (
              jumpRow >= 0 &&
              jumpRow < 8 &&
              jumpCol >= 0 &&
              jumpCol < 8 &&
              board[jumpRow][jumpCol].piece === null
            ) {
              possibleMoves.push({ row: jumpRow, col: jumpCol });
            }
          }
        }
      });
      setSelectedPiece(cell);
      setHighlightedCells(possibleMoves);
    } else if (selectedPiece !== null) {
      const isValidMove = highlightedCells.some(
        (highlightedCell) =>
          highlightedCell.row === cell.row && highlightedCell.col === cell.col
      );
      if (isValidMove) {
        const newBoard = board.map((row) =>
          row.map((square) => {
            if (
              square.row === selectedPiece.row &&
              square.col === selectedPiece.col
            ) {
              return { ...square, piece: null };
            } else if (square.row === cell.row && square.col === cell.col) {
              return { ...square, piece: selectedPiece.piece };
            }
            return square;
          })
        );
        if (Math.abs(cell.row - selectedPiece.row) === 2) {
          const capturedRow = (cell.row + selectedPiece.row) / 2;
          const capturedCol = (cell.col + selectedPiece.col) / 2;
          newBoard[capturedRow][capturedCol].piece = null;
        }
        if (cell.row === 0 && selectedPiece.piece === "gold") {
          newBoard[cell.row][cell.col].piece = "gold_king";
        } else if (cell.row === 7 && selectedPiece.piece === "grey") {
          newBoard[cell.row][cell.col].piece = "grey_king";
        }
        setBoard(newBoard);
        setSelectedPiece(null);
        setHighlightedCells([]);
        setIsSilverTurn(!isSilverTurn);
        checkGameOver(newBoard, setGameOver, setWin);
        play();
      } else {
        setSelectedPiece(null);
        setHighlightedCells([]);
      }
    }
    play();
  };

  const checkGameOver = (board, setGameOver, setWin) => {
    const greyPieces = board
      .flat()
      .filter(
        (square) => square.piece === "grey" || square.piece === "grey_king"
      ).length;
    const goldPieces = board
      .flat()
      .filter(
        (square) => square.piece === "gold" || square.piece === "gold_king"
      ).length;
    if (greyPieces === 0 || goldPieces === 0) {
      setGameOver(true);
      if (greyPieces === 0) {
        setWin("GOLD");
      } else {
        setWin("SILVER");
      }
    }
  };

  const moves = (cell) => {
    return cell === "grey"
      ? movementUp
      : cell === "gold"
      ? movementDown
      : movementKing;
  };

  return (
    <CellContext.Provider value={{ handleClick, highlightedCells }}>
      {children}
    </CellContext.Provider>
  );
};

export default CellContextProvider;
