import React from "react";
import PatientNavbar from "../../Components/Patient/PatientNavbar/PatientNavbar";
import BookAppointment from "../../Components/Patient/BookAppointment/BookAppointment";
import Footer from "../../Components/Footer/Footer";

function PatientBookAppointment() {
  return (
    <div>
      <PatientNavbar />
      <BookAppointment />
      <Footer />
    </div>
  );
}

export default PatientBookAppointment;
