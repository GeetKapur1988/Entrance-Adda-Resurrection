import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import About from './pages/About';
import Contact from './pages/Contact';
import Features from './pages/Features';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ThankYou from "./pages/ThankYouPage";
import Results from "./pages/Results";
import FinishTest from "@/components/student/Free_Test_Flow/FinishTest";
import OCRUpload from "@/components/OCR/OCRUpload";
import Assessments from './components/student/Assessments';
import ResultDetail from './pages/ResultDetail';
import { Toaster } from 'react-hot-toast';
import Checkout from './pages/Checkout'; // adjust path if Checkout.jsx is elsewhere
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailed from './pages/PaymentFailed';
import RefundPolicy from "./pages/RefundPolicy";
import TermsConditions from "./pages/TermsConditions";
import LeadForm from './components/common/LeadForm';
import FreeTestCTA from './components/student/FreeTestCTA';
import PolicyPage from "./Pages/PolicyPage";

function App() {
  return (
    <Router>
      <Toaster />
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Homepage />} />
        <Route path="/features" element={<Features />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/thankyou" element={<ThankYou />} />
        <Route path="/finish-test" element={<FinishTest />} />
        <Route path="/ocr-upload" element={<OCRUpload />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout/:id" element={<Checkout />} /> {/* For dynamic checkout with ID */}
        <Route path="/leadform" element={<LeadForm />} />
        <Route path="/quantum-entry-test" element={<FreeTestCTA />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/terms" element={<TermsConditions />} />
        <Route path="/privacy-policy" element={<PolicyPage />} />

        {/* EXAM ROUTES */}
        <Route path="/exam/:id" element={<Assessments />} />
        <Route path="/results" element={<Results />} />
        <Route path="/results/:id" element={
          <ProtectedRoute>
            <ResultDetail />
          </ProtectedRoute>
        } />

        {/* PROTECTED ROUTES */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;