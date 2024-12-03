// src/Components/Admin/AdminDashboard/AdminCards.js

import React from "react";

function AdminCard({ totalDoctors, totalPatients, totalLabStaff, totalPharmacyStaff, totalAppointments }) {
  return (
    <div className="p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-6">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold">Total Doctors</h3>
        <p className="text-2xl">{totalDoctors}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold">Total Patients</h3>
        <p className="text-2xl">{totalPatients}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold">Total Lab Staff</h3>
        <p className="text-2xl">{totalLabStaff}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold">Total Pharmacy Staff</h3>
        <p className="text-2xl">{totalPharmacyStaff}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold">Total Appointments</h3>
        <p className="text-2xl">{totalAppointments}</p>
      </div>
    </div>
  );
}

export default AdminCard;
