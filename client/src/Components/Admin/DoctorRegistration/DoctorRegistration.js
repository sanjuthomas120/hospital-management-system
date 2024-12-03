import React, { useState } from "react";

function DoctorRegistration() {
  const [doctorData, setDoctorData] = useState({
    doctor_id: "",
    name: "",
    email: "",
    password: "",
    specialty: "",
    phone: "",
    experience: "",
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(
    "/images/default/default-placeholder-doctor-half-length-portrait-photo-avatar-gray-color-default-placeholder-doctor-half-length-portrait-113622206.webp"
  );
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDoctorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Start loading

    const formData = new FormData();
    for (const key in doctorData) {
      formData.append(key, doctorData[key]);
    }
    if (photoFile) {
      formData.append("photo", photoFile);
    }

    try {
      const response = await fetch("http://localhost:5000/admin/add-doctor", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message || "Doctor details added successfully.");
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Failed to add doctor details.");
      }
    } catch (error) {
      console.error("Error:", error);
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
    <div className="min-h-screen bg-gray-100">
      <main className="ml-64 mt-16 p-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-10 rounded-lg shadow-lg w-full max-w-2xl mx-auto space-y-6"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Register New Doctor
          </h2>

          {/* Photo Preview Section */}
          <div className="flex flex-col items-center mb-6">
            <img
              src={photoPreview}
              alt="Doctor Preview"
              className="rounded-full w-32 h-32 object-cover mb-4"
            />
            <label className="bg-primary text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-secondary transition duration-300">
              Upload Photo
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
                aria-label="Upload Doctor Photo" // Accessibility
              />
            </label>
          </div>

          {[
            { name: "doctor_id", type: "text", placeholder: "Enter doctor's ID" },
            { name: "name", type: "text", placeholder: "Enter doctor's name" },
            { name: "specialty", type: "text", placeholder: "Enter doctor's specialty" },
            { name: "phone", type: "text", placeholder: "Enter doctor's phone number" },
            { name: "experience", type: "number", placeholder: "Enter years of experience" },
            { name: "email", type: "email", placeholder: "Enter doctor's email" },
            { name: "password", type: "password", placeholder: "Enter password" },
          ].map(({ name, type, placeholder }) => (
            <div className="flex flex-col" key={name}>
              <input
                type={type}
                name={name}
                value={doctorData[name]}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition duration-200"
                placeholder={placeholder}
                required
                aria-label={placeholder} // Accessibility
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-primary text-white font-semibold px-4 py-3 rounded-md hover:bg-secondary transition duration-300"
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? "Registering..." : "Register Doctor"}
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
      </main>
    </div>
  );
}

export default DoctorRegistration;
