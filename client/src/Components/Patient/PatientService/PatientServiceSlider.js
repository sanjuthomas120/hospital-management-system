import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import PatientServiceCard from "./PatientServiceCard";
import 'swiper/css';
import 'swiper/css/autoplay'

const services = [
  {
    title: "Cardiology",
    description:
      "Expert care for your heart, including diagnostics, treatment, and preventive care for heart conditions.",
    icon: "/images/icons/human-heart-logo-medical-cardiology-icon-illustration-vector.jpg",
  },
  {
    title: "Orthopedics",
    description:
      "Specialized care for bone, joint, and muscle disorders, ensuring mobility and freedom from pain.",
    icon: "/images/icons/OIP.jpeg",
  },
  {
    title: "Pediatrics",
    description:
      "Comprehensive healthcare for children, ensuring their growth and development are in safe hands.",
    icon: "/images/icons/pediatrics_baby_care_baby-1024.webp",
  },
  {
    title: "Dermatology",
    description:
      "Advanced skin care treatments and consultations for various skin conditions and cosmetic concerns.",
    icon: "/images/icons/dermatology-examination-of-woman-skin-silhouette-icon-checkup-of-girl-skin-face-with-magnifier-black-pictogram-facial-skin-care-icon-isolated-illustration-vector.jpg",
  },
  {
    title: "Radiology",
    description:
      "State-of-the-art imaging services including X-rays, MRIs, and CT scans for accurate diagnostics.",
    icon: "/images/icons/x-ray_examination_radiology_technology_radiography-1024.webp",
  },
  {
    title: "Gynecology",
    description:
      "Personalized care for women’s health, from routine check-ups to specialized gynecological treatments.",
    icon: "/images/icons/gynecology-icon-6.jpg",
  },
  {
    title: "Physiotherapy",
    description:
      "Rehabilitation services to help you recover and regain strength after injury or surgery.",
    icon: "/images/icons/physiotherapy_exercise_stretching-512.webp",
  },
  {
    title: "Emergency Services",
    description:
      "24/7 emergency care with quick response to handle critical medical situations.",
    icon: "/images/icons/ambulance-512.webp",
  },
];

function PatientServiceSlider() {
  return (
    <div className="mt-8">
      <Swiper
      modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{
            delay: 3000,
            disableOnInteraction: false,
        }}
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="p-4"
      >
        {services.map((service, index) => (
          <SwiperSlide key={index}>
            <PatientServiceCard
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
export default PatientServiceSlider;
