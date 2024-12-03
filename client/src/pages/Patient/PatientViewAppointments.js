import React from 'react'
import PatientNavbar from '../../Components/Patient/PatientNavbar/PatientNavbar'
import PatientAppointment from '../../Components/Patient/PatientAppointments/PatientAppointment'
import Footer from '../../Components/Footer/Footer'

function PatientViewAppointments() {
  return (
    <div>
        <PatientNavbar />
        <PatientAppointment />
        <Footer />
    </div>
  )
}

export default PatientViewAppointments