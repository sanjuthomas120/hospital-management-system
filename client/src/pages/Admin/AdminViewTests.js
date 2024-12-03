import React from 'react'
import AdminSidebar from '../../Components/Admin/AdminSidebar/AdminSidebar'
import ViewTests from '../../Components/Admin/ViewTests/ViewTest'
import AdminNavbar from '../../Components/Admin/AdminNavbar/AdminNavbar'

function AdminViewTests() {
  return (
    <div>
        <AdminNavbar />
        <AdminSidebar />
        <ViewTests />
    </div>
  )
}

export default AdminViewTests