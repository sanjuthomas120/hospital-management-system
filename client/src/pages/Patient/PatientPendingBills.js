import React from 'react'
import PatientNavbar from '../../Components/Patient/PatientNavbar/PatientNavbar'
import PendingBills from '../../Components/Patient/PendingBills/PendingBills'
import Footer from '../../Components/Footer/Footer'

function PatientPendingBills() {
  return (
    <div>
        <PatientNavbar />
        <PendingBills />
        <Footer />
    </div>
  )
}

export default PatientPendingBills