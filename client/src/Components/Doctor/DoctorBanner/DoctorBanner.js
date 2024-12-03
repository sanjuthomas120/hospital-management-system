import React from "react";

const DoctorBanner = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 flex flex-col md:flex-row items-center gap-x-10">
        <div className="md:w-1/2 mt-8 md:mt-0">
          <img
            src="/images/banner/close-up-medical-team-ready-work.jpg"
            alt="Banner 3"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
            Welcome, Doctor!
          </h1>
          <p className="text-gray-700 text-lg mb-8">
            Manage your appointments, review patient details, and stay updated
            with your schedule all in one place{" "}
          </p>
        </div>
      </div>
    </section>
  );
};

export default DoctorBanner;
