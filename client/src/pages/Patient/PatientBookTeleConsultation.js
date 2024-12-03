import React from "react";
import PatientNavbar from '../../Components/Patient/PatientNavbar/PatientNavbar'
import BookTeleConsultation from "../../Components/Patient/BookTeleConsultation/BookTeleConsultation";
import Footer from '../../Components/Footer/Footer'

function PatientBookTeleConsultation() {
  return (
    <div>
       <PatientNavbar />
       <BookTeleConsultation />
       <Footer /> 
    </div>
  )
}

export default PatientBookTeleConsultation;
