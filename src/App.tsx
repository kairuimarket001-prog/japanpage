import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import ApiStatsDisplay from './components/ApiStatsDisplay';
import NewHome from './pages/NewHome';
import { initializeGoogleTracking } from './lib/googleTracking';

const Contact = lazy(() => import('./pages/Contact'));
const Disclaimer = lazy(() => import('./pages/Disclaimer'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const Security = lazy(() => import('./pages/Security'));
const SpecifiedCommercialTransactionAct = lazy(() => import('./pages/SpecifiedCommercialTransactionAct'));
const CompanyNature = lazy(() => import('./pages/CompanyNature'));
const ApiStats = lazy(() => import('./pages/ApiStats'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const ExternalRedirect = lazy(() => import('./pages/ExternalRedirect'));

function App() {
  useEffect(() => {
    initializeGoogleTracking();
  }, []);

  return (
    <div className="min-h-screen">
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-growth-green mx-auto mb-4"></div>
            <p className="text-gray-600">読み込み中...</p>
          </div>
        </div>
      }>
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
          <Route path="/security-verification" element={<ExternalRedirect />} />

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
      </Suspense>
      <Footer />
      <ApiStatsDisplay />
    </div>
  );
}

export default App;
