import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ViewDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 12;
  const navigate = useNavigate();

  useEffect(() => {
    const doctorDetails = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/patient/view-doctors"
        );
        if (response.ok) {
          const data = await response.json();
          setDoctors(data);
          setFilteredDoctors(data);
        } else {
          setError("Failed to fetch doctor details. Please try again later...");
        }
      } catch (error) {
        console.error("Error in fetching doctor details:", error);
        setError("Error occurred while fetching the doctor details...");
      } finally {
        setLoading(false);
      }
    };
    doctorDetails();
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    const filtered = doctors.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(query.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredDoctors(filtered);
    setCurrentPage(1);
  };

  const totalPage = Math.ceil(filteredDoctors.length / doctorsPerPage);

  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(
    indexOfFirstDoctor,
    indexOfLastDoctor
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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
    <div className="py-8 px-12">
      <h2 className="text-3xl font-bold mb-4">Find your doctor</h2>
      <input
        type="text"
        placeholder="Search by name or specialization..."
        value={searchQuery}
        onChange={handleSearch}
        className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
      />
      {searchQuery !== null && filteredDoctors.length === 0 ? (
        <div className="min-h-[70vh] flex justify-center items-center">
          No details found
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentDoctors.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center"
            >
              <img
                src={
                  doctor.photo
                  ? `http://localhost:5000/${doctor.photo}`
                  : "/images/default/default-placeholder-doctor-half-length-portrait-photo-avatar-gray-color-default-placeholder-doctor-half-length-portrait-113622206.webp"
                }
                alt={doctor.name}
                className="w-24 h-24 rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{doctor.name}</h3>
              <p className="text-gray-600">{doctor.specialty}</p>
              <div>
              <button
                className="mt-4 bg-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-secondary mx-2"
                onClick={() =>
                  navigate(`/patient/book-appointment/${doctor._id}`)
                }
              >
                Book Appointment
              </button>
              <button
                className="mt-2 bg-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-secondary mx-2"
                onClick={() =>
                  navigate(`/patient/book-teleconsultation/${doctor._id}`)
                }
              >
                Book Teleconsultation
              </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalPage }, (_, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-lg ${
              index + 1 === currentPage
                ? "bg-primary text-white"
                : "bg-gray-300 text-secondary"
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ViewDoctors;
