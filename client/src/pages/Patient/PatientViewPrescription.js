import React from "react";
import PatientNavbar from "../../Components/Patient/PatientNavbar/PatientNavbar";
import ViewPrescription from "../../Components/Patient/ViewPrescription/ViewPrescription";
import Footer from "../../Components/Footer/Footer";

function PatientViewPrescription() {
  return (
    <div>
      <PatientNavbar />
      <ViewPrescription />
      <Footer />
    </div>
  );
}

export default PatientViewPrescription;
