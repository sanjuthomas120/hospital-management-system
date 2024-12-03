import React from 'react'
import AdminNavbar from '../../Components/Admin/AdminNavbar/AdminNavbar'
import AdminSidebar from '../../Components/Admin/AdminSidebar/AdminSidebar'
import ViewPatients from '../../Components/Admin/ViewPatients/ViewPatients'

function AdminViewPatients() {
  return (
    <div>
        <AdminNavbar />
        <AdminSidebar />
        <ViewPatients />
    </div>
  )
}

export default AdminViewPatients