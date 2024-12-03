import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faFileInvoiceDollar,
  faMoneyBill,
  faShieldAlt,
  faChartBar,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

const AccountNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  

  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-12 sm:px-12 lg:px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center py-4">
            <Link to="/account-home">
              <img
                src="/images/logo/65c9a4e9f78ae07595c9f519_medcare-logo.png"
                alt="logo"
                className="h-8"
              />
            </Link>
          </div>
          <div className="hidden md:flex space-x-6">
            <Link to="/account-home" className="text-secondary hover:text-primary flex items-center">
              Dashboard
            </Link>
            <Link to="/account/pending-bills" className="text-secondary hover:text-primary flex items-center">
              Patient Billing
            </Link>
            <Link to="/account/notification" className="text-secondary hover:text-primary flex items-center">
              Notification
            </Link>
            <Link to="/account/report" className="text-secondary hover:text-primary flex items-center">
              Reports
            </Link>
            <Link to="/" className="text-secondary hover:text-primary flex items-center">
              Logout
            </Link>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-secondary focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>
      <div
        className={`fixed top-0 left-0 z-50 w-52 bg-white h-full shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <Link to="/" onClick={() => setIsOpen(false)}>
            <img
              src="/images/logo/65c9a4e9f78ae07595c9f519_medcare-logo.png"
              alt="logo"
              className="h-8"
            />
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="text-secondary focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="px-4 py-4 space-y-4">
          <Link
            to="/account-dashboard"
            className="text-secondary hover:text-primary flex items-center"
            onClick={() => setIsOpen(false)}
          >
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            Dashboard
          </Link>
          <Link
            to="/patient-billing"
            className="text-secondary hover:text-primary flex items-center"
            onClick={() => setIsOpen(false)}
          >
            <FontAwesomeIcon icon={faFileInvoiceDollar} className="mr-2" />
            Patient Billing
          </Link>
          <Link
            to="/payment-records"
            className="text-secondary hover:text-primary flex items-center"
            onClick={() => setIsOpen(false)}
          >
            <FontAwesomeIcon icon={faMoneyBill} className="mr-2" />
            Payment Records
          </Link>
          <Link
            to="/insurance-claims"
            className="text-secondary hover:text-primary flex items-center"
            onClick={() => setIsOpen(false)}
          >
            <FontAwesomeIcon icon={faShieldAlt} className="mr-2" />
            Insurance Claims
          </Link>
          <Link
            to="/reports"
            className="text-secondary hover:text-primary flex items-center"
            onClick={() => setIsOpen(false)}
          >
            <FontAwesomeIcon icon={faChartBar} className="mr-2" />
            Reports
          </Link>
          <Link
            to="/"
            className="text-secondary hover:text-primary flex items-center"
            onClick={() => setIsOpen(false)}
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default AccountNavbar;
