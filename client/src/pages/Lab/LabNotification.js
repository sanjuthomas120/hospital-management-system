import React from 'react'
import LabNavbar from '../../Components/Lab/LabNavbar/LabNavbar'
import Notifications from '../../Components/Patient/Notification/Notification'
import Footer from '../../Components/Footer/Footer'

function LabNotification() {
  return (
    <div>
        <LabNavbar />
        <Notifications />
        <Footer />
    </div>
  )
}

export default LabNotification