import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ViewPrescriptionDetails() {
  const [patientDetails, setPatientDetails] = useState({});
  const [medicineDetails, setMedicineDetails] = useState([]);
  const [getDate, setGetDate] = useState();
  const [error, setError] = useState(null);
  const { prescriptionId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserAndPrescriptionDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/pharmacy/confirm-bill/${prescriptionId}`
        );
        const data = await response.json();
        if (response.ok) {
          setPatientDetails(data.patientDetails);
          setMedicineDetails(data.medicineDetails);
          setGetDate(data.getDate);
        } else {
          setError(data.message);
        }
      } catch (error) {
        console.log("error in fetching: ", error);
        setError("Something went wrong...");
      }
    };
    fetchUserAndPrescriptionDetails();
  }, []);

  const getTotal = (quantity, price) => {
    return parseFloat(quantity * price);
  };

  const calculateTotal = () => {
    return medicineDetails.reduce((total, med) => {
      const quantity = parseInt(med.dosage);
      const price = parseFloat(med.price);
      return total + quantity * price;
    }, 0);
  };

  const formatDate = (isoString) => {
    if (!isoString) return "N/A";
    const date = new Date(isoString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const confirmBill = async () => {
    try {
      const response = await fetch(`http://localhost:5000/pharmacy/confirm-pharmacy-bill/${prescriptionId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientId: patientDetails._id,
          medicineDetails,
          totalAmount: calculateTotal(),
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert("Bill confirmed successfully!");
        navigate(-1); 
      } else {
        alert(data.message || "Failed to confirm bill");
      }
    } catch (error) {
      console.error("Error confirming bill:", error);
      alert("An error occurred while confirming the bill.");
    }
  };
  

  if (error) {
    return (
      <div className="min-h-[70vh] flex justify-center items-center text-xl text-red-500">
        {error}
      </div>
    );
  }
  return (
    <div className="bg-white my-6 shadow-lg rounded-lg p-6 w-full max-w-3xl mx-auto">
      <header className="flex justify-between items-center border-b pb-4">
        <div>
          <h1 className="text-xl font-bold">Pharmacy Bill</h1>
          <p className="text-sm text-gray-600">MedCare Pharmacy</p>
          <p className="text-sm text-gray-600">
            123 Health St, Wellness City, CA 12345
          </p>
          <p className="text-sm text-gray-600">Phone: +1 (555) 123-4567</p>
        </div>
        <div>
          <p className="text-sm">
            Bill No: {prescriptionId.slice(-5).toLocaleUpperCase()}
          </p>
          <p className="text-sm">Date: {formatDate(getDate)}</p>
        </div>
      </header>

      <section className="my-4">
        <div>
          <h2 className="font-semibold text-lg">Patient Details</h2>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <p className="text-sm">
                <span className="font-medium">Name:</span> {patientDetails.name}
              </p>
              <p className="text-sm">
                <span className="font-medium">Age:</span> {patientDetails.age}
              </p>
              <p className="text-sm">
                <span className="font-medium">Gender:</span>{" "}
                {patientDetails.gender}
              </p>
            </div>
            <div>
              <p className="text-sm">
                <span className="font-medium">Contact:</span>{" "}
                {patientDetails.contact}
              </p>
              <p className="text-sm">
                <span className="font-medium">Address:</span>{" "}
                {patientDetails.address}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="my-4">
        <h2 className="font-semibold text-lg mb-2">Medicines</h2>
        <table className="table-auto w-full text-left border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="px-4 py-2 border border-gray-300">
                Medicine Name
              </th>
              <th className="px-4 py-2 border border-gray-300">Dosage</th>
              <th className="px-4 py-2 border border-gray-300">Price</th>
              <th className="px-4 py-2 border border-gray-300">Total</th>
            </tr>
          </thead>
          <tbody>
            {medicineDetails.map((med) => (
              <tr key={med._id} className="border-b">
                <td className="px-4 py-2 border border-gray-300">{med.name}</td>
                <td className="px-4 py-2 border border-gray-300">
                  {med.dosage}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  ₹{med.price}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  ₹{getTotal(med.dosage, med.price)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <footer className="mt-4 border-t pt-4">
        <div className="flex justify-between items-center">
          <p className="font-bold text-xl">Total: ₹{calculateTotal()}</p>
          <button 
          onClick={confirmBill}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary">
            Confirm Bill
          </button>
        </div>
      </footer>
    </div>
  );
}

export default ViewPrescriptionDetails;
