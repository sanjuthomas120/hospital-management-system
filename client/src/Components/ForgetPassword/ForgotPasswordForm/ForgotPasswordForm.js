import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message || "Password reset link has been sent to your email.");
        setIsModalOpen(true);
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Failed to send reset link. Please try again.");
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred, please try again later.");
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/login");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-white">
      <div className="bg-gray-50 p-8 rounded-lg shadow-md w-full max-w-lg mx-4">
        <h2 className="text-3xl font-semibold text-center text-secondary mb-6">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Enter your Email Address you'd like to reset your password
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-primary hover:bg-secondary text-white font-semibold py-2 px-6 rounded-md"
            >
              Send Reset Link
            </button>
          </div>
        </form>
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white min-w-96 p-6 rounded-lg shadow-lg">
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
    </div>
  );
}

export default ForgotPasswordForm;
