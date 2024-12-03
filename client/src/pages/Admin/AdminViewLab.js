import React from 'react'
import AdminNavbar from '../../Components/Admin/AdminNavbar/AdminNavbar'
import AdminSidebar from '../../Components/Admin/AdminSidebar/AdminSidebar'
import ViewLabs from '../../Components/Admin/ViewLabs/ViewLabs'

function AdminViewLab() {
  return (
    <div>
        <AdminNavbar />
        <AdminSidebar />
        <ViewLabs />
    </div>
  )
}

export default AdminViewLab