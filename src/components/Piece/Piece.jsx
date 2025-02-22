import React from "react";

function Piece({ piece, isHighlighted, isSilverTurn, color }) {
  return (
    <>
      <div
        className={`w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 
          rounded-full text-center font-bold flex items-center justify-center shadow-lg
          ${color === "bg-black" ? "block" : "hidden"}
          ${
            piece === "grey"
              ? "bg-[#B0B0B0] border-2 border-[#909090] shadow-[inset_0_4px_6px_rgba(255,255,255,0.5),inset_0_-4px_6px_rgba(0,0,0,0.5),0_6px_12px_rgba(0,0,0,0.6)]"
              : piece === "gold"
              ? "bg-[#E6B400] border-2 border-[#C99C00] shadow-[inset_0_4px_6px_rgba(255,255,255,0.5),inset_0_-4px_6px_rgba(0,0,0,0.4),0_6px_12px_rgba(0,0,0,0.5)]"
              : piece === "grey_king"
              ? "bg-[#909090] text-black shadow-[inset_0_4px_6px_rgba(255,255,255,0.5),inset_0_-4px_6px_rgba(0,0,0,0.5),0_6px_12px_rgba(0,0,0,0.6)]"
              : piece === "gold_king"
              ? "bg-[#C99C00] text-[#4F3201] shadow-[inset_0_4px_6px_rgba(255,255,255,0.5),inset_0_-4px_6px_rgba(0,0,0,0.4),0_6px_12px_rgba(0,0,0,0.5)]"
              : isHighlighted && isSilverTurn
              ? "bg-[#f0ebeb75]"
              : isHighlighted && !isSilverTurn
              ? "bg-[#FFECB3]"
              : ""
          }
          ${window.innerWidth <= 375 ? "w-5 h-5 text-xs" : ""}
          ${window.innerWidth <= 360 ? "w-6 h-6 text-sm" : ""}
          ${window.innerWidth <= 344 ? "w-7 h-7 text-base" : ""}
        `}
      >
        {piece == "grey_king" || piece == "gold_king" ? "K" : ""}
      </div>
    </>
  );
}

export default Piece;
