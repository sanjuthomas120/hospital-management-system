import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

function AddPrescription() {
  const { appointmentId } = useParams();
  const [patientDetails, setPatientDetails] = useState(null);
  const [currentMedicine, setCurrentMedicine] = useState({ name: "", dosage: "", instructions: "" });
  const [currentTest, setCurrentTest] = useState({ name: "", instructions: "" });
  const [completedMedicines, setCompletedMedicines] = useState([]);
  const [completedTests, setCompletedTests] = useState([]);

  const [medicineSuggestions, setMedicineSuggestions] = useState([]);
  const [testSuggestions, setTestSuggestions] = useState([]);
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatientDetails();
  }, [appointmentId]);

  const fetchPatientDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/doctor/${appointmentId}/details`);
      const data = await response.json();
      if (response.ok) {
        setPatientDetails(data.patient);
      } else {
        console.error("Error fetching patient details:", data.message);
      }
    } catch (error) {
      console.error("Error fetching patient details:", error);
    }
  };

  const fetchMedicineSuggestions = async (query) => {
    if (!query) {
      setMedicineSuggestions([]);
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/doctor/medicines?search=${query}`);
      const data = await response.json();
      setMedicineSuggestions(data.medicines.map((medicine) => medicine.name));
    } catch (error) {
      console.error("Error fetching medicine suggestions:", error);
    }
  };

  const fetchTestSuggestions = async (query) => {
    if (!query) {
      setTestSuggestions([]);
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/doctor/tests?search=${query}`);
      const data = await response.json();
      setTestSuggestions(data.tests.map((test) => test.name));
    } catch (error) {
      console.error("Error fetching test suggestions:", error);
    }
  };

  const handleAddMedicine = () => {
    if (!currentMedicine.name || !currentMedicine.dosage || !currentMedicine.instructions) {
      alert("Please fill in all fields for the medicine.");
      return;
    }
    setCompletedMedicines([...completedMedicines, currentMedicine]);
    setCurrentMedicine({ name: "", dosage: "", instructions: "" });
    setMedicineSuggestions([]);
  };

  const handleAddTest = () => {
    if (!currentTest.name || !currentTest.instructions) {
      alert("Please fill in all fields for the test.");
      return;
    }
    setCompletedTests([...completedTests, currentTest]);
    setCurrentTest({ name: "", instructions: "" });
    setTestSuggestions([]);
  };

  const handleRemoveMedicine = (index) => {
    setCompletedMedicines(completedMedicines.filter((_, i) => i !== index));
  };

  const handleRemoveTest = (index) => {
    setCompletedTests(completedTests.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/doctor/add-prescription`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appointmentId,
          medicines: completedMedicines,
          tests: completedTests,
          notes,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Prescription added successfully!");
        navigate("/doctor/today-appointments");
      } else {
        console.error("Error adding prescription:", data.message);
      }
    } catch (error) {
      console.error("Error adding prescription:", error);
    }
  };
  const handleMarkAsMissed = async () => {
    const confirmMarkMissed = window.confirm("Are you sure you want to mark this appointment as missed?");
    if (!confirmMarkMissed) return;

    try {
      const response = await fetch(
        `http://localhost:5000/doctor/${appointmentId}/mark-missed`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Appointment marked as missed.");
      } else {
        console.error("Error marking appointment as missed:", data.message);
      }
    } catch (error) {
      console.error("Error marking appointment as missed:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-xl font-bold mb-4">Add Prescription</h2>
      {patientDetails ? (
        <div className="bg-white p-6 shadow-md rounded-lg mb-4">
          <h3 className="text-xl font-semibold mb-2">
            {patientDetails.patient_id?.name || "Unknown Patient"}
          </h3>
          <div className="text-gray-700">
            <p><span className="font-medium">Phone:</span> {patientDetails.patient_id?.contact || "N/A"}</p>
            <p><span className="font-medium">Age:</span> {patientDetails.patient_id?.age || "N/A"}</p>
            <p><span className="font-medium">Gender:</span> {patientDetails.patient_id?.gender || "N/A"}</p>
            <Link to={`/patient/${patientDetails.patient_id._id}/prescriptions`} className="text-blue-500">View Prescription History</Link>
            <button
              type="button"
              onClick={handleMarkAsMissed}
              className="bg-red-500 text-white py-2 px-4 rounded-md mt-4 ml-4"
            >
              Mark as Missed
            </button>
          </div>
        </div>
      ) : (
        <p>Loading patient details...</p>
      )}
      <div className="flex gap-8">
        <div className="w-1/2">
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium">Medicine Name</label>
            <input
              type="text"
              value={currentMedicine.name}
              onChange={(e) => {
                setCurrentMedicine({ ...currentMedicine, name: e.target.value });
                fetchMedicineSuggestions(e.target.value);
              }}
              className="border p-2 w-full rounded-md"
              placeholder="Enter medicine name"
              required
            />
            {medicineSuggestions.length > 0 && (
              <ul className="border bg-white rounded-md mt-2">
                {medicineSuggestions.map((suggestion) => (
                  <li
                    key={suggestion}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => {
                      setCurrentMedicine({ ...currentMedicine, name: suggestion });
                      setMedicineSuggestions([]);
                    }}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Dosage</label>
            <input
              type="text"
              value={currentMedicine.dosage}
              onChange={(e) => setCurrentMedicine({ ...currentMedicine, dosage: e.target.value })}
              className="border p-2 w-full rounded-md"
              placeholder="Enter dosage"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Instructions</label>
            <textarea
              value={currentMedicine.instructions}
              onChange={(e) => setCurrentMedicine({ ...currentMedicine, instructions: e.target.value })}
              className="border p-2 w-full rounded-md"
              placeholder="Enter instructions"
              required
            ></textarea>
          </div>
          <button
            type="button"
            onClick={handleAddMedicine}
            className="bg-secondary text-white py-2 px-4 rounded-md"
          >
            Add Medicine
          </button>
        </form>

        <form className="mt-8">
          <div className="mb-4">
            <label className="block text-sm font-medium">Test Name</label>
            <input
              type="text"
              value={currentTest.name}
              onChange={(e) => {
                setCurrentTest({ ...currentTest, name: e.target.value });
                fetchTestSuggestions(e.target.value);
              }}
              className="border p-2 w-full rounded-md"
              placeholder="Enter test name"
              required
            />
            {testSuggestions.length > 0 && (
              <ul className="border bg-white rounded-md mt-2">
                {testSuggestions.map((suggestion) => (
                  <li
                    key={suggestion}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => {
                      setCurrentTest({ ...currentTest, name: suggestion });
                      setTestSuggestions([]);
                    }}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Instructions</label>
            <textarea
              value={currentTest.instructions}
              onChange={(e) => setCurrentTest({ ...currentTest, instructions: e.target.value })}
              className="border p-2 w-full rounded-md"
              placeholder="Enter instructions"
              required
            ></textarea>
          </div>
          <button
            type="button"
            onClick={handleAddTest}
            className="bg-secondary text-white py-2 px-4 rounded-md"
          >
            Add Test
          </button>
        </form>
      </div>
     
      
      <div className="w-1/2">
      <div>
        <h2 className="text-xl font-bold mb-4">Prescription Summary</h2>
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-2">Medicines</h3>
          {completedMedicines.map((medicine, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-md mb-2">
              <p><strong>Name:</strong> {medicine.name}</p>
              <p><strong>Dosage:</strong> {medicine.dosage}</p>
              <p><strong>Instructions:</strong> {medicine.instructions}</p>
              <button
                type="button"
                onClick={() => handleRemoveMedicine(index)}
                className="text-red-500 mt-2"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-2">Tests</h3>
          {completedTests.map((test, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-md mb-2">
              <p><strong>Name:</strong> {test.name}</p>
              <p><strong>Instructions:</strong> {test.instructions}</p>
              <button
                type="button"
                onClick={() => handleRemoveTest(index)}
                className="text-red-500 mt-2"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Additional Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="border p-2 w-full rounded-md"
            placeholder="Add any additional notes"
          ></textarea>
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-primary text-white py-2 px-4 rounded-md"
        >
          Submit Prescription
        </button>
      </div>
      </div>
      </div>
      </div>
    </div>
  );
}

export default AddPrescription;
