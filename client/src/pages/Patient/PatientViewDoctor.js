import React from 'react'
import PatientNavbar from '../../Components/Patient/PatientNavbar/PatientNavbar'
import Footer from '../../Components/Footer/Footer'
import ViewDoctors from '../../Components/Patient/ViewDoctors/ViewDoctors'

function PatientViewDoctor() {
  return (
    <div>
        <PatientNavbar />
        <ViewDoctors />
        <Footer />
    </div>
  )
}

export default PatientViewDoctor