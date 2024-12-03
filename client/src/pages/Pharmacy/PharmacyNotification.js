import React from 'react'
import PharmacyNavbar from '../../Components/Pharmacy/PharmacyBanner/PharmacyNavbar'
import Notifications from '../../Components/Patient/Notification/Notification'
import Footer from '../../Components/Footer/Footer'

function PharmacyNotification() {
  return (
    <div>
        <PharmacyNavbar />
        <Notifications />
        <Footer />
    </div>
  )
}

export default PharmacyNotification