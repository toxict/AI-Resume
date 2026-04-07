import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ChevronLeft, UploadCloud } from "lucide-react";

const AdminUpload = () => {
    const navigate = useNavigate();

    const [file, setFile] = useState(null);

    const [formData, setFormData] = useState({
        questionText: "",
        topic: "",
        category: "Quantitative",
        difficulty: "Medium",
        correctAnswer: "",
        solution: "",
        company: "",
        options: ["", "", "", ""],
    });

    const BASE_URL = "http://localhost:5000";

    const handleOptionChange = (i, val) => {
        const newOpts = [...formData.options];
        newOpts[i] = val;
        setFormData({ ...formData, options: newOpts });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.options.some((opt) => opt.trim() === "")) {
            return toast.error("Fill all options");
        }

        const answerExists = formData.options.some(
            (opt) =>
                opt.trim().toLowerCase() ===
                formData.correctAnswer.trim().toLowerCase()
        );

        if (!answerExists) {
            return toast.error("Correct answer must match one option");
        }

        const loading = toast.loading("Uploading...");

        try {
            const data = new FormData();

            Object.entries(formData).forEach(([key, value]) => {
                if (key === "options") {
                    value.forEach((opt) => data.append("options", opt));
                } else {
                    data.append(key, value);
                }
            });

            if (file) data.append("graphImage", file);

            await axios.post(`${BASE_URL}/api/questions/add`, data, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            toast.dismiss(loading);
            toast.success("Question Added 🚀");

            setTimeout(() => navigate("/admin"), 1200);
        } catch (err) {
            toast.dismiss(loading);
            toast.error("Upload failed");
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 p-3">
            <div className="max-w-[1700px] mx-auto">

                {/* HEADER */}
                <div className="flex justify-between items-center mb-3">
                    <button
                        onClick={() => navigate("/admin")}
                        className="flex items-center gap-2 text-slate-600 hover:text-black font-semibold"
                    >
                        <ChevronLeft size={18} /> Back
                    </button>

                    <button
                        form="upload-form"
                        type="submit"
                        className="flex items-center gap-2 bg-slate-900 text-white px-6 py-2 rounded-xl font-bold shadow"
                    >
                        <UploadCloud size={18} /> Upload
                    </button>
                </div>

                <form id="upload-form" onSubmit={handleSubmit} className="space-y-3">

                    {/* QUESTION */}
                    <div className="bg-white p-3 rounded-2xl shadow border">
                        <label className="text-xs font-bold text-slate-500">
                            Question
                        </label>

                        <textarea
                            placeholder="Enter question..."
                            rows={2}
                            className="w-full mt-1 p-2 rounded-xl border border-black/20 bg-slate-50 placeholder-slate-500 text-slate-900"
                            required
                            onChange={(e) =>
                                setFormData({ ...formData, questionText: e.target.value })
                            }
                        />
                    </div>

                    {/* OPTIONS */}
                    <div className="bg-white p-3 rounded-2xl shadow border grid grid-cols-4 gap-2">
                        {formData.options.map((opt, i) => (
                            <input
                                key={i}
                                type="text"
                                placeholder={`Option ${String.fromCharCode(65 + i)}`}
                                className="p-2 rounded-xl border border-black/20 bg-slate-50 font-semibold placeholder-slate-500 text-slate-900"
                                required
                                onChange={(e) => handleOptionChange(i, e.target.value)}
                            />
                        ))}
                    </div>

                    {/* META FIELDS */}
                    <div className="bg-white p-3 rounded-2xl shadow border grid grid-cols-5 gap-2">

                        <input
                            type="text"
                            placeholder="Topic"
                            className="p-2 rounded-xl border border-black/20 bg-slate-50 font-semibold placeholder-slate-500 text-slate-900"
                            required
                            onChange={(e) =>
                                setFormData({ ...formData, topic: e.target.value })
                            }
                        />

                        <input
                            type="text"
                            placeholder="Company"
                            className="p-2 rounded-xl border border-black/20 bg-slate-50 font-semibold placeholder-slate-500 text-slate-900"
                            onChange={(e) =>
                                setFormData({ ...formData, company: e.target.value })
                            }
                        />

                        <select
                            className="p-2 rounded-xl border border-black/20 bg-slate-50 font-semibold text-slate-900"
                            value={formData.category}
                            onChange={(e) =>
                                setFormData({ ...formData, category: e.target.value })
                            }
                        >
                            <option>Quantitative</option>
                            <option>Logical</option>
                            <option>Verbal</option>
                        </select>

                        <select
                            className="p-2 rounded-xl border border-black/20 bg-slate-50 font-semibold text-slate-900"
                            value={formData.difficulty}
                            onChange={(e) =>
                                setFormData({ ...formData, difficulty: e.target.value })
                            }
                        >
                            <option>Easy</option>
                            <option>Medium</option>
                            <option>Hard</option>
                        </select>

                        <input
                            type="text"
                            placeholder="Correct Answer"
                            className="p-2 rounded-xl border border-black/20 bg-slate-50 font-bold placeholder-slate-500 text-slate-900"
                            required
                            onChange={(e) =>
                                setFormData({ ...formData, correctAnswer: e.target.value })
                            }
                        />
                    </div>

                    {/* BOTTOM */}
                    <div className="grid grid-cols-2 gap-3">

                        {/* SOLUTION */}
                        <div className="bg-white p-3 rounded-2xl shadow border">
                            <label className="text-xs font-bold text-slate-500">
                                Solution
                            </label>

                            <textarea
                                rows={4}
                                placeholder="Step-by-step solution..."
                                className="w-full mt-1 p-2 rounded-xl border border-black/20 bg-slate-50 placeholder-slate-500 text-slate-900"
                                required
                                onChange={(e) =>
                                    setFormData({ ...formData, solution: e.target.value })
                                }
                            />
                        </div>

                        {/* IMAGE */}
                        <div className="bg-white p-3 rounded-2xl shadow border border-black/10">
                            <label className="text-xs font-bold text-black">
                                Attach Visual
                            </label>

                            <div className="mt-2 p-3 border border-black/20 rounded-xl bg-white text-center">
                                {file ? (
                                    <p className="text-sm font-semibold text-black truncate">
                                        Selected: {file.name}
                                    </p>
                                ) : (
                                    <p className="text-xs text-black/60">
                                        Best for Graphs or Tables
                                    </p>
                                )}
                            </div>

                            <input
                                type="file"
                                className="mt-2 w-full text-sm text-black
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border
              file:border-black
              file:text-sm file:font-semibold
              file:bg-black file:text-white
              hover:file:bg-white hover:file:text-black
              hover:file:border-black
              cursor-pointer"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </div>

                    </div>
                </form>
            </div>
        </div>
    );

};

export default AdminUpload;
