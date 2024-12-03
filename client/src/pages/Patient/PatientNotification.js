import React from "react";
import PatientNavbar from "../../Components/Patient/PatientNavbar/PatientNavbar";
import Notifications from "../../Components/Patient/Notification/Notification";
import Footer from "../../Components/Footer/Footer";

function PatientNotification() {
  return (
    <div>
      <PatientNavbar />
      <Notifications />
      <Footer />
    </div>
  );
}

export default PatientNotification;
