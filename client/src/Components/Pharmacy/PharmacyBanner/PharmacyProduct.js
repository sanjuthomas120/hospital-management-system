import React from 'react';

const PharmacyProduct = () => {
  const stats = [
    {
      number: "102",
      label: "Successful work with"
    },
    {
      number: "32",
      label: "Exported to countries"
    },
    {
      number: "1321",
      label: "More than 15 years of experience"
    },
    {
      number: "1,200",
      label: "Sold out barrels per day"
    }
  ];

  return (
    <section className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Product Image */}
        <div className="relative">
          <div className="bg-gray-50 rounded-lg p-8">
            <img
              src="https://corona.themeftc.com/wp-content/uploads/2022/02/img3-h22.jpg"
              alt="Surgicept Hand Sanitizer"
              className="w-full object-contain max-w-md mx-auto"
            />
          </div>
        </div>

        {/* Right side - Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-semibold">
              The perfect choice to{' '}
              <span className="italic text-gray-600">protect</span>{' '}
              you
            </h2>
            
            <p className="text-gray-600 text-lg leading-relaxed">
              The bacteriostatic rate is as high as 99.9%, which directly eliminates common bacteria, 
              forms a sterilizing protective layer on the skin surface, and effectively inhibits 
              bacteria regeneration.
            </p>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-2 gap-8 mt-12">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-4xl font-bold">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PharmacyProduct;