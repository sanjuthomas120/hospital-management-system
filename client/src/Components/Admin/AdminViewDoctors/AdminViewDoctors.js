import React, { useEffect, useState } from "react";

function AdminViewDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/admin/view-doctors"
        );
        if (response.ok) {
          const data = await response.json();
          setDoctors(data);
        } else {
          setError("Failed to fetch doctors data.");
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setError("An error occurred while fetching doctors.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleDeleteDoctor = async (doctorId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/admin/delete-doctor/${doctorId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setDoctors((prev) => prev.filter((doc) => doc._id !== doctorId));
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
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Doctors List</h2>
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b">Doctor ID</th>
              <th className="py-3 px-4 border-b">Name</th>
              <th className="py-3 px-4 border-b">Specialty</th>
              <th className="py-3 px-4 border-b">Phone</th>
              <th className="py-3 px-4 border-b">Experience</th>
              <th className="py-3 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor._id} className="text-center">
                <td className="py-3 px-4 border-b">{doctor.doctor_id}</td>
                <td className="py-3 px-4 border-b">{doctor.name}</td>
                <td className="py-3 px-4 border-b">{doctor.specialty}</td>
                <td className="py-3 px-4 border-b">{doctor.phone}</td>
                <td className="py-3 px-4 border-b">
                  {doctor.experience} years
                </td>
                <td className="py-3 px-4 border-b">
                  <button
                    onClick={() => handleDeleteDoctor(doctor._id)}
                    className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-900"
                  >
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

export default AdminViewDoctors;
