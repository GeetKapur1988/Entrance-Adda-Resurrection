import React, { useState } from "react";
import { supabase } from "@/supabaseClient";

// 🔁 Format snake_case to readable labels
function beautifyLabel(label) {
  return label.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function UploadQuestion() {
  const [formData, setFormData] = useState({
    question_number: "",
    subject: "",
    question: "",
    option_a: "",
    option_b: "",
    option_c: "",
    option_d: "",
    correct: "",
    year: "",
    set: "",
    difficulty: "",
    type: "",
  });

  const [status, setStatus] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("questions").insert([
      {
        ...formData,
        question_number: parseInt(formData.question_number),
        year: parseInt(formData.year),
      },
    ]);

    if (error) {
      console.error(error);
      setStatus({ error: "Upload failed. Please check the fields." });
    } else {
      setStatus({ success: "Question uploaded successfully!" });
      setFormData({
        question_number: "",
        subject: "",
        question: "",
        option_a: "",
        option_b: "",
        option_c: "",
        option_d: "",
        correct: "",
        year: "",
        set: "",
        difficulty: "",
        type: "",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-gray-900 text-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Upload a New Question
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.entries(formData).map(([key, value]) => {
          // Render TextArea for 'question'
          if (key === "question") {
            return (
              <div key={key}>
                <label className="block mb-1">{beautifyLabel(key)}</label>
                <textarea
                  name={key}
                  value={value}
                  onChange={handleChange}
                  required
                  className="w-full p-2 bg-black border border-blue-500 rounded"
                />
              </div>
            );
          }

          // Render Select for 'correct', 'difficulty', 'type'
          if (["correct", "difficulty", "type"].includes(key)) {
            const options = {
              correct: ["A", "B", "C", "D"],
              difficulty: ["easy", "medium", "hard"],
              type: ["MCQ", "TF", "Assertion"],
            };

            return (
              <div key={key}>
                <label className="block mb-1">{beautifyLabel(key)}</label>
                <select
                  name={key}
                  value={value}
                  onChange={handleChange}
                  required
                  className="w-full p-2 bg-black border border-blue-500 rounded"
                >
                  <option value="">Select {beautifyLabel(key)}</option>
                  {options[key].map((opt) => (
                    <option key={opt} value={opt}>
                      {beautifyLabel(opt)}
                    </option>
                  ))}
                </select>
              </div>
            );
          }

          // Render default input
          return (
            <div key={key}>
              <label className="block mb-1">{beautifyLabel(key)}</label>
              <input
                type={["year", "question_number"].includes(key) ? "number" : "text"}
                name={key}
                value={value}
                onChange={handleChange}
                required
                className="w-full p-2 bg-black border border-blue-500 rounded"
              />
            </div>
          );
        })}

        <button
          type="submit"
          className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded"
        >
          Upload Question
        </button>

        {status.success && (
          <p className="text-green-500 text-center mt-2">{status.success}</p>
        )}
        {status.error && (
          <p className="text-red-500 text-center mt-2">{status.error}</p>
        )}
      </form>
    </div>
  );
}
