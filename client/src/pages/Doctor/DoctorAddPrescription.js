import React from "react";
import DoctorNavbar from "../../Components/Doctor/DoctorNavbar/DoctorNavbar";
import AddPrescription from "../../Components/Doctor/AddPrescription/AddPrescription";
import Footer from "../../Components/Footer/Footer";

function DoctorAddPrescription() {
  return (
    <div>
      <DoctorNavbar />
      <AddPrescription />
      <Footer />
    </div>
  );
}

export default DoctorAddPrescription;
