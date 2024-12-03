import React from "react";
import PatientServiceSlider from "./PatientServiceSlider";

function PatientService() {
  return (
    <div className="bg-white py-10 px-4">
      <h2 className="text-5xl font-bold text-center text-secondary">Our Services</h2>
      <p className="text-center text-lg text-gray-600 max-w-2xl mx-auto mb-8">
        We offer a range of specialized medical services to meet the needs of our patients
      </p>
      <div className="px-12">
      <PatientServiceSlider />
      </div>
    </div>
  );
}

export default PatientService;
