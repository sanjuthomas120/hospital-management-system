import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faUserDoctor,
  faMoneyCheckAlt,
  faChartLine,
  faSheetPlastic,
  faVideoCamera,
  faChartArea,
  faArrowTrendDown,
} from "@fortawesome/free-solid-svg-icons";

const AccountDashboard = () => {
  const [totalDetails, setTotalDetails] = useState({});
  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/account/total-counts"
      );
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        setTotalDetails(data);
      } else {
        setTotalDetails(data.message);
      }
    } catch (error) {
      console.error("Error fetching count:", error);
    }
  };
  return (
    <div className="bg-white min-h-screen p-6 md:p-10">
      <h1 className="text-3xl font-semibold text-secondary mb-8">
        Account Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-lg p-5 flex items-center">
          <div className="bg-primary text-white p-3 rounded-full">
            <FontAwesomeIcon icon={faUsers} size="2x" />
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-semibold text-secondary hover:text-primary">
              Total Patients
            </h3>
            <p className="text-xl font-semibold text-gray-900">
              {totalDetails.patients}
            </p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-5 flex items-center">
          <div className="bg-secondary text-white p-3 rounded-full">
            <FontAwesomeIcon icon={faUserDoctor} size="2x" />
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-semibold text-secondary hover:text-primary">
              Doctors
            </h3>
            <p className="text-xl font-semibold text-gray-900">
              {totalDetails.doctors}
            </p>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-5 flex items-center">
          <div className="bg-secondary text-white p-3 rounded-full">
            <FontAwesomeIcon icon={faSheetPlastic} size="2x" />
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-semibold text-secondary hover:text-primary">
              Appointments
            </h3>
            <p className="text-xl font-semibold text-gray-900">
              {totalDetails.appointments}
            </p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-5 flex items-center">
          <div className="bg-green-500 text-white p-3 rounded-full">
            <FontAwesomeIcon icon={faMoneyCheckAlt} size="2x" />
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-semibold text-secondary hover:text-primary">
              Appointment Payments Received
            </h3>
            <p className="text-xl font-semibold text-gray-900">
              ₹{totalDetails.appointmentsPayment}
            </p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-5 flex items-center">
          <div className="bg-blue-500 text-white p-3 rounded-full">
            <FontAwesomeIcon icon={faVideoCamera} size="2x" />
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-semibold text-secondary hover:text-primary">
              Teleconsultations
            </h3>
            <p className="text-xl font-semibold text-gray-900">
             {totalDetails.teleconsulations}
            </p>
          </div>
        </div>

         <div className="bg-white shadow-md rounded-lg p-5 flex items-center">
          <div className="bg-green-500 text-white p-3 rounded-full">
            <FontAwesomeIcon icon={faMoneyCheckAlt} size="2x" />
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-semibold text-secondary hover:text-primary">
              Teleconsultations Payments Received
            </h3>
            <p className="text-xl font-semibold text-gray-900">
              ₹{totalDetails.teleconsulationsPayment}
            </p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-5 flex items-center">
          <div className="bg-green-500 text-white p-3 rounded-full">
            <FontAwesomeIcon icon={faMoneyCheckAlt} size="2x" />
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-semibold text-secondary hover:text-primary">
              Medicine Payments Received
            </h3>
            <p className="text-xl font-semibold text-gray-900">
              ₹{totalDetails.medicinePayment}
            </p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-5 flex items-center">
          <div className="bg-green-500 text-white p-3 rounded-full">
            <FontAwesomeIcon icon={faMoneyCheckAlt} size="2x" />
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-semibold text-secondary hover:text-primary">
              Lab Payments Received
            </h3>
            <p className="text-xl font-semibold text-gray-900">
              ₹{totalDetails.labPayment}
            </p>
          </div>
        </div>


        <div className="bg-white shadow-md rounded-lg p-5 flex items-center">
          <div className="bg-yellow-500 text-white p-3 rounded-full">
            <FontAwesomeIcon icon={faChartLine} size="2x" />
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-semibold text-secondary hover:text-primary">
              Monthly Revenue
            </h3>
            <p className="text-xl font-semibold text-gray-900">
              ₹{totalDetails.totalRevenue}
            </p>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-5 flex items-center">
          <div className="bg-red-500 text-white p-3 rounded-full">
            <FontAwesomeIcon icon={faArrowTrendDown} size="2x" />
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-semibold text-secondary hover:text-primary">
              Monthly Expense
            </h3>
            <p className="text-xl font-semibold text-gray-900">
              ₹{totalDetails.totalExpense}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-5 mt-8">
        <h3 className="text-xl font-semibold text-secondary hover:text-primary mb-4">
          Revenue Overview
        </h3>
        <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
          <p className="text-gray-500">Chart will be displayed here</p>
        </div>
      </div>
    </div>
  );
};

export default AccountDashboard;
