import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ViewAppointment() {
  const doctor_id = sessionStorage.getItem("userId");
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (doctor_id) {
      fetchTodayAppointments();
    }
  }, [doctor_id]);

  const fetchTodayAppointments = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/doctor/${doctor_id}/today-appointments`
      );
      const data = await response.json();

      if (response.ok) {
        setAppointments(data.appointments);
      } else {
        console.error("Error fetching today's appointments:", data.message);
      }
    } catch (error) {
      console.error("Error fetching today's appointments:", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredAppointments = appointments.filter((appointment) =>
    appointment.patient_id?.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleAddPrescription = (appointmentId) => {
    navigate(`/doctor/add-prescription/${appointmentId}`);
  };

  const formatTime = (timeString) => {
    const time = new Date(timeString);
    return time.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="container min-h-[70vh] mx-auto p-10">
      <h2 className="text-2xl font-bold mb-6">Today's Appointments</h2>

      <input
        type="text"
        placeholder="Search by patient name"
        value={searchTerm}
        onChange={handleSearchChange}
        className="border p-2 mb-4 w-full rounded-md my-2"
      />

      {filteredAppointments.length > 0 ? (
        <div className="grid gap-4">
          {filteredAppointments.map((appointment) => (
            <div key={appointment._id} className="bg-white p-4 shadow-md rounded-lg">
              <h3 className="text-xl font-semibold">
                {appointment.patient_id ? appointment.patient_id.name : "Unknown Patient"}
              </h3>
              <p>Phone: {appointment.patient_id?.contact || "N/A"}</p>
              <p>Date: {new Date(appointment.date).toLocaleDateString()}</p>
              <p>Time: {formatTime(appointment.time)}</p>
              <button
                className="bg-primary text-white py-1 px-4 rounded mt-2"
                onClick={() => handleAddPrescription(appointment._id)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>
          {appointments.length === 0
            ? "No appointments for today."
            : "No matching patients found."}
        </p>
      )}
    </div>
  );
}

export default ViewAppointment;
