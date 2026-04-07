import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { ChevronLeft, UploadCloud } from "lucide-react";

const AdminEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState(null);

  const BASE_URL = "https://http://localhost:5000/";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/questions/${id}`);
        setFormData(res.data);
      } catch {
        toast.error("Failed to load question");
      }
    };
    fetchData();
  }, [id]);

  const handleOptionChange = (i, val) => {
    const newOpts = [...formData.options];
    newOpts[i] = val;
    setFormData({ ...formData, options: newOpts });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loading = toast.loading("Updating...");

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

      await axios.put(`${BASE_URL}/api/questions/${id}`, data);

      toast.dismiss(loading);
      toast.success("Question Updated 🚀");

      setTimeout(() => navigate("/admin"), 1200);
    } catch {
      toast.dismiss(loading);
      toast.error("Update failed");
    }
  };

  if (!formData)
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        Loading...
      </div>
    );

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
            form="edit-form"
            type="submit"
            className="flex items-center gap-2 bg-slate-900 text-white px-6 py-2 rounded-xl font-bold shadow"
          >
            <UploadCloud size={18} /> Save Changes
          </button>
        </div>

        <form id="edit-form" onSubmit={handleSubmit} className="space-y-3">

          {/* QUESTION */}
          <div className="bg-white p-3 rounded-2xl shadow border">
            <label className="text-xs font-bold text-slate-500">
              Question
            </label>

            <textarea
              rows={2}
              value={formData.questionText}
              className="w-full mt-1 p-2 rounded-xl border border-black/20 bg-slate-50 font-semibold text-slate-900 resize-none"
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
                value={opt}
                className="p-2 rounded-xl border border-black/20 bg-slate-50 font-semibold text-slate-900"
                onChange={(e) => handleOptionChange(i, e.target.value)}
              />
            ))}
          </div>

          {/* META */}
          <div className="bg-white p-3 rounded-2xl shadow border grid grid-cols-5 gap-2">

            <input
              type="text"
              value={formData.topic}
              className="p-2 rounded-xl border border-black/20 bg-slate-50 font-semibold text-slate-900"
              onChange={(e) =>
                setFormData({ ...formData, topic: e.target.value })
              }
            />

            <input
              type="text"
              value={formData.company || ""}
              className="p-2 rounded-xl border border-black/20 bg-slate-50 font-semibold text-slate-900"
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
            />

            <select
              value={formData.category}
              className="p-2 rounded-xl border border-black/20 bg-slate-50 font-semibold text-slate-900"
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              <option>Quantitative</option>
              <option>Logical</option>
              <option>Verbal</option>
            </select>

            <select
              value={formData.difficulty}
              className="p-2 rounded-xl border border-black/20 bg-slate-50 font-semibold text-slate-900"
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
              value={formData.correctAnswer}
              className="p-2 rounded-xl border border-black/20 bg-slate-50 font-bold text-slate-900"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  correctAnswer: e.target.value,
                })
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
                value={formData.solution}
                className="w-full mt-1 p-2 rounded-xl border border-black/20 bg-slate-50 text-slate-900"
                onChange={(e) =>
                  setFormData({ ...formData, solution: e.target.value })
                }
              />
            </div>

            {/* IMAGE */}
            <div className="bg-white p-3 rounded-2xl shadow border border-black/10">
              <label className="text-xs font-bold text-black">
                Update Visual
              </label>

              <div className="mt-2 p-3 border border-black/20 rounded-xl bg-white text-center">
                {file ? (
                  <p className="text-sm font-semibold text-black truncate">
                    Selected: {file.name}
                  </p>
                ) : formData.imageUrl ? (
                  <img
                    src={`${BASE_URL}${formData.imageUrl}`}
                    alt="current"
                    className="max-h-32 mx-auto"
                  />
                ) : (
                  <p className="text-xs text-black/60">
                    No file selected
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
                hover:file:border-black"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminEdit;
