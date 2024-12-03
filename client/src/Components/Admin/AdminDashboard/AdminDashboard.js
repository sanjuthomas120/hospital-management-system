import React, { useEffect, useState } from 'react';
import Card from './AdminCard'; // Adjust the import path
import AdminChart from './AdminChart'; // Adjust the import path
import { faUser, faClipboardList, faStethoscope, faFlask, faPills, faDollarSign } from '@fortawesome/free-solid-svg-icons';

function AdminDashboard() {
  const [stats, setStats] = useState({
    patients: 0,
    appointments: 0,
    doctors: 0,
    accountStaff: 0,
    pharmacyStaff: 0,
    labStaff: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost:5000/admin/stats'); 
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  const cardData = [
    { title: 'Patients', value: stats.patients, icon: faUser },
    { title: 'Appointments', value: stats.appointments, icon: faClipboardList },
    { title: 'Doctors', value: stats.doctors, icon: faStethoscope },
    { title: 'Account Staff', value: stats.accountStaff, icon: faDollarSign },
    { title: 'Pharmacy Staff', value: stats.pharmacyStaff, icon: faPills },
    { title: 'Lab Staff', value: stats.labStaff, icon: faFlask },
  ];

  return (
    <div className="p-4 grid grid-cols-3 gap-4">
      {cardData.map((card, index) => (
        <Card key={index} title={card.title} value={card.value} icon={card.icon} />
      ))}
      <div className="col-span-3 mt-4">
        <AdminChart data={[
          stats.patients,
          stats.appointments,
          stats.doctors,
          stats.accountStaff,
          stats.pharmacyStaff,
          stats.labStaff
        ]} />
      </div>
    </div>
  );
}

export default AdminDashboard;
