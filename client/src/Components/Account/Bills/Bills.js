import React, { useEffect, useState } from "react";

function Bills() {
  const [activeTab, setActiveTab] = useState("appointment");
  const [appointment, setAppointment] = useState([]);
  const [pharmacy, setPharmacy] = useState([]);
  const [lab, setLab] = useState([]);

  useEffect(() => {
    const fetchingBillDetails = async () => {
      try {
        const response = await fetch(
          'http://localhost:5000/account/pending-bills'
        );
        const data = await response.json();
        console.log(data)
        if (response.ok) {
          setAppointment(data.appointment);
          setPharmacy(data.pharmacy);
          setLab(data.lab)
        } else {
          alert("Something went wrong");
        }
      } catch (error) {
        console.error("error occurred: ", error);
      }
    };
    fetchingBillDetails();
  }, []);

  const handleCompleteBill = async (billId, type) => {
    try {
      const response = await fetch(
        `http://localhost:5000/account/complete-bill/${type}/${billId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.ok) {
        if (type === "appointment") {
          setAppointment((prev) => prev.filter((bill) => bill._id !== billId));
        } else if (type === "pharmacy") {
          setPharmacy((prev) => prev.filter((bill) => bill._id !== billId));
        } else if (type === "lab") {
          setLab((prev) => prev.filter((bill) => bill._id !== billId));
        }
        alert("Bill marked as completed!");
      } else {
        alert("Failed to update the bill status.");
      }
    } catch (error) {
      console.error("Error updating bill status:", error);
      alert("Something went wrong.");
    }
  };
  

  const formatDate = (isoString) => {
    if (!isoString) return "N/A";
    const date = new Date(isoString);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const renderBills = (bills) => (
    <div className="space-y-4">
      {bills.map((bill) => (
        <div
          key={bill._id}
          className="flex justify-between items-center bg-white shadow-md rounded-lg p-4 border border-gray-200"
        >
            
          <div>
          {bill.patient_id?.name ? (
              <div>
                <p className="text-sm text-gray-600 my-1">
                  <span className="font-medium">Name:</span>{" "}
                  {bill.patient_id?.name}
                </p>
              </div>
            ) : (
              ""
            )}
             {bill.patient_id?.contact ? (
              <div>
                <p className="text-sm text-gray-600 my-1">
                  <span className="font-medium">Contact:</span>{" "}
                  {bill.patient_id?.contact}
                </p>
              </div>
            ) : (
              ""
            )}
             {bill.patient_id?.age ? (
              <div>
                <p className="text-sm text-gray-600 my-1">
                  <span className="font-medium">Age:</span>{" "}
                  {bill.patient_id?.age}
                </p>
              </div>
            ) : (
              ""
            )}
              {bill.patientId?.name ? (
              <div>
                <p className="text-sm text-gray-600 my-1">
                  <span className="font-medium">Name:</span>{" "}
                  {bill.patientId?.name}
                </p>
              </div>
            ) : (
              ""
            )}
             {bill.patientId?.contact ? (
              <div>
                <p className="text-sm text-gray-600 my-1">
                  <span className="font-medium">Contact:</span>{" "}
                  {bill.patientId?.contact}
                </p>
              </div>
            ) : (
              ""
            )}
             {bill.patientId?.age ? (
              <div>
                <p className="text-sm text-gray-600 my-1">
                  <span className="font-medium">Age:</span>{" "}
                  {bill.patientId?.age}
                </p>
              </div>
            ) : (
              ""
            )}
            {bill._id ? (
              <div>
                <p className="text-sm text-gray-600 my-1">
                  <span className="font-medium">Bill ID:</span>{" "}
                  {bill._id.slice(-5).toUpperCase()}
                </p>
              </div>
            ) : (
              ""
            )}
            {bill._id ? (
              <div>
                <p className="text-sm text-gray-600 my-1">
                  <span className="font-medium">Date:</span>{" "}
                  {formatDate(bill.date)}
                </p>
              </div>
            ) : (
              ""
            )}
             {bill.doctor_id?.name ? (
              <div>
                <p className="text-sm text-gray-600 my-1">
                  <span className="font-medium">Doctor Name:</span>{" "}
                  {bill.doctor_id?.name}
                </p>
              </div>
            ) : (
              ""
            )}
             {bill.doctor_id?.specialty ? (
              <div>
                <p className="text-sm text-gray-600 my-1">
                  <span className="font-medium">Department:</span>{" "}
                  {bill.doctor_id?.specialty}
                </p>
              </div>
            ) : (
              ""
            )}
            {bill.medicineDetails ? (
                <table className="table-auto w-full text-left border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100 border-b">
                    <th className="px-4 py-2 border border-gray-300">
                      Medicine Name
                    </th>
                    <th className="px-4 py-2 border border-gray-300">Dosage</th>
                    <th className="px-4 py-2 border border-gray-300">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {bill.medicineDetails.map((med) => (
                    <tr key={med.id} className="border-b">
                      <td className="px-4 py-2 border border-gray-300">{med.name}</td>
                      <td className="px-4 py-2 border border-gray-300">
                        {med.dosage}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        ₹{med.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : ''}
            {bill.testDetails? (
                <table className="table-auto w-full text-left border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100 border-b">
                    <th className="px-4 py-2 border border-gray-300">
                      Test Name
                    </th>
                    <th className="px-4 py-2 border border-gray-300">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {bill.testDetails.map((test) => (
                    <tr key={test._id} className="border-b">
                      <td className="px-4 py-2 border border-gray-300">{test.name}</td>
                      <td className="px-4 py-2 border border-gray-300">
                       ₹ {test.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : ''}
          </div>
          <div className="flex items-center space-x-6">
          {bill.totalAmount ? 
            (<div>  <p className="text-sm text-gray-800">
            <span className="font-medium">Total Amount:</span> ₹{bill.totalAmount}
          </p> </div>) :  (<div>  <p className="text-sm text-gray-800">
            <span className="font-medium">Total Amount:</span> ₹500
          </p> </div>)
          }
            <button
             onClick={() => handleCompleteBill(bill._id, activeTab)} 
            className="bg-primary text-white px-4 py-2 rounded hover:bg-green-600">
              Completed
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Pending Bills</h1>

      <div className="flex border-b border-gray-300 mb-4">
        <button
          className={`py-2 px-4 ${
            activeTab === "appointment"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-600 hover:text-primary"
          }`}
          onClick={() => setActiveTab("appointment")}
        >
          Appointment Bills
        </button>
        <button
          className={`py-2 px-4 ${
            activeTab === "pharmacy"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-600 hover:text-primary"
          }`}
          onClick={() => setActiveTab("pharmacy")}
        >
          Pharmacy Bills
        </button>
        <button
          className={`py-2 px-4 ${
            activeTab === "lab"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-600 hover:text-primary"
          }`}
          onClick={() => setActiveTab("lab")}
        >
          Lab Bills
        </button>
      </div>

      <div>
        {activeTab === "appointment" && renderBills(appointment)}
        {activeTab === "pharmacy" && renderBills(pharmacy)}
        {activeTab === "lab" && renderBills(lab)}
      </div>
    </div>
  );
}

export default Bills;
