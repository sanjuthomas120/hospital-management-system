import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function  ViewTeleConsultation() {
  const doctor_id = sessionStorage.getItem("userId");
  const [teleconsultations, setTeleconsultations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (doctor_id) {
      fetchTodayTeleConsultations();
    }
  }, [doctor_id]);

  const fetchTodayTeleConsultations = async () => { 
    try {
      const response = await fetch(
        `http://localhost:5000/doctor/${doctor_id}/today-teleconsultations`
      );
      const data = await response.json();

      if (response.ok) {
        setTeleconsultations(data.teleconsultations);
      } else {
        console.error("Error fetching today's teleconsultations:", data.message);
      }
    } catch (error) {
      console.error("Error fetching today's teleconsultations:", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredTeleConsultations = teleconsultations.filter((teleconsultation) =>
    teleconsultation.patientId?.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (teleId) => {
    navigate(`/doctor/view-tele-details/${teleId}`);
  };

  const formatTime = (timeString) => {
    const time = new Date(timeString);
    return time.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="container min-h-[70vh] mx-auto p-10 ">
      <h2 className="text-2xl font-bold mb-6">Today's Teleconsultations</h2>

      <input
        type="text"
        placeholder="Search by patient name"
        value={searchTerm}
        onChange={handleSearchChange}
        className="border p-2 mb-4 w-full rounded-md my-2"
      />

      {filteredTeleConsultations.length > 0 ? (
        <div className="grid gap-4">
          {filteredTeleConsultations.map((teleconsultation) => (
            <div key={teleconsultation._id} className="bg-white p-4 shadow-md rounded-lg">
              <h3 className="text-xl font-semibold">
                {teleconsultation.patientId ? teleconsultation.patientId.name : "Unknown Patient"}
              </h3>
              <p>Phone: {teleconsultation.patientId?.contact || "N/A"}</p>
              <p>Date: {new Date(teleconsultation.date).toLocaleDateString()}</p>
              <p>Time: {formatTime(teleconsultation.time)}</p>
              <button
                className="bg-primary text-white py-1 px-4 rounded mt-2"
                onClick={() => handleViewDetails(teleconsultation._id)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>
          {teleconsultations.length === 0
            ? "No teleconsultations for today."
            : "No matching patients found."}
        </p>
      )}
    </div>
  );
}

export default ViewTeleConsultation;
