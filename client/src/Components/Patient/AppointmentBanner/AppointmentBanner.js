import React from 'react';

function AppointmentBanner() {
  return (
    <div className="bg-white py-10">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between px-6 lg:px-12">
        <div className="lg:w-1/2 w-full mb-8 lg:mb-0">
          <img
            src="/images/banner/65cca34667321a9a91919866_CTA-banner.jpg" 
            alt="Doctor reviewing documents"
            className="rounded-lg shadow-md w-full"
          />
        </div>
        
        <div className="lg:w-1/2 w-full lg:pl-12 text-center lg:text-left">
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary mb-4">
            Get Appointment For Your Medical Service
          </h2>
          <p className="text-gray-600 mb-6">
            Book an appointment with our specialist doctors for quality care. We are committed to providing the best medical services for you and your family.
          </p>
          <button className="bg-primary text-white py-3 font-semibold px-6 rounded-lg shadow-md hover:bg-secondary">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
}

export default AppointmentBanner;
