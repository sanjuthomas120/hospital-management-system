import React, { useEffect, useState } from "react";

function ViewPatients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/admin/view-patients"
        );
        if (response.ok) {
          const data = await response.json();
          setPatients(data);
        } else {
          setError("Failed to fetch patients data.");
        }
      } catch (error) {
        console.error("Error fetching patients:", error);
        setError("An error occurred while fetching patients.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const handleDeleteDoctor = async (patientId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/admin/delete-patient/${patientId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setPatients((prev) => prev.filter((patient) => patient._id !== patientId));
      } else {
        alert("Server error");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      alert("Something went wrong");
    }
  };

  if (loading) {
    return (
      <div className="h-[80vh] flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[80vh] flex justify-center items-center">{error}</div>
    );
  }

  return (
    <div>
      <main className="ml-64 mt-16 p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Patients List</h2>
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b">Name</th>
              <th className="py-3 px-4 border-b">Age</th>
              <th className="py-3 px-4 border-b">Gender</th>
              <th className="py-3 px-4 border-b">Contact</th>
              <th className="py-3 px-4 border-b">Address</th>
              <th className="py-3 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient._id} className="text-center">
                <td className="py-3 px-4 border-b">{patient.name}</td>
                <td className="py-3 px-4 border-b">{patient.age}</td>
                <td className="py-3 px-4 border-b">{patient.gender}</td>
                <td className="py-3 px-4 border-b">{patient.contact}</td>
                <td className="py-3 px-4 border-b">
                  {patient.address} years
                </td>
                <td className="py-3 px-4 border-b">
                  <button 
                    onClick={() => handleDeleteDoctor(patient._id)}
                  className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-900">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default ViewPatients;