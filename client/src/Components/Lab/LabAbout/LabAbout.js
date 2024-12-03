import React from 'react';

const LabAbout = () => {
  const features = [
    "Health, Wellness and Insurance",
    "97% customer satisfaction rate",
    "Family Scholarship Program"
  ];

  const cards = [
    {
      title: "COVID19 Testing Solutions",
      description: "Comprehensive testing solutions for accurate, timely detection and prevention, ensuring public health.",
      icon: () => (
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-white">
          <path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3 10h-3v3h-2v-3H8v-2h3V8h2v3h3v2z"/>
        </svg>
      )
    },
    {
      title: "I'm a Healthcare Provider",
      description: "I offer comprehensive and personalized medicine, using the latest advances to ensure results.",
      icon: () => (
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-white">
          <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v4h4v2h-4v4h-2v-4H7v-2h4V7z"/>
        </svg>
      )
    },
    {
      title: "I'm a Patient",
      description: "I seek compassionate and thorough medical care and individualized treatment plans for my well-being.",
      icon: () => (
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-white">
          <path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      )
    }
  ];

  return (
    <div className="bg-[#437F8C] text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Image */}
          <div className="rounded-lg overflow-hidden">
            <img 
              src="https://cdn.prod.website-files.com/664eeaa1582178032a2c0c59/6650443e13f7354a9b7f4186_woman-working-laboratory-close-up_12168572.htm.webp"
              alt="Medical professional in lab" 
              className="h-1/2 rounded-lg"
            />
          </div>
          
          <div className="space-y-6">
            <h1 className="text-4xl font-bold leading-tight">
              Continually Harnessing Our Medical Expertise
            </h1>
            
            <p className="text-lg opacity-90">
              At our medical facility, we are committed to continually harnessing our medical expertise to provide the highest quality of care to our patients. Our team of dedicated professionals stays at the forefront of medical advancements, regularly updating their knowledge.
            </p>
            
            <p className="text-lg opacity-90">
              By leveraging cutting-edge technology and evidence-based practices, we strive to improve patient outcomes and enhance overall health and well-being.
            </p>
            
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <button className="bg-white text-secondary px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors duration-300">
              About Us
            </button>
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div 
              key={index}
              className="bg-[#376873] p-6 rounded-lg hover:bg-opacity-90 transition-colors duration-300"
            >
              <div className="mb-4">
                <card.icon />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {card.title}
              </h3>
              <p className="opacity-90">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LabAbout;