import React, { useState } from "react";

const AddMedicine = () => {
  const [medicine, setMedicine] = useState({
    name: "",
    cas: "",
    usage: "",
    price: "",
  });
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setMedicine({ ...medicine, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/admin/add-medicine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(medicine),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Medicine added successfully!");
        setMedicine({ name: "", cas: "", usage: "", price: "" });
      } else {
        setMessage(data.message || "Failed to add medicine.");
      }
    } catch (error) {
      console.error("Error adding medicine:", error);
      setMessage("An error occurred, please try again later.");
    } finally {
      setIsLoading(false);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-bold text-gray-800 text-center">Add New Medicine</h2>

        {[{ name: "name", placeholder: "Medicine Name" },
          { name: "cas", placeholder: "CAS" },
          { name: "usage", placeholder: "Usage" },
          { name: "price", placeholder: "Price", type: "number" }
        ].map(({ name, placeholder, type = "text" }) => (
          <div key={name} className="flex flex-col">
            <input
              type={type}
              name={name}
              value={medicine[name]}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition duration-200"
              placeholder={placeholder}
              required
              aria-label={placeholder}
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-primary text-white font-semibold px-4 py-3 rounded-md hover:bg-secondary transition duration-300"
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add Medicine"}
        </button>
      </form>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Message</h3>
            <p>{message}</p>
            <button
              onClick={closeModal}
              className="mt-4 bg-primary text-white py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddMedicine;
