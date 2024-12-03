import React from 'react'
import DoctorNavbar from '../../Components/Doctor/DoctorNavbar/DoctorNavbar'
import ViewTeleDetails from '../../Components/Doctor/ViewTeleDetails/ViewTeleDetails'
import Footer from '../../Components/Footer/Footer'

function DoctorViewTeleDetails() {
  return (
    <div>
        <DoctorNavbar />
        <ViewTeleDetails />
        <Footer />
    </div>
  )
}

export default DoctorViewTeleDetails