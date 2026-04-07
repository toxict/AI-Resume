import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const MainLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        isMobileOpen={isSidebarOpen}
        setIsMobileOpen={setIsSidebarOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <Navbar onMenuClick={() => setIsSidebarOpen(prev => !prev)} />
        <main className="flex-1 overflow-auto bg-slate-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
