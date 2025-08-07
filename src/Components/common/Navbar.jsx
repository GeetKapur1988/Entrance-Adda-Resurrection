// src/components/Navbar.jsx

import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthProvider";
import { Button } from "@/Components/ui/button";

export default function Navbar() {
  const { user } = useAuth() || {};
  const { logout } = useAuth() || {};
  const navigate = useNavigate();
  const location = useLocation();

  const isDashboard = location.pathname.includes("/dashboard") || location.pathname.includes("/results");
  const isAdmin = user?.email === "admin@example.com";

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-[#0d0d0d] text-white shadow-md sticky top-0 z-50">
      {/* Left: Logo */}
      <div className="flex items-center gap-3">
        <img src="/favicon-32x32.png" alt="Entrance Adda Logo" className="h-8 w-8" />
        <span className="text-xl font-semibold tracking-wide">Entrance Adda</span>
      </div>

      {/* Right: Nav Links and Auth */}
      <div className="flex items-center space-x-4">
        <ul className="flex gap-4 text-sm font-medium items-center">
          <li><Link to="/" className="hover:text-[#00ffc8]">Home</Link></li>
          <li><Link to="/features" className="hover:text-[#00ffc8]">Features</Link></li>
          <li><Link to="/about" className="hover:text-[#00ffc8]">About</Link></li>
          <li><Link to="/contact" className="hover:text-[#00ffc8]">Contact</Link></li>

          {isAdmin && (
            <li><Link to="/upload" className="hover:text-[#ffcc00]">Upload</Link></li>
          )}

          {!user ? (
            <>
              <li>
                <Link to="/login">
                  <Button variant="outline">Login</Button>
                </Link>
              </li>
              <li>
                <Link to="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </li>
            </>
          ) : (
            <>
              {!isDashboard && (
                <li>
                  <Link to="/dashboard" className="hover:text-blue-400">Dashboard</Link>
                </li>
              )}
              <li>
                <Link to="/results" className="hover:text-blue-400">Results</Link>
              </li>
              <li>
                <Button onClick={handleLogout} variant="outline">Logout</Button>
              </li>
            </>
          )}
        </ul>

        </div>
    </nav>
  );
}
