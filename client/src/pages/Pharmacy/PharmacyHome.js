import React from 'react'
import PharmacyBanner from '../../Components/Pharmacy/PharmacyBanner/PharmacyBanner'
import PharmacyCard from '../../Components/Pharmacy/PharmacyBanner/PharmacyCard'
import PharmacyProduct from '../../Components/Pharmacy/PharmacyBanner/PharmacyProduct'
import PharmacyNavbar from '../../Components/Pharmacy/PharmacyBanner/PharmacyNavbar'

function PharmacyHome() {
  return (
    <div>
        <PharmacyNavbar />
        <PharmacyBanner />
        <PharmacyProduct />
        <PharmacyCard />
    </div>
  )
}

export default PharmacyHome