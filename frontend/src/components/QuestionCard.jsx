import React from "react";
import { Link } from "react-router-dom";

const QuestionCard = ({ question, index }) => {

  const difficultyColors = {
    Easy: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Medium: "bg-amber-50 text-amber-700 border-amber-200",
    Hard: "bg-rose-600 text-white border-rose-600"
  };

  // 🎨 Color palette for tags
  const getColorForString = (str) => {
    const colors = [
      "bg-blue-50 text-blue-700 border-blue-200",
      "bg-purple-50 text-purple-700 border-purple-200",
      "bg-pink-50 text-pink-700 border-pink-200",
      "bg-orange-50 text-orange-700 border-orange-200",
      "bg-emerald-50 text-emerald-700 border-emerald-200",
      "bg-cyan-50 text-cyan-700 border-cyan-200",
      "bg-indigo-50 text-indigo-700 border-indigo-200",
      "bg-rose-50 text-rose-700 border-rose-200"
    ];

    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <Link
      to={`/question/${question._id}`}
      className="group bg-white p-4 rounded-2xl border border-slate-300 hover:border-slate-900 hover:shadow-md transition-all flex items-center justify-between"
    >
      <div className="flex items-start gap-4">

        {/* Index */}
        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-sm group-hover:bg-slate-900 group-hover:text-white transition">
          {index + 1}
        </div>

        {/* Content */}
        <div>

          <h4 className="text-slate-900 font-semibold text-base leading-snug">
            {question.questionText.length > 95
              ? question.questionText.substring(0, 95) + "..."
              : question.questionText}
          </h4>

          {/* TAGS */}
          <div className="flex flex-wrap items-center gap-2 mt-2">

            {/* Category */}
            <span
              className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded border ${getColorForString(
                question.category || "default"
              )}`}
            >
              {question.category}
            </span>

            {/* Topic */}
            <span
              className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${getColorForString(
                question.topic || "default"
              )}`}
            >
              {question.topic}
            </span>

            {/* Difficulty */}
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${difficultyColors[question.difficulty]}`}
            >
              {question.difficulty}
            </span>

            {/* Company */}
            {question.company && (
              <span
                className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${getColorForString(
                  question.company
                )}`}
              >
                {question.company}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Solve CTA */}
      <div className="hidden md:flex items-center">
        <span className="text-xs font-bold text-slate-900 opacity-0 group-hover:opacity-100 transition transform translate-x-2 group-hover:translate-x-0">
          Solve →
        </span>
      </div>
    </Link>
  );
};

export default QuestionCard;
