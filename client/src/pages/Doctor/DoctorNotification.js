import React from 'react'
import DoctorNavbar from '../../Components/Doctor/DoctorNavbar/DoctorNavbar'
import Notifications from '../../Components/Patient/Notification/Notification'
import Footer from '../../Components/Footer/Footer'

function DoctorNotification() {
  return (
    <div>
        <DoctorNavbar />
        <Notifications />
        <Footer />
    </div>
  )
}

export default DoctorNotification