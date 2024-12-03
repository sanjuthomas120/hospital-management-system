import React from "react";
import DoctorNavbar from "../../Components/Doctor/DoctorNavbar/DoctorNavbar";
import DoctorCards from "../../Components/Doctor/DoctorCards/DoctorCards";
import Footer from "../../Components/Footer/Footer";
import DoctorBanner from "../../Components/Doctor/DoctorBanner/DoctorBanner";

function DoctorIndex() {
  return (
    <div>
      <DoctorNavbar />
      <DoctorBanner />
      <DoctorCards />
      <Footer />
    </div>
  );
}

export default DoctorIndex;
