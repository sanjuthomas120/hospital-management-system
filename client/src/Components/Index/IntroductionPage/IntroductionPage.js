import React from "react";

function IntroductionPage() {
  return (
    <div className="bg-white relative overflow-hidden">
      <div className="absolute -top-16 -left-16 w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 bg-primary opacity-20 rounded-full z-0"></div>
      <div className="absolute lg:top-32 top-24 right-0 w-64 h-64 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-secondary opacity-20 rounded-full z-0"></div>
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-16">
          <div className="w-full lg:w-1/2 space-y-6">
            <h1 className="text-[56px] md:text-[64px] font-bold leading-tight capitalize">
              Best health care <span className="text-primary">services</span>{" "}
              available
            </h1>
            <p className="text-lg md:text-xl text-gray-500">
              Experience top-tier healthcare and tailored treatment for your
              well-being. Trust in our expertise to keep you healthy and
              vibrant.
            </p>
            <button className="bg-primary hover:bg-secondary text-white font-semibold py-3 px-6 rounded-md shadow-md">
              Learn More
            </button>
          </div>
          <div className="3/4 lg:w-1/2 flex justify-center">
            <img
              src="/images/banner/65cb03c7c409125210deb105_banner-dr-img.png"
              className="w-3/4 lg:w-full h-auto md:p-6 lg:p-12 rounded-lg"
              alt="Banner"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroductionPage;
