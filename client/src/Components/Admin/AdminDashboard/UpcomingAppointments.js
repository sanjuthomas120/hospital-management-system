import React from 'react';

function UpcomingAppointments({ appointments }) {
  return (
    <div className="bg-white shadow rounded p-4">
      <h3 className="text-lg font-semibold mb-2">Upcoming Appointments</h3>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id} className="mb-2">
            {appointment.patient} with {appointment.doctor} at {appointment.time}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UpcomingAppointments;
