import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Features from './Pages/Features';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import Signup from './Pages/signup';
import ProtectedRoute from "./Components/auth/ProtectedRoute";
import ThankYou from "./Pages/ThankYouPage";
import Results from "./Pages/Results";
import FinishTest from "@/Components/student/Free_Test_Flow/FinishTest";
import OCRUpload from "@/Components/OCR/OCRUpload";
import Assessments from './Components/student/Assessments';
import ResultDetail from './Pages/ResultDetail';
import { Toaster } from 'react-hot-toast';
import Checkout from './Pages/Checkout'; // adjust path if Checkout.jsx is elsewhere
import PaymentSuccess from './Pages/PaymentSuccess';
import PaymentFailed from './Pages/PaymentFailed';
import RefundPolicy from "./Pages/RefundPolicy";
import TermsConditions from "./Pages/TermsConditions";
import LeadForm from './Components/common/LeadForm';
import FreeTestCTA from './Components/student/FreeTestCTA';
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