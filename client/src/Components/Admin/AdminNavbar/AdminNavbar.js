import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function AdminNavbar() {
  const navigation = useNavigate()
  const handleLogout = () =>{
    navigation('/')
  }
  return (
    <nav className="bg-white text-secondary fixed w-full top-0 z-20 border-2 border-r-transparent">
      <div className="max-w-7xl mx-auto px-2">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/admin">
              <img
                src="/images/logo/65c9a4e9f78ae07595c9f519_medcare-logo.png"
                alt="Medcare Logo"
                className="h-8"
              />
            </Link>
          </div>
          <div className="flex space-x-4">
          <p onClick={handleLogout} className='cursor-pointer'>Logout</p>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;
