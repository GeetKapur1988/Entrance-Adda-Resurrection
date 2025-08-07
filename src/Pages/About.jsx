import React from "react";
import Navbar from "@/Components/common/Navbar";
import Footer from "@/Components/common/Footer";
import GeetImage from "../assets/geet.jpg";
import PuneetaImage from "../assets/puneeta.jpg";

const About = () => {
  return (
    <div className="app-background text-white min-h-screen">
      <Navbar />
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="bg-gradient-to-br from-black/40 to-black/10 backdrop-blur-xl rounded-2xl shadow-md shadow-gold/10 p-10 text-center">
          <h2 className="text-4xl font-heading text-gold mb-6">About Us</h2>
          <p className="mb-10 text-lg">
            Entrance Adda is an initiative by <strong>QuantumShift Consulting</strong> to transform
            competitive examinations preparation through technology. With AI-powered assessments, adaptive
            testing, and real-time feedback, our goal is to make preparation personalized, precise, and powerful.
          </p>

          <div className="grid md:grid-cols-2 gap-8 justify-center">
            <div className="bg-black/30 backdrop-blur-md p-6 rounded-xl border border-gold shadow-sm hover:shadow-lg transition">
              <img src={GeetImage} alt="Geet Kapur" className="w-32 h-32 mx-auto rounded-full border-2 border-gold mb-4" />
              <h3 className="text-xl font-bold text-gold">Geet Kapur</h3>
              <p className="text-sm italic">Founder, QuantumShift Consulting</p>
              <div className="mt-3 flex justify-center gap-4">
                <a href="#"><i className="fab fa-linkedin text-gold"></i></a>
                <a href="#"><i className="fas fa-envelope text-gold"></i></a>
              </div>
            </div>

            <div className="bg-black/30 backdrop-blur-md p-6 rounded-xl border border-gold shadow-sm hover:shadow-lg transition">
              <img src={PuneetaImage} alt="Puneeta K Sharma" className="w-32 h-32 mx-auto rounded-full border-2 border-gold mb-4" />
              <h3 className="text-xl font-bold text-gold">Puneeta K Sharma</h3>
              <p className="text-sm italic">Chief Visionary Officer</p>
              <div className="mt-3 flex justify-center gap-4">
                <a href="#"><i className="fab fa-linkedin text-gold"></i></a>
                <a href="#"><i className="fas fa-envelope text-gold"></i></a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="flex-grow">
  <section className="py-20 px-6 max-w-6xl mx-auto">
    {/* existing contact form content */}
  </section>
</div>

      <Footer />
    </div>
  );
};

export default About;
