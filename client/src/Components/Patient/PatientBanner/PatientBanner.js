import React from "react";

const PatientBanner = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 flex flex-col md:flex-row items-center">

        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
            Welcome to MedCare Hospital
          </h1>
          <p className="text-gray-700 text-lg mb-8">
            Providing high-quality and compassionate healthcare services for you and your family.
            Our experienced staff is here to ensure your well-being and comfort at every step.
          </p>
          <a
            href="#services"
            className="bg-primary font-semibold text-white py-3 px-6 rounded-lg shadow-md hover:bg-secondary transition duration-300"
          >
            Book Appointment
          </a>
        </div>

       
        <div className="md:w-1/2 mt-8 md:mt-0">
          <img
            src="/images/banner/doctor-presenting-medical-treatment.jpg"
            alt="Banner 3"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default PatientBanner;
