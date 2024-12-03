import React from "react";
import AdminNavbar from "../../Components/Admin/AdminNavbar/AdminNavbar";
import AdminSidebar from "../../Components/Admin/AdminSidebar/AdminSidebar";
import AddMedicine from "../../Components/Admin/MedicineAdd/MedicineAdd";

function AdminAddMedicine() {
  return (
    <div>
      <AdminNavbar />
      <AdminSidebar />
      <AddMedicine />
    </div>
  );
}

export default AdminAddMedicine;
