import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl text-secondary font-semibold mb-4">
              About Us
            </h3>
            <p className="text-gray-600">
              We are dedicated to providing the best healthcare services,
              ensuring patient safety and satisfaction. Our hospital offers a
              variety of specialties to meet all your medical needs.
            </p>
          </div>
          <div>
            <h3 className="text-2xl text-secondary font-semibold mb-4">Featured Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">Gynecology Care</li>
              <li className="text-gray-600">Pediatric Services</li>
              <li className="text-gray-600">Ophthalmology</li>
              <li className="text-gray-600">Neurology Treatments</li>
              <li className="text-gray-600">Oncology Support</li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl text-secondary font-semibold mb-4">
              Contact Us
            </h3>
            <p className="text-gray-600">
              123 Health St, Wellness City, CA 12345
            </p>
            <p className="text-gray-600 mt-2">+1 (555) 123-4567</p>
            <p className="text-gray-600 mt-2">info@hospitalcare.com</p>
            <div className="flex space-x-6 mt-6">
              <a href="#facebook" className="text-gray-600 hover:text-primary">
                <FontAwesomeIcon icon={faFacebook} size="lg" />
              </a>
              <a href="#twitter" className="text-gray-600 hover:text-primary">
                <FontAwesomeIcon icon={faTwitter} size="lg" />
              </a>
              <a href="#instagram" className="text-gray-600 hover:text-primary">
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-500">
            &copy; {new Date().getFullYear()} MedCare. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
