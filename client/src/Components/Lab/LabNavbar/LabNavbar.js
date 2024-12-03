import React from 'react';
import { Link } from 'react-router-dom';

const LabNavbar = () => {
  return (
    <nav className="bg-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
        <Link to="/lab-home">
            <img
              src="/images/logo/65c9a4e9f78ae07595c9f519_medcare-logo.png"
              alt="logo"
            />
          </Link>
        </div>
        <div className="flex space-x-4">
          <Link to="/lab-home" className="text-secondary hover:text-primary">
            Home
          </Link>
          <Link to="/lab/view-tests" className="text-secondary hover:text-primary">
            Tests
          </Link>
          <Link to="/lab/view-prescription" className="text-secondary hover:text-primary">
            Prescription
          </Link>
          <Link to="/lab/notification" className="text-secondary hover:text-primary">
            Notification
          </Link>
          <Link to="/settings" className="text-secondary hover:text-primary">
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default LabNavbar;
