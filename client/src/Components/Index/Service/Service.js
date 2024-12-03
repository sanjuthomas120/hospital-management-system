import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

function Service() {
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const services = [
    {
      id: 1,
      image: "/images/services/65cb4ff286477ad7e0776295_gynecology.png",
      bg: "bg-blue-100",
      heading: "Gynecology",
      paragraph:
        "Women's health experts, annual exams, family planning, and gynecological care, prioritizing your well-being.",
    },
    {
      id: 2,
      image: "/images/services/65cb4f91c4f9e33c53b0c65a_pediatrics.png",
      bg: "bg-green-100",
      heading: "Pediatrics",
      paragraph:
        "Complete care for children, from check-ups to treatments, delivered with compassion and expertise.",
    },
    {
      id: 3,
      image: "/images/services/65cb4f26838d762de834b7ab_ophthalmology.png",
      bg: "bg-red-100",
      heading: "Ophthalmology",
      paragraph:
        "In order to keep your vision healthy, our ophthalmologists provide eye exams and surgeries.",
    },
    {
      id: 4,
      image: "/images/services/65cb4ed491d92075f406ae9b_neurology.png",
      bg: "bg-cyan-100",
      heading: "Neurology",
      paragraph:
        "Specialized care for brain and nerve disorders, ensuring expert diagnosis and compassionate treatment.",
    },
    {
      id: 5,
      image: "/images/services/65cb4e7f995609bf6bc39c36_oncology.png",
      bg: "bg-blue-100",
      heading: "Oncology",
      paragraph:
        "Cancer treatments provided by our oncologists are personalized and provided with unwavering support.",
    },
    {
      id: 6,
      image: "/images/services/65cb4df6dfec5e2b401272bb_cardiology.png",
      bg: "bg-green-100",
      heading: "Cardiology",
      paragraph:
        "Our board-certified cardiologists treat and prevent cardiovascular problems with a focus on heart health.",
    },
  ];
  const getDisplayCard = () => {
    let endIndex = startIndex + itemsPerPage;
    if (endIndex > services.length) {
      const remainingCards = services.slice(startIndex);
      const warpAroundCards = services.slice(0, endIndex - services.length);
      return [...remainingCards, ...warpAroundCards];
    }
    return services.slice(startIndex, endIndex);
  };
  const handleNext = () => {
    if (startIndex + itemsPerPage < services.length) {
      setStartIndex(startIndex + 1);
    }
  };
  const handlePrevious = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };
  const handleResize = () => {
    if (window.innerWidth >= 1024) {
      setItemsPerPage(3);
    } else if (window.innerWidth >= 640) {
      setItemsPerPage(2);
    } else {
      setItemsPerPage(1);
    }
  };
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="bg-white py-12 sm:6">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-[42px] md:text-[48px] text-secondary font-bold">
            Our Services
          </h2>
          <p className="text-gray-600 mt-4 text-lg md:text-xl">
            We offer a wide range of healthcare services to ensure your health
            and well-being.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {getDisplayCard().map((service) => (
            <div
              key={service.id}
              className="w-auto h-80 border rounded-2xl hover:border-primary hover:shadow-lg transition-all duration-200 ease-in-out"
            >
              <div className="flex justify-center py-6">
                <div className={`p-3 w-14 rounded-full ${service.bg}`}>
                  <img src={service.image} alt="" className="w-8 h-auto p-1" />
                </div>
              </div>
              <h3 className="capitalize text-3xl text-center font-semibold text-secondary hover:text-primary cursor-pointer">
                {service.heading}
              </h3>
              <p className="text-lg text-gray-500 px-4 pt-6 pb-8 text-center">
                {service.paragraph}
              </p>
            </div>
          ))}
        </div>
        <div className="flex pt-10 justify-center items-center gap-6">
          <button
            className={`text-primary w-14 h-14 border rounded-full flex items-center justify-center hover:text-white ${startIndex === 0 ? ' hover:bg-primary opacity-5' : ' hover:bg-primary'}`}
            disabled={startIndex === 0}
            onClick={handlePrevious}
          >
            <FontAwesomeIcon icon={faAngleLeft} size="2xl" />
          </button>

          <button
            className={`text-primary w-14 h-14 border rounded-full flex items-center justify-center hover:text-white ${startIndex + itemsPerPage >= services.length ? ' hover:bg-primary opacity-5' : ' hover:bg-primary'}`}
            disabled={startIndex + itemsPerPage >= services.length}
            onClick={handleNext}
          >
            <FontAwesomeIcon icon={faAngleRight} size="2xl" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Service;
