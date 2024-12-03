import React, { useState } from 'react';

const SendNotification = () => {
  const [notification, setNotification] = useState({
    message: '',
    userTypes: {
      Doctor: false,
      Patient: false,
      "Account-Section": false,
      "Lab-Section": false,
      Pharmacy: false,
    },
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setNotification((prev) => ({
        ...prev,
        userTypes: { ...prev.userTypes, [name]: checked },
      }));
    } else {
      setNotification({ ...notification, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const selectedUserTypes = Object.keys(notification.userTypes).filter((type) => notification.userTypes[type]);
    if (selectedUserTypes.length === 0) {
      setError('At least one user type must be selected.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/admin/send-notification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userTypes: selectedUserTypes, message: notification.message }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      setSuccess(data.message);
      setNotification({ message: '', userTypes: { doctor: false, patient: false, account: false, lab: false, pharmacy: false } });
    } catch (error) {
      console.error('Error sending notification:', error);
      setError('Error: ' + error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto my-32  p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-primary text-center">Send Notification</h2>

      {error && <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">{error}</div>}
      {success && <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <textarea
            name="message"
            value={notification.message}
            onChange={handleChange}
            placeholder="Message"
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        <fieldset className="border border-gray-300 p-4 rounded">
          <legend className="font-semibold text-lg">Select User Types</legend>
          <div className="flex flex-col space-y-2">
            {Object.keys(notification.userTypes).map((type) => (
              <label key={type} className="flex items-center">
                <input
                  type="checkbox"
                  name={type}
                  checked={notification.userTypes[type]}
                  onChange={handleChange}
                  className="mr-2 h-4 w-4"
                />
                {type.charAt(0).toUpperCase() + type.slice(1)} {/* Capitalize the first letter */}
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <button
            type="submit"
            className="w-full py-3 bg-primary text-white rounded hover:bg-secondary transition duration-200"
          >
            Send Notification
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendNotification;
