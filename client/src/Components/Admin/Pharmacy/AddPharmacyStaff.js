import React, { useState } from 'react';

function AddPharmacyStaff() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [position, setPosition] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAddPharmacyStaff = async (e) => {
    e.preventDefault();

    const staffData = {
      name,
      email,
      phone,
      position,
      password,
    };

    try {
      const response = await fetch('http://localhost:5000/admin/add-pharmacy-staff', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(staffData),
      });

      if (response.ok) {
        setIsModalOpen(true);
        setMessage('Pharmacy staff added successfully!');
        setName('');
        setEmail('');
        setPhone('');
        setPosition('');
        setPassword('')
      } else {
        const data = await response.json();
        setIsModalOpen(true);
        setMessage(data.message || 'Failed to add pharmacy staff. Please try again.');
      }
    } catch (error) {
      console.error('Error adding pharmacy staff:', error);
      setIsModalOpen(true);
      setMessage('An error occurred while adding pharmacy staff.');
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Pharmacy Staff</h2>
        <form onSubmit={handleAddPharmacyStaff}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition duration-200 my-2"
            required
          />
          <input
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition duration-200 my-2"
            required
          />
          <input
            type="text"
            placeholder="Position (e.g., Pharmacist)"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition duration-200 my-2"
            required
          />
             <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition duration-200 my-2"
            required
          />
            <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition duration-200 my-2"
            required
          />
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg hover:bg-secondary my-2"
          >
            Add Staff
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
    </div>
  );
}

export default AddPharmacyStaff;
