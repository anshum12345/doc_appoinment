import React from 'react';
import { specialityData } from '../assets/assets';
import { Link } from 'react-router-dom';

const SpecialityMenu = () => {
  return (
    <div className="flex flex-col items-center gap-8 py-16" id="speciality">
      {/* Title and Description */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Find by Speciality</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
        </p>
      </div>

      {/* Speciality Cards */}
      <div className="flex justify-center gap-6 w-full overflow-x-auto px-4">
        {specialityData.map((item, index) => (
          <Link
            key={index}
            to={`/doctors/${item.speciality}`}
            onClick={() => window.scrollTo(0, 0)}
            className="flex flex-col items-center p-6 bg-white rounded-lg  hover:shadow-lg transition-all duration-300 cursor-pointer flex-shrink-0"
          >
            <img
              className="w-20 h-20 sm:w-24 sm:h-24 mb-4 object-cover rounded-full"
              src={item.image}
              alt={item.speciality}
            />
            <p className="text-sm sm:text-base font-medium text-gray-700 text-center">
              {item.speciality}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;