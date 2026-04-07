import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
    ArrowDown01, Banknote, BarChart3, BookOpenText, Brain, BrainCircuit,
    Calculator, Calendar, CheckCircle2, Clock, CoinsIcon, Database,
    Dice5, DollarSign, FileText, FunctionSquare, HeartPulse, LetterText,
    Lock, MessageSquareText, Network, Percent, RatioIcon, Speech, Star,
    Timer, TrendingUp, Users, Zap, ShieldCheck, X, Eye, EyeOff, LayoutDashboard,
    Building2, ChevronRight
} from 'lucide-react';

const menuData = {
    Quantitative: {
        icon: <Calculator />,
        topics: [
            { name: "Percentage", icon: <Percent /> },
            { name: "Ratio and Proportion", icon: <RatioIcon /> },
            { name: "Profit and Loss", icon: <CoinsIcon /> },
            { name: "Simple Interest", icon: <Banknote /> },
            { name: "Compound Interest", icon: <DollarSign /> },
            { name: "Time and Work", icon: <Zap /> },
            { name: "Time and Distance", icon: <TrendingUp /> },
            { name: "Averages", icon: <BarChart3 /> },
        ]
    },
    Logical: {
        icon: <Brain />,
        topics: [
            { name: "Number Series", icon: <ArrowDown01 /> },
            { name: "Blood Relations", icon: <HeartPulse color='red' /> },
            { name: "Syllogism", icon: <BrainCircuit /> },
        ]
    },
    Verbal: {
        icon: <Speech />,
        topics: [
            { name: "Synonyms", icon: <LetterText /> },
            { name: "Reading Comprehension", icon: <BookOpenText /> },
        ]
    }
};

