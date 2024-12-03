import React from 'react'
import AccountNavbar from '../../Components/Account/AccountNavbar/AccountNavbar'
import Bills from '../../Components/Account/Bills/Bills'
import Footer from '../../Components/Footer/Footer'

function AccountPendingBills() {
  return (
    <div>
        <AccountNavbar />
        <Bills />
        <Footer />
    </div>
  )
}

export default AccountPendingBills