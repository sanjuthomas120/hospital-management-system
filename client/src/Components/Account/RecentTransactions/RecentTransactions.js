import React from "react";

const RecentTransactions = () => {
  const transactions = [
    {
      date: "2024-10-01",
      patient: "John Doe",
      amount: "$250",
      method: "Credit Card",
      status: "Paid",
    },
    {
      date: "2024-10-02",
      patient: "Jane Smith",
      amount: "$150",
      method: "Cash",
      status: "Pending",
    },
    {
      date: "2024-10-03",
      patient: "Michael Brown",
      amount: "$350",
      method: "Insurance",
      status: "Paid",
    },
    {
      date: "2024-10-05",
      patient: "Emily Johnson",
      amount: "$500",
      method: "Debit Card",
      status: "Paid",
    },
    {
      date: "2024-10-06",
      patient: "Chris Lee",
      amount: "$200",
      method: "Credit Card",
      status: "Pending",
    },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg py-5 px-12 mt-8">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">
        Recent Transactions
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b text-left text-gray-600">Date</th>
              <th className="px-4 py-2 border-b text-left text-gray-600">Patient</th>
              <th className="px-4 py-2 border-b text-left text-gray-600">Amount</th>
              <th className="px-4 py-2 border-b text-left text-gray-600">Payment Method</th>
              <th className="px-4 py-2 border-b text-left text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{transaction.date}</td>
                <td className="px-4 py-2 border-b">{transaction.patient}</td>
                <td className="px-4 py-2 border-b">{transaction.amount}</td>
                <td className="px-4 py-2 border-b">{transaction.method}</td>
                <td
                  className={`px-4 py-2 border-b font-semibold ${
                    transaction.status === "Paid"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {transaction.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentTransactions;
