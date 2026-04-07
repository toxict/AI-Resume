import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Video, ArrowLeft, Send } from "lucide-react";

const AddLecture = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    topic: "",
    category: "Quantitative",
    videoUrl: "",
    description: "",
    duration: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        // "https://aptitude-new-backend.vercel.app/api/learn",
        "http://localhost:5000/api/learn",
        formData
      );

      toast.success("New Lecture added to Vault!");
      navigate("/admin");
    } catch (err) {
      toast.error(
        "Failed to upload lecture: " +
        (err.response?.data?.message || err.message)
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-3">

      {/* WIDE CONTAINER */}
      <div className="max-w-[1400px] mx-auto bg-white rounded-2xl p-4 border border-slate-200 shadow-lg">

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-600 font-bold text-xs uppercase mb-1"
        >
          <ArrowLeft size={14} /> Back
        </button>

        {/* TITLE */}
        <h2 className="text-xl font-black text-slate-900 mb-2 flex items-center gap-2">
          <Video size={22} /> New Master Lecture
        </h2>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-2">

          {/* TOP ROW */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">

            {/* TOPIC */}
            <div className="space-y-0.5">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-wide">
                Topic Name
              </label>
              <textarea
                required
                rows={1}
                className="w-full p-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 font-bold outline-none focus:border-slate-900 resize-none text-sm"
                value={formData.topic}
                onChange={(e) =>
                  setFormData({ ...formData, topic: e.target.value })
                }
              />
            </div>

            {/* DURATION */}
            <div className="space-y-0.5">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-wide">
                Duration (Min)
              </label>
              <input
                required
                placeholder="e.g. 15:20"
                className="w-full p-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 font-bold outline-none focus:border-slate-900 text-sm"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
              />
            </div>

          </div>

          {/* VIDEO URL */}
          <div className="space-y-0.5">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-wide">
              YouTube Video URL
            </label>
            <textarea
              required
              rows={2}
              className="w-full p-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 font-bold outline-none focus:border-slate-900 resize-none text-sm"
              value={formData.videoUrl}
              onChange={(e) =>
                setFormData({ ...formData, videoUrl: e.target.value })
              }
            />
          </div>

          {/* DESCRIPTION */}
          <div className="space-y-0.5">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-wide">
              Concept Description
            </label>
            <textarea
              required
              rows={2}
              className="w-full p-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 font-bold outline-none focus:border-slate-900 resize-none text-sm"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          {/* SUBMIT BUTTON */}
          <div className="flex justify-end pt-1">
            <button
              type="submit"
              className="px-5 py-2 bg-slate-900 hover:bg-black text-white rounded-xl font-black shadow transition-all flex items-center gap-2 uppercase text-[10px] tracking-wider"
            >
              <Send size={14} /> Push to Platform
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddLecture;
