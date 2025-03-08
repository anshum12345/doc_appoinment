import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyAppointments = () => {
  const { backendUrl, token, getDoctorData } = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);

  const months = [" ", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return dateArray[0] + " " + months[dateArray[1]] + " " + dateArray[2];
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } });

      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Cancel appointments
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/cancel-appointment`, { appointmentId }, { headers: { token } });

      if (data.success) {
        toast.success(data.message);
        getUserAppointments();

        if (typeof getDoctorData === 'function') {
          getDoctorData();
        } else {
          console.warn("getDoctorData is not a function");
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div className="appointments-wrapper p-6 bg-gray-50 min-h-screen" style={{ perspective: '1500px' }}>
      <p className='text-2xl font-semibold text-gray-800 pb-4 border-b border-gray-200'>My Appointments</p>
      <div className="appointments-list mt-6 space-y-4">
        {appointments.map((item, index) => (
          <div
            className="appointment-card bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 grid grid-cols-1 sm:grid-cols-[120px_1fr_auto] gap-6 items-center"
            key={index}
            style={{
              transform: 'translateZ(10px)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateZ(20px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateZ(10px)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            }}
          >
            {/* Doctor Image */}
            <div className="appointment-img">
              <img
                className='w-32 h-32 object-cover rounded-lg shadow-sm'
                src={item.docData.image}
                alt={item.docData.name}
              />
            </div>

            {/* Doctor Details */}
            <div className='flex-1'>
              <p className='text-xl font-semibold text-gray-800'>{item.docData.name}</p>
              <p className='text-sm text-gray-600 mt-1'>{item.docData.speciality}</p>
              <p className='text-sm text-gray-700 font-medium mt-3'>Address:</p>
              <p className='text-xs text-gray-600'>{item.docData.address.line1}</p>
              <p className='text-xs text-gray-600'>{item.docData.address.line2}</p>
              <p className='text-sm text-gray-700 font-medium mt-3'>
                <span className='font-semibold'>Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
            </div>

            {/* Buttons */}
            <div className='flex flex-col gap-3 sm:gap-4'>
              {!item.cancelled && (
                <button
                  className='w-full sm:w-48 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300'
                >
                  Pay Online
                </button>
              )}
              {!item.cancelled && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className='w-full sm:w-48 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300'
                >
                  Cancel Appointment
                </button>
              )}
              {item.cancelled && (
                <button
                  className='w-full sm:w-48 px-4 py-2 border border-red-500 text-red-500 rounded-lg cursor-not-allowed'
                  disabled
                >
                  Appointment Cancelled
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;