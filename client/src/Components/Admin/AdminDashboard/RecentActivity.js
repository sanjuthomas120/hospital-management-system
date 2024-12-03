// src/Components/Admin/AdminDashboard/RecentActivity.js
import React from 'react';

function RecentActivity({ activities }) {
  return (
    <div className="bg-white shadow rounded p-4">
      <h3 className="text-lg font-semibold mb-2">Recent Activity</h3>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id} className="mb-2">
            {activity.message} <span className="text-gray-500 text-sm">{activity.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentActivity;
