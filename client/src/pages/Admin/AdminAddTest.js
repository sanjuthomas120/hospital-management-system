import React from "react";
import AdminNavbar from "../../Components/Admin/AdminNavbar/AdminNavbar";
import AddTest from "../../Components/Admin/AddTest/AddTest";
import AdminSidebar from "../../Components/Admin/AdminSidebar/AdminSidebar";


function AdminAddTest() {
  return (
    <div>
      <AdminNavbar />
      <AdminSidebar />
      <AddTest />
    </div>
  );
}

export default AdminAddTest;
