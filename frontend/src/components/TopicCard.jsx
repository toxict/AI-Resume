import React from 'react';

const TopicCard = ({ title, description, icon, colorClass, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="
        bg-white p-5
        rounded-2xl
        border border-slate-200
        shadow-sm
        hover:-translate-y-1 hover:shadow-lg
        transition-all duration-200
        cursor-pointer group
        h-full flex flex-col items-start
        relative overflow-hidden
      "
    >
      {/* Subtle decorative corner */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-slate-50 rounded-bl-3xl -mr-4 -mt-4 z-0 transition-transform group-hover:scale-110" />

      {/* Icon */}
      <div
        className={`
          relative z-10
          w-12 h-12 rounded-xl
          ${colorClass}
          flex items-center justify-center
          text-2xl
          mb-3
          shadow
          transition-transform
          group-hover:scale-105
        `}
      >
        {icon}
      </div>

      {/* Title */}
      <h3
        className="
          relative z-10
          text-lg font-extrabold
          text-slate-900
          mb-1
          group-hover:text-blue-600
          transition-colors
        "
      >
        {title}
      </h3>

      {/* Description */}
      <p
        className="
          relative z-10
          text-slate-500
          text-sm
          font-medium
          leading-relaxed
          mb-4
          flex-grow
        "
      >
        {description}
      </p>

      {/* CTA */}
      <div
        className="
          relative z-10
          mt-auto
          flex items-center gap-1.5
          text-slate-900
          font-bold
          text-[11px]
          uppercase tracking-wider
          group-hover:gap-2
          transition-all
        "
      >
        Start Now <span>→</span>
      </div>
    </div>
  );
};

export default TopicCard;
