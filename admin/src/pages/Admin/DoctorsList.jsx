import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';

const DoctorsList = () => {
  const { aToken, doctors, getAllDoctors, changeAvailablity } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className="m-5 max-h-[90vh] overflow-y-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">All Doctors</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {doctors.map((item, index) => (
          <div
            className="border border-indigo-100 rounded-xl overflow-hidden cursor-pointer group hover:shadow-lg transition-shadow duration-300"
            key={index}
          >
            <img
              className="w-full h-48 object-cover bg-indigo-50 group-hover:bg-indigo-100 transition-all duration-500"
              src={item.image}
              alt={item.name}
            />
            <div className="p-4">
              <p className="text-xl font-semibold text-gray-800">{item.name}</p>
              <p className="text-sm text-gray-600 mt-1">{item.speciality}</p>

              {/* Availability Toggle */}
              <div className="mt-4 flex items-center gap-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={item.available}
                    onChange={() => changeAvailablity(item._id)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-primary transition-colors duration-300 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
                <p className="text-sm text-gray-600">
                  {item.available ? 'Available' : 'Unavailable'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;