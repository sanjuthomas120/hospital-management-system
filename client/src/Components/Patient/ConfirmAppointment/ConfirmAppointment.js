import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ConfirmAppointment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { doctorId, date, time } = location.state;
  const patientId = sessionStorage.getItem("userId");
  const [doctorDetails, setDoctorDetails] = useState({});
  const [paymentMode, setPaymentMode] = useState("offline");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isRedirect, setIsRedirect] = useState(false);
  const [bankDetails, setBankDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/doctor/getDoctor/${doctorId}`
        );
        if (response.ok) {
          const data = await response.json();
          setDoctorDetails(data);
        } else {
          setIsModalOpen(true);
          setModalMessage("Failed to fetch doctor details. Please try again.");
        }
      } catch (error) {
        setIsModalOpen(true);
        setModalMessage("An error occurred while fetching doctor details.");
      } finally {
        setLoading(false);
      }
    };
    fetchDoctorDetails();
  }, [doctorId]);

  const handleConfirm = () => {
    if (paymentMode === 'online'){
      setIsPaymentModalOpen(true);
    } else {
      handleOfflinePayment();
    }
  }

  const handleOfflinePayment = async () => {
    try {
      const response = await fetch("http://localhost:5000/patient/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          doctor_id: doctorId,
          patient_id: patientId,
          date,
          time,
          paymentMode,
        }),
      });

      if (response.ok) {
        setIsModalOpen(true);
        setModalMessage("Appointment booked successfully!");
        setIsRedirect(true)
      } else {
        setIsModalOpen(true);
        setModalMessage("Failed to book appointment. Please try again.");
      }
    } catch (error) {
      setIsModalOpen(true);
      setModalMessage("An error occurred while booking the appointment.");
    }
  };
  const handleOnlinePayment = async() => {
    const { cardNumber, expiryDate, cvv } = bankDetails;

    if (!cardNumber || !expiryDate || !cvv) {
      setModalMessage("Please fill in all bank details.");
      setIsModalOpen(true);
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/patient/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          doctor_id: doctorId,
          patient_id: patientId,
          date,
          time,
          paymentMode,
        }),
      });

      if (response.ok) {
    setIsPaymentModalOpen(false);
    setModalMessage("Payment successful! Appointment booked.");
    setIsModalOpen(true);
    setIsRedirect(true);
  } else {
    setIsModalOpen(true);
    setModalMessage("Failed to book appointment. Please try again.");
  }
} catch (error) {
  setIsModalOpen(true);
  setModalMessage("An error occurred while booking the appointment.");
}
  }
  const closeModal = () => {
    setIsModalOpen(false);
    if(isRedirect){
      navigate("/patient-home");
    }
  };
  const closePaymentModel = () => {
    setIsPaymentModalOpen(false)
  }

  if (loading) {
    return (
      <div className="py-8 px-4 min-h-[70vh] flex justify-center items-center">
        Loading doctor details...
      </div>
    );
  }

  return (
    <div className="py-8 px-4 min-h-[70vh] flex justify-center items-center">
      <div className="border-2 border-primary rounded-lg p-6 flex flex-col gap-4 w-full max-w-lg">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
          Confirm Appointment
        </h2>
        <div className="flex flex-wrap text-lg w-full px-2">
          <p className="flex-1">Doctor Name:</p>
          <p className="font-bold">{doctorDetails.name || "N/A"}</p>
        </div>
        <div className="flex flex-wrap text-lg w-full px-2">
          <p className="flex-1">Specialist:</p>
          <p className="font-bold">{doctorDetails.specialty || "N/A"}</p>
        </div>
        <div className="flex flex-wrap text-lg w-full px-2">
          <p className="flex-1">Date:</p>
          <p className="font-bold">{new Date(date).toLocaleDateString()}</p>
        </div>
        <div className="flex flex-wrap text-lg w-full px-2">
          <p className="flex-1">Time:</p>
          <p className="font-bold">
            {new Date(time).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <div className="flex flex-wrap text-lg w-full px-2 mt-4">
          <label className="flex-1">Payment Mode:</label>
          <select
            value={paymentMode}
            onChange={(e) => setPaymentMode(e.target.value)}
            className="p-2 border rounded w-full md:w-auto"
          >
            <option value="offline">Offline</option>
            <option value="online">Online</option>
          </select>
        </div>
        <button
          onClick={handleConfirm}
          className="mt-4 bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary w-full md:w-auto"
        >
          Confirm Appointment
        </button>
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
            <div className="flex gap-5">
            <button
              onClick={handleOnlinePayment}
              className="bg-primary text-white py-1 px-2 rounded hover:bg-secondary w-full"
            >
              Confirm Payment
            </button>
            <button
              onClick={closePaymentModel}
              className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-500 w-full"
            >
              Cancel
            </button>
            </div>
          </div>
        </div>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold text-primary mb-4">
              Message
            </h3>
            <p className="text-gray-700">{modalMessage}</p>
            <button
              onClick={closeModal}
              className="mt-4 bg-primary text-white py-2 px-4 rounded hover:bg-secondary"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ConfirmAppointment;
