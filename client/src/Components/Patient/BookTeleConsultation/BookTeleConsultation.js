import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function BookTeleConsultation() {
  const { doctorId } = useParams();
  const [selectedDate, setSelectedDate] = useState(null);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots();
    }
  }, [selectedDate]);

  const fetchAvailableSlots = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `http://localhost:5000/patient/teleconsultation-availability/${doctorId}/${selectedDate.toISOString()}`
      );
      if (response.ok) {
        const { available, booked } = await response.json();
        const mergedSlots = [
          ...available.map((time) => ({ time, status: "available" })),
          ...booked.map((time) => ({ time, status: "booked" })),
        ];

        mergedSlots.sort(
          (a, b) =>
            new Date(`1970/01/01 ${a.time}`) - new Date(`1970/01/01 ${b.time}`)
        );

        setSlots(mergedSlots);
      } else {
        setError("Failed to fetch available slots. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching available slots:", error);
      setError("An error occurred while fetching slots.");
    } finally {
      setLoading(false);
    }
  };

  const handleTimeSelect = (time) => {
    const [hourMinute, period] = time.split(" ");
    const [hour, minute] = hourMinute.split(":").map(Number);

    const hours24 =
      period.toLowerCase() === "pm" && hour !== 12
        ? hour + 12
        : hour === 12 && period.toLowerCase() === "am"
        ? 0
        : hour;

    const appointmentDate = new Date(selectedDate);
    appointmentDate.setHours(hours24, minute);

    navigate(`/patient/confirm-teleconsultation`, {
      state: {
        doctorId,
        date: selectedDate.toISOString(),
        time: appointmentDate.toISOString(),
      },
    });
  };

  return (
    <div className="py-8 px-12 min-h-[70vh]">
      <h2 className="text-3xl font-bold mb-4">Book Teleconsultation</h2>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        minDate={new Date()}
        placeholderText="Select a date"
        className="w-full p-3 mb-6 border border-gray-300 rounded-lg"
      />

      {loading && <p>Loading available slots...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {slots.map(({ time, status }, index) => (
          <button
            key={index}
            className={`p-2 rounded-lg ${
              status === "available"
                ? "bg-green-200 hover:bg-green-300"
                : "bg-red-200 cursor-not-allowed"
            }`}
            onClick={status === "available" ? () => handleTimeSelect(time) : null}
            disabled={status === "booked"}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  );
}

export default BookTeleConsultation;
