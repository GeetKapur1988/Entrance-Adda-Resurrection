import React from "react";

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-black/50 border border-yellow-500 p-6 rounded-xl shadow-md h-full transition duration-300 hover:shadow-yellow-500/40">
      <div className="text-4xl mb-4 text-yellow-400 text-center">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-300 text-sm">{description}</p>
    </div>
  );
};

export default FeatureCard;
