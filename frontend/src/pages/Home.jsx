import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopicCard from '../components/TopicCard';
import { PlayCircle, Building2, LayoutGrid } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: "Learning Center",
      description: "Watch master lectures for concept clarity in aptitude.",
      icon: <PlayCircle size={32} />,
      colorClass: "bg-slate-900 text-white",
      path: "/learn"
    },
    {
      title: "Practice General & Company Specific Aptitude",
      description: "Solve topic-wise questions across all categories and top companies like TCS and Deloitte.",
      icon: <Building2 size={32} />,
      colorClass: "bg-slate-900 text-white",
      path: "/platform"
    },
    {
      title: "Practice Company Specific Aptitude Papers",
      description: "Target top companies like TCS and Deloitte.",
      icon: <Building2 size={32} />,
      colorClass: "bg-slate-100 text-slate-800",
      path: "/mock"
    }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-6 pt-10">

      {/* HEADER */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 bg-slate-100 rounded-2xl mb-3">
          <LayoutGrid className="text-slate-900" size={28} />
        </div>

        <h1 className="text-5xl font-black text-slate-900 mb-3 tracking-tight">
          ZenCode Hub
        </h1>

        <p className="text-slate-500 font-medium max-w-lg mx-auto">
          Your all-in-one placement preparation engine.
        </p>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl w-full">
        {sections.map((sec, i) => (
          <TopicCard
            key={i}
            title={sec.title}
            description={sec.description}
            icon={sec.icon}
            colorClass={sec.colorClass}
            onClick={() => navigate(sec.path)}
          />
        ))}
      </div>

    </div>
  );
};

export default Home;
