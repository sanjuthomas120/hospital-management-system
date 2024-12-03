import React from 'react';
import { Check } from 'lucide-react';

const PharmacyCard = () => {
  const partners = [
    { name: "Page Builder", description: "Easy drag & drop" },
    { name: "Slide Manager", description: "Dynamic content" },
    { name: "E-Commerce", description: "Online store solution" },
    { name: "Email Marketing", description: "Customer engagement" },
    { name: "Translation", description: "Multi-language support" },
    { name: "Forms", description: "Contact management" }
  ];

  return (
    <div className="bg-white">
      {/* Partners Section */}
      <section className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {partners.map((partner, index) => (
            <div key={index} className="flex flex-col items-center text-center space-y-3">
              <div className="w-16 h-16 bg-emerald-50 rounded-lg flex items-center justify-center">
                <Check className="w-8 h-8 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{partner.name}</h3>
                <p className="text-sm text-gray-500">{partner.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-b from-emerald-50 to-white">
        <div className="max-w-4xl mx-auto py-16 px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Launch your Medical & Pharmacy Online business up with us!
          </h2>
          
          <button className="bg-emerald-600 text-white px-8 py-3 rounded-full font-medium hover:bg-emerald-700 transition-colors duration-200">
            GET STARTED
          </button>

          <div className="mt-12 text-sm text-gray-500">
            © 2024 All rights reserved. Created with care.
          </div>
        </div>
      </section>
    </div>
  );
};

export default PharmacyCard;