import React from "react";
import AccountNavbar from "../../Components/Account/AccountNavbar/AccountNavbar";
import Notification from "../../Components/Patient/Notification/Notification";
import Footer from '../../Components/Footer/Footer'

function AccountsNotification() {
  return (
    <div>
      <AccountNavbar />
      <Notification />
      <Footer />
    </div>
  );
}

export default AccountsNotification;
