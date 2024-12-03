import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        sessionStorage.setItem("userId", data.userId);
        sessionStorage.setItem('userType', data.userTypeModel)
        const userTypeRoutes = {
          Patient: "/patient-home",
          Doctor: "/doctor-home",
          Admin: "/admin-home",
          "Account-Section": "/account-home",
          "Lab-Section": "/lab-home",
          Pharmacy: "/pharmacy-home",
        };
        navigate(userTypeRoutes[data.userTypeModel] || "/");
      } else {
        setModalMessage(data.message);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Login error:", error);
      setModalMessage("An error occurred, please try again later.");
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="h-3/4 md:min-h-[80vh] flex items-center justify-center">
      <div className="bg-gray-50 p-10 rounded-xl shadow-md w-full max-w-lg mx-4">
        <h2 className="text-3xl font-semibold text-center mb-5 text-primary">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="email" className="block text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="block text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
            <div className="text-right mt-2">
              <button
                type="button"
                className="text-primary hover:text-secondary text-sm"
                onClick={() => navigate("/forget-password")}
              >
                Forgot Password?
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="w-full bg-primary hover:bg-secondary text-white font-semibold py-3 px-6 rounded-md transition-colors duration-300"
            >
              Login
            </button>
          </div>
        </form>
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
              <h3 className="text-lg font-semibold text-primary mb-4">
                Login Failed
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
    </div>
  );
}

export default LoginForm;
