import React from "react";
import PatientNavbar from "../../Components/Patient/PatientNavbar/PatientNavbar";
import PatientBanner from "../../Components/Patient/PatientBanner/PatientBanner";
import Footer from "../../Components/Footer/Footer";
import PatientService from "../../Components/Patient/PatientService/PatientService";
import PatientFacilities from "../../Components/Patient/PatientFacilities/PatientFacilities";
import AboutStaff from "../../Components/Patient/AboutStaff/AboutStaff";
import AppointmentBanner from "../../Components/Patient/AppointmentBanner/AppointmentBanner";

function PatientHome() {
  return (
    <div>
      <PatientNavbar />
      <PatientBanner />
      <PatientService />
      <AboutStaff />
      <AppointmentBanner />
      <PatientFacilities />
      <Footer />
    </div>
  );
}

export default PatientHome;
