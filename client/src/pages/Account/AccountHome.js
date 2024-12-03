import React from "react";
import AccountNavbar from '../../Components/Account/AccountNavbar/AccountNavbar'
import AccountDashboard from "../../Components/Account/AccountDashboard/AccountDashboard";
import RecentTransactions from "../../Components/Account/RecentTransactions/RecentTransactions";
import AccountFooter from "../../Components/Account/AccountFooter/AccountFooter";

function AccountHome() {
  return (
    <div>
      <AccountNavbar />
      <AccountDashboard />
      <RecentTransactions />
      <AccountFooter />
    </div>
  );
}

export default AccountHome;
