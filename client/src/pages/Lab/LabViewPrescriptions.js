import React, { useState, useEffect } from "react";
import LabNavbar from "../../Components/Lab/LabNavbar/LabNavbar";
import { useNavigate } from "react-router-dom";

function LabViewPrescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [filteredPrescriptions, setFilteredPrescriptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const prescriptionsPerPage = 10;
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPrescriptionsData();
  }, [searchTerm, currentPage]);

  const fetchPrescriptionsData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/pharmacy/prescriptions?search=${searchTerm}&page=${currentPage}&limit=${prescriptionsPerPage}`
      );
      const result = await response.json();

      if (response.ok) {
        setPrescriptions(result.prescriptions);
        setFilteredPrescriptions(result.prescriptions);
        setTotalPages(result.totalPages);
      } else {
        console.error("Error fetching prescriptions:", result.message);
      }
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleDetails = (prescriptionId) => {
    navigate(`/lab/view-prescription-details/${prescriptionId}`);
  };

  const renderPrescriptions = () => {
    if (loading) {
      return <p>Loading prescriptions...</p>;
    }

    if (filteredPrescriptions.length === 0) {
      return <p>No prescriptions found.</p>;
    }

    return (
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="p-3 border">Patient Name</th>
            <th className="p-3 border">Date</th>
            <th className="p-3 border">Tests</th>
            <th className="p-3 border">Details</th>
          </tr>
        </thead>
        <tbody>
          {filteredPrescriptions.map((prescription) => {
            if (prescription.tests && prescription.tests.length > 0 && prescription.labConfirm === 'not confirmed') {
              return (
                <tr key={prescription._id} className="hover:bg-gray-100">
                  <td className="p-3 border">{prescription.patientName}</td>
                  <td className="p-3 border">
                    {new Date(prescription.createdAt).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </td>
                  <td className="p-3 border">
                    <ul className="list-disc ml-4">
                      {prescription.tests.map((test, i) => (
                        <li key={i} className="mt-2">
                          <strong>Test Name:</strong> {test.name || "N/A"}{" "}
                          <br />
                          <strong>Instructions:</strong>{" "}
                          {test.instructions || "N/A"}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-3 border text-center">
                    <button
                      onClick={() => handleDetails(prescription._id)}
                      className="text-primary p-1"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              );
            }
            return null;
          })}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <LabNavbar />
      <div className="p-14">
        <h1 className="text-xl font-semibold mb-4">View Prescriptions</h1>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by patient name"
            className="p-2 border rounded w-full"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {renderPrescriptions()}

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className={`p-2 bg-primary text-white rounded ${
              currentPage === 1 && "opacity-50 cursor-not-allowed"
            }`}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className={`p-2 bg-primary text-white rounded ${
              currentPage === totalPages && "opacity-50 cursor-not-allowed"
            }`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default LabViewPrescriptions;
