import React from "react";
import AdminNavbar from "../../Components/Admin/AdminNavbar/AdminNavbar";
import DoctorRegistration from "../../Components/Admin/DoctorRegistration/DoctorRegistration";
import AdminSidebar from "../../Components/Admin/AdminSidebar/AdminSidebar";

function AdminAddDoctor() {
  return (
    <div>
      <AdminNavbar />
      <AdminSidebar />
      <DoctorRegistration />
    </div>
  );
}

export default AdminAddDoctor;
