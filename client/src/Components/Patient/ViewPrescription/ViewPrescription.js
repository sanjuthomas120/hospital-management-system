import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ViewPrescription() {
  const { appointmentId } = useParams();
  const [prescription, setPrescription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/patient/view-prescription/${appointmentId}`
        );
        if (response.ok) {
          const data = await response.json();
          setPrescription(data);
        } else {
          setError("Failed to fetch prescription details.");
        }
      } catch (err) {
        setError("An error occurred while fetching prescription.");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrescription();
  }, [appointmentId]);

  const handleBackClick = () => {
    navigate(-1);
  };

  if (loading) {
    return (
        <div className="container mx-auto p-8 min-h-[70vh]">
    <p>Loading prescription...</p>
    </div>
    )
  }

  if (error) {
    return (
        <div className="container mx-auto p-8 min-h-[70vh]">
    <p className="text-red-500">{error}</p>
    </div>
    );
  }

  return (
    <div className="container mx-auto p-8 min-h-[70vh]">
      <h2 className="text-3xl font-bold mb-4">Prescription Details</h2>
      <p>
        <strong>Appointment Date:</strong>{" "}
        {new Date(prescription.createdAt).toLocaleDateString()}
      </p>
      <h3 className="text-xl font-semibold mt-4 mb-2">Medicines</h3>
      <ul className="list-disc ml-6">
        {prescription.medicines.map((medicine, index) => (
          <li key={index} className="mb-2">
            <strong>Name:</strong> {medicine.name} <br />
            <strong>Dosage:</strong> {medicine.dosage} <br />
            <strong>Instructions:</strong> {medicine.instructions}
          </li>
        ))}
      </ul>
      <button
        className="bg-primary text-white mt-4 py-2 px-6 rounded-lg shadow-md hover:bg-secondary transition duration-300"
        onClick={handleBackClick}
      >
        Back to Appointments
      </button>
    </div>
  );
}

export default ViewPrescription;
