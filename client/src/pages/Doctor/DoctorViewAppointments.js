import React from 'react'
import DoctorNavbar from '../../Components/Doctor/DoctorNavbar/DoctorNavbar'
import ViewAppointments from '../../Components/Doctor/ViewAppointment/ViewAppointment'
import Footer from '../../Components/Footer/Footer'

function DoctorViewAppointments() {
  return (
    <div>
        <DoctorNavbar />
        <ViewAppointments />
        <Footer />
    </div>
  )
}

export default DoctorViewAppointments