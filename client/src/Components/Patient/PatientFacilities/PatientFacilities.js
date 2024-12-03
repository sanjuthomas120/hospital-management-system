import React from "react";

const facilities = [
  {
    title: "Emergency Room",
    description: "24/7 emergency services with quick response.",
    icon: "/images/facilities/134122_aid_hospital_room_emergency_first_icon.png",
  },
  {
    title: "Pharmacy",
    description: "In-house pharmacy with a wide range of medicines.",
    icon: "/images/facilities/medicine.png",
  },
  {
    title: "Operation Theater",
    description: "State-of-the-art surgical facilities.",
    icon: "/images/facilities/theater.png",
  },
  {
    title: "Laboratory",
    description: "Accurate diagnostics with advanced lab facilities.",
    icon: "/images/facilities/laboratory.png",
  },
  {
    title: "Radiology",
    description: "Advanced imaging services like X-rays and MRIs.",
    icon: "/images/facilities/radiology.png",
  },
  {
    title: "Inpatient Rooms",
    description: "Comfortable rooms for patients with 24/7 care.",
    icon: "/images/facilities/inpatient.png",
  },
  {
    title: "Cafeteria",
    description: "Nutritious meals for patients and visitors.",
    icon: "/images/facilities/cafeteria.png",
  },
  {
    title: "Physiotherapy Center",
    description: "Rehabilitation services for a speedy recovery.",
    icon: "/images/facilities/physical-therapy.png",
  },
];

function PatientFacilities() {
  return (
    <div className="my-12 bg-gray-50 py-10">
      <h2 className="text-5xl font-bold text-secondary text-center mb-10">
        Our Facilities
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 lg:px-12">
        {facilities.map((facility, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="w-20 h-20 mb-4 flex items-center justify-center bg-primary bg-opacity-90 rounded-full">
              <img
                src={facility.icon}
                alt={facility.title}
                className="w-12 h-12 object-contain"
              />
            </div>
            <h3 className="text-xl font-semibold text-secondary mb-2 hover:text-primary">
              {facility.title}
            </h3>
            <p className="text-gray-600">{facility.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PatientFacilities;
