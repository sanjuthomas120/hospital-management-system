import React, {useState, useEffect} from "react";

function HospitalAccountSheet() {
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
  const formatDate = () => {
    const date = new Date();
    return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    })
  }
  const income = [
    { id: 1, date: "2024-12-01", source: "Appointments", amount: 50000 },
    { id: 2, date: "2024-12-01", source: "Pharmacy Sales", amount: 20000 },
    { id: 3, date: "2024-11-30", source: "Lab Tests", amount: 15000 },
  ];

  const expenses = [
    { id: 1, date: "2024-12-01", category: "Staff Salaries", amount: 30000 },
    { id: 2, date: "2024-12-01", category: "Equipment Maintenance", amount: 10000 },
    { id: 3, date: "2024-11-30", category: "Utility Bills", amount: 8000 },
  ];

  const totalIncome = income.reduce((acc, entry) => acc + entry.amount, 0);
  const totalExpenses = expenses.reduce((acc, entry) => acc + entry.amount, 0);
  const netBalance = totalIncome - totalExpenses;

  return (
    <div className="container mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
      
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Hospital Account Sheet</h1>

     
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-green-100 p-4 rounded-lg text-center shadow">
          <h2 className="text-lg font-semibold text-green-700">Total Income</h2>
          <p className="text-2xl font-bold text-green-800">₹{totalDetails.totalRevenue}</p>
        </div>
        <div className="bg-red-100 p-4 rounded-lg text-center shadow">
          <h2 className="text-lg font-semibold text-red-700">Total Expenses</h2>
          <p className="text-2xl font-bold text-red-800">₹{totalDetails.totalExpense}</p>
        </div>
        <div
          className={`p-4 rounded-lg text-center shadow ${
            netBalance >= 0 ? "bg-blue-100" : "bg-yellow-100"
          }`}
        >
          <h2 className="text-lg font-semibold text-blue-700">Net Balance</h2>
          <p
            className={`text-2xl font-bold ${
              netBalance >= 0 ? "text-blue-800" : "text-yellow-800"
            }`}
          >
            ₹{totalDetails.totalRevenue - totalDetails.totalExpense}
          </p>
        </div>
      </div>

   
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Income Details</h2>
        <table className="table-auto w-full text-left border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="px-4 py-2 border border-gray-300">Date</th>
              <th className="px-4 py-2 border border-gray-300">Source</th>
              <th className="px-4 py-2 border border-gray-300">Amount</th>
            </tr>
          </thead>
          <tbody>
              <tr className="border-b">
                <td className="px-4 py-2 border border-gray-300">{formatDate()}</td>
                <td className="px-4 py-2 border border-gray-300">Appointment</td>
                <td className="px-4 py-2 border border-gray-300">{totalDetails.appointmentsPayment}</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 border border-gray-300">{formatDate()}</td>
                <td className="px-4 py-2 border border-gray-300">TeleConsultation</td>
                <td className="px-4 py-2 border border-gray-300">{totalDetails.teleconsulationsPayment}</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 border border-gray-300">{formatDate()}</td>
                <td className="px-4 py-2 border border-gray-300">Medicine</td>
                <td className="px-4 py-2 border border-gray-300">{totalDetails.medicinePayment}</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 border border-gray-300">{formatDate()}</td>
                <td className="px-4 py-2 border border-gray-300">Lab</td>
                <td className="px-4 py-2 border border-gray-300">{totalDetails.labPayment}</td>
              </tr>
          </tbody>
        </table>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Expense Details</h2>
        <table className="table-auto w-full text-left border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="px-4 py-2 border border-gray-300">Date</th>
              <th className="px-4 py-2 border border-gray-300">Category</th>
              <th className="px-4 py-2 border border-gray-300">Amount</th>
            </tr>
          </thead>
          <tbody>
           
              <tr  className="border-b">
                <td className="px-4 py-2 border border-gray-300">{formatDate()}</td>
                <td className="px-4 py-2 border border-gray-300">Medicine Bill</td>
                <td className="px-4 py-2 border border-gray-300">₹{totalDetails.totalExpense}</td>
              </tr>
          
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HospitalAccountSheet;
