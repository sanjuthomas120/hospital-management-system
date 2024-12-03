import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AppointmentHistory() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const patientId = sessionStorage.getItem("userId");
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/patient/appointment-history/${patientId}`
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setAppointments(data);
        } else {
          setError("Failed to fetch appointments");
        }
      } catch (err) {
        setError("An error occurred while fetching appointments");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [patientId]);
  const handleViewPrescription = (appointmentId) => {
    navigate(`/prescription/${appointmentId}`);
  };

  if (error) {
    return (
      <div className="py-8 px-12 min-h-[70vh]">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="py-8 px-12 min-h-[70vh]">
      <h2 className="text-3xl font-bold mb-4">Appointment History</h2>
      {loading && <p>Loading appointments...</p>}
      {appointments.length > 0 ? (
        <ul className="space-y-4">
          {appointments.map(
            (appointment) =>
              appointment.status !== "confirmed" && (
                <li
                  key={appointment._id}
                  className="p-4 bg-gray-100 rounded-lg"
                >
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(appointment.date).toLocaleDateString()} at{" "}
                    {new Date(appointment.time).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p>
                    <strong>Doctor:</strong>{" "}
                    {appointment.doctor_id?.name || "N/A"}
                  </p>
                  <p>
                    <strong>Department:</strong>{" "}
                    {appointment.doctor_id?.specialty || "N/A"}
                  </p>
                  <p>
                    <strong>Status:</strong> {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </p>
                  {appointment.status === "completed" && (
                    <button onClick={() =>handleViewPrescription(appointment._id)} className="bg-primary font-semibold text-white mt-2 py-1 px-6 rounded-lg shadow-md hover:bg-secondary transition duration-300">
                      View Prescription
                    </button>
                  )}
                </li>
              )
          )}
        </ul>
      ) : (
        <p>No appointments found.</p>
      )}
    </div>
  );
}

export default AppointmentHistory;
