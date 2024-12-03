import React from "react";
import IndexNavbar from "../Index/IndexNavbar/IndexNavbar";
import PatientRegisterForm from "./PatientRegisterForm/PatientRegisterForm";
import Footer from "../Footer/Footer";

function PatientRegister() {
  return (
    <div>
      <IndexNavbar />
      <PatientRegisterForm />
      <Footer />
    </div>
  );
}

export default PatientRegister;
