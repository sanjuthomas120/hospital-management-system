import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PrescriptionHistory() {
  const { patientId } = useParams();
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrescriptions();
  }, [patientId]);

  const fetchPrescriptions = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/doctor/${patientId}/prescriptions`
      );
      const data = await response.json();

      if (response.ok) {
        setPrescriptions(data.prescriptions);
      } else {
        console.error("Error fetching prescriptions:", data.message);
      }
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Prescription History</h2>
      {loading ? (
        <p>Loading prescriptions...</p>
      ) : prescriptions.length > 0 ? (
        <ul className="bg-white p-4 shadow-md rounded-lg">
          {prescriptions.map((prescription, index) => (
            <li key={index} className="mb-4 border-b pb-2">
              <h3 className="text-lg font-medium">
                Date: {new Date(prescription.createdAt).toLocaleDateString()}
              </h3>
              <ul className="list-disc ml-4">
                {prescription.tests?.filter(
                  (test) => test.name || test.instructions
                ).length > -1 && (
                  <>
                    <ul className="list-disc ml-4">
                      {prescription.medicines
                        .filter(
                          (medicine) =>
                            medicine.name ||
                            medicine.dosage ||
                            medicine.instructions
                        )
                        .map((med, i) => (
                          <li key={i} className="mt-2">
                            <strong>Medicine Name:</strong> {med.name || "N/A"}{" "}
                            <br />
                            <strong>Dosage:</strong> {med.dosage || "N/A"}{" "}
                            <br />
                            <strong>Instructions:</strong>{" "}
                            {med.instructions || "N/A"}
                          </li>
                        ))}
                    </ul>
                  </>
                )}
              </ul>
              <ul className="list-disc ml-4">
                {prescription.tests?.filter(
                  (test) => test.name || test.instructions
                ).length > -1 && (
                  <>
                    <ul className="list-disc ml-4">
                      {prescription.tests
                        .filter((test) => test.name || test.instructions)
                        .map((test, i) => (
                          <li key={i} className="mt-2">
                            <strong>Test Name:</strong> {test.name || "N/A"}{" "}
                            <br />
                            <strong>Instructions:</strong>{" "}
                            {test.instructions || "N/A"}
                          </li>
                        ))}
                    </ul>
                  </>
                )}
              </ul>
              <p className="my-2 px-2 text-lg"><strong>Notes: </strong>{prescription.notes}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No prescriptions found for this patient.</p>
      )}
    </div>
  );
}

export default PrescriptionHistory;
