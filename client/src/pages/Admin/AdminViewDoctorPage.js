import React from "react";
import AdminNavbar from "../../Components/Admin/AdminNavbar/AdminNavbar";
import AdminSidebar from "../../Components/Admin/AdminSidebar/AdminSidebar";
import AdminViewDoctors from "../../Components/Admin/AdminViewDoctors/AdminViewDoctors";

function AdminViewDoctorPage() {
  return (
    <div>
      <AdminNavbar />
      <AdminSidebar />
      <AdminViewDoctors />
    </div>
  );
}

export default AdminViewDoctorPage;
