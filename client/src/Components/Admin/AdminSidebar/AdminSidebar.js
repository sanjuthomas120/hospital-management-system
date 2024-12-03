import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faChartBar,
  faUsers,
  faAngleDown,
  faFlask,
  faPills,
  faDollarSign,
  faCapsules,
  faVial,
} from '@fortawesome/free-solid-svg-icons';
import { faLetterboxd } from '@fortawesome/free-brands-svg-icons';

function AdminSidebar() {
  const [showDoctorDropdown, setShowDoctorDropdown] = useState(false);
  const [showLabDropdown, setShowLabDropdown] = useState(false);
  const [showPharmacyDropdown, setShowPharmacyDropdown] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [showMedicineDropdown, setShowMedicineDropdown] = useState(false);
  const [showTestDropdown, setShowTestDropdown] = useState(false);


  return (
    <div className="h-screen w-56 bg-white text-secondary fixed left-0 top-16 z-10 border-r-2 overflow-y-auto pb-20">
      <div className="w-full p-4 border-b flex items-center justify-center">
        <h2 className="text-lg font-semibold">Admin Panel</h2>
      </div>

      <ul className="mt-6 space-y-2">
        <li>
          <Link
            to="/admin-home"
            className="px-4 py-2 hover:bg-gray-100 hover:text-primary flex items-center"
          >
            <FontAwesomeIcon icon={faChartBar} className="mr-2" />
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/admin/view-patients"
            className="px-4 py-2 hover:bg-gray-100 hover:text-primary flex items-center"
          >
            <FontAwesomeIcon icon={faUsers} className="mr-2" />
            Patients
          </Link>
        </li>
        <li>
          <button
            onClick={() => setShowDoctorDropdown(!showDoctorDropdown)}
            className="px-4 py-2 w-full hover:bg-gray-100 hover:text-primary flex items-center justify-between focus:outline-none"
          >
            <span className="flex items-center">
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              Doctors
            </span>
            <FontAwesomeIcon
              icon={faAngleDown}
              className={`transition-transform ${showDoctorDropdown ? 'rotate-180' : 'rotate-0'}`}
            />
          </button>
          {showDoctorDropdown && (
            <div className="ml-4 mt-2 space-y-1">
              <Link
                to="/admin/doctors/add-doctor"
                className="block px-4 py-2 text-secondary hover:bg-gray-100 hover:text-primary"
              >
                Add Doctor
              </Link>
              <Link
                to="/admin/doctors/view-doctors"
                className="block px-4 py-2 text-secondary hover:bg-gray-100 hover:text-primary"
              >
                View Doctors
              </Link>
            </div>
          )}
        </li>
        <li>
          <button
            onClick={() => setShowLabDropdown(!showLabDropdown)}
            className="px-4 py-2 w-full hover:bg-gray-100 hover:text-primary flex items-center justify-between focus:outline-none"
          >
            <span className="flex items-center">
              <FontAwesomeIcon icon={faFlask} className="mr-2" />
              Lab Staff
            </span>
            <FontAwesomeIcon
              icon={faAngleDown}
              className={`transition-transform ${showLabDropdown ? 'rotate-180' : 'rotate-0'}`}
            />
          </button>
          {showLabDropdown && (
            <div className="ml-4 mt-2 space-y-1">
              <Link
                to="/admin/lab-staff/add-lab-staff"
                className="block px-4 py-2 text-secondary hover:bg-gray-100 hover:text-primary"
              >
                Add Lab Staff
              </Link>
              <Link
                to="/admin/view-lab-staff"
                className="block px-4 py-2 text-secondary hover:bg-gray-100 hover:text-primary"
              >
                View Lab Staff
              </Link>
            </div>
          )}
        </li>
        <li>
          <button
            onClick={() => setShowPharmacyDropdown(!showPharmacyDropdown)}
            className="px-4 py-2 w-full hover:bg-gray-100 hover:text-primary flex items-center justify-between focus:outline-none"
          >
            <span className="flex items-center">
              <FontAwesomeIcon icon={faPills} className="mr-2" />
              Pharmacy Staff
            </span>
            <FontAwesomeIcon
              icon={faAngleDown}
              className={`transition-transform ${showPharmacyDropdown ? 'rotate-180' : 'rotate-0'}`}
            />
          </button>
          {showPharmacyDropdown && (
            <div className="ml-4 mt-2 space-y-1">
              <Link
                to="/admin/pharmacy-staff/add-pharmacy-staff"
                className="block px-4 py-2 text-secondary hover:bg-gray-100 hover:text-primary"
              >
                Add Pharmacy Staff
              </Link>
              <Link
                to="/admin/view-pharmacy"
                className="block px-4 py-2 text-secondary hover:bg-gray-100 hover:text-primary"
              >
                View Pharmacy Staff
              </Link>
            </div>
          )}
        </li>
        <li>
          <button
            onClick={() => setShowAccountDropdown(!showAccountDropdown)}
            className="px-4 py-2 w-full hover:bg-gray-100 hover:text-primary flex items-center justify-between focus:outline-none"
          >
            <span className="flex items-center">
              <FontAwesomeIcon icon={faDollarSign} className="mr-2" />
              Account Staff
            </span>
            <FontAwesomeIcon
              icon={faAngleDown}
              className={`transition-transform ${showAccountDropdown ? 'rotate-180' : 'rotate-0'}`}
            />
          </button>
          {showAccountDropdown && (
            <div className="ml-4 mt-2 space-y-1">
              <Link
                to="/admin/account-staff/add-account-staff"
                className="block px-4 py-2 text-secondary hover:bg-gray-100 hover:text-primary"
              >
                Add Account Staff
              </Link>
              <Link
                to="/admin/view-accounts"
                className="block px-4 py-2 text-secondary hover:bg-gray-100 hover:text-primary"
              >
                View Account Staff
              </Link>
            </div>
          )}
        </li>
        <li>
          <button
            onClick={() => setShowMedicineDropdown(!showMedicineDropdown)}
            className="px-4 py-2 w-full hover:bg-gray-100 hover:text-primary flex items-center justify-between focus:outline-none"
          >
            <span className="flex items-center">
              <FontAwesomeIcon icon={faCapsules} className="mr-2" />
              Medicine
            </span>
            <FontAwesomeIcon
              icon={faAngleDown}
              className={`transition-transform ${showMedicineDropdown ? 'rotate-180' : 'rotate-0'}`}
            />
          </button>
          {showMedicineDropdown && (
            <div className="ml-4 mt-2 space-y-1">
              <Link
                to="/admin/medicine/add-medicine"
                className="block px-4 py-2 text-secondary hover:bg-gray-100 hover:text-primary"
              >
                Add Medicine
              </Link>
              <Link
                to="/admin/medicine/view-medicine"
                className="block px-4 py-2 text-secondary hover:bg-gray-100 hover:text-primary"
              >
                View Medicine
              </Link>
              <Link
                to="/admin/medicine/empty-medicine"
                className="block px-4 py-2 text-secondary hover:bg-gray-100 hover:text-primary"
              >
                Empty Medicine
              </Link>
            </div>
          )}
        </li>
        <li>
          <button
            onClick={() => setShowTestDropdown(!showTestDropdown)}
            className="px-4 py-2 w-full hover:bg-gray-100 hover:text-primary flex items-center justify-between focus:outline-none"
          >
            <span className="flex items-center">
              <FontAwesomeIcon icon={faVial} className="mr-2" />
              Test
            </span>
            <FontAwesomeIcon
              icon={faAngleDown}
              className={`transition-transform ${showTestDropdown ? 'rotate-180' : 'rotate-0'}`}
            />
          </button>
          {showTestDropdown && (
            <div className="ml-4 mt-2 space-y-1">
              <Link
                to="/admin/test/add-test"
                className="block px-4 py-2 text-secondary hover:bg-gray-100 hover:text-primary"
              >
                Add Test
              </Link>
              <Link
                to="/admin/test/view-test"
                className="block px-4 py-2 text-secondary hover:bg-gray-100 hover:text-primary"
              >
                View Test
              </Link>
            </div>
          )}
        </li>
        <li>
          <Link
            to="/admin/notification"
            className="px-4 py-2 hover:bg-gray-100 hover:text-primary flex items-center"
          >
            <FontAwesomeIcon icon={faChartBar} className="mr-2" />
            Notification
          </Link>
          <Link
            to="/admin/view-leaves"
            className="px-4 py-2 hover:bg-gray-100 hover:text-primary flex items-center"
          >
            <FontAwesomeIcon icon={faLetterboxd} className="mr-2" />
            Leaves
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default AdminSidebar;
