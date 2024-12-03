import React from 'react'
import DoctorNavbar from '../../Components/Doctor/DoctorNavbar/DoctorNavbar'
import PrescriptionHistory from '../../Components/Doctor/PrescriptionHistory/PrescriptionHistory'
import Footer from '../../Components/Footer/Footer'

function DoctorViewPrescriptionHistory() {
  return (
    <div>
       <DoctorNavbar />
       <PrescriptionHistory />
       <Footer /> 
    </div>
  )
}

export default DoctorViewPrescriptionHistory