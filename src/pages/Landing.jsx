import { Navigate, useNavigate } from "react-router-dom";

function Landing() {
  const choice = ["Computer vs U", "U vs Opponent"];

  const img = ["images/1.webp", "images/2.webp"];

  const navigate = useNavigate();

  const choiceMade = (i) => {
    if (i == 0) {
      return navigate("/computer");
    } else {
      return navigate("/game");
    }
  };

  return (
    <>
      <div className="w-full flex flex-col items-center max-w-[95vw] sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw] xl:max-w-[60vw] 2xl:max-w-[50vw]">
        <div className="flex justify-center mb-4">
          <div className="px-4 py-2 text-xs text-white bg-black bg-opacity-50 border-2 border-white border-dashed rounded-lg shadow-md sm:text-sm md:text-base lg:text-lg">
            Checkers
          </div>
        </div>
        <div className="flex justify-center flex-col border-4 border-dashed border-white p-2 w-80 h-80 max-w-[95vw] sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw] xl:max-w-[60vw]">
          {choice.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center mb-4">
              <div
                className="flex justify-center w-64 px-4 py-2 text-center text-white bg-black bg-opacity-50 border-2 border-white border-dashed rounded-lg shadow-md sm:text-sm md:text-base lg:text-lg"
                onClick={() => choiceMade(rowIndex)}
              >
                <img
                  src={img[rowIndex]}
                  alt=""
                  className="mr-4 rounded-full size-12"
                />
                <span className="mt-2">{row}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Landing;
