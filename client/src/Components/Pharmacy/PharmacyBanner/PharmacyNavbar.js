import React from "react";
import { Link, useNavigate } from "react-router-dom";

function PharmacyNavbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
  };
  return (
    <nav className="bg-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
      <Link to="/pharmacy-home">
            <img
              src="/images/logo/65c9a4e9f78ae07595c9f519_medcare-logo.png"
              alt="logo"
            />
          </Link>
        <div className="flex space-x-6">
          <Link to="/pharmacy-home" className="text-secondary hover:text-primary">
            Dashboard
          </Link>
          <Link
            to="/pharmacy/view-medicine"
            className="text-secondary hover:text-primary"
          >
            Inventory
          </Link>
          <Link
            to="/pharmacy/notification"
            className="text-secondary hover:text-primary"
          >
            Notification
          </Link>
          <Link
            to="/pharmacy/view-prescriptions"
            className="text-secondary hover:text-primary"
          >
            Prescriptions
          </Link>
          <Link
            to="/pharmacy/settings"
            className="text-secondary hover:text-primary"
          >
            Settings
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLogout}
            className="text-secondary px-4 py-2 rounded hover:text-primary"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default PharmacyNavbar;
