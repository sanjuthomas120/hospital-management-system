import React from 'react';

const LabService = () => {
  const services = [
    {
      title: "Comprehensive Diagnostic",
      description: "We offer a range of imaging modalities, including MRI, CT scans, ultrasound, and X-rays, to deliver precise and visualizations.",
      icon: () => (
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-primary">
          <path fill="currentColor" d="M12 8a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4m0 2a2 2 0 0 0-2 2 2 2 0 0 0 2 2 2 2 0 0 0 2-2 2 2 0 0 0-2-2m-2 12c-1.1 0-2-.9-2-2v-2h8v2c0 1.1-.9 2-2 2h-4z" />
        </svg>
      )
    },
    {
      title: "General Diagnostic Testing",
      description: "Comprehensive diagnostic testing services for accurate, timely, and reliable health assessments and disease detection.",
      icon: () => (
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-primary">
          <path fill="currentColor" d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
        </svg>
      )
    },
    {
      title: "Specialized Genetic Testing",
      description: "Advanced genetic testing services for precise diagnosis and personalized treatment plans.",
      icon: () => (
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-primary">
          <path fill="currentColor" d="M4 2h2v2c0 1.44.76 2.69 1.88 3.4L12 9.92l4.12-2.52C17.24 6.69 18 5.44 18 4V2h2v2c0 2.17-1.16 4.06-2.88 5.1L14 11.05V19c0 .55-.45 1-1 1h-2c-.55 0-1-.45-1-1v-7.95L6.88 9.1C5.16 8.06 4 6.17 4 4V2z" />
        </svg>
      )
    },
    {
      title: "Naturopathic Lab Testing",
      description: "Comprehensive lab testing for holistic health insights and naturopathic treatment planning.",
      icon: () => (
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-primary">
          <path fill="currentColor" d="M7 2v2h1v14c0 2.21 1.79 4 4 4s4-1.79 4-4V4h1V2H7zm4 14c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
        </svg>
      )
    },
    {
      title: "Hormone Insights Testing",
      description: "Detailed hormone testing for accurate insights into hormonal balance and health.",
      icon: () => (
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-primary">
          <path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" />
        </svg>
      )
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-secondary mb-12">
        Find The Right Test For Your Needs
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div 
            key={index}
            className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow duration-300"
          >
            <div className="mb-4">
              <service.icon />
            </div>
            <h3 className="text-xl font-semibold text-secondary mb-2">
              {service.title}
            </h3>
            <p className="text-gray-600">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LabService;