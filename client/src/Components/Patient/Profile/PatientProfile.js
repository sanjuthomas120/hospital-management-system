import React, { useState, useEffect, useRef } from "react";
import { Edit3 } from "lucide-react";

const PatientProfile = () => {
  const patientId = sessionStorage.getItem("userId");
  const [userData, setUserData] = useState({});
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shouldReload, setShouldReload] = useState(false);
  const nameInputRef = useRef(null);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/patient/edit-profile/${patientId}`
        );
        const data = await response.json();
        if (response.ok) {
          setEmail(data.email || "");
          setUserData(data.userInfo || {});
        } else {
          setModalMessage(data.message);
          setIsModalOpen(true);
        }
      } catch (error) {
        console.log("Error", error);
        setModalMessage("An error occurred, please try again");
        setIsModalOpen(true);
      }
    };
    fetchPatientDetails();
  }, [shouldReload]);

  const closeModal = () => setIsModalOpen(false);

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setTimeout(() => nameInputRef.current?.focus(), 0);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/patient/update-profile/${patientId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setIsEditing(false);
        setModalMessage("Profile updated successfully");
      } else {
        setModalMessage(data.message || "Failed to update profile");
      }
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error: ", error);
      setModalMessage("An error occurred while updating the profile");
      setIsModalOpen(true);
    }
  };

  const handleCancelEdit = () => {
    setShouldReload(true);
    setIsEditing(false);
  };

  const getInitials = () => {
    const { name = "" } = userData;
    const nameParts = name.split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts[1] || "";
    return (
      firstName.charAt(0).toUpperCase() +
      (lastName.charAt(0)?.toUpperCase() || "")
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden min-h-[70vh] flex flex-col items-center p-8">
      <div className="flex gap-10">
        <div className="flex items-center gap-6">
          <div className="w-28 h-28 flex justify-center items-center bg-primary uppercase text-5xl text-white font-bold rounded-full">
            {getInitials()}
          </div>
        </div>

        <div className="w-[600px] max-w-md mt-8">
          <h2 className="text-3xl font-bold pb-2 text-gray-900">My Profile</h2>
          <form onSubmit={handleSave}>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-1">
                Name:
              </label>
              <input
                ref={nameInputRef}
                type="text"
                name="name"
                value={userData.name || ""}
                onChange={handleInputChange}
                required
                className={`w-full p-1 rounded border ${
                  !isEditing ? "bg-gray-100" : "bg-white"
                }`}
                disabled={!isEditing}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-1">Age:</label>
              <input
                type="number"
                name="age"
                value={userData.age || ""}
                onChange={handleInputChange}
                required
                className={`w-full p-1 rounded border ${
                  !isEditing ? "bg-gray-100" : "bg-white"
                }`}
                disabled={!isEditing}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-1">
                Gender:
              </label>
              <select
                name="gender"
                value={userData.gender || ""}
                onChange={handleInputChange}
                required
                className={`w-full p-1 rounded border ${
                  !isEditing ? "bg-gray-100" : "bg-white"
                }`}
                disabled={!isEditing}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-1">
                Email:
              </label>
              <input
                type="email"
                value={email || ""}
                className="w-full p-1 rounded bg-gray-100"
                readOnly
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-1">
                Contact:
              </label>
              <input
                type="text"
                name="contact"
                value={userData.contact || ""}
                onChange={handleInputChange}
                required
                className={`w-full p-1 rounded border ${
                  !isEditing ? "bg-gray-100" : "bg-white"
                }`}
                disabled={!isEditing}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-1">
                Address:
              </label>
              <input
                type="text"
                name="address"
                value={userData.address || ""}
                onChange={handleInputChange}
                required
                className={`w-full p-2 rounded border ${
                  !isEditing ? "bg-gray-100" : "bg-white"
                }`}
                disabled={!isEditing}
              />
            </div>

            <div className="flex gap-4 justify-center mt-6">
              {!isEditing ? (
                <button
                  type="button"
                  onClick={handleToggleEdit}
                  className="flex items-center gap-2 text-emerald-600 font-medium hover:text-emerald-700 transition-colors"
                >
                  <Edit3 className="w-5 h-5" />
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-10">
                  <input
                    type="submit"
                    value="Save Changes"
                    className="flex items-center gap-2 text-emerald-600 font-medium hover:text-emerald-700 transition-colors cursor-pointer"
                  />
                  <button
                    onClick={handleCancelEdit}
                    className="flex items-center gap-2 text-red-600 font-medium hover:text-red-700 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>

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
  );
};

export default PatientProfile;