const Sidebar = ({ onSelectTopic, activeTopic, isMobileOpen, setIsMobileOpen, selectedCompany, onSelectCompany }) => {
    const [expandedSection, setExpandedSection] = useState("Quantitative");
    // Removed expandedCompany state in favor of selectedCompany prop for single source of truth
    const [expandedCompanyCategory, setExpandedCompanyCategory] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [passcode, setPasscode] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const companies = ["TCS", "Infosys", "Wipro", "Cognizant", "Amazon", "Accenture"];

    const handleVerify = (e) => {
        e.preventDefault();
        const secretCode = import.meta.env.VITE_ADMIN_SECRET;
        if (passcode === secretCode) {
            sessionStorage.setItem("adminToken", "zencode_authenticated");
            toast.success("Access Granted!");
            setIsModalOpen(false);
            setPasscode("");
            setIsMobileOpen(false);
            navigate('/admin');
        } else {
            toast.error("Incorrect Secret Key");
        }
    };

    const handleTopicClick = (topicName, companyName = "") => {
        onSelectCompany(companyName);
        onSelectTopic(topicName);
        setIsMobileOpen(false);
    };

    const toggleCompany = (company) => {
        if (selectedCompany === company) {
            onSelectCompany(""); // Close and reset selection
            setExpandedCompanyCategory("");
        } else {
            onSelectCompany(company); // Open and select
            setExpandedCompanyCategory("");
        }
    };

    console.log("Sidebar Rendered. isMobileOpen:", isMobileOpen); // DEBUG LOG

    return (
        <>
            {/* Mobile Overlay */}
            {isMobileOpen && (
                <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[90] md:hidden" onClick={() => setIsMobileOpen(false)} />
            )}

            <aside className={`fixed inset-y-0 left-0 z-[100] md:relative w-72 bg-white border-r border-slate-200 h-full overflow-y-auto flex-shrink-0 transition-all duration-300 flex flex-col ${isMobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full md:translate-x-0"}`}>

                <div className="md:hidden flex justify-end p-4">
                    <button onClick={() => setIsMobileOpen(false)} className="p-2 text-slate-400 hover:bg-slate-100 rounded-full"><X size={24} /></button>
                </div>

                <div className="p-6 flex-grow pt-4">

                    {/* Dashboard Button */}
                    {/* <button
                        onClick={() => { handleTopicClick('dashboard'); navigate('/dashboard'); }}
                        className={`w-full flex items-center gap-3 p-4 rounded-2xl font-black transition-all mb-8 border ${activeTopic === 'dashboard' ? "bg-slate-900 text-white border-transparent shadow-lg shadow-slate-200" : "bg-slate-50 text-slate-600 border-slate-100 hover:border-slate-300"}`}
                    >
                        <LayoutDashboard size={20} />
                        <span className="text-sm uppercase tracking-widest">My Progress</span>
                    </button> */}

                    {/* --- GENERAL LEARNING PATH --- */}
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-2">General Learning</h3>
                    <div className="space-y-3">
                        {Object.keys(menuData).map((section) => (
                            <div key={section} className="space-y-1">
                                <button
                                    onClick={() => { setExpandedSection(expandedSection === section ? "" : section); onSelectCompany(""); }}
                                    className={`w-full flex justify-between items-center p-3.5 rounded-2xl font-bold transition-all ${expandedSection === section && !selectedCompany ? "bg-slate-900 text-white shadow-md" : "text-slate-600 hover:bg-slate-100"}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-lg opacity-90">{menuData[section].icon}</span>
                                        <span>{section}</span>
                                    </div>
                                    <span className={`text-xs transform transition-transform ${expandedSection === section ? "rotate-180" : ""}`}>▼</span>
                                </button>

                                {expandedSection === section && !selectedCompany && (
                                    <div className="mt-2 ml-3 pl-4 border-l-2 border-slate-100 space-y-1">
                                        {menuData[section].topics.map((topic) => (
                                            <button
                                                key={topic.name}
                                                onClick={() => handleTopicClick(topic.name)}
                                                className={`w-full flex items-center gap-3 text-left p-2.5 rounded-xl text-sm transition-all font-medium ${activeTopic === topic.name && !selectedCompany ? "text-slate-900 bg-slate-100 font-bold" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"}`}
                                            >
                                                <span className="opacity-70">{topic.icon}</span>
                                                <span>{topic.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* --- COMPANY WISE SECTION --- */}
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-2">Company Wise</h3>
                    <div className="space-y-2 mb-8">
                        {companies.map((company) => (
                            <div key={company} className="space-y-1">
                                <button
                                    onClick={() => toggleCompany(company)}
                                    className={`w-full flex justify-between items-center p-3.5 rounded-2xl font-bold transition-all ${selectedCompany === company ? "bg-slate-900 text-white shadow-md" : "text-slate-600 hover:bg-slate-100"}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <Building2 size={18} className="opacity-90" />
                                        <span>{company}</span>
                                    </div>
                                    <span className={`text-xs transform transition-transform ${selectedCompany === company ? "rotate-180" : ""}`}>▼</span>
                                </button>

                                {selectedCompany === company && (<div className="mt-2 ml-3 pl-4 border-l-2 border-slate-100 space-y-1 py-1">
                                    {Object.keys(menuData).map((cat) => (
                                        <div key={cat} className="space-y-1">
                                            <button
                                                onClick={() => setExpandedCompanyCategory(expandedCompanyCategory === cat ? "" : cat)}
                                                className={`w-full flex justify-between items-center p-2.5 rounded-xl font-bold transition-all text-xs ${expandedCompanyCategory === cat ? "bg-slate-200 text-slate-900" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <span className="opacity-80 scale-75">{menuData[cat].icon}</span>
                                                    <span>{cat}</span>
                                                </div>
                                                <span className={`text-[10px] transform transition-transform ${expandedCompanyCategory === cat ? "rotate-180" : ""}`}>▼</span>
                                            </button>

                                            {expandedCompanyCategory === cat && (
                                                <div className="ml-3 pl-3 border-l-2 border-slate-100 space-y-1 mt-1">
                                                    {menuData[cat].topics.map((t) => (
                                                        <button
                                                            key={t.name}
                                                            onClick={() => handleTopicClick(t.name, company)}
                                                            className={`w-full flex items-center gap-2 text-left p-2 rounded-lg text-xs transition-all font-medium ${activeTopic === t.name && selectedCompany === company ? "text-slate-900 bg-slate-100 font-bold" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"}`}
                                                        >
                                                            <span className="opacity-70 scale-75">{t.icon}</span>
                                                            <span>{t.name}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Admin Access Footer */}
                <div className="p-6 border-t border-slate-100 mt-auto bg-white/50 backdrop-blur-sm">
                    <button onClick={() => setIsModalOpen(true)} className="w-full group flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-all">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white rounded-lg text-slate-400 group-hover:text-blue-600 transition-colors">
                                <ShieldCheck size={18} />
                            </div>
                            <span className="text-sm font-bold text-slate-600 group-hover:text-blue-600 transition-colors">Admin Portal</span>
                        </div>
                        <Lock size={14} className="text-slate-500" />
                    </button>
                </div>
            </aside>

            {/* Admin Password Modal - Same as before */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-sm rounded-[2.5rem] border border-slate-200 shadow-2xl overflow-hidden p-8 animate-in zoom-in-95">
                        <div className="flex justify-between items-center mb-6">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><ShieldCheck size={24} /></div>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:bg-slate-100 rounded-full"><X size={20} /></button>
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 mb-2">Security Check</h2>
                        <p className="text-sm text-slate-500 mb-6">Enter secret key to access the admin dashboard.</p>
                        <form onSubmit={handleVerify} className="space-y-4">
                            <div className="relative">
                                <input autoFocus type={showPassword ? "text" : "password"} className="w-full p-4 pr-12 bg-slate-50 rounded-2xl border border-slate-200 text-slate-900 font-bold outline-none focus:ring-2 focus:ring-slate-900" value={passcode} onChange={(e) => setPasscode(e.target.value)} />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
                            </div>
                            <button type="submit" className="w-full py-4 bg-slate-900 hover:bg-black text-white rounded-2xl font-black shadow-xl">Authorize Access</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Sidebar;