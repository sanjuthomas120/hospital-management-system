import React from 'react'
import AdminNavbar from '../../Components/Admin/AdminNavbar/AdminNavbar'
import AdminSidebar from '../../Components/Admin/AdminSidebar/AdminSidebar'
import AddLabStaff from '../../Components/Admin/AddLabStaff/AddLabStaff'

function AdminAddLabStaff() {
  return (
    <div>
        <AdminNavbar/>
        <AdminSidebar />
        <AddLabStaff />
    </div>
  )
}

export default AdminAddLabStaff