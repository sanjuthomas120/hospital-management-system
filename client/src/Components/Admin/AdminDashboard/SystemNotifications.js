import React from 'react';

function SystemNotifications({ notifications }) {
  return (
    <div className="bg-white shadow rounded p-4">
      <h3 className="text-lg font-semibold mb-2">System Notifications</h3>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id} className="mb-2">
            {notification.message} <span className="text-gray-500 text-sm">{notification.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SystemNotifications;
