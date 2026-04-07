import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import {
  Plus,
  Search,
  Trash2,
  Edit3,
  LayoutGrid,
  Loader2,
  Video,
  PlayCircle,
  Building2,
  FileText,
  ExternalLink,
  Download
} from "lucide-react";

const AdminDashboard = () => {
  const [questions, setQuestions] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [pdfs, setPdfs] = useState([]);
  const [viewMode, setViewMode] = useState("questions");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const BASE_URL = "http://localhost:5000";

  useEffect(() => {
    fetchData();
  }, []);

  /* ================= FETCH ================= */

  const fetchData = async () => {
    setLoading(true);
    try {
      const [qRes, lRes, pRes] = await Promise.all([
        axios.get(`${BASE_URL}/api/questions`),
        axios.get(`${BASE_URL}/api/learn`),
        axios.get(`${BASE_URL}/api/pdfs`)
      ]);

      setQuestions(qRes.data);
      setLectures(lRes.data);
      setPdfs(pRes.data);
    } catch {
      toast.error("Failed to sync database");
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE ================= */

  const handleDeleteQuestion = async (id) => {
    if (!window.confirm("Delete this question?")) return;

    await axios.delete(`${BASE_URL}/api/questions/${id}`);
    setQuestions(questions.filter((q) => q._id !== id));

    toast.success("Question deleted");
  };

  const handleDeleteLecture = async (id) => {
    if (!window.confirm("Delete this lecture?")) return;

    await axios.delete(`${BASE_URL}/api/learn/${id}`);
    setLectures(lectures.filter((l) => l._id !== id));

    toast.success("Lecture deleted");
  };

  const handleDeletePdf = async (id) => {
    if (!window.confirm("Delete this PDF?")) return;

    await axios.delete(`${BASE_URL}/api/pdfs/${id}`);
    setPdfs(pdfs.filter((p) => p._id !== id));

    toast.success("PDF deleted");
  };

  /* ================= FILTERS ================= */

  const filteredQuestions = questions.filter(
    (q) =>
      q.questionText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (q.company &&
        q.company.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredLectures = lectures.filter(
    (l) =>
      l.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPdfs = pdfs.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const matchCount =
    viewMode === "questions"
      ? filteredQuestions.length
      : viewMode === "lectures"
        ? filteredLectures.length
        : filteredPdfs.length;

  return (
    <div className="min-h-screen bg-slate-50 p-3">
      <div className="max-w-[1400px] mx-auto">

        {/* ================= HEADER ================= */}

        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div>
            <h1 className="text-2xl font-black text-slate-900">
              Command Center
            </h1>

            {/* VIEW MODES */}
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => {
                  setViewMode("questions");
                  setSearchTerm("");
                }}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold ${viewMode === "questions"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-200 text-slate-700"
                  }`}
              >
                Questions ({questions.length})
              </button>

              <button
                onClick={() => {
                  setViewMode("lectures");
                  setSearchTerm("");
                }}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold ${viewMode === "lectures"
                  ? "bg-white border text-slate-900"
                  : "bg-slate-200 text-slate-700"
                  }`}
              >
                Lectures ({lectures.length})
              </button>

              <button
                onClick={() => {
                  setViewMode("pdfs");
                  setSearchTerm("");
                }}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold ${viewMode === "pdfs"
                  ? "bg-white border text-slate-900"
                  : "bg-slate-200 text-slate-700"
                  }`}
              >
                Mock PDFs ({pdfs.length})
              </button>
            </div>
          </div>

          {/* ACTION BUTTONS */}

          <div className="flex gap-2">
            <Link
              to="/admin/add-lecture"
              className="flex items-center gap-2 px-4 py-2  bg-slate-900 border rounded-lg text-sm font-bold"
            >
              <Video size={16} /> Lecture
            </Link>

            <Link
              to="/admin/add"
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold"
            >
              <Plus size={16} /> Question
            </Link>

            <Link
              to="/admin/upload-pdf"
              className="flex items-center gap-2 px-4 py-2  bg-slate-900 border rounded-lg text-sm font-bold"
            >
              <FileText size={16} /> Upload PDF
            </Link>
          </div>
        </div>

        {/* ================= SEARCH ================= */}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 mb-3">
          <div className="lg:col-span-3 relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />

            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-lg border bg-white text-sm font-semibold outline-none focus:ring-2 focus:ring-slate-300 placeholder-slate-500 text-black"
            />
          </div>

          <div className="bg-white text-black rounded-lg border p-2 flex items-center justify-center gap-2 text-sm font-bold">
            <LayoutGrid size={18} />
            {matchCount} Matches
          </div>
        </div>

        {/* ================= TABLE ================= */}

        <div className="bg-white rounded-2xl border overflow-hidden">
          {loading ? (
            <div className="py-16 flex flex-col items-center gap-3">
              <Loader2 className="animate-spin" size={30} />
              <p className="text-xs font-bold text-slate-500">
                Loading Data...
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">

                {/* HEADER */}

                <thead className="bg-slate-100 text-xs uppercase text-slate-600">
                  {viewMode === "questions" ? (
                    <tr>
                      <th className="p-3 text-left">Question</th>
                      <th className="p-3 text-left">Topic</th>
                      <th className="p-3 text-left">Company</th>
                      <th className="p-3 text-center">Actions</th>
                    </tr>
                  ) : viewMode === "lectures" ? (
                    <tr>
                      <th className="p-3 text-left">Lecture</th>
                      <th className="p-3 text-left">Description</th>
                      <th className="p-3 text-center">Duration</th>
                      <th className="p-3 text-center">Action</th>
                    </tr>
                  ) : (
                    <tr>
                      <th className="p-3 text-left">Title</th>
                      <th className="p-3 text-left">Company</th>
                      <th className="p-3 text-left">Category</th>
                      <th className="p-3 text-center">Action</th>
                    </tr>
                  )}
                </thead>

                {/* BODY */}

                <tbody className="divide-y">

                  {/* QUESTIONS */}

                  {viewMode === "questions" &&
                    filteredQuestions.map((q) => (
                      <tr key={q._id} className="hover:bg-slate-50">
                        <td className="p-3 max-w-md">
                          <p className="font-semibold line-clamp-2 text-black">
                            {q.questionText}
                          </p>
                        </td>

                        <td className="p-3">
                          <span className="px-2 py-1 bg-slate-100 rounded text-xs font-bold text-black">
                            {q.topic}
                          </span>
                        </td>

                        <td className="p-3 font-semibold text-slate-700">
                          <Building2 size={14} className="inline mr-1" />
                          {q.company || "General"}
                        </td>

                        <td className="p-3 text-center">
                          <div className="flex justify-center gap-2">
                            <Link
                              to={`/admin/edit/${q._id}`}
                              className="p-1.5 border text-black rounded hover:bg-slate-900 hover:text-white"
                            >
                              <Edit3 size={14} />
                            </Link>

                            <button
                              onClick={() => handleDeleteQuestion(q._id)}
                              className="p-1.5 border text-black rounded hover:bg-slate-900 hover:text-white"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

                  {/* LECTURES */}

                  {viewMode === "lectures" &&
                    filteredLectures.map((l) => (
                      <tr key={l._id} className="hover:bg-slate-50">
                        <td className="p-3 font-semibold text-black">
                          <PlayCircle size={18} className="inline mr-2" />
                          {l.topic}
                        </td>

                        <td className="p-3 text-xs italic line-clamp-2 text-black">
                          {l.description}
                        </td>

                        <td className="p-3 text-center font-bold text-black">
                          {l.duration}
                        </td>

                        <td className="p-3 text-center">
                          <button
                            onClick={() => handleDeleteLecture(l._id)}
                            className="p-1.5 border text-black rounded hover:bg-slate-900 hover:text-white"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}

                  {/* PDFS */}

                  {viewMode === "pdfs" &&
                    filteredPdfs.map((p) => (
                      <tr key={p._id} className="hover:bg-slate-50">
                        <td className="p-3 font-semibold text-black">
                          <div className="flex items-center gap-2">
                            <FileText size={16} className="text-slate-700" />
                            <span className="line-clamp-1">{p.title}</span>
                          </div>
                        </td>

                        <td className="p-3">
                          <span className="px-2 py-1 text-black bg-blue-50 text-blue-700 rounded text-xs font-bold">
                            {p.company}
                          </span>
                        </td>

                        <td className="p-3">
                          <span className="px-2 py-1 text-black bg-slate-100 rounded text-xs font-bold">
                            {p.category}
                          </span>
                        </td>

                        <td className="p-3 text-center align-middle">
                          <div className="flex justify-center gap-2">

                            {/* EDIT */}
                            <Link
                              to={`/admin/edit-pdf/${p._id}`}
                              title="Edit"
                              className="p-2 border border-slate-300 rounded-lg text-slate-900 hover:bg-black hover:text-white transition"
                            >
                              <Edit3 size={16} />
                            </Link>

                            {/* DELETE */}
                            <button
                              onClick={() => handleDeletePdf(p._id)}
                              title="Delete"
                              className="p-2 border border-slate-300 rounded-lg text-slate-900 hover:bg-black hover:text-white transition"
                            >
                              <Trash2 size={16} />
                            </button>

                            {/* VIEW */}
                            {/* <a
                              href={p.pdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Open PDF"
                              className="p-2 border border-slate-300 rounded-lg text-slate-900 hover:bg-slate-900 hover:text-white transition"
                            >
                              <ExternalLink size={16} />
                            </a> */}

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
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
