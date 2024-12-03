import React, { useEffect, useState } from "react";

function DoctorCards() {
  const doctor_id = sessionStorage.getItem("userId");
  const [todayAppointmentCount, setTodayAppointmentCount] = useState(0);
  const [completedAppointmentCount, setCompletedAppointmentCount] = useState(0);
  const [pendingAppointmentCount, setPendingAppointmentCount] = useState(0);
  const [missingAppointmentCount, setMissingAppointmentCount] = useState(0);
  const [canceledAppointmentCount, setCanceledAppointmentCount] = useState(0);

  useEffect(() => {
    if (doctor_id) {
      fetchTotalAppointmentCount();
      fetchCompletedAppointmentCount();
      fetchPendingAppointmentCount();
      fetchMissingAppointmentCount();
      fetchCanceledAppointmentCount();
    }
  }, [doctor_id]);
  const fetchTotalAppointmentCount = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/doctor/${doctor_id}/today-appointments-count`
      );
      const data = await response.json();

      if (response.ok) {
        setTodayAppointmentCount(data.count);
      } else {
        console.error("Error in fetching appointment count:", data.message);
      }
    } catch (error) {
      console.error("Error fetching appointment count:", error);
    }
  };
  const fetchCompletedAppointmentCount = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/doctor/${doctor_id}/completed-appointments-count`
      );
      const data = await response.json();
      if (response.ok) {
        setCompletedAppointmentCount(data.count);
      } else {
        console.error(
          "Error in fetching completed appointment count:",
          data.message
        );
      }
    } catch (error) {
      console.error("Error fetching completed appointment count:", error);
    }
  };
  const fetchPendingAppointmentCount = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/doctor/${doctor_id}/pending-appointments-count`
      );
      const data = await response.json();
      if (response.ok) {
        setPendingAppointmentCount(data.count);
      } else {
        console.error(
          "Error in fetching completed appointment count:",
          data.message
        );
      }
    } catch (error) {
      console.error("Error fetching completed appointment count:", error);
    }
  };
  const fetchMissingAppointmentCount = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/doctor/${doctor_id}/missing-appointments-count`
      );
      const data = await response.json();

      if (response.ok) {
        setMissingAppointmentCount(data.count);
      } else {
        console.error("Error in fetching appointment count:", data.message);
      }
    } catch (error) {
      console.error("Error fetching appointment count:", error);
    }
  };
  const fetchCanceledAppointmentCount = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/doctor/${doctor_id}/canceled-appointments-count`
      );
      const data = await response.json();

      if (response.ok) {
        setCanceledAppointmentCount(data.count);
      } else {
        console.error("Error in fetching appointment count:", data.message);
      }
    } catch (error) {
      console.error("Error fetching appointment count:", error);
    }
  };

  return (
    <div className="container mx-auto  p-16">
      <h2 className="text-2xl font-bold mb-6">Doctor Dashboard</h2>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        <div className="bg-blue-100 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Today's Appointments</h3>
          <p className="mt-2 text-3xl font-bold text-blue-600">
            {todayAppointmentCount}
          </p>
          <p className="mt-2">Appointments scheduled for today.</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Completed Appointments</h3>
          <p className="mt-2 text-3xl font-bold text-green-600">
            {completedAppointmentCount}
          </p>
          <p className="mt-2">Appointments successfully completed.</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Pending Appointments</h3>
          <p className="mt-2 text-3xl font-bold text-yellow-600">
            {pendingAppointmentCount}
          </p>
          <p className="mt-2">Remaining appointments.</p>
        </div>
        <div className="bg-pink-100 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Missed Appointments</h3>
          <p className="mt-2 text-3xl font-bold text-pink-600">{missingAppointmentCount}</p>
          <p className="mt-2">Appointments missed without notice.</p>
        </div>
        <div className="bg-red-100 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Canceled Appointments</h3>
          <p className="mt-2 text-3xl font-bold text-red-600">{canceledAppointmentCount}</p>
          <p className="mt-2">Canceled appointments.</p>
        </div>
      </div>
    </div>
  );
}

export default DoctorCards;
