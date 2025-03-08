import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } =
    useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (aToken) {
      setLoading(true);
      getAllAppointments().finally(() => setLoading(false));
    }
  }, [aToken]);

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">All Appointments</h2>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-600">Loading appointments...</p>
        </div>
      ) : appointments.length === 0 ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-600">No appointments available.</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          {/* Table Header */}
          <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] gap-4 py-4 px-6 bg-gray-50 border-b border-gray-200">
            <p className="text-sm font-medium text-gray-600">#</p>
            <p className="text-sm font-medium text-gray-600">Patient</p>
            <p className="text-sm font-medium text-gray-600">Age</p>
            <p className="text-sm font-medium text-gray-600">Date & Time</p>
            <p className="text-sm font-medium text-gray-600">Doctor</p>
            <p className="text-sm font-medium text-gray-600">Fees</p>
            <p className="text-sm font-medium text-gray-600">Actions</p>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {appointments.map((item, index) => (
              <div
                className="grid grid-cols-1 sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] gap-4 py-4 px-6 hover:bg-gray-50 transition-colors duration-200"
                key={index}
              >
                <p className="text-sm text-gray-700 max-sm:hidden">{index + 1}</p>

                {/* Patient Info */}
                <div className="flex items-center gap-3">
                  <img
                    className="w-8 h-8 rounded-full object-cover"
                    src={item.userData.image}
                    alt={item.userData.name}
                  />
                  <p className="text-sm text-gray-700">{item.userData.name}</p>
                </div>

                {/* Age */}
                <p className="text-sm text-gray-700 max-sm:hidden">
                  {calculateAge(item.userData.dob)}
                </p>

                {/* Date & Time */}
                <p className="text-sm text-gray-700">
                  {slotDateFormat(item.slotDate)}, {item.slotTime}
                </p>

                {/* Doctor Info */}
                <div className="flex items-center gap-3">
                  <img
                    className="w-8 h-8 rounded-full object-cover bg-gray-200"
                    src={item.docData.image}
                    alt={item.docData.name}
                  />
                  <p className="text-sm text-gray-700">{item.docData.name}</p>
                </div>

                {/* Fees */}
                <p className="text-sm text-gray-700">
                  {currency}
                  {item.amount}
                </p>

                {/* Actions */}
                <div className="flex items-center">
                  {item.cancelled ? (
                    <p className="text-xs font-medium text-red-500">Cancelled</p>
                  ) : (
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      className="w-6 h-6 cursor-pointer hover:opacity-80 transition-opacity duration-200"
                      src={assets.cancel_icon}
                      alt="Cancel"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllAppointments;