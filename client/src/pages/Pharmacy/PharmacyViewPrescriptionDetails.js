import React from 'react'
import PharmacyNavbar from '../../Components/Pharmacy/PharmacyBanner/PharmacyNavbar'
import ViewPrescriptionDetails from '../../Components/Pharmacy/ViewPrescriptionDetails/ViewPrescriptionDetails'
import Footer from '../../Components/Footer/Footer'

function PharmacyViewPrescriptionDetails() {
  return (
    <div>
        <PharmacyNavbar />
        <ViewPrescriptionDetails />
        <Footer />
    </div>
  )
}

export default PharmacyViewPrescriptionDetails