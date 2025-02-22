import { useEffect, useState } from "react";
import BoardContext from "./BoardContext";

const BoardContextProvider = ({ children }) => {
  const [board, setBoard] = useState([]);

  const [gameOver, setGameOver] = useState(false);

  const [win, setWin] = useState("");

  const [isSilverTurn, setIsSilverTurn] = useState(false);

  const [showWinModal, setShowWinModal] = useState(false);

  const generateBoard = () => {
    const newBoard = Array.from({ length: 8 }, (_, row) =>
      Array.from({ length: 8 }, (_, col) => {
        return {
          row: row,
          col: col,
          piece:
            (row + col) % 2 === 1 &&
            (row < 3 ? "grey" : row > 4 ? "gold" : null),
        };
      })
    );
    setBoard(newBoard);
  };

  const restart = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (gameOver) {
      const timer = setTimeout(() => {
        setShowWinModal(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setShowWinModal(false);
    }
  }, [gameOver]);

  useEffect(() => {
    generateBoard();
  }, []);

  return (
    <BoardContext.Provider
      value={{
        board,
        generateBoard,
        setBoard,
        isSilverTurn,
        setIsSilverTurn,
        gameOver,
        setGameOver,
        restart,
        win,
        setWin,
        showWinModal,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export default BoardContextProvider;
