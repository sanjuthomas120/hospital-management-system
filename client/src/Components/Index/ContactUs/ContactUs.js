import React from 'react';

function ContactUs(){
  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        <div className="text-center mb-12">
          <h2 className="text-[42px] md:text-[48px] font-bold text-secondary">
            Get In Touch
          </h2>
          <p className="text-gray-600 mt-4 text-lg">
            We're here to assist you with any questions or concerns. Feel free to reach out to us anytime!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-primary">Address</h3>
              <p className="text-lg text-gray-600">
                123 Health St, Wellness City, CA 12345
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-primary">Phone</h3>
              <p className="text-lg text-gray-600">+1 (555) 123-4567</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-primary">Email</h3>
              <p className="text-lg text-gray-600">info@hospitalcare.com</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-primary">Working Hours</h3>
              <p className="text-lg text-gray-600">Mon - Fri: 9 AM - 5 PM</p>
              <p className="text-lg text-gray-600">Sat - Sun: 10 AM - 2 PM</p>
            </div>
          </div>

          <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
            <form>
              <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700 mb-2">Your Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter your name"
                />
              </div>
              <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700 mb-2">Your Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Write your message"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary hover:bg-secondary text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
