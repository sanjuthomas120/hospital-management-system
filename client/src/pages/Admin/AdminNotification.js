import React from 'react'
import AdminNavbar from '../../Components/Admin/AdminNavbar/AdminNavbar'
import AdminSidebar from '../../Components/Admin/AdminSidebar/AdminSidebar'
import SendNotification from '../../Components/Admin/SendNotification/SendNotification'

function AdminNotification() {
  return (
    <div>
        <AdminNavbar />
        <AdminSidebar />
        <SendNotification />
    </div>
  )
}

export default AdminNotification