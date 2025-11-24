import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import ApiStatsDisplay from './components/ApiStatsDisplay';
import NewHome from './pages/NewHome';
import Disclaimer from './pages/Disclaimer';
import FAQ from './pages/FAQ';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { initializeGoogleTracking } from './lib/googleTracking';

function App() {
  useEffect(() => {
    initializeGoogleTracking();
  }, []);

  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<NewHome />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/faq" element={<FAQ />} />

        <Route path="/adsadmin" element={<AdminLogin />} />
        <Route
          path="/adsadmin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
      <ApiStatsDisplay />
    </div>
  );
}

export default App;
