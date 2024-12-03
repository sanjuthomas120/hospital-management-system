import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample data for the chart
const data = [
  { name: 'Jan', Patients: 4000, Appointments: 2400 },
  { name: 'Feb', Patients: 3000, Appointments: 1398 },
  { name: 'Mar', Patients: 2000, Appointments: 9800 },
  { name: 'Apr', Patients: 2780, Appointments: 3908 },
  { name: 'May', Patients: 1890, Appointments: 4800 },
  { name: 'Jun', Patients: 2390, Appointments: 3800 },
  { name: 'Jul', Patients: 3490, Appointments: 4300 },
];

const AdminChart = () => {
  return (
    <div>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Patients" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="Appointments" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
    </div>
  );
};

export default AdminChart;
