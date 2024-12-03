import React from 'react'
import PharmacyNavbar from '../../Components/Pharmacy/PharmacyBanner/PharmacyNavbar'
import ViewMedicine from '../../Components/Pharmacy/ViewMedicine/ViewMedicine'
import Footer from '../../Components/Footer/Footer'

function PharmacyViewMedicine() {
  return (
    <div>
        <PharmacyNavbar />
        <ViewMedicine />
        <Footer />
    </div>
  )
}

export default PharmacyViewMedicine