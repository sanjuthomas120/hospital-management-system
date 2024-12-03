import React, { useEffect, useState } from 'react';

const Notifications = () => {
    const userType = sessionStorage.getItem('userType')
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(`http://localhost:5000/admin/notifications?userType=${userType}`);
        if (!response.ok) {
          const data = await response.json();
          setError(data.message);
          return;
        }
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setError('Error fetching notifications');
      }
    };

    fetchNotifications();
  }, [userType]);

  return (
    <div className="max-w-lg mx-auto my-10 p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-primary text-center">Notifications</h2>
      {error && <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">{error}</div>}
      <ul className="space-y-4">
        {notifications.map((notification) => (
          <li key={notification._id} className="p-4 border border-gray-300 rounded">
            <p>{notification.message}</p>
            <p className="text-gray-500 text-sm">{new Date(notification.createdAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
