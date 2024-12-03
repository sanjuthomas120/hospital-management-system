import React from 'react';

function RevenueSummary({ daily, weekly, monthly }) {
  return (
    <div className="bg-white shadow rounded p-4">
      <h3 className="text-lg font-semibold mb-2">Revenue Summary</h3>
      <p>Daily Revenue: ${daily}</p>
      <p>Weekly Revenue: ${weekly}</p>
      <p>Monthly Revenue: ${monthly}</p>
    </div>
  );
}

export default RevenueSummary;
