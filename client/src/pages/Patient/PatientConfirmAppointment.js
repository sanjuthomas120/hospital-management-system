import React from 'react'
import PatientNavbar from '../../Components/Patient/PatientNavbar/PatientNavbar'
import ConfirmAppointment from '../../Components/Patient/ConfirmAppointment/ConfirmAppointment'
import Footer from '../../Components/Footer/Footer'

function PatientConfirmAppointment() {
  return (
    <div>
        <PatientNavbar />
        <ConfirmAppointment />
        <Footer />
    </div>
  )
}

export default PatientConfirmAppointment