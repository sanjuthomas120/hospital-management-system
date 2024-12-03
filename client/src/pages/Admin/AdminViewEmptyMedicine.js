import React from 'react'
import AdminNavbar from '../../Components/Admin/AdminNavbar/AdminNavbar'
import AdminSidebar from '../../Components/Admin/AdminSidebar/AdminSidebar'
import EmptyMedicineDetails from '../../Components/Admin/EmptyMedicineDetails/EmptyMedicineDetails'

function AdminViewEmptyMedicine() {
  return (
    <div>
        <AdminNavbar />
        <AdminSidebar />
        <EmptyMedicineDetails />
    </div>
  )
}

export default AdminViewEmptyMedicine