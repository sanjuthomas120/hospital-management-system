import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function PatientRegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    contact: "",
    address: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setModalMessage("Passwords do not match");
      setIsModalOpen(true);
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/auth/register-patient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        await response.json(); 
        navigate("/login");  
      } else {
        const errorData = await response.json();
        setModalMessage(errorData.message || "Something went wrong");
        setIsModalOpen(true);
      }
    } catch (error) {
      console.log("Error :", error);
      setModalMessage("An error occurred, please try again later");
      setIsModalOpen(true);
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="min-h-screen flex items-center justify-center  bg-white mb-4">
      <div className="bg-gray-50 p-10 rounded-lg shadow-md my-4 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center text-secondary mb-6">
          Register Here
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="block text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              required
            />
          </div>

          <div className="md:mb-3 md:flex md:gap-x-2 md:items-center">
            <div className="mb-3">
              <label htmlFor="age" className="block text-gray-700">
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                min={0}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="gender" className="block text-gray-700">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="contact" className="block text-gray-700">
              Contact Number
            </label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="address" className="block text-gray-700">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="block text-gray-700">
              Email Address
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="block text-gray-700">
             Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              required
            />
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-primary hover:bg-secondary text-white font-semibold py-2 px-6 rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Message</h3>
              <p>{modalMessage}</p>
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
    </div>
  );
}

export default PatientRegisterForm;
