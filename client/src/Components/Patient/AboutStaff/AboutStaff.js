import React from 'react';

const staffMembers = [
  {
    name: 'Dr. John Doe',
    position: 'Cardiologist',
    bio: '20 years of experience in cardiac care and surgery.',
    image: '/images/staffs/65cc8aacf3278495aac9c380_dr-john-doe.png',
  },
  {
    name: 'Dr. Jane Smith',
    position: 'Orthopedic Surgeon',
    bio: 'Specializes in joint replacement and sports injuries.',
    image: '/images/staffs/65cc8a4f6f2babb31de67957_dr-jane-smith.png',
  },
  {
    name: 'Nurse Emma Wilson',
    position: 'Head Nurse',
    bio: 'Oversees patient care and nursing staff management.',
    image: '/images/staffs/65cc89f6ac1c58da55ccfbbc_nurse-emma-willson.png',
  },
];

function AboutStaff() {
  return (
    <div className="bg-white py-10">
      <h2 className="text-5xl font-bold text-center mb-8">Meet Our Expert Team</h2>
      <p className="text-center text-lg mb-10 text-gray-600">
        Our dedicated team of healthcare professionals is here to provide the best care possible.
      </p>
      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {staffMembers.map((staff, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
            <img
              src={staff.image}
              alt={staff.name}
              className="w-32 h-32 mx-auto rounded-full object-cover mb-4 border-2 hover:border-primary p-1"
            />
        
            <h3 className="text-xl text-secondary font-semibold hover:text-primary">{staff.name}</h3>
            <p className="text-gray-500">{staff.position}</p>
            <p className="text-gray-700 mt-2">{staff.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AboutStaff;
