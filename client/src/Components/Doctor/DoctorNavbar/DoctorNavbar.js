import React from "react";
import { Link, useNavigate } from "react-router-dom";

function DoctorNavbar() {
  const navigate = useNavigate();
  const logout = () => {
    navigate('/login')
  }
  return (
    <nav className="bg-white text-secondary p-4">
      <div className="container mx-auto flex justify-between items-center">
      <Link to="/doctor-home">
            <img
              src="/images/logo/65c9a4e9f78ae07595c9f519_medcare-logo.png"
              alt="logo"
            />
          </Link>
        <ul className="flex space-x-6">
          <li>
            <Link to="/doctor-home" className="text-secondary hover:text-primary">
              Home
            </Link>
          </li>
          <li>
            <Link to="/doctor/today-appointments" className="text-secondary hover:text-primary">
              Appointments
            </Link>
          </li>
          <li>
            <Link to="/doctor/today-teleconsultation" className="text-secondary hover:text-primary">
            Teleconsultation
            </Link>
          </li>
          <li>
            <Link to="/doctor/notification" className="text-secondary hover:text-primary">
              Notification
            </Link>
          </li>
          <li>
            <Link to="/doctor/leave-request" className="text-secondary hover:text-primary">
              Leave Request
            </Link>
          </li>
          <li>
            <p  onClick={logout} className="text-secondary hover:text-primary cursor-pointer">
              Logout
            </p>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default DoctorNavbar;
