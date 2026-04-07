import React, { useState, useEffect } from "react";
import {
    CheckCircle2,
    Calendar as CalendarIcon,
    Trophy,
    Zap,
    BarChart3,
    ArrowUpRight,
    Search,
    Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
    const [solvedData, setSolvedData] = useState([]);
    const [stats, setStats] = useState({ Easy: 0, Medium: 0, Hard: 0 });
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const loadProgress = () => {
        const progress = JSON.parse(
            localStorage.getItem("zencode_progress") || "[]"
        );
        setSolvedData(progress);

        const counts = progress.reduce(
            (acc, item) => {
                acc[item.difficulty] = (acc[item.difficulty] || 0) + 1;
                return acc;
            },
            { Easy: 0, Medium: 0, Hard: 0 }
        );

        setStats(counts);
    };

    useEffect(() => {
        loadProgress();
        window.addEventListener("storage", loadProgress);
        return () => window.removeEventListener("storage", loadProgress);
    }, []);

    const totalSolved = solvedData.length;
    const progressPercentage = Math.min((totalSolved / 100) * 100, 100);

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 17) return "Good Afternoon";
        return "Good Evening";
    };

    const filteredSolved = solvedData.filter((item) =>
        item.topic.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4 md:p-6 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto space-y-5">

                {/* HEADER */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">

                    {/* PERFORMANCE CARD */}
                    <div className="lg:col-span-3 bg-white p-5 rounded-2xl border shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">

                        <div className="flex items-center gap-6">

                            {/* Progress Circle */}
                            <div className="relative w-28 h-28 flex items-center justify-center">
                                <svg className="w-full h-full -rotate-90">
                                    <circle
                                        cx="56"
                                        cy="56"
                                        r="50"
                                        fill="transparent"
                                        strokeWidth="10"
                                        className="text-slate-100"
                                        stroke="currentColor"
                                    />
                                    <circle
                                        cx="56"
                                        cy="56"
                                        r="50"
                                        fill="transparent"
                                        strokeWidth="10"
                                        strokeDasharray="314"
                                        strokeDashoffset={
                                            314 - (314 * progressPercentage) / 100
                                        }
                                        strokeLinecap="round"
                                        className="text-blue-600"
                                        stroke="currentColor"
                                    />
                                </svg>

                                <div className="absolute text-center">
                                    <div className="text-2xl font-black text-slate-900">
                                        {totalSolved}
                                    </div>
                                    <div className="text-[9px] font-bold text-slate-400 uppercase">
                                        Solved
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-black text-slate-900">
                                    Performance Index
                                </h3>

                                <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold border">
                                    <Trophy size={14} />
                                    {totalSolved >= 20 ? "Zen Master" : "Scholar"}
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="flex flex-col gap-3">
                            <StatBar label="Easy" count={stats.Easy} color="text-emerald-500" progress={(stats.Easy / 50) * 100} />
                            <StatBar label="Medium" count={stats.Medium} color="text-amber-500" progress={(stats.Medium / 30) * 100} />
                            <StatBar label="Hard" count={stats.Hard} color="text-red-500" progress={(stats.Hard / 20) * 100} />
                        </div>
                    </div>

                    {/* WELCOME CARD */}
                    <div className="bg-blue-600 p-5 rounded-2xl text-white flex flex-col justify-center relative overflow-hidden">
                        <Sparkles className="absolute -top-4 -right-4 text-white/20 w-20 h-20" />
                        <p className="text-[10px] font-bold uppercase tracking-wider">
                            {getGreeting()}
                        </p>
                        <h4 className="text-lg font-black mt-1">
                            Your Statistics
                        </h4>
                        <p className="text-xs text-blue-100 mt-1">
                            Track progress & mastery
                        </p>
                    </div>
                </div>

                {/* TABLE */}
                <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">

                    {/* TABLE HEADER */}
                    <div className="p-4 border-b flex flex-col md:flex-row justify-between items-center gap-3">

                        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                            <CheckCircle2 size={20} className="text-emerald-500" />
                            Mastery Log
                        </h3>

                        {/* SEARCH */}
                        <div className="relative w-full md:w-64">
                            <Search
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                size={16}
                            />

                            <input
                                type="text"
                                placeholder="Search topics..."
                                className="
      w-full pl-9 pr-3 py-2
      rounded-lg border bg-slate-50
      text-sm font-semibold
      text-slate-900            /* ✅ typed text dark */
      placeholder-slate-500     /* optional better placeholder */
      outline-none
      focus:ring-2 focus:ring-blue-200
    "
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                    </div>

                    {/* TABLE BODY */}
                    <div className="overflow-x-auto">
                        <table className="w-full table-fixed border-collapse">

                            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                                <tr className="bg-slate-50/50">
                                    <th className="p-4 text-[10px] font-black uppercase text-slate-400 w-[60%] text-left">
                                        Question
                                    </th>
                                    <th className="p-4 text-[10px] font-black uppercase text-slate-400 w-[15%] text-center">
                                        Difficulty
                                    </th>
                                    <th className="p-4 text-[10px] font-black uppercase text-slate-400 w-[15%] text-center">
                                        Date
                                    </th>
                                    <th className="p-4 text-[10px] font-black uppercase text-slate-400 w-[10%] text-center">
                                        Action
                                    </th>
                                </tr>

                            </thead>

                            <tbody className="divide-y">

                                {filteredSolved.length > 0 ? (
                                    [...filteredSolved].reverse().map((item, idx) => (
                                        <tr key={idx} className="hover:bg-slate-50/80 transition-colors">

                                            {/* QUESTION */}
                                            <td className="p-4 align-middle">
                                                <div className="flex items-center gap-3">

                                                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                                                        <Zap size={18} />
                                                    </div>

                                                    <span className="font-semibold text-slate-900 line-clamp-2">
                                                        {item.questionText}
                                                    </span>

                                                </div>
                                            </td>

                                            {/* DIFFICULTY */}
                                            <td className="p-4 text-center align-middle">
                                                <span className={`inline-flex px-3 py-1 rounded-lg text-xs font-bold border
      ${item.difficulty === 'Easy'
                                                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                                        : item.difficulty === 'Medium'
                                                            ? 'bg-amber-50 text-amber-600 border-amber-100'
                                                            : 'bg-red-50 text-red-600 border-red-100'}
    `}>
                                                    {item.difficulty}
                                                </span>
                                            </td>

                                            {/* DATE */}
                                            <td className="p-4 text-center align-middle whitespace-nowrap text-slate-600 font-semibold">
                                                {item.solvedDate
                                                    ? new Date(item.solvedDate).toLocaleDateString("en-GB", {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric",
                                                    })
                                                    : "-"}
                                            </td>

                                            {/* ACTION */}
                                            <td className="p-4 text-center align-middle">
                                                <button
                                                    onClick={() => navigate(`/question/${item.questionId}`)}
                                                    className="p-2 border rounded-lg  text-slate-800 hover:bg-slate-900 hover:text-white transition"
                                                >
                                                    <ArrowUpRight size={16} />
                                                </button>
                                            </td>

                                        </tr>

                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="py-1 text-center">
                                            <BarChart3 size={48} className="mx-auto text-slate-200 mb-3" />
                                            <p className="text-slate-400 font-bold text-sm">
                                                No entries found
                                            </p>
                                        </td>
                                    </tr>
                                )}

                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    );
};

const StatBar = ({ label, count, color, progress }) => (
    <div className="flex items-center justify-between gap-3 min-w-[180px]">
        <span className="text-[10px] font-bold uppercase text-slate-400">
            {label}
        </span>
        <div className="flex items-center gap-2">
            <span className={`text-lg font-black ${color}`}>{count}</span>
            <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                    className={`h-full bg-current ${color}`}
                    style={{ width: `${Math.min(progress, 100)}%` }}
                />
            </div>
        </div>
    </div>
);

const DifficultyBadge = ({ difficulty }) => {
    const styles = {
        Easy: "bg-emerald-50 text-emerald-700 border-emerald-200",
        Medium: "bg-amber-50 text-amber-700 border-amber-200",
        Hard: "bg-red-50 text-red-700 border-red-200",
    };

    return (
        <span className={`px-2 py-1 rounded text-xs font-bold border ${styles[difficulty]}`}>
            {difficulty}
        </span>
    );
};

export default StudentDashboard;
