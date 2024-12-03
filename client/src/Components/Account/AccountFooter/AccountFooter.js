import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { faPhone, faEnvelope, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const AccountFooter = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <p className="flex items-center mb-2">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
              123 Hospital Road, City, State, 12345
            </p>
            <p className="flex items-center mb-2">
              <FontAwesomeIcon icon={faPhone} className="mr-2" />
              +1 234 567 8900
            </p>
            <p className="flex items-center">
              <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
              info@hospital.com
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/account-dashboard" className="hover:text-primary">
                  Account Dashboard
                </a>
              </li>
              <li>
                <a href="/patient-billing" className="hover:text-primary">
                  Patient Billing
                </a>
              </li>
              <li>
                <a href="/insurance-claims" className="hover:text-primary">
                  Insurance Claims
                </a>
              </li>
              <li>
                <a href="/reports" className="hover:text-primary">
                  Reports
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                <FontAwesomeIcon icon={faFacebookF} size="lg" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                <FontAwesomeIcon icon={faTwitter} size="lg" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                <FontAwesomeIcon icon={faLinkedinIn} size="lg" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-gray-700 pt-4">
          <p className="text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Hospital Management System. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default AccountFooter;
