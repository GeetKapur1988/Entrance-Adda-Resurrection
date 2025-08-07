import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../utils/SupabaseClient";

const SubmitTestForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { error } = await supabase.from("leads").insert([formData]);

      if (error) {
        console.error("Supabase error:", error.message);
        alert("Failed to submit. Please try again.");
        return;
      }

      localStorage.setItem("formSubmitted", "true");
      navigate("/mock-test");
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("Unexpected error occurred.");
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        type="email"
        required
      />
      <input
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        required
      />
      <button type="submit">Submit & Begin Test</button>
    </form>
  );
};

export default SubmitTestForm;
