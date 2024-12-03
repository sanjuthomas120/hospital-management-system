import React, { useState, useEffect } from "react";

const EmptyMedicineDetails = () => {
  const [emptyMedicines, setEmptyMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [dosage, setDosage] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [shouldReload, setShouldReload] = useState(false)

  useEffect(() => {
    const fetchEmptyMedicines = async () => {
      try {
        const response = await fetch("http://localhost:5000/admin/view-empty-medicine");
        const data = await response.json();
        setEmptyMedicines(data);
      } catch (error) {
        console.error("Error fetching empty medicines:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmptyMedicines();
  }, [shouldReload]);

  const handleAddMedicineClick = (medicine) => {
    setSelectedMedicine(medicine);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setDosage(0);
    setTotalAmount(0);
  };

  const handleDosageChange = (e) => {
    let enteredDosage = e.target.value;
    if (enteredDosage < 0) {
      enteredDosage = 0;
    }
    setDosage(enteredDosage);

    if (selectedMedicine) {
      const calculatedAmount = enteredDosage * (selectedMedicine.price / 2);
      setTotalAmount(Math.round(calculatedAmount));
    }
  };

  const handleSubmit = async () => {
    if (selectedMedicine && dosage > 0) {
      try {
        const updateResponse = await fetch(`http://localhost:5000/admin/update-medicine/${selectedMedicine._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "available" }),
        });
        if (updateResponse.ok) {
          const paymentResponse = await fetch("http://localhost:5000/admin/add-payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              medicineId: selectedMedicine.id,
              paidAmount: totalAmount,
            }),
          });
          if (paymentResponse.ok) {
            alert("Medicine status updated and payment recorded!");
            setShowModal(false);
            setDosage(0);
            setTotalAmount(0);
            setShouldReload(true)
          }
        }
      } catch (error) {
        console.error("Error during the submission:", error);
      }
    } else {
      alert("Please enter a valid dosage.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center pl-64 pt-24">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Empty Medicine Details
        </h1>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : emptyMedicines.length === 0 ? (
          <p className="text-gray-500">All medicines are in stock!</p>
        ) : (
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border border-gray-200 px-4 py-2 text-left">#</th>
                <th className="border border-gray-200 px-4 py-2 text-left">Medicine Name</th>
                <th className="border border-gray-200 px-4 py-2 text-left">Medicine Code</th>
                <th className="border border-gray-200 px-4 py-2 text-left">Category</th>
                <th className="border border-gray-200 px-4 py-2 text-left">Price</th>
                <th className="border border-gray-200 px-4 py-2 text-left">Details</th>
              </tr>
            </thead>
            <tbody>
              {emptyMedicines.map((medicine, index) => (
                <tr key={medicine._id}>
                  <td className="border border-gray-200 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-200 px-4 py-2">{medicine.name}</td>
                  <td className="border border-gray-200 px-4 py-2">{medicine.cas}</td>
                  <td className="border border-gray-200 px-4 py-2">{medicine.usage}</td>
                  <td className="border border-gray-200 px-4 py-2">{medicine.price}</td>
                  <td className="border border-gray-200 px-4 py-2">
                    <button
                      className="text-primary"
                      onClick={() => handleAddMedicineClick(medicine)}
                    >
                      Add Medicine
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add Dosage</h2>
            <div>
              <label htmlFor="dosage" className="block mb-2">Dosage (in units)</label>
              <input
                type="number"
                id="dosage"
                value={dosage}
                onChange={handleDosageChange}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
            </div>
            <div className="mb-4">
              <p className="text-gray-600">Medicine Price: {selectedMedicine?.price}</p>
            </div>
            <button
              onClick={handleSubmit}
              className="w-full bg-primary text-white py-2 rounded"
            >
             Total Amount : {totalAmount}
            </button>
            <button
              onClick={handleCloseModal}
              className="w-full bg-red-500 text-white py-2 rounded mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmptyMedicineDetails;
