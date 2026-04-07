import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ChevronLeft, UploadCloud } from "lucide-react";

const AdminPdfUpload = () => {
    const navigate = useNavigate();

    const [file, setFile] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        company: "",
        category: "Mock Test"
    });

    const BASE_URL = "http://localhost:5000";

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) return toast.error("Please select a PDF");

        const loading = toast.loading("Uploading PDF...");

        try {
            const data = new FormData();

            data.append("title", formData.title);
            data.append("company", formData.company);
            data.append("category", formData.category);
            data.append("pdfFile", file); // MUST match backend

            await axios.post(`${BASE_URL}/api/pdfs/upload`, data, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            toast.dismiss(loading);
            toast.success("PDF Uploaded 🚀");

            setTimeout(() => navigate("/admin"), 1200);

        } catch (err) {
            toast.dismiss(loading);
            toast.error("Upload failed");
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 p-3">
            <div className="max-w-[1200px] mx-auto">

                {/* HEADER */}
                <div className="flex justify-between items-center mb-3">
                    <button
                        onClick={() => navigate("/admin")}
                        className="flex items-center gap-2 text-slate-600 hover:text-black font-semibold"
                    >
                        <ChevronLeft size={18} /> Back
                    </button>

                    <button
                        form="pdf-form"
                        type="submit"
                        className="flex items-center gap-2 bg-slate-900 text-white px-6 py-2 rounded-xl font-bold shadow"
                    >
                        <UploadCloud size={18} /> Upload
                    </button>
                </div>

                <form id="pdf-form" onSubmit={handleSubmit} className="space-y-3">

                    {/* TITLE */}
                    <div className="bg-white p-4 rounded-2xl shadow border">
                        <label className="text-xs font-bold text-slate-500">
                            PDF Title
                        </label>

                        <textarea
                            rows={2}
                            placeholder="TCS Mock Test Paper 2025"
                            className="w-full mt-1 p-2 rounded-xl border border-black/20 bg-slate-50 font-semibold placeholder-slate-500 text-slate-900 resize-none"
                            required
                            onChange={(e) =>
                                setFormData({ ...formData, title: e.target.value })
                            }
                        />
                    </div>

                    {/* META */}
                    <div className="bg-white p-4 rounded-2xl shadow border grid grid-cols-3 gap-3">

                        <input
                            type="text"
                            placeholder="Company (TCS, Infosys...)"
                            className="p-2 rounded-xl border border-black/20 bg-slate-50 font-semibold placeholder-slate-500 text-slate-900"
                            required
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
                            <option>Mock Test</option>
                            <option>Previous Year Paper</option>
                            <option>Sample Paper</option>
                        </select>

                        <div className="text-sm font-semibold text-slate-500 flex items-center">
                            Only PDF files allowed
                        </div>
                    </div>

                    {/* FILE UPLOAD */}
                    <div className="bg-white p-3 rounded-2xl shadow border border-black/10">
                        <label className="text-xs font-bold text-black">
                            Attach PDF
                        </label>

                        <div className="mt-2 p-3 border border-black/20 rounded-xl bg-white text-center">
                            {file ? (
                                <p className="text-sm font-semibold text-black truncate">
                                    Selected: {file.name}
                                </p>
                            ) : (
                                <p className="text-xs text-black/60">
                                    Upload company-wise mock test paper (PDF)
                                </p>
                            )}
                        </div>

                        <input
                            type="file"
                            accept="application/pdf"
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


                </form>
            </div>
        </div>
    );
};

export default AdminPdfUpload;
