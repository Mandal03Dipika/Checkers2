import React from "react";

function Win({ restart, win }) {
  return (
    <>
      <div className="w-[90vw] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg flex justify-center items-center relative animate-fadeIn">
        <div className="w-full max-w-[200px] sm:max-w-[250px] md:max-w-[300px] aspect-square bg-[#3D3D3D] flex justify-center items-center rounded-full outline-double outline-2 outline-[#F2D888] shadow-[0px_4px_15px_rgba(255,215,0,0.3)]">
          <div className="w-[90%] max-w-[180px] sm:max-w-[220px] md:max-w-[260px] aspect-square bg-[#e39d4656] flex justify-center items-center rounded-full outline-double outline-2 outline-[#BF491F]">
            <div className="w-[75%] max-w-[150px] sm:max-w-[180px] md:max-w-[220px] aspect-square bg-[#733224] font-extrabold flex flex-col justify-center items-center rounded-full text-white outline-double outline-2 outline-[#FF3B30] text-shadow-md">
              <span className="text-lg sm:text-2xl text-[#D99F59]">{win}</span>
              <span className="text-2xl sm:text-4xl text-[#D99F59]">WIN!</span>
            </div>
          </div>
        </div>
        <div
          className="absolute bottom-[-30px] sm:bottom-[-40px] bg-[#D99F59] text-[#fffcfc] font-bold py-2 px-4 sm:px-6 rounded-full text-center text-sm sm:text-base md:text-lg outline-double outline-2 outline-[#FF2E2E] cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-[0px_4px_15px_rgba(255,140,0,0.6)]"
          onClick={restart}
        >
          PLAY AGAIN
        </div>
      </div>
    </>
  );
}

export default Win;
