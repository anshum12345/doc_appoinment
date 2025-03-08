import React from 'react';
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12" style={{ perspective: '1500px' }}>
      {/* Title Section */}
      <div
        className="text-center text-4xl pt-10 text-gray-600 font-bold mb-12"
        style={{
          transform: 'translateZ(50px)',
          transition: 'transform 0.5s ease',
        }}
      >
        <p>CONTACT <span className="text-primary font-bold">US</span></p>
      </div>

      {/* Content Section */}
      <div
        className="my-10 flex flex-col justify-center items-center md:flex-row gap-10 mb-28 text-sm max-w-6xl mx-auto px-6"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'rotateY(10deg)',
          transition: 'transform 0.5s ease',
        }}
      >
        {/* Image */}
        <img
          className="w-full md:max-w-[400px] rounded-lg  hover:shadow-primary/50 transition-shadow duration-300 "
          src={assets.contact_image}
          alt="Contact Us"
          style={{
            transform: 'translateZ(20px)',
            transition: 'transform 0.5s ease',
          }}
        />

        {/* Contact Details */}
        <div
          className="flex flex-col justify-center items-start gap-6 bg-white p-8 rounded-lg  hover:shadow-sm transition-shadow duration-900"
          style={{
            transform: 'translateZ(30px)',
            transition: 'transform 0.5s ease',
          }}
        >
          <p className="font-semibold text-xl text-gray-700">Our Office</p>
          <p className="text-gray-600">
            EIB <br /> EIB Campus, Bangalore
          </p>
          <p className="text-gray-600">
            Tel: 8052078680 <br /> Email: ansumdwivedi8@gmail.com
          </p>
          <p className="font-semibold text-xl text-gray-700">Careers at DocAppointment</p>
          <p className="text-gray-600">
            Learn more about our teams and job openings.
          </p>

          {/* Explore Jobs Button */}
          <button
            className="border border-primary px-8 py-3 text-sm font-medium text-primary hover:bg-primary hover:text-white transition-all duration-500 rounded-lg"
            style={{
              transform: 'translateZ(10px)',
              transition: 'transform 0.5s ease',
            }}
          >
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;