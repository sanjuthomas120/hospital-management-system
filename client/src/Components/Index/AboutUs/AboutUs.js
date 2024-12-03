import React from 'react';

function AboutUs(){
  return (
    <div className="bg-white py-12 sm:8">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <img
              src="/images/banner/65cc410a2512d0a2d9508437_About Banner Image Two.jpg"
              alt="About Us"
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
          <div className="order-1 lg:order-2 space-y-6">
            <h2 className="text-[42px] md:text-[48px] font-bold text-secondary capitalize">
              About Our Hospital
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              We are a healthcare institution dedicated to providing top-quality care
              to our patients. Our team of experienced medical professionals ensures that
              each patient receives personalized treatment in a comfortable and modern environment.
              At our hospital, we prioritize your health and well-being with a holistic approach.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              From state-of-the-art technology to compassionate care, we strive to offer the best
              healthcare services to our community. Join us in making healthcare accessible and
              efficient for everyone.
            </p>
            <button className="bg-primary hover:bg-secondary text-white font-semibold py-3 px-6 rounded-md shadow-md">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
