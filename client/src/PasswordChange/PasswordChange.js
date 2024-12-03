import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function PasswordChange() {
  const { resetToken } = useParams();
  const navigate = useNavigate();
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      setIsModalOpen(true);
      setModalMessage("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/auth/change-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            resetToken,
            newPassword,
          }),
        }
      );

      if (response.ok) {
        setModalMessage("Password updated successfully!");
        setIsModalOpen(true);
        setShouldRedirect(true);
      } else {
        const data = await response.json();
        setIsModalOpen(true);
        setModalMessage(
          data.message || "Failed to update password. Please try again."
        );
      }
    } catch (error) {
      console.error("Error updating password:", error);
      setIsModalOpen(true);
      setModalMessage("An error occurred while updating the password.");
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
    if (shouldRedirect) {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-white">
      <div className="bg-gray-50 p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-3xl font-bold mb-4">Update Your Password</h2>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm New Password"
          required
          className="w-full p-3 mb-6 border border-gray-300 rounded-lg"
        />
        <button
          onClick={handlePasswordChange}
          className="bg-primary text-white px-4 py-2 rounded-lg"
        >
          Update Password
        </button>
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

export default PasswordChange;
