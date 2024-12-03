import React, { useEffect, useState } from "react";

function ViewMedicine() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const medicinesPerPage = 10;

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/pharmacy/view-medicine"
        );

        if (response.ok) {
          const data = await response.json();
          setMedicines(data);
          setFilteredMedicines(data);
        } else {
          setError("Failed to fetch medicine details");
        }
      } catch (error) {
        console.log("Error occurred:", error);
        setError("Something went wrong while loading medicine details");
      } finally {
        setLoading(false);
      }
    };
    fetchMedicines();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    const filtered = medicines.filter(
      (medicine) =>
        medicine.name.toLowerCase().includes(query.toLowerCase()) ||
        medicine.cas.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMedicines(filtered);
    setCurrentPage(1);
  };

  const totalPage = Math.ceil(filteredMedicines.length / medicinesPerPage);

  const indexOfLastMedicine = currentPage * medicinesPerPage;
  const indexOfFirstMedicine = indexOfLastMedicine - medicinesPerPage;
  const currentMedicines = filteredMedicines.slice(
    indexOfFirstMedicine,
    indexOfLastMedicine
  );

  const handlePageChange = (index) => {
    setCurrentPage(index + 1);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleAvailability = async (medicine_id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/pharmacy/${medicine_id}/update-availability`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setMedicines((prevMedicines) =>
          prevMedicines.map((medicine) =>
            medicine._id === medicine_id
              ? {
                  ...medicine,
                  status:
                    medicine.status === "available" ? "empty" : "available",
                }
              : medicine
          )
        );
        setFilteredMedicines((prevFilteredMedicine) =>
          prevFilteredMedicine.map((medicine) =>
            medicine._id === medicine_id
              ? {
                  ...medicine,
                  status:
                    medicine.status === "available" ? "empty" : "available",
                }
              : medicine
          )
        );
      } else {
        alert("Something went wrong please again later");
      }
    } catch (error) {
      alert("Some server error ocurred please try again later");
      console.log("Error in updating:", error);
    }
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
      <h2 className="text-2xl font-bold mb-6">Medicine List</h2>

      <input
        type="text"
        placeholder="Search by medicine name or medicine code"
        className="border p-2 mb-4 w-full rounded-md my-2"
        value={searchTerm}
        onChange={handleSearch}
      />

      {searchTerm && filteredMedicines.length === 0 ? (
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
                    Medicine Name
                  </th>
                  <th className="px-4 py-4 border-b font-semibold">
                    Medicine Code
                  </th>
                  <th className="px-4 py-4 border-b font-semibold">Usage</th>
                  <th className="px-4 py-4 border-b font-semibold">Price</th>
                  <th className="px-4 py-4 border-b font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {currentMedicines.map((medicine, index) => (
                  <tr key={index} className="text-center">
                    <td className="px-4 py-4 border-b">{medicine.name}</td>
                    <td className="px-4 py-4 border-b">{medicine.cas}</td>
                    <td className="px-4 py-4 border-b">{medicine.usage}</td>
                    <td className="px-4 py-4 border-b">{medicine.price}</td>
                    <td className="px-4 py-4 border-b">
                      <button
                        className={`py-1 px-4 rounded ${
                          medicine.status === "available"
                            ? "bg-primary hover:bg-secondary text-white"
                            : "text-red-500"
                        }`}
                        onClick={() => handleAvailability(medicine._id)}
                        disabled={medicine.status === "empty"}
                      >
                        {medicine.status === "available"
                          ? "Available"
                          : "Empty"}
                      </button>
                    </td>
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

export default ViewMedicine;
