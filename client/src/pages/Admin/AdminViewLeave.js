import React from 'react'
import AdminNavbar from '../../Components/Admin/AdminNavbar/AdminNavbar'
import AdminSidebar from '../../Components/Admin/AdminSidebar/AdminSidebar'
import ViewDoctorLeaves from '../../Components/Admin/LeaveRequests/LeaveRequests'

function AdminViewLeave() {
  return (
    <div>
        <AdminNavbar />
        <AdminSidebar />
        <ViewDoctorLeaves />
    </div>
  )
}

export default AdminViewLeave