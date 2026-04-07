import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AptitudePlatform from './pages/AptitudePlatform';
import QuestionDetail from './pages/QuestionDetail';
import AdminDashboard from './admin/AdminDashboard';
import AdminUpload from './admin/AdminUpload';
import AdminEdit from './admin/AdminEdit';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/ProtectedRoute';
import StudentDashboard from './components/StudentDashboard';
import Learn from './pages/Learn';
import AddLecture from './admin/AddLecture';

import { useState } from 'react';
import AdminPdfUpload from './admin/AdminPdfUpload';
import AdminPdfEdit from './admin/AdminPdfEdit';
import MockPapers from './pages/MockPapers';
// ... imports

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Router>
      <Navbar onMenuClick={() => { console.log("Menu Clicked"); setIsSidebarOpen(!isSidebarOpen); }} />
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/platform"
          element={
            <AptitudePlatform
              isMobileOpen={isSidebarOpen}
              setIsMobileOpen={setIsSidebarOpen}
            />
          }
        />
        <Route path="/question/:id" element={<QuestionDetail />} />
        <Route path="/mock" element={<MockPapers />} />

        {/* //admin Routes */}
        <Route
          path="/admin"
          element={

            <AdminDashboard />

          }
        />

        <Route
          path="/admin/add"
          element={

            <AdminUpload />

          }
        />

        <Route
          path="/admin/edit/:id"
          element={

            <AdminEdit />

          }
        />

        <Route
          path="/admin/add-lecture"
          element={

            <AddLecture />

          } />

        <Route
          path="/admin/upload-pdf"
          element={<AdminPdfUpload />} />

        <Route
          path="/admin/edit-pdf/:id"
          element={<AdminPdfEdit />} />


        {/* //student dashboard route */}
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path='/learn' element={<Learn />} />

      </Routes>
    </Router>
  );
}

export default App;