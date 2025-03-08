import React from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        
        {/* ---------- Left Section ---------- */}
        <div>
          <img className='mb-5 w-40' src={assets.logo} alt="Company Logo" />
          <p className='w-full md:w-2/3 text-gray-600 leading-6'>
          <b>DocAppointment</b> is a user-friendly platform that simplifies healthcare by connecting patients with qualified doctors. Whether for routine check-ups or specialized care, it offers easy appointment scheduling, telemedicine options, and secure payment systems. With a wide range of doctors available, <b>DocAppointment</b> ensures convenient and accessible healthcare at your fingertips.
          </p>
        </div>

        {/* ---------- Center Section ---------- */}
        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>
              <Link to="/" className="hover:text-blue-500">Home</Link>  {/* Add Link for Home */}
            </li>
            <li>
              <Link to="/about" className="hover:text-blue-500">About us</Link>  {/* Add Link for About Us */}
            </li>
            <li>
              <Link to="/contact" className="hover:text-blue-500">Contact us</Link>  {/* Add Link for Contact Us */}
            </li>
            <li>
              <Link to="/doctors" className="hover:text-blue-500">All Doctors</Link>  {/* Add Link for All Doctors */}
            </li>
          </ul>
        </div>

        {/* ---------- Right Section ---------- */}
        <div>
        <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
<ul className='flex flex-col gap-2 text-gray-600'>
  <li>8052078680</li>
  <li>
    <a href='mailto:anshumdwivedi8@gmail.com' className='text-blue-600 hover:underline'>
      anshumdwivedi8@gmail.com
    </a>
  </li>
</ul>

        </div>

      </div>

      {/* ---------- Copyright Text ---------- */}
      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright © 2025 - All Rights Reserved.</p>
      </div>

    </div>
  );
};

export default Footer;
