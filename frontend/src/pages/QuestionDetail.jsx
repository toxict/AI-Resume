import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import OptionButton from "../components/OptionButton";
import toast from "react-hot-toast";

const QuestionDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [q, setQ] = useState(null);
    const [selected, setSelected] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(45);

    const BASE_URL = "http://localhost:5000";

    /* ---------------- FETCH ---------------- */
    useEffect(() => {
        axios
            .get(`${BASE_URL}/api/questions/${id}`)
            .then((res) => setQ(res.data))
            .catch(console.error);
    }, [id]);

    /* ---------------- TIMER ---------------- */
    useEffect(() => {
        if (!q || submitted) return;

        if (timeLeft <= 0) {
            setSubmitted(true);
            toast("Time's up ⏰");
            return;
        }

        const t = setInterval(() => setTimeLeft((p) => p - 1), 1000);
        return () => clearInterval(t);
    }, [timeLeft, submitted, q]);

    const format = (s) => (s < 10 ? `0${s}` : s);

    /* ---------------- SUBMIT ---------------- */
    const handleSubmit = () => {
        if (!selected) return;

        setSubmitted(true);

        if (selected === q.correctAnswer)
            toast.success("Correct 🎉");
        else toast.error("Wrong ❌");
    };

    /* ---------------- REATTEMPT ---------------- */
    const reattempt = () => {
        setSelected(null);
        setSubmitted(false);
        setTimeLeft(45);
    };

    if (!q)
        return (
            <div className="h-screen flex items-center justify-center font-bold">
                Loading...
            </div>
        );

    return (
        <div className="min-h-screen bg-slate-100 px-3 py-3">
            <div className="max-w-7xl mx-auto space-y-3">

                {/* BACK */}
                <button
                    onClick={() => navigate(-1)}
                    className="text-sm font-semibold text-slate-600 hover:text-black"
                >
                    ← Back
                </button>

                {/* ================= TOP GRID ================= */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">

                    {/* ========= QUESTION CARD ========= */}
                    <div className="lg:col-span-9 bg-white border rounded-xl p-4 space-y-3 shadow-sm">

                        {/* TAGS */}
                        <div className="flex flex-wrap gap-2 text-[11px] font-bold uppercase">
                            <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded">
                                {q.topic}
                            </span>

                            {q.company && (
                                <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded">
                                    {q.company}
                                </span>
                            )}

                            <span className="px-2 py-1 bg-slate-900 text-white rounded">
                                {q.difficulty}
                            </span>
                        </div>

                        {/* QUESTION TEXT */}
                        <h2 className="text-base md:text-lg font-semibold text-slate-900 leading-snug">
                            {q.questionText}
                        </h2>

                        {/* IMAGE */}
                        {q.imageUrl && (
                            <div className="border rounded-lg bg-slate-50 p-2 flex justify-center">
                                <img
                                    src={q.imageUrl}
                                    alt="Question visual"
                                    className="max-h-64 object-contain"
                                    onError={(e) => (e.currentTarget.style.display = "none")}
                                />
                            </div>
                        )}
                    </div>

                    {/* ========= TIMER PANEL ========= */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-xl border p-4 text-center shadow-sm sticky top-3">

                            {/* SUBMIT */}
                            <button
                                disabled={!selected || submitted}
                                onClick={handleSubmit}
                                className="w-full mb-3 py-2 rounded-lg font-bold text-sm bg-slate-900 text-white disabled:bg-slate-200 disabled:text-slate-400"
                            >
                                Submit
                            </button>

                            <p className="text-[11px] font-bold text-slate-400 uppercase">
                                Timer
                            </p>

                            <p
                                className={`text-3xl font-black tabular-nums ${timeLeft <= 10
                                        ? "text-red-500 animate-pulse"
                                        : "text-slate-900"
                                    }`}
                            >
                                00:{format(timeLeft)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* ================= OPTIONS CARD ================= */}
                <div className="bg-white border rounded-xl p-4 shadow-sm">

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {q.options.map((opt, i) => (
                            <OptionButton
                                key={i}
                                option={opt}
                                isSelected={selected === opt}
                                isSubmitted={submitted}
                                isCorrect={opt === q.correctAnswer}
                                isWrong={selected === opt && opt !== q.correctAnswer}
                                onClick={() => setSelected(opt)}
                            />
                        ))}
                    </div>
                </div>

                {/* ================= RESULT CARD ================= */}
                {submitted && (
                    <div className="bg-white border rounded-xl p-4 shadow-sm space-y-2">

                        <div className="text-[11px] font-bold text-slate-500 uppercase">
                            Correct Answer
                        </div>

                        <div className="text-lg font-semibold text-slate-900">
                            {q.correctAnswer}
                        </div>

                        {q.solution && (
                            <div className="text-sm text-slate-600 border-t pt-3">
                                {q.solution}
                            </div>
                        )}

                        <button
                            onClick={reattempt}
                            className="mt-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-semibold"
                        >
                            Reattempt
                        </button>
                    </div>
                )}
            </div>
        </div>
    );

};

export default QuestionDetail;
