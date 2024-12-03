import React from 'react'
import PatientNavbar from '../../Components/Patient/PatientNavbar/PatientNavbar'
import Footer from '../../Components/Footer/Footer'
import PatientProfile from '../../Components/Patient/Profile/PatientProfile'

function PatientProfilePage() {
  return (
    <div>
        <PatientNavbar />
        <PatientProfile />
        <Footer />
    </div>
  )
}

export default PatientProfilePage