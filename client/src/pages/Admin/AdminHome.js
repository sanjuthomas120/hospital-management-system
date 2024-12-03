// src/Pages/Admin/AdminHome.js

import React, { useEffect, useState } from "react";
import AdminNavbar from "../../Components/Admin/AdminNavbar/AdminNavbar";
import AdminSidebar from "../../Components/Admin/AdminSidebar/AdminSidebar";
import AdminChart from "../../Components/Admin/AdminDashboard/AdminChart";
import AdminCards from "../../Components/Admin/AdminDashboard/AdminCard";
import RecentActivity from "../../Components/Admin/AdminDashboard/RecentActivity";
import RevenueSummary from "../../Components/Admin/AdminDashboard/RevenueSummary";
import UpcomingAppointments from "../../Components/Admin/AdminDashboard/UpcomingAppointments";
import SystemNotifications from "../../Components/Admin/AdminDashboard/SystemNotifications";

function AdminHome() {
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [totalPatients, setTotalPatients] = useState(0);
  const [totalLabStaff, setTotalLabStaff] = useState(0);
  const [totalPharmacyStaff, setTotalPharmacyStaff] = useState(0);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [activities, setActivities] = useState([]);
  const [revenue, setRevenue] = useState({ daily: 0, weekly: 0, monthly: 0 });
  const [appointments, setAppointments] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Mock data - replace with API calls
    setTotalDoctors(50);
    setTotalPatients(200);
    setTotalLabStaff(15);
    setTotalPharmacyStaff(10);
    setTotalAppointments(120);
    
    setActivities([
      { id: 1, message: "New patient registered: John Doe", time: "2 mins ago" },
      { id: 2, message: "Appointment booked by Jane Smith", time: "10 mins ago" },
      { id: 3, message: "Doctor Mark updated his availability", time: "1 hour ago" },
    ]);

    setRevenue({ daily: 1500, weekly: 10500, monthly: 45000 });

    setAppointments([
      { id: 1, patient: "John Doe", doctor: "Dr. Smith", time: "11:00 AM" },
      { id: 2, patient: "Jane Doe", doctor: "Dr. Mark", time: "1:00 PM" },
    ]);

    setNotifications([
      { id: 1, message: "System maintenance scheduled at midnight.", time: "3 hours ago" },
      { id: 2, message: "New update available for appointment module.", time: "1 day ago" },
    ]);
  }, []);

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1">
        <AdminNavbar />
        <div className="flex-grow ml-56 mt-16 p-4">
          <AdminCards
            totalDoctors={totalDoctors}
            totalPatients={totalPatients}
            totalLabStaff={totalLabStaff}
            totalPharmacyStaff={totalPharmacyStaff}
            totalAppointments={totalAppointments}
          />

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <RevenueSummary daily={revenue.daily} weekly={revenue.weekly} monthly={revenue.monthly} />
            <UpcomingAppointments appointments={appointments} />
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <RecentActivity activities={activities} />
            <SystemNotifications notifications={notifications} />
          </div>

          <div className="mt-6">
            <AdminChart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
