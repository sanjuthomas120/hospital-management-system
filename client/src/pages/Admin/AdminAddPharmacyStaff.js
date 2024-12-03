import React from 'react'
import AdminNavbar from '../../Components/Admin/AdminNavbar/AdminNavbar'
import AdminSidebar from '../../Components/Admin/AdminSidebar/AdminSidebar'
import AddPharmacyStaff from '../../Components/Admin/Pharmacy/AddPharmacyStaff'

function AdminAddPharmacyStaff() {
  return (
    <div>
        <AdminNavbar/>
        <AdminSidebar />
        <AddPharmacyStaff />
    </div>
  )
}

export default AdminAddPharmacyStaff