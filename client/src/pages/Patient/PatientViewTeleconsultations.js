import React from 'react'
import PatientNavbar from '../../Components/Patient/PatientNavbar/PatientNavbar'
import Footer from '../../Components/Footer/Footer'
import ViewTeleconsultations from '../../Components/Patient/ViewTeleconsultations/ViewTeleconsultations'

function PatientViewTeleconsultations() {
  return (
    <div>
        <PatientNavbar />
        <ViewTeleconsultations />
        <Footer />
    </div>
  )
}

export default PatientViewTeleconsultations