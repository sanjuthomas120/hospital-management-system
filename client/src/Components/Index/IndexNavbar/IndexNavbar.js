import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

function IndexNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const links = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "Register", link: "/patient-register" },
    { id: 3, name: "Login", link: "/login" },
  ];
  const location = useLocation();
  const currentLocation = location.pathname;
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-white border-b-2 border-gray-100">
      <div className="max-w-7xl mx-auto px-12 sm:px-12 lg:px-4">
        <div className="flex items-center justify-between h-auto">
          <div className="flex items-center py-4">
            <Link to="/">
              <img
                src="/images/logo/65c9a4e9f78ae07595c9f519_medcare-logo.png"
                alt="logo"
              />
            </Link>
          </div>
          <div className="hidden lg:block">
            <div className="ml-10 flex items-start space-x-4">
              {links.map((item) => (
                <Link
                  key={item.id}
                  to={item.link}
                  onClick={handleLinkClick}
                  className={`px-3 py-2 rounded-md font-semibold ${currentLocation === item.link? 'text-primary' : 'text-secondary `hover:text-primary'}`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="lg:hidden">
            <button onClick={toggleMenu}>
              <FontAwesomeIcon
                icon={isOpen ? faTimes : faBars}
                className="h-6 w-6"
              />
            </button>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out border-r-2 shadow-lg border-gray-100 lg:hidden z-20`}
      >
        <div className="flex items-center px-4 py-6">
          <Link to="/">
            <img
              src="/images/logo/65c9a4e9f78ae07595c9f519_medcare-logo.png"
              className="w-40"
              alt="logo"
            />
          </Link>
        </div>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {links.map((item) => (
            <Link
              key={item.id}
              to={item.link}
              onClick={handleLinkClick}
              className={`block px-3 py-2 rounded-md font-normal ${currentLocation === item.link? 'text-primary' : 'text-secondary `hover:text-primary'}`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
export default IndexNavbar;
