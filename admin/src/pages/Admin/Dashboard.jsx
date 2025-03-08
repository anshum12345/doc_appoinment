import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';

const Dashboard = () => {
  const { aToken, cancelAppoitment, dashData, getDashData } = useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return (
    dashData && (
      <div className="m-5">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Doctors Card */}
          <div className="flex items-center gap-4 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
            <img className="w-14 h-14" src={assets.doctor_icon} alt="Doctors" />
            <div>
              <p className="text-2xl font-bold text-gray-800">{dashData.doctors}</p>
              <p className="text-gray-500">Doctors</p>
            </div>
          </div>

          {/* Appointments Card */}
          <div className="flex items-center gap-4 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
            <img className="w-14 h-14" src={assets.appointments_icon} alt="Appointments" />
            <div>
              <p className="text-2xl font-bold text-gray-800">{dashData.appointments}</p>
              <p className="text-gray-500">Appointments</p>
            </div>
          </div>

          {/* Patients Card */}
          <div className="flex items-center gap-4 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
            <img className="w-14 h-14" src={assets.patients_icon} alt="Patients" />
            <div>
              <p className="text-2xl font-bold text-gray-800">{dashData.patients}</p>
              <p className="text-gray-500">Patients</p>
            </div>
          </div>
        </div>

        {/* Latest Bookings Section */}
        <div className="bg-white rounded-lg shadow-md mt-10 overflow-hidden">
          {/* Section Header */}
          <div className="flex items-center gap-3 px-6 py-4 bg-gray-50 border-b border-gray-200">
            <img className="w-6 h-6" src={assets.list_icon} alt="List" />
            <p className="text-lg font-semibold text-gray-800">Latest Bookings</p>
          </div>

          {/* Bookings List */}
          <div className="divide-y divide-gray-200">
            {dashData.lastestAppointments.map((item, index) => (
              <div
                className="flex items-center px-6 py-4 gap-4 hover:bg-gray-50 transition-colors duration-200"
                key={index}
              >
                {/* Doctor Image */}
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src={item.docData.image}
                  alt={item.docData.name}
                />

                {/* Doctor Details */}
                <div className="flex-1">
                  <p className="text-md font-medium text-gray-800">{item.docData.name}</p>
                  <p className="text-sm text-gray-600">{slotDateFormat(item.slotDate)}</p>
                </div>

                {/* Actions */}
                {item.cancelled ? (
                  <p className="text-xs font-medium text-red-500">Cancelled</p>
                ) : (
                  <img
                    onClick={() => cancelAppoitment(item._id)}
                    className="w-6 h-6 cursor-pointer hover:opacity-80 transition-opacity duration-200"
                    src={assets.cancel_icon}
                    alt="Cancel"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;