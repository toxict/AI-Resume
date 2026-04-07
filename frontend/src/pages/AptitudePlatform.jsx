import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Sidebar from '../components/Sidebar';
import QuestionCard from '../components/QuestionCard';
import Breadcrumbs from '../components/Breadcrumbs';
import SkeletonLoader from '../components/SkeletonLoader';
import EmptyState from '../components/EmptyState';
import Navbar from '../components/Navbar';

const AptitudePlatform = ({ isMobileOpen, setIsMobileOpen }) => {
  const [activeTopic, setActiveTopic] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(""); // Track selected company
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [generatingAI, setGeneratingAI] = useState(false);
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Removed local state

  // Fetch data whenever topic or company changes
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        let url = `http://localhost:5000/api/questions?`;
        if (activeTopic) url += `topic=${activeTopic}&`;
        if (selectedCompany) url += `company=${selectedCompany}`;

        const res = await axios.get(url);
        setQuestions(res.data);
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [activeTopic, selectedCompany]); // Dependency array handles dynamic updates

  const handleGenerateAI = async () => {
    if (!activeTopic) {
      toast.error("Please select a topic from the sidebar first!");
      return;
    }
    setGeneratingAI(true);
    const toastId = toast.loading("Gemini is crafting questions for you...");
    try {
      const res = await axios.get(`http://localhost:5000/api/gemini/generate?topic=${activeTopic}`);
      // The backend returns saved questions with _id
      setQuestions(prev => [...res.data, ...prev]);
      toast.success("3 New AI questions added!", { id: toastId });
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate questions. Check console.", { id: toastId });
    } finally {
      setGeneratingAI(false);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-50 transition-colors duration-300">

      <div className="flex flex-1 overflow-hidden relative">

        {/* Sidebar receiving all filtering props */}
        <Sidebar
          onSelectTopic={setActiveTopic}
          activeTopic={activeTopic}
          selectedCompany={selectedCompany}
          onSelectCompany={setSelectedCompany}
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            <Breadcrumbs activeTopic={activeTopic} />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-4xl font-black text-slate-900 flex flex-wrap items-center gap-4">
                  {selectedCompany && (
                    <span className="text-blue-600 bg-blue-50 px-4 py-2 rounded-2xl text-xs uppercase tracking-widest border border-blue-100">
                      {selectedCompany}
                    </span>
                  )}
                  <span className="italic tracking-tight">{activeTopic || "All Questions"}</span>
                </h2>
                <p className="text-slate-400 font-medium mt-2">
                  We found {questions.length} questions tailored for your selection.
                </p>
              </div>

              {activeTopic && (
                <button
                  onClick={handleGenerateAI}
                  disabled={generatingAI}
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all shadow-sm
                    ${generatingAI
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'bg-slate-900 text-white hover:bg-black hover:shadow-md active:scale-95'
                    }`}
                >
                  {generatingAI ? (
                    <>
                      <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <span className="text-lg">✨</span>
                      Generate with Gemini AI
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Questions Grid */}
            {loading ? (
              <SkeletonLoader />
            ) : questions.length > 0 ? (
              <div className="grid gap-4">
                {questions.map((q, i) => (
                  <QuestionCard key={q._id} question={q} index={i} />
                ))}
              </div>
            ) : (
              <EmptyState topic={activeTopic} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AptitudePlatform;