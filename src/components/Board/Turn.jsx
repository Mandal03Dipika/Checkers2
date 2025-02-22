import { useContext } from "react";
import BoardContext from "../../context/BoardContext";

function Turn() {
  const { isSilverTurn } = useContext(BoardContext);

  return (
    <>
      <div className="flex justify-center mb-4">
        <div className="px-4 py-2 text-xs text-center text-white bg-black bg-opacity-50 border-2 border-white border-dashed rounded-lg shadow-md sm:text-sm md:text-base lg:text-lg">
          {isSilverTurn ? "Silver" : "Gold"} Turn
        </div>
      </div>
    </>
  );
}

export default Turn;
