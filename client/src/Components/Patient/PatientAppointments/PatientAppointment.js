import React, { useState, useEffect } from 'react';

function PatientAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const patientId = sessionStorage.getItem('userId');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`http://localhost:5000/patient/appointments/${patientId}`);
        if (response.ok) {
          const data = await response.json();
          setAppointments(data);
        } else {
          setError('Failed to fetch appointments.');
        }
      } catch (err) {
        setError('An error occurred while fetching appointments.');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [patientId]);

  const handleCancel = async (appointmentId) => {
    const confirmCancel = window.confirm("Do you want to cancel the appointment?");
    if (!confirmCancel) return;

    try {
      const response = await fetch(
        `http://localhost:5000/patient/${appointmentId}/cancel-appointment`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Appointment canceled successfully.");
        setAppointments((prevAppointments) =>
          prevAppointments.filter((appointment) => appointment._id !== appointmentId)
        );
      } else {
        console.error("Error in canceling the appointment:", data.message);
        alert("Failed to cancel the appointment.");
      }
    } catch (error) {
      console.error("Error in canceling appointment:", error);
      alert("An error occurred while canceling the appointment. Please try again.");
    }
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
      <h2 className="text-3xl font-bold mb-4">My Appointments</h2>
      {loading ? (
        <p>Loading appointments...</p>
      ) : (
        <>
          {appointments.length > 0 ? (
            <ul className="space-y-4">
              {appointments.map(
                (appointment) =>
                  appointment.status === 'confirmed' && (
                    <li key={appointment._id} className="p-4 bg-gray-100 rounded-lg">
                      <p>
                        <strong>Date:</strong>{' '}
                        {new Date(appointment.date).toLocaleDateString()} at{' '}
                        {new Date(appointment.time).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                      <p>
                        <strong>Doctor:</strong> {appointment.doctor_id?.name || 'N/A'}
                      </p>
                      <p>
                        <strong>Department:</strong> {appointment.doctor_id?.specialty || 'N/A'}
                      </p>
                      <p>
                        <strong>Status:</strong> {appointment.status}
                      </p>
                      <p>
                        <strong>Payment Mode:</strong> {appointment.paymentMode}
                      </p>
                      <p>
                        <strong>Payment Status:</strong> {appointment.paymentStatus}
                      </p>
                      <button
                        onClick={() => handleCancel(appointment._id)}
                        className="bg-red-500 mt-2 px-6 py-1 text-white rounded-md"
                      >
                        Cancel Appointment
                      </button>
                    </li>
                  )
              )}
            </ul>
          ) : (
            <p>No confirmed appointments found.</p>
          )}
        </>
      )}
    </div>
  );
}

export default PatientAppointments;
