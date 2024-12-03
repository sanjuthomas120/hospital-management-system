import React from 'react'
import AdminNavbar from '../../Components/Admin/AdminNavbar/AdminNavbar'
import AdminSidebar from '../../Components/Admin/AdminSidebar/AdminSidebar'
import ViewMedicine from '../../Components/Admin/ViewMedicines/ViewMedicines'

function AdminViewMedicines() {
  return (
    <div>
        <AdminNavbar />
        <AdminSidebar />
        <ViewMedicine />
    </div>
  )
}

export default AdminViewMedicines