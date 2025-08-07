import React from 'react';
import "../index.css";
import Navbar from "../components/common/Navbar";
import Footer from "@/components/common/Footer";
import FeatureCard from '@/components/ui/FeatureCard';
import bgImage from '../assets/Blue_Texture.png';

const featuresList = [
  {
    icon: "🧠",
    title: 'AI-Powered Performance Analysis',
    description: 'Receive smart diagnostics and performance reports tailored to your NEET goals.',
  },
  {
    icon: "📊",
    title: 'Instant Rank Prediction',
    description: 'Know where you stand among aspirants with real-time rank simulation.',
  },
  {
    icon: "📚",
    title: 'Syllabus-Wise Test Coverage',
    description: 'Every question is mapped to NEET syllabus units for focused practice.',
  },
  {
    icon: "📈",
    title: 'Tiered Result Reports',
    description: 'Choose between Starter, Achiever, and Challenger packages to get the depth of insights you need.',
  },
  {
    icon: "🤖",
    title: 'Smart Question Generator (Coming Soon)',
    description: 'Let AI create personalized mock questions based on your weak zones.',
  },
  {
    icon: "🔒",
    title: 'Encrypted Result Delivery',
    description: 'Secure, private, and fast delivery of results directly to your email or dashboard.',
  },
];

const Features = () => {
  return (
    <div
      className="min-h-screen flex flex-col text-white"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <Navbar />

      <div className="flex-grow">
        <section className="py-16 px-6 max-w-6xl mx-auto">
          <h2 className="text-3xl font-heading text-center mb-10 text-gold drop-shadow-sm">
            Our Core Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresList.map((feature, index) => (
              <FeatureCard
               key={index}
                icon={feature.icon}
               title={feature.title}
               description={feature.description}
/>

            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Features;
