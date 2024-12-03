import React from "react";
import PatientNavbar from "../../Components/Patient/PatientNavbar/PatientNavbar";
import CompletedBills from "../../Components/Patient/CompletedBills/CompletedBills";
import Footer from "../../Components/Footer/Footer";

function PatientCompletedBills() {
  return (
    <div>
      <PatientNavbar />
      <CompletedBills />
      <Footer />
    </div>
  );
}

export default PatientCompletedBills;
