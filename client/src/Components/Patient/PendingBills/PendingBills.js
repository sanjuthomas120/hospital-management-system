import React, { useEffect, useState } from "react";

function PendingBills() {
  const [activeTab, setActiveTab] = useState("appointment");
  const [appointment, setAppointment] = useState([]);
  const [pharmacy, setPharmacy] = useState([]);
  const [lab, setLab] = useState([]);
  const [bankDetails, setBankDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null); // Track selected bill
  const patient_id = sessionStorage.getItem("userId");

  useEffect(() => {
    const fetchingBillDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/patient/pending-bills/${patient_id}`
        );
        const data = await response.json();
        if (response.ok) {
          setAppointment(data.appointment);
          setPharmacy(data.pharmacy);
          setLab(data.lab);
        } else {
          alert("Something went wrong while fetching bills.");
        }
      } catch (error) {
        console.error("Error occurred while fetching bills:", error);
      }
    };
    fetchingBillDetails();
  }, [patient_id]);

  const openPaymentModal = (bill, type) => {
    setSelectedBill({ billId: bill._id, type });
    setIsPaymentModalOpen(true);
  };

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
    setSelectedBill(null);
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

  const handleOnlinePayment = async () => {
    if (!selectedBill) return;

    const { cardNumber, expiryDate, cvv } = bankDetails;
    const { type, billId } = selectedBill;

    if (!cardNumber || !expiryDate || !cvv) {
      alert("Please fill in all bank details.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/patient/complete-bill/${type}/${billId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
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
        closePaymentModal();
      } else {
        alert("Failed to update the bill status.");
      }
    } catch (error) {
      console.error("Error updating bill status:", error);
      alert("Something went wrong while processing payment.");
    }
  };

  const renderBills = (bills, type) => (
    <div className="space-y-4">
      {bills.map((bill) => (
        <div
          key={bill._id}
          className="flex justify-between items-center bg-white shadow-md rounded-lg p-4 border border-gray-200"
        >
          <div>
            <p className="text-sm text-gray-600 my-1">
              <span className="font-medium">Bill ID:</span>{" "}
              {bill._id.slice(-5).toUpperCase()}
            </p>
            <p className="text-sm text-gray-600 my-1">
              <span className="font-medium">Date:</span> {formatDate(bill.date)}
            </p>
            <p className="text-sm text-gray-600 my-1">
              <span className="font-medium">Amount:</span> ₹
              {bill.totalAmount || 500}
            </p>
          </div>
          <button
            onClick={() => openPaymentModal(bill, type)}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Pay Online
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Pending Bills</h1>

      <div className="flex border-b border-gray-300 mb-4">
        {["appointment", "pharmacy", "lab"].map((tab) => (
          <button
            key={tab}
            className={`py-2 px-4 ${
              activeTab === tab
                ? "text-primary border-b-2 border-primary"
                : "text-gray-600 hover:text-primary"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)} Bills
          </button>
        ))}
      </div>

      <div>
        {activeTab === "appointment" && renderBills(appointment, "appointment")}
        {activeTab === "pharmacy" && renderBills(pharmacy, "pharmacy")}
        {activeTab === "lab" && renderBills(lab, "lab")}
      </div>

      {isPaymentModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold text-primary mb-4">
              Enter Bank Details
            </h3>
            <input
              type="text"
              placeholder="Card Number"
              value={bankDetails.cardNumber}
              onChange={(e) =>
                setBankDetails({ ...bankDetails, cardNumber: e.target.value })
              }
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Expiry Date (MM/YY)"
              value={bankDetails.expiryDate}
              onChange={(e) =>
                setBankDetails({ ...bankDetails, expiryDate: e.target.value })
              }
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="password"
              placeholder="CVV"
              value={bankDetails.cvv}
              onChange={(e) =>
                setBankDetails({ ...bankDetails, cvv: e.target.value })
              }
              className="w-full mb-4 p-2 border rounded"
            />
            <div className="flex gap-4">
              <button
                onClick={handleOnlinePayment}
                className="bg-primary text-white py-1 px-2 rounded hover:bg-secondary w-full"
              >
                Confirm Payment
              </button>
              <button
                onClick={closePaymentModal}
                className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 w-full"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PendingBills;
