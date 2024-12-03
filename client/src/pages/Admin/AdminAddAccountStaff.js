import React from 'react'
import AdminNavbar from '../../Components/Admin/AdminNavbar/AdminNavbar'
import AdminSidebar from '../../Components/Admin/AdminSidebar/AdminSidebar'
import AddAccountStaff from '../../Components/Admin/AddAccountStaff/AddAccountStaff'

function AdminAddAccountStaff() {
  return (
    <div>
        <AdminNavbar />
        <AdminSidebar />
        <AddAccountStaff />
    </div>
  )
}

export default AdminAddAccountStaff