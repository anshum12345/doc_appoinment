import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';
import axios from 'axios';

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();

      formData.append('name', userData.name);
      formData.append('phone', userData.phone);
      formData.append('address', JSON.stringify(userData.address));
      formData.append('gender', userData.gender);
      formData.append('dob', userData.dob);

      image && formData.append('image', image);

      const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } });

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    userData && (
      <div className='max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md'>
        {/* Profile Image */}
        <div className='flex flex-col items-center mb-6'>
          {isEdit ? (
            <label htmlFor="image" className='cursor-pointer'>
              <div className='relative'>
                <img
                  className='w-36 h-36 rounded-full object-cover border-4 border-primary shadow-lg'
                  src={image ? URL.createObjectURL(image) : userData.image}
                  alt="Profile"
                />
                {!image && (
                  <img
                    className='w-10 absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-sm'
                    src={assets.upload_icon}
                    alt="Upload"
                  />
                )}
              </div>
              <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden />
            </label>
          ) : (
            <img
              className='w-36 h-36 rounded-full object-cover border-4 border-primary shadow-lg'
              src={userData.image}
              alt="Profile"
            />
          )}
        </div>

        {/* Name */}
        <div className='text-center mb-6'>
          {isEdit ? (
            <input
              className='text-3xl font-semibold text-gray-800 bg-gray-100 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
              type="text"
              value={userData.name}
              onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
            />
          ) : (
            <p className='text-3xl font-semibold text-gray-800'>{userData.name}</p>
          )}
        </div>

        <hr className='border-t border-gray-200 mb-6' />

        {/* Contact Information */}
        <div className='mb-6'>
          <p className='text-lg font-medium text-gray-600 mb-4'>CONTACT INFORMATION</p>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700'>
            <div>
              <p className='font-medium'>Email id:</p>
              <p className='text-blue-500'>{userData.email}</p>
            </div>
            <div>
              <p className='font-medium'>Phone:</p>
              {isEdit ? (
                <input
                  className='w-full bg-gray-100 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
                  type="text"
                  value={userData.phone}
                  onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
                />
              ) : (
                <p className='text-blue-500'>{userData.phone}</p>
              )}
            </div>
            <div className='col-span-2'>
              <p className='font-medium'>Address:</p>
              {isEdit ? (
                <div className='space-y-2'>
                  <input
                    className='w-full bg-gray-100 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
                    type="text"
                    value={userData.address.line1}
                    onChange={(e) => setUserData((prev) => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                  />
                  <input
                    className='w-full bg-gray-100 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
                    type="text"
                    value={userData.address.line2}
                    onChange={(e) => setUserData((prev) => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                  />
                </div>
              ) : (
                <p className='text-gray-500'>
                  {userData.address.line1}
                  <br />
                  {userData.address.line2}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className='mb-6'>
          <p className='text-lg font-medium text-gray-600 mb-4'>BASIC INFORMATION</p>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700'>
            <div>
              <p className='font-medium'>Gender:</p>
              {isEdit ? (
                <select
                  className='w-full bg-gray-100 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
                  onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
                  value={userData.gender}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                <p className='text-gray-500'>{userData.gender}</p>
              )}
            </div>
            <div>
              <p className='font-medium'>Birthday:</p>
              {isEdit ? (
                <input
                  className='w-full bg-gray-100 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
                  type='date'
                  onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))}
                  value={userData.dob}
                />
              ) : (
                <p className='text-gray-500'>{userData.dob}</p>
              )}
            </div>
          </div>
        </div>

        {/* Save/Edit Button */}
        <div className='flex justify-center mt-6'>
          {isEdit ? (
            <button
              className='bg-primary text-white px-8 py-2 rounded-full hover:bg-primary-dark transition-all duration-300'
              onClick={updateUserProfileData}
            >
              Save Information
            </button>
          ) : (
            <button
              className='bg-primary text-white px-8 py-2 rounded-full hover:bg-primary-dark transition-all duration-300'
              onClick={() => setIsEdit(true)}
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default MyProfile;