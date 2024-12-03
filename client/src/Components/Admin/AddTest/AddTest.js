import React, { useState } from 'react';

const AddTest = () => {
  const [test, setTest] = useState({
    name: '',
    type: 'blood',
    ndc: '',
    price: '',
  });

  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTest({ ...test, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/admin/add-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(test),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || 'Failed to add test.');
        setIsModalOpen(true);
        return;
      }

      setMessage('Test added successfully!');
      setTest({ name: '', type: 'blood', description: '', price: '' });
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error adding test:', error);
      setMessage('An error occurred, please try again later.');
      setIsModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-bold text-gray-800 text-center">Add New Test</h2>

        {[{ name: "name", placeholder: "Test Name" },
          { name: "type", type: "select", options: [{ value: "blood", label: "Blood Test" }, { value: "lab", label: "Lab Test" }] },
          { name: "ndc", placeholder: "Test code" },
          { name: "price", placeholder: "Price", type: "number" }
        ].map(({ name, placeholder, type = "text", options }) => (
          <div key={name} className="flex flex-col">
            {type === "select" ? (
              <select
                name={name}
                value={test[name]}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
              >
                {options.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            ) : (
              <input
                type={type}
                name={name}
                value={test[name]}
                onChange={handleChange}
                placeholder={placeholder}
                required
                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-primary text-white font-semibold px-4 py-3 rounded-md hover:bg-secondary transition duration-300"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Test'}
        </button>
      </form>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Message</h3>
            <p>{message}</p>
            <button
              onClick={closeModal}
              className="mt-4 bg-primary text-white py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTest;
