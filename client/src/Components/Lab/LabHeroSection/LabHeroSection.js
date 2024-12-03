import React from 'react';
import { ArrowRight, Microscope } from 'lucide-react';

const LabHeroSection = () => {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 z-0">
        <img
          src="https://cdn.prod.website-files.com/664eeaa1582178032a2c0c59/6656d3e479d50404542a09c2_18424.webp"
          alt="Medical Laboratory Background"
          className="w-full h-full object-cover"
        />
        <div 
          className="absolute inset-0 bg-secondary"
          style={{ 
            opacity: 0.7 
          }}
        />
      </div>

     
      <div className="relative z-10 h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
       
          <div className="mb-8 flex justify-center">
            <div 
              className="p-4 rounded-full bg-primary"
            >
              <Microscope className="w-8 h-8 text-white" />
            </div>
          </div>    
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Clear and Insightful
            <br />
            Testing Results!
          </h1>

          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-12">
            We continually leverage our medical expertise to develop top-tier testing services while 
            investing in cutting-edge technology to revolutionize healthcare delivery.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="px-8 py-3 rounded-full text-lg font-medium transition-all duration-200 text-white bg-primary"
            >
              Book a Visit
            </button>

            <button 
              className="px-8 py-3 rounded-full text-lg font-medium bg-transparent border-2 border-white text-white 
                        hover:bg-white hover:text-gray-900 transition-all duration-200 flex items-center justify-center gap-2"
            >
              Request Test
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div 
          className="w-1.5 h-8 rounded-full bg-primary"

        >
          <div 
            className="w-full h-1/2 rounded-full bg-white animate-pulse"
          />
        </div>
      </div>
    </div>
  );
};

export default LabHeroSection;