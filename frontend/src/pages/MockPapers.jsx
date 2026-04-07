import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Search,
    ArrowLeft,
    FileText,
    Loader2,
    Eye,
    Download,
    Building2
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const MockPapers = () => {
    const navigate = useNavigate();

    const [pdfs, setPdfs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const BASE_URL = "http://localhost:5000";

    /* ---------------- FETCH ---------------- */
    useEffect(() => {
        const fetchPdfs = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/api/pdfs`);
                setPdfs(res.data);
            } catch {
                toast.error("Failed to load mock papers");
            } finally {
                setLoading(false);
            }
        };

        fetchPdfs();
    }, []);

    /* ---------------- SEARCH ---------------- */
    const filteredPdfs = pdfs.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    /* ---------------- DOWNLOAD ---------------- */
    const handleDownload = (url, name) => {
        const link = document.createElement("a");
        link.href = url;
        link.download = name || "mock-paper.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen bg-slate-50 p-3">
            <div className="max-w-[1400px] mx-auto">

                {/* ================= HEADER ================= */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">

                    <div>
                        <button
                            onClick={() => navigate("/")}
                            className="flex items-center gap-2 text-blue-600 font-semibold text-sm mb-1"
                        >
                            <ArrowLeft size={16} /> Back to Hub
                        </button>

                        <h1 className="text-2xl font-black text-slate-900">
                            Mock Test Papers
                        </h1>

                        <p className="text-sm text-slate-500">
                            Company-wise placement papers
                        </p>
                    </div>

                    {/* SEARCH */}
                    <div className="relative w-full md:w-72">
                        <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                            size={16}
                        />
                        <input
                            type="text"
                            placeholder="Search company or paper..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 rounded-lg border bg-white text-sm font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-slate-300"
                        />
                    </div>

                </div>

                {/* ================= TABLE ================= */}
                <div className="bg-white rounded-2xl border border-slate-300 overflow-hidden">

                    {loading ? (
                        <div className="py-16 flex flex-col items-center gap-3">
                            <Loader2 className="animate-spin text-slate-900" size={30} />
                            <p className="text-xs font-bold text-slate-500">
                                Loading Papers...
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">

                                {/* TABLE HEAD */}
                                <thead className="bg-slate-100 text-xs uppercase text-slate-600">
                                    <tr>
                                        <th className="p-3 text-left">Paper</th>
                                        <th className="p-3 text-left">Company</th>
                                        <th className="p-3 text-left">Category</th>
                                        <th className="p-3 text-center">Actions</th>
                                    </tr>
                                </thead>

                                {/* TABLE BODY */}
                                <tbody className="divide-y">

                                    {filteredPdfs.length > 0 ? (
                                        filteredPdfs.map((p) => (
                                            <tr key={p._id} className="hover:bg-slate-50">

                                                {/* TITLE */}
                                                <td className="p-3 font-semibold text-slate-900 align-middle">
                                                    <div className="flex items-center gap-2">
                                                        <FileText size={18} />
                                                        {p.title}
                                                    </div>
                                                </td>

                                                {/* COMPANY */}
                                                <td className="p-3 text-slate-700 font-semibold align-middle">
                                                    <Building2 size={14} className="inline mr-1" />
                                                    {p.company}
                                                </td>

                                                {/* CATEGORY */}
                                                <td className="p-3 align-middle">
                                                    <span className="px-2 py-1 bg-slate-100 rounded text-xs font-bold text-slate-900">
                                                        {p.category}
                                                    </span>
                                                </td>

                                                {/* ACTIONS */}
                                                <td className="p-3 text-center align-middle">
                                                    <div className="flex justify-center gap-2">

                                                        {/* DOWNLOAD */}
                                                        <button
                                                            onClick={async () => {
                                                                try {
                                                                    const res = await fetch(p.pdfUrl);
                                                                    const blob = await res.blob();

                                                                    const url = window.URL.createObjectURL(blob);

                                                                    const link = document.createElement("a");
                                                                    link.href = url;
                                                                    link.download = `${p.title}.pdf`;
                                                                    document.body.appendChild(link);
                                                                    link.click();

                                                                    link.remove();
                                                                    window.URL.revokeObjectURL(url);
                                                                } catch (err) {
                                                                    alert("Download failed");
                                                                }
                                                            }}
                                                            title="Download"
                                                            className="p-2 border border-slate-300 rounded-lg text-slate-900 hover:bg-black hover:text-white transition"
                                                        >
                                                            <Download size={16} />
                                                        </button>


                                                    </div>
                                                </td>

                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className="py-12 text-center">
                                                <div className="flex flex-col items-center gap-3 opacity-40">
                                                    <FileText size={48} className="text-slate-300" />
                                                    <p className="text-xs font-bold uppercase text-slate-700">
                                                        No papers found
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}

                                </tbody>
                            </table>
                        </div>
                    )}

                </div>

                {/* FOOTER */}
                <div className="text-center mt-2">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                        ZenCode Mock Vault • Placement Papers
                    </p>
                </div>

            </div>
        </div>
    );
};

export default MockPapers;
