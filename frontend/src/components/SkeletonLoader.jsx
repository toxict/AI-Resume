import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="space-y-3 animate-pulse">
      {[1, 2, 3, 4].map((n) => (
        <div
          key={n}
          className="bg-white p-4 rounded-2xl border border-slate-300 flex items-center justify-between"
        >
          <div className="flex items-start gap-4 w-full">

            {/* Index Skeleton */}
            <div className="w-10 h-10 rounded-xl bg-slate-200"></div>

            <div className="flex-1 space-y-2">

              {/* Question Text */}
              <div className="h-4 bg-slate-200 rounded w-3/4"></div>
              <div className="h-4 bg-slate-200 rounded w-1/2"></div>

              {/* Tags */}
              <div className="flex gap-2 mt-2">
                <div className="h-5 w-16 bg-slate-200 rounded"></div>
                <div className="h-5 w-20 bg-slate-200 rounded"></div>
                <div className="h-5 w-14 bg-slate-200 rounded"></div>
              </div>

            </div>
          </div>

          {/* CTA Skeleton */}
          <div className="hidden md:block">
            <div className="h-3 w-14 bg-slate-200 rounded"></div>
          </div>

        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
