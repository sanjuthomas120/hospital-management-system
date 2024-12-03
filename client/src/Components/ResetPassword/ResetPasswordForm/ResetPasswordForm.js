import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shouldRelocate, setShouldRelocate] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      setIsModalOpen(true);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message || "Password has been successfully reset.");
        setIsModalOpen(true);
        setShouldRelocate(true);
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Failed to reset password.");
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
    if (shouldRelocate) {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-white">
      <div className="bg-gray-50 p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-3xl font-semibold text-center text-secondary mb-6">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              New Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-primary hover:bg-secondary text-white font-semibold py-2 px-6 rounded-md"
            >
              Reset Password
            </button>
          </div>
        </form>
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 min-w-96 rounded-lg shadow-lg">
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

export default ResetPasswordForm;
