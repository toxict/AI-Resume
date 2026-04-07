import React from "react";

const EmptyState = ({ topic, onRefresh }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 bg-white rounded-2xl border border-dashed border-slate-300 text-center">

      {/* Icon */}
      <div className="text-4xl mb-3 opacity-70">🔍</div>

      {/* Title */}
      <h3 className="text-lg font-bold text-slate-900 mb-1">
        No Questions Found
      </h3>

      {/* Description */}
      <p className="text-sm text-slate-500 max-w-sm">
        No questions available for{" "}
        <span className="font-semibold text-slate-900">
          "{topic || "this topic"}"
        </span>
        . Try another topic or refresh the page.
      </p>

      {/* Action Button */}
      <button
        onClick={onRefresh || (() => window.location.reload())}
        className="mt-5 px-5 py-2 bg-slate-900 text-white rounded-lg text-sm font-semibold hover:bg-black transition"
      >
        Refresh
      </button>

    </div>
  );
};

export default EmptyState;
