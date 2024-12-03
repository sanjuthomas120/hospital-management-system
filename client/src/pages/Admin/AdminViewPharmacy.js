import React from 'react'
import AdminNavbar from '../../Components/Admin/AdminNavbar/AdminNavbar'
import AdminSidebar from '../../Components/Admin/AdminSidebar/AdminSidebar'
import ViewPharmacy from '../../Components/Admin/ViewPharmacy/ViewPharmacy'

function AdminViewPharmacy() {
  return (
    <div>
        <AdminNavbar />
        <AdminSidebar />
        <ViewPharmacy />
    </div>
  )
}

export default AdminViewPharmacy