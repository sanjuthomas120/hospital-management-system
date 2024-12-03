import React, { useEffect, useState } from "react";

function ViewTeleconsultations() {
  const [teleconsultations, setTeleconsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const patient_id = sessionStorage.getItem('userId');

    const fetchTeleconsultations = async () => {
      try {
        const response = await fetch(`http://localhost:5000/patient/teleconsultations-view/${patient_id}`);
        if (response.ok) {
          const data = await response.json();
          setTeleconsultations(data);
        } else {
          console.error("Failed to fetch teleconsultations.");
          setError("Failed to fetch teleconsultations.");
        }
      } catch (error) {
        console.error("Error:", error);
        setError("Server error. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeleconsultations();
    const intervalId = setInterval(fetchTeleconsultations, 60000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="container mx-auto p-4 min-h-[70vh]">
      <h1 className="text-2xl font-semibold mb-4">My Teleconsultations</h1>
      {loading ? (
        <p>Loading teleconsultations...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : teleconsultations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teleconsultations.map((teleconsultation) => (
            <div key={teleconsultation._id} className="p-4 border rounded-lg shadow-md">
              <h2 className="text-lg font-semibold">{teleconsultation.doctorName || "Unknown Doctor"}</h2>
              <p className="text-gray-600">Date: {new Date(teleconsultation.date).toLocaleDateString()}</p>
              <p className="text-gray-600">
                Time: {new Date(teleconsultation.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
              {teleconsultation.meetingLink ? (
                <a
                  href={`${teleconsultation.meetingLink}?userId=${sessionStorage.getItem('userId')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline mt-2 inline-block"
                >
                  Join Meeting
                </a>
              ) : (
                <p className="text-gray-500 mt-2">
                  Join link will appear 15 minutes before the meeting and disappear 10 minutes after it starts.
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No teleconsultations found.</p>
      )}
    </div>
  );
}

export default ViewTeleconsultations;
