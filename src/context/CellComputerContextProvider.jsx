import { useEffect, useState } from "react";
import useSound from "use-sound";
import sound from "/sounds/move-self.mp3";
import CellComputerContext from "./CellComputerContext";

const CellComputerContextProvider = ({ children }) => {
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

  const [capture, setCapture] = useState(false);

  const handleClick = (
    cell,
    setBoard,
    board,
    isSilverTurn,
    setIsSilverTurn,
    gameOver,
    setGameOver,
    setWin,
    setComputerMoved
  ) => {
    if (gameOver) return;

    if (
      (cell.piece !== null && selectedPiece === null) ||
      (cell.piece !== null && selectedPiece !== null)
    ) {
      const movement = moves(cell.piece);
      let possibleMove = possibleMoves(movement, cell, board);
      setSelectedPiece(cell);
      setHighlightedCells(possibleMove);
    } else if (selectedPiece !== null) {
      const isValidMove = highlightedCells.some(
        (highlightedCell) =>
          highlightedCell.row === cell.row && highlightedCell.col === cell.col
      );

      if (isValidMove) {
        const newBoard = boardSwap(board, selectedPiece, cell);
        if (cell.row === 0 && selectedPiece.piece === "gold") {
          newBoard[cell.row][cell.col].piece = "gold_king";
        }
        setBoard(newBoard);
        setSelectedPiece(null);
        setHighlightedCells([]);
        if (capture && hasFurtherCaptures(selectedPiece, cell, newBoard)) {
          setTimeout(() => {
            const move = {
              row: cell.row,
              col: cell.col,
              piece: selectedPiece.piece,
            };
            setSelectedPiece(move);
            setHighlightedCells(
              possibleMoves(moves(move.piece), move, newBoard)
            );
          }, 300);
          checkGameOver(newBoard, setGameOver, setWin);
          play();
        } else {
          setIsSilverTurn(!isSilverTurn);
          checkGameOver(newBoard, setGameOver, setWin);
          play();
          setComputerMoved(true);
        }
      } else {
        setSelectedPiece(null);
        setHighlightedCells([]);
      }
    }
  };

  const hasFurtherCaptures = (selectedPiece, cell, board) => {
    const movement = moves(selectedPiece.piece);
    const move = {
      row: cell.row,
      col: cell.col,
      piece: selectedPiece.piece,
    };
    const x = captureMove(movement, move, board);
    if (x.length != 0) {
      return true;
    }
    return false;
  };

  const captureMove = (movement, cell, board) => {
    let possibleMove = [];
    movement.forEach((move) => {
      let row = cell.row + move[0];
      let col = cell.col + move[1];
      if (row >= 0 && row < 8 && col >= 0 && col < 8) {
        if (
          (cell.piece === "grey" && board[row][col].piece === "gold") ||
          (cell.piece === "grey_king" &&
            (board[row][col].piece === "gold" ||
              board[row][col].piece === "gold_king")) ||
          (cell.piece === "gold" && board[row][col].piece === "grey") ||
          (cell.piece === "gold_king" &&
            (board[row][col].piece === "grey" ||
              board[row][col].piece === "grey_king"))
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
            possibleMove.push({ row: jumpRow, col: jumpCol });
          }
        }
      }
    });
    return possibleMove;
  };

  const possibleMoves = (movement, cell, board) => {
    let possibleMove = [];
    let canJump = false;
    setCapture(canJump);
    movement.forEach((move) => {
      let row = cell.row + move[0];
      let col = cell.col + move[1];
      if (row >= 0 && row < 8 && col >= 0 && col < 8) {
        if (board[row][col].piece === null) {
          possibleMove.push({ row, col });
        } else if (
          (cell.piece === "grey" && board[row][col].piece === "gold") ||
          (cell.piece === "grey_king" &&
            (board[row][col].piece === "gold" ||
              board[row][col].piece === "gold_king")) ||
          (cell.piece === "gold" && board[row][col].piece === "grey") ||
          (cell.piece === "gold_king" &&
            (board[row][col].piece === "grey" ||
              board[row][col].piece === "grey_king"))
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
            possibleMove.push({ row: jumpRow, col: jumpCol });
            canJump = true;
          }
        }
      }
    });
    if (canJump) {
      setCapture(canJump);
    }
    return possibleMove;
  };

  const getAllPossibleMoves = (board, isSilverTurn) => {
    const possibleMove = [];
    board.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (
          (cell.piece === "grey" || cell.piece === "grey_king") &&
          isSilverTurn
        ) {
          const movement = moves(cell.piece);
          const moveOptions = possibleMoves(movement, cell, board);
          moveOptions.forEach((move) => {
            possibleMove.push({ from: cell, to: move });
          });
        }
      });
    });
    possibleMove.sort((a, b) => {
      const isJumpA = Math.abs(a.from.row - a.to.row) === 2;
      const isJumpB = Math.abs(b.from.row - b.to.row) === 2;
      if (isJumpA && !isJumpB) return -1;
      if (!isJumpA && isJumpB) return 1;
      return 0;
    });
    return possibleMove;
  };

  const computerMove = (
    setBoard,
    board,
    isSilverTurn,
    setIsSilverTurn,
    setGameOver,
    setWin
  ) => {
    const possibleMoves = getAllPossibleMoves(board, isSilverTurn);
    if (possibleMoves.length === 0) {
      setGameOver(true);
      setWin(isSilverTurn ? "Gold" : "Silver");
      return;
    }
    const randomMove =
      possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    const newBoard = boardSwap(board, randomMove.from, randomMove.to);
    if (randomMove.to.row === 7 && randomMove.from.piece === "grey") {
      newBoard[randomMove.to.row][randomMove.to.col].piece = "grey_king";
    }
    setBoard(newBoard);
    setIsSilverTurn(false);
    checkGameOver(newBoard, setGameOver, setWin);
    play();
  };

  const boardSwap = (board, selectedPiece, cell) => {
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
    return newBoard;
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
    <CellComputerContext.Provider
      value={{ handleClick, highlightedCells, computerMove }}
    >
      {children}
    </CellComputerContext.Provider>
  );
};

export default CellComputerContextProvider;
