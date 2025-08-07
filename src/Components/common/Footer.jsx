import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="bg-black/30 backdrop-blur-md text-white py-6 text-center border-t border-gold/20 shadow-inner">
      <p style={{ marginTop: '1rem', textAlign: 'center' }}>
  © 2025 QuantumShift Consulting. All rights reserved.
  <a href="/refund-policy" style={{ marginLeft: '1rem', marginRight: '1rem' }}>Refund Policy</a>
  <a href="/privacy-policy" style={{ marginRight: '1rem' }}>Privacy Policy</a>
  <a href="/terms">Terms & Conditions</a>
</p>
  </footer>
  );
}
