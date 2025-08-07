import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../utils/SupabaseClient";
import Navbar from "@/Components/common/Navbar";
import CTA from "@/Components/common/CTA";
import HeroGrid from "@/Components/common/HeroGrid";
import PricingTable from "../Components/pricing/PricingTable";
import Footer from "@/Components/common/Footer";
import LeadForm from "@/Components/common/LeadForm";
import HomeFeatures from "../Components/common/HomeFeatures";

export default function Homepage() {
  const location = useLocation();
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [user, setUser] = useState(null);
  const [leadSource, setLeadSource] = useState(null);
  const [showLeadForm, setShowLeadForm] = useState(false);

  useEffect(() => {
    const targetId = location.state?.scrollTarget;
    if (targetId) {
      const scrollTo = document.getElementById(targetId);
      if (scrollTo) {
        setTimeout(() => {
          scrollTo.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user);
    });
  }, []);

  const handlePlanSelect = (plan) => {
    if (user) {
      navigate(`/checkout/${plan}`);
    } else {
      setLeadSource("checkout");
      setShowLeadForm(true);
    }
  };

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="app-background text-white flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 px-6 w-full">
        <div className="max-w-5xl mx-auto bg-black/30 backdrop-blur-md rounded-2xl shadow-md shadow-gold/10 px-8 py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-heading text-gold">
            Welcome to <span className="text-white">Entrance Adda</span>
          </h1>
          <p className="text-gold-soft font-body mt-4 text-lg">
            AI-Powered Performance Tracking
          </p>
          <div className="mt-6">
            <button
              onClick={scrollToForm}
              className="bg-yellow-500 text-black font-semibold px-6 py-3 rounded hover:bg-yellow-600"
            >
              Take Free NEET Test
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="bg-black/30 backdrop-blur-md rounded-2xl shadow-md shadow-gold/10 p-10">
          <CTA />
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-heading text-center mb-10 text-gold">Platform Features</h2>
        <div className="bg-black/30 backdrop-blur-md rounded-2xl shadow-md shadow-gold/10 p-10">
          <HomeFeatures />
        </div>
      </section>

      {/* Hero Grid */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="bg-black/30 backdrop-blur-md rounded-2xl shadow-md shadow-gold/10 p-10">
          <HeroGrid />
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-heading text-center mb-10 text-gold">Choose Your Plan</h2>
        <div className="bg-black/30 backdrop-blur-md rounded-2xl shadow-md shadow-gold/10 p-10">
          <PricingTable />
        </div>
      </section>

      {/* Lead Form */}
      <section ref={formRef} className="py-16 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-heading text-gold mb-6">Take your Free Test</h2>
        <div className="bg-black/30 backdrop-blur-md rounded-2xl shadow-md shadow-gold/10 p-10">
          <LeadForm source="freetest" />
        </div>
      </section>

      <Footer />
    </div>
  );
}
