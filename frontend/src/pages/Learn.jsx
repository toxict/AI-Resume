import React, { useState, useEffect } from 'react';
import { PlayCircle, Search, ArrowLeft, BookOpen, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Learn = () => {
  const navigate = useNavigate();
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const BASE_URL = "http://localhost:5000";

  /* ---------------- FETCH ---------------- */
  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/learn`);
        setLectures(res.data);
      } catch {
        toast.error("Failed to load lectures");
      } finally {
        setLoading(false);
      }
    };
    fetchLectures();
  }, []);

  /* ---------------- SEARCH ---------------- */
  const filteredLectures = lectures.filter(v =>
    v.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 p-3">
      <div className="max-w-[1400px] mx-auto">

        {/* ================= HEADER ================= */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">

          <div>
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-blue-600 font-semibold text-sm mb-1"
            >
              <ArrowLeft size={16} /> Back to Hub
            </button>

            <h1 className="text-2xl font-black text-slate-900">
              Lecture Vault
            </h1>

            <p className="text-sm text-slate-500">
              Placement preparation video lectures
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
              placeholder="Search topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg border bg-white text-sm font-semibold text-slate-900 placeholder-slate-500 outline-none focus:ring-2 focus:ring-slate-300"
            />
          </div>

        </div>

        {/* ================= TABLE ================= */}
        <div className="bg-white rounded-2xl border border-slate-300 overflow-hidden">

          {loading ? (
            <div className="py-16 flex flex-col items-center gap-3">
              <Loader2 className="animate-spin text-slate-900" size={30} />
              <p className="text-xs font-bold text-slate-500">
                Loading Lectures...
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">

                {/* TABLE HEAD */}
                <thead className="bg-slate-100 text-xs uppercase text-slate-600">
                  <tr>
                    <th className="p-3 text-left">Topic</th>
                    <th className="p-3 text-left">Summary</th>
                    <th className="p-3 text-center">Duration</th>
                    <th className="p-3 text-center">Action</th>
                  </tr>
                </thead>

                {/* TABLE BODY */}
                <tbody className="divide-y">

                  {filteredLectures.length > 0 ? (
                    filteredLectures.map((video) => (
                      <tr key={video._id} className="hover:bg-slate-50">

                        {/* TOPIC */}
                        <td className="p-3 align-middle">
                          <div className="flex items-center gap-2 text-slate-900 font-semibold">
                            <BookOpen size={18} />
                            <div>
                              <div>{video.topic}</div>
                              <div className="text-[10px] font-bold text-slate-400 uppercase">
                                {video.category}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* DESCRIPTION */}
                        <td className="p-3 text-sm text-slate-600 align-middle">
                          {video.description}
                        </td>

                        {/* DURATION */}
                        <td className="p-3 text-center font-bold text-slate-700 align-middle">
                          {video.duration}
                        </td>

                        {/* ACTION */}
                        <td className="p-3 text-center align-middle">
                          <a
                            href={video.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-black transition"
                          >
                            <PlayCircle size={14} /> Watch
                          </a>
                        </td>

                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-12 text-center">
                        <div className="flex flex-col items-center gap-3 opacity-40">
                          <BookOpen size={48} className="text-slate-300" />
                          <p className="text-xs font-bold uppercase text-slate-700">
                            No lectures found
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
            ZenCode Video Bank • Knowledge Base
          </p>
        </div>

      </div>
    </div>
  );
};

export default Learn;
