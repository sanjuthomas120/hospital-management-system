import React, { useEffect, useState } from "react";

function ViewAccounts() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/admin/view-accounts"
        );
        if (response.ok) {
          const data = await response.json();
          setAccounts(data);
        } else {
          setError("Failed to fetch accounts data.");
        }
      } catch (error) {
        console.error("Error fetching accounts:", error);
        setError("An error occurred while fetching accounts.");
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  if (loading) {
    return (
      <div className="h-[80vh] flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[80vh] flex justify-center items-center">{error}</div>
    );
  }

  return (
    <div>
      <main className="ml-64 mt-16 p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Accounts List</h2>
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b">Name</th>
              <th className="py-3 px-4 border-b">Phone</th>
              <th className="py-3 px-4 border-b">Position</th>
            
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => (
              <tr key={account._id} className="text-center">
                <td className="py-3 px-4 border-b">{account.name}</td>
                <td className="py-3 px-4 border-b">{account.phone}</td>
                <td className="py-3 px-4 border-b">{account.position}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default ViewAccounts;