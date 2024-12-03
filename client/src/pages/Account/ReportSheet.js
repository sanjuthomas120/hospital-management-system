import React from 'react'
import AccountNavbar from '../../Components/Account/AccountNavbar/AccountNavbar'
import HospitalAccountSheet from '../../Components/Account/AccountReport/AccountReport'
import Footer from '../../Components/Footer/Footer'

function ReportSheet() {
  return (
    <div>
        <AccountNavbar />
        <HospitalAccountSheet />
        <Footer />
    </div>
  )
}

export default ReportSheet