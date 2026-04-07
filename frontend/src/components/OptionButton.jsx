import React from "react";

const OptionButton = ({
  option,
  isSelected,
  isSubmitted,
  isCorrect,
  isWrong,
  onClick
}) => {
  let styles =
    "border-slate-300 bg-white text-slate-800 hover:border-slate-900 hover:bg-slate-50";

  if (isSubmitted) {
    if (isCorrect) {
      styles =
        "border-slate-900 bg-slate-900 text-white shadow-sm";
    } else if (isWrong) {
      styles =
        "border-slate-400 bg-white text-slate-900";
    } else {
      styles =
        "border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed";
    }
  } else if (isSelected) {
    styles =
      "border-slate-900 bg-slate-900 text-white shadow-sm";
  }

  return (
    <button
      disabled={isSubmitted}
      onClick={onClick}
      className={`w-full text-left p-3 md:p-3.5 rounded-lg border transition-all flex items-center justify-between text-sm font-semibold ${styles}`}
    >
      {/* Option Text */}
      <span className="leading-snug">{option}</span>

      {/* Right Indicator */}
      <div className="flex items-center ml-3">

        {/* Correct */}
        {isSubmitted && isCorrect && (
          <span className="w-5 h-5 flex items-center justify-center rounded-full bg-white text-slate-900 text-[11px] font-bold">
            ✓
          </span>
        )}

        {/* Wrong */}
        {isSubmitted && isWrong && (
          <span className="w-5 h-5 flex items-center justify-center rounded-full bg-slate-900 text-white text-[11px] font-bold">
            ✕
          </span>
        )}

        {/* Radio Indicator */}
        {!isSubmitted && (
          <div
            className={`w-4 h-4 rounded-full border flex items-center justify-center ${
              isSelected
                ? "border-white bg-white"
                : "border-slate-300"
            }`}
          >
            {isSelected && (
              <div className="w-1.5 h-1.5 bg-slate-900 rounded-full" />
            )}
          </div>
        )}
      </div>
    </button>
  );
};

export default OptionButton;
