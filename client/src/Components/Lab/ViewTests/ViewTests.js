import React, { useEffect, useState } from "react";

function ViewTests() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTests, setFilteredTests] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const testsPerPage = 10;

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/lab/view-tests"
        );

        if (response.ok) {
          const data = await response.json();
          setTests(data);
          setFilteredTests(data);
        } else {
          setError("Failed to fetch test details");
        }
      } catch (error) {
        console.log("Error occurred:", error);
        setError("Something went wrong while loading test details");
      } finally {
        setLoading(false);
      }
    };
    fetchTests();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    const filtered = tests.filter(
      (test) =>
        test.name.toLowerCase().includes(query.toLowerCase()) ||
        test.ndc.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTests(filtered);
    setCurrentPage(1);
  };

  const totalPage = Math.ceil(filteredTests.length / testsPerPage);

  const indexOfLastTest = currentPage * testsPerPage;
  const indexOfFirstTest = indexOfLastTest - testsPerPage;
  const currentTests = filteredTests.slice(
    indexOfFirstTest,
    indexOfLastTest
  );

  const handlePageChange = (index) => {
    setCurrentPage(index + 1);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex justify-center items-center">
        Loading, please wait a while...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[70vh] flex justify-center items-center">
        {error}
      </div>
    );
  }

  return (
    <div className="container min-h-[70vh] mx-auto p-10">
      <h2 className="text-2xl font-bold mb-6">Test List</h2>

      <input
        type="text"
        placeholder="Search by test name or test code"
        className="border p-2 mb-4 w-full rounded-md my-2"
        value={searchTerm}
        onChange={handleSearch}
      />

      {searchTerm && filteredTests.length === 0 ? (
        <div className="min-h-[50vh] flex justify-center items-center">
          No details found
        </div>
      ) : (
        <>
          <div className="overflow-x-auto shadow-md mt-4">
            <table className="min-w-full bg-white rounded-lg shadow-md">
              <thead>
                <tr>
                  <th className="py-3 px-4 border-b font-semibold">
                    Test Name
                  </th>
                  <th className="px-4 py-4 border-b font-semibold">
                    Test Type
                  </th>
                  <th className="px-4 py-4 border-b font-semibold">Test Code</th>
                  <th className="px-4 py-4 border-b font-semibold">Price</th>
                </tr>
              </thead>
              <tbody>
                {currentTests.map((test, index) => (
                  <tr key={index} className="text-center">
                    <td className="px-4 py-4 border-b">{test.name}</td>
                    <td className="px-4 py-4 border-b">{test.type.charAt(0).toUpperCase() + test.type.slice(1)}</td>
                    <td className="px-4 py-4 border-b">{test.ndc}</td>
                    <td className="px-4 py-4 border-b">{test.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: totalPage }, (_, index) => (
              <button
                key={index}
                className={`px-2 py-1 w-8 rounded-lg ${
                  index === currentPage - 1
                    ? "bg-primary text-white"
                    : "bg-gray-300 text-secondary"
                }`}
                onClick={() => handlePageChange(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ViewTests;
