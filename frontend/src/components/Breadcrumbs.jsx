import React from "react";

const Breadcrumbs = ({ activeTopic }) => {
  return (
    <div className="flex items-center mb-4">

      <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-xl shadow-sm">

        <span className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition">
          Dashboard
        </span>

        <span className="text-slate-300 text-xs">/</span>

        <span className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition">
          Aptitude
        </span>

        <span className="text-slate-300 text-xs">/</span>

        <span className="text-sm font-bold text-slate-900 uppercase tracking-wide">
          {activeTopic || "All Questions"}
        </span>

      </div>
    </div>
  );
};

export default Breadcrumbs;
