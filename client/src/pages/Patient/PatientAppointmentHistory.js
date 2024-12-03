import React from "react";
import PatientNavbar from "../../Components/Patient/PatientNavbar/PatientNavbar";
import AppointmentHistory from "../../Components/Patient/AppointmentHistory/AppointmentHistory";
import Footer from "../../Components/Footer/Footer";

function PatientAppointmentHistory() {
  return (
    <div>
      <PatientNavbar />
      <AppointmentHistory />
      <Footer />
    </div>
  );
}

export default PatientAppointmentHistory;
