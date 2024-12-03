// components/AdminViewDoctorLeaves.js
import React, { useEffect, useState } from 'react';

const ViewDoctorLeaves = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = async () => {
    try {
      const response = await fetch('http://localhost:5000/admin/leave-requests');
      const data = await response.json();
      setLeaveRequests(data);
    } catch (error) {
      console.error('Error fetching leave requests:', error);
    }
  };

  const updateLeaveStatus = async (id, status) => {
    try {
      const response = await fetch(`http://localhost:5000/admin/leave-requests/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const data = await response.json();
      setMessage(data.message);
      fetchLeaveRequests(); 
    } catch (error) {
      console.error('Error updating leave request status:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg ml-80 mt-24">
      <h2 className="text-2xl font-bold mb-6 text-primary text-center">Doctor Leave Requests</h2>
      {message && <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">{message}</div>}
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="p-3">Doctor</th>
            <th className="p-3">Start Date</th>
            <th className="p-3">End Date</th>
            <th className="p-3">Reason</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.map((request) => (
            <tr key={request._id} className="border-b text-center">
              <td className="p-3">{request.doctorId.name}</td>
              <td className="p-3">{new Date(request.startDate).toLocaleDateString()}</td>
              <td className="p-3">{new Date(request.endDate).toLocaleDateString()}</td>
              <td className="p-3">{request.reason}</td>
              <td className="p-3">
                <span className={`p-2 rounded ${request.status === 'approved' ? 'bg-green-100 text-green-700' : request.status === 'denied' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                </span>
              </td>
              <td className="p-3 space-x-2">
                <button
                  onClick={() => updateLeaveStatus(request._id, 'approved')}
                  className="px-3 py-1 bg-green-600 text-white rounded"
                  disabled={request.status !== 'pending'}
                >
                  Approve
                </button>
                <button
                  onClick={() => updateLeaveStatus(request._id, 'denied')}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                  disabled={request.status !== 'pending'}
                >
                  Deny
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewDoctorLeaves;
