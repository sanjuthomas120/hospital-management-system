import React from "react";

function PatientServiceCard({ title, description, icon }) {
  return (
    <div className="bg-white min-h-64  border border-primary rounded-lg p-6 m-4">
      <div className="flex items-center justify-center mb-4">
        <img src={icon} alt={`${icon} title`} className="w-16 h-16" />
      </div>
      <h3 className="text-3xl text-center font-bold text-secondary hover:text-primary mb-2">{title}</h3>
      <p className="text-gray-600 text-lg text-center mt-2">{description}</p>
    </div>
  );
}

export default PatientServiceCard;
