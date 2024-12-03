// components/DoctorRequestLeave.js
import React, { useState } from "react";

const LeaveMarking = () => {
  const doctorId = sessionStorage.getItem("userId");
  const [leave, setLeave] = useState({
    startDate: "",
    endDate: "",
    reason: "",
  });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setLeave({ ...leave, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true to disable inputs and button
    try {
      const response = await fetch(
        "http://localhost:5000/doctor/request-leave",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ doctorId, ...leave }),
        }
      );
      const data = await response.json();
      setMessage(data.message);

      // Clear form on successful submission
      if (response.ok) {
        setLeave({ startDate: "", endDate: "", reason: "" });
      }
    } catch (error) {
      console.error("Error requesting leave:", error);
      setMessage("Error submitting leave request.");
    } finally {
      setLoading(false); // Re-enable inputs and button
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg my-10">
      <h2 className="text-2xl font-bold mb-6 text-primary text-center">
        Request Leave
      </h2>
      {message && (
        <div className="mb-4 p-4 bg-blue-100 text-primary rounded">
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={leave.startDate}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none"
            disabled={loading} // Disable when loading
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            name="endDate"
            value={leave.endDate}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none"
            disabled={loading} // Disable when loading
          />
        </div>
        <div>
          <label>Reason:</label>
          <textarea
            name="reason"
            value={leave.reason}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none"
            disabled={loading} // Disable when loading
          />
        </div>
        <button
          type="submit"
          className={`w-full py-3 text-white rounded ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-primary"
          }`}
          disabled={loading} // Disable button when loading
        >
          {loading ? "Submitting..." : "Submit Leave Request"}
        </button>
      </form>
    </div>
  );
};

export default LeaveMarking;
