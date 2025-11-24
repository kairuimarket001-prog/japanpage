import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import ApiStatsDisplay from './components/ApiStatsDisplay';
import DisclaimerModal from './components/DisclaimerModal';
import NewHome from './pages/NewHome';
import Contact from './pages/Contact';
import Disclaimer from './pages/Disclaimer';
import FAQ from './pages/FAQ';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Security from './pages/Security';
import SpecifiedCommercialTransactionAct from './pages/SpecifiedCommercialTransactionAct';
import CompanyNature from './pages/CompanyNature';
import ApiStats from './pages/ApiStats';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { initializeGoogleTracking } from './lib/googleTracking';

function App() {
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);

  useEffect(() => {
    initializeGoogleTracking();
  }, []);

  return (
    <div className="min-h-screen">
      <DisclaimerModal onAccept={() => setDisclaimerAccepted(true)} />
      <Routes>
        <Route path="/" element={<NewHome />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/security" element={<Security />} />
        <Route path="/specified-commercial-transaction-act" element={<SpecifiedCommercialTransactionAct />} />
        <Route path="/company-nature" element={<CompanyNature />} />
        <Route path="/api-stats" element={<ApiStats />} />

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
