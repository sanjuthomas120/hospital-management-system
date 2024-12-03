import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faUser,
  faBell,
  faSignOutAlt,
  faCalendarAlt,
  faPlus,
  faHistory,
  faAngleDown,
  faFileInvoiceDollar,
} from "@fortawesome/free-solid-svg-icons";

function PatientNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isAppointmentsDropdownOpen, setIsAppointmentsDropdownOpen] = useState(false);
  const [isBillsDropdownOpen, setIsBillsDropdownOpen] = useState(false); // New state for Bills dropdown

  const links = [
    { to: "/patient-home", label: "Home" },
    { to: "/patient/view-doctor", label: "Doctors" },
  ];

  const profileLinks = [
    { to: "/patient/profile", label: "My Profile", icon: faUser },
    { to: "/patient/notification", label: "Notification", icon: faBell },
    { to: "/logout", label: "Logout", icon: faSignOutAlt },
  ];

  const appointmentLinks = [
    { to: "/patient/appointments", label: "View Appointments", icon: faCalendarAlt },
    { to: "/patient/teleconsultations", label: "View Teleconsultations", icon: faCalendarAlt },
    { to: "/patient/view-doctor", label: "Book New Appointment", icon: faPlus },
    { to: "/patient/appointmentHistory", label: "Appointment History", icon: faHistory },
  ];

  const billsLinks = [
    { to: "/patient/bills/pending", label: "Pending Bills", icon: faFileInvoiceDollar },
    { to: "/patient/bills/completed", label: "Completed Bills", icon: faFileInvoiceDollar },
  ]; 

  return (
    <nav className="bg-white p-4 border-b-2 border-gray-100">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link to="/patient-home">
            <img
              src="/images/logo/65c9a4e9f78ae07595c9f519_medcare-logo.png"
              alt="logo"
            />
          </Link>
        </div>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-secondary md:hidden focus:outline-none"
        >
          <FontAwesomeIcon
            icon={isMenuOpen ? faTimes : faBars}
            className="w-6 h-6"
          />
        </button>

        <div
          className={`fixed inset-0 z-30 w-64 bg-white p-4 transform ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 md:hidden`}
        >
          <div className="flex items-center px-4 py-6">
            <Link to="/patient-home">
              <img
                src="/images/logo/65c9a4e9f78ae07595c9f519_medcare-logo.png"
                className="w-40"
                alt="logo"
              />
            </Link>
          </div>
          <div className="space-y-4">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block text-secondary hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* Profile Dropdown */}
            <div className="mt-4">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="text-secondary flex items-center focus:outline-none"
              >
                Profile
                <FontAwesomeIcon icon={faAngleDown} className="mx-1" />
              </button>
              {isProfileDropdownOpen && (
                <div className="mt-2 bg-white rounded-md py-2">
                  {profileLinks.map((profileLink) => (
                    <Link
                      key={profileLink.to}
                      to={profileLink.to}
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <FontAwesomeIcon
                        icon={profileLink.icon}
                        className="mr-2"
                      />
                      {profileLink.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

          
            <div className="mt-4">
              <button
                onClick={() =>
                  setIsAppointmentsDropdownOpen(!isAppointmentsDropdownOpen)
                }
                className="text-secondary flex items-center focus:outline-none"
              >
                Appointments
                <FontAwesomeIcon icon={faAngleDown} className="mx-1" />
              </button>
              {isAppointmentsDropdownOpen && (
                <div className="mt-2 bg-white rounded-md py-2">
                  {appointmentLinks.map((appointmentLink) => (
                    <Link
                      key={appointmentLink.to}
                      to={appointmentLink.to}
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <FontAwesomeIcon
                        icon={appointmentLink.icon}
                        className="mr-2"
                      />
                      {appointmentLink.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

          
            <div className="mt-4">
              <button
                onClick={() => setIsBillsDropdownOpen(!isBillsDropdownOpen)}
                className="text-secondary flex items-center focus:outline-none"
              >
                Bills
                <FontAwesomeIcon icon={faAngleDown} className="mx-1" />
              </button>
              {isBillsDropdownOpen && (
                <div className="mt-2 bg-white rounded-md py-2">
                  {billsLinks.map((billLink) => (
                    <Link
                      key={billLink.to}
                      to={billLink.to}
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <FontAwesomeIcon
                        icon={billLink.icon}
                        className="mr-2"
                      />
                      {billLink.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

       
        <div className="hidden md:flex items-center space-x-10 font-semibold">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-secondary hover:text-primary"
            >
              {link.label}
            </Link>
          ))}

        
          <div className="relative group">
            <button className="text-secondary hover:text-primary flex items-center focus:outline-none">
              Profile
              <FontAwesomeIcon icon={faAngleDown} className="mx-1" />
            </button>
            <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-md py-2 z-20 hidden group-hover:block font-normal">
              {profileLinks.map((profileLink) => (
                <Link
                  key={profileLink.to}
                  to={profileLink.to}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-primary"
                >
                  <FontAwesomeIcon icon={profileLink.icon} className="mr-2" />
                  {profileLink.label}
                </Link>
              ))}
            </div>
          </div>

        
          <div className="relative group">
            <button className="text-secondary hover:text-primary flex items-center focus:outline-none">
              Appointments
              <FontAwesomeIcon icon={faAngleDown} className="mx-1" />
            </button>
            <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-md py-2 z-20 hidden group-hover:block font-normal">
              {appointmentLinks.map((appointmentLink) => (
                <Link
                  key={appointmentLink.to}
                  to={appointmentLink.to}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-primary"
                >
                  <FontAwesomeIcon
                    icon={appointmentLink.icon}
                    className="mr-2"
                  />
                  {appointmentLink.label}
                </Link>
              ))}
            </div>
          </div>

         
          <div className="relative group">
            <button className="text-secondary hover:text-primary flex items-center focus:outline-none">
              Bills
              <FontAwesomeIcon icon={faAngleDown} className="mx-1" />
            </button>
            <div className="absolute -left-4 mt-2 w-40 bg-white rounded-md shadow-md py-2 z-20 hidden group-hover:block font-normal">
              {billsLinks.map((billLink) => (
                <Link
                  key={billLink.to}
                  to={billLink.to}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-primary"
                >
                  <FontAwesomeIcon
                    icon={billLink.icon}
                    className="mr-2"
                  />
                  {billLink.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default PatientNavbar;
