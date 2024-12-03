import React, { useEffect, useState } from "react";

function ViewMedicine() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const medicinesPerPage = 10;
  const [editingMedicine, setEditingMedicine] = useState(null);
  const [editedDetails, setEditedDetails] = useState({ name: "", cas: "", usage: "", price: "" });

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

  const handleEditClick = (medicine) => {
    setEditingMedicine(medicine._id);
    setEditedDetails({
      name: medicine.name,
      cas: medicine.cas,
      usage: medicine.usage,
      price: medicine.price,
    });
  };

  const handleUpdate = async (medicineId) => {
    try {
      const response = await fetch(`http://localhost:5000/admin/${medicineId}/update-medicine`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedDetails),
      });

      if (response.ok) {
        const updatedMedicine = await response.json();
        setMedicines((prevMedicines) =>
          prevMedicines.map((med) => (med._id === medicineId ? updatedMedicine : med))
        );
        setFilteredMedicines((prevFiltered) =>
          prevFiltered.map((med) => (med._id === medicineId ? updatedMedicine : med))
        );
        setEditingMedicine(null);
        setEditedDetails({ name: "", cas: "", usage: "", price: "" });
      } else {
        setError("Failed to update medicine details");
      }
    } catch (error) {
      console.log("Error occurred while updating:", error);
      setError("Something went wrong while updating medicine details");
    }
  };

  const handleDelete = async (medicineId) => {
    if (window.confirm("Are you sure you want to delete this medicine?")) {
      try {
        const response = await fetch(`http://localhost:5000/admin/delete-medicine/${medicineId}`, {
          method: "DELETE",
        });
  
        if (response.ok) {
          setMedicines((prevMedicines) => prevMedicines.filter((med) => med._id !== medicineId));
          setFilteredMedicines((prevFiltered) => prevFiltered.filter((med) => med._id !== medicineId));
        } else {
          setError("Failed to delete medicine");
        }
      } catch (error) {
        console.log("Error occurred while deleting:", error);
        setError("Something went wrong while deleting medicine");
      }
    }
  };
  

  if (loading) {
    return (
      <div className="ml-64 mt-16 p-6 min-h-[70vh] flex justify-center items-center">
        Loading, please wait a while...
      </div>
    );
  }

  if (error) {
    return (
      <div className="ml-64 mt-16 p-6 min-h-[70vh] flex justify-center items-center">
        {error}
      </div>
    );
  }

  return (
    <div className="ml-60 mt-16 min-h-[70vh] mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Medicine List</h2>

      <input
        type="text"
        placeholder="Search by medicine name or medicine code"
        className="border p-2 mb-4 w-96 rounded-md my-2"
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
                  <th className="py-4 border-b font-semibold">Medicine Name</th>
                  <th className="px-4 py-4 border-b font-semibold">Medicine Code</th>
                  <th className="px-4 py-4 border-b font-semibold">Usage</th>
                  <th className="px-4 py-4 border-b font-semibold">Price</th>
                  <th colSpan={2} className="px-4 py-4 border-b font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentMedicines.map((medicine) => (
                  <tr key={medicine._id} className="text-center">
                    <td className="px-4 py-4 border-b">
                      {editingMedicine === medicine._id ? (
                        <input
                          type="text"
                          value={editedDetails.name}
                          onChange={(e) => setEditedDetails({ ...editedDetails, name: e.target.value })}
                          className="border p-1 rounded"
                        />
                      ) : (
                        medicine.name
                      )}
                    </td>
                    <td className="px-4 py-4 border-b">
                      {editingMedicine === medicine._id ? (
                        <input
                          type="text"
                          value={editedDetails.cas}
                          onChange={(e) => setEditedDetails({ ...editedDetails, cas: e.target.value })}
                          className="border p-1 rounded w-40"
                        />
                      ) : (
                        medicine.cas
                      )}
                    </td>
                    <td className="px-4 py-4 border-b">
                      {editingMedicine === medicine._id ? (
                        <input
                          type="text"
                          value={editedDetails.usage}
                          onChange={(e) => setEditedDetails({ ...editedDetails, usage: e.target.value })}
                          className="border p-1 rounded w-40"
                        />
                      ) : (
                        medicine.usage
                      )}
                    </td>
                    <td className="px-4 py-4 border-b">
                      {editingMedicine === medicine._id ? (
                        <input
                          type="number"
                          value={editedDetails.price}
                          onChange={(e) => setEditedDetails({ ...editedDetails, price: e.target.value })}
                          className="border p-1 rounded w-20"
                        />
                      ) : (
                        medicine.price
                      )}
                    </td>
                    <td className="px-2 py-4 border-b">
                      {editingMedicine === medicine._id ? (
                        <button
                          className="bg-primary px-2 py-1 rounded text-white hover:bg-secondary mr-1"
                          onClick={() => handleUpdate(medicine._id)}
                        >
                          Update
                        </button>
                      ) : (
                        <button
                          className="bg-primary px-4 py-1 rounded text-white hover:bg-secondary mx-2"
                          onClick={() => handleEditClick(medicine)}
                        >
                          Edit
                        </button>
                      )}
                      <button onClick={() =>handleDelete(medicine._id)} className="bg-red-500 px-4 py-1 rounded text-white hover:bg-red-900">Delete</button>
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
