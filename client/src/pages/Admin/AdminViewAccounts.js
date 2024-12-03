import React from "react";
import AdminNavbar from "../../Components/Admin/AdminNavbar/AdminNavbar";
import AdminSidebar from "../../Components/Admin/AdminSidebar/AdminSidebar";
import ViewAccounts from "../../Components/Admin/ViewAccounts/ViewAccounts";

function AdminViewAccounts() {
  return (
    <div>
      <AdminNavbar />
      <AdminSidebar />
      <ViewAccounts />
    </div>
  );
}

export default AdminViewAccounts;
