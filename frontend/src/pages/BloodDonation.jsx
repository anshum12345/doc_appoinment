import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaTint, FaHospital, FaCalendar, FaPhone, FaUser, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

const BloodDonation = () => {
  const { backendUrl, token, user } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [requests, setRequests] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    bloodGroup: '',
    units: 1,
    urgency: 'medium',
    hospital: '',
    city: '',
    contactPerson: '',
    contactPhone: '',
    requiredDate: '',
    reason: ''
  });

  useEffect(() => {
    if (token) {
      fetchBloodRequests();
    }
  }, [token]);

  const fetchBloodRequests = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/user/blood-requests`, {
        headers: { token }
      });
      if (response.data.success) {
        setRequests(response.data.requests);
      }
    } catch (error) {
      console.error('Error fetching blood requests:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${backendUrl}/api/user/create-blood-request`, {
        ...formData,
        userId: user._id
      }, {
        headers: { token }
      });

      if (response.data.success) {
        toast.success('Blood request created successfully!');
        setShowForm(false);
        setFormData({
          bloodGroup: '',
          units: 1,
          urgency: 'medium',
          hospital: '',
          city: '',
          contactPerson: '',
          contactPhone: '',
          requiredDate: '',
          reason: ''
        });
        fetchBloodRequests();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create blood request');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResponse = async (requestId, response) => {
    try {
      const res = await axios.post(`${backendUrl}/api/user/respond-blood-request`, {
        userId: user._id,
        requestId,
        response
      }, {
        headers: { token }
      });

      if (res.data.success) {
        toast.success(`Blood request ${response}ed successfully!`);
        fetchBloodRequests();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error('Failed to respond to blood request');
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'emergency': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaTint className="text-white text-3xl" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Blood Donation Network
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with blood donors and recipients in your area. Save lives through community support.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center mb-8 space-x-4">
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <FaTint />
            <span>Request Blood</span>
          </button>
          <button
            onClick={() => setShowForm(false)}
            className="btn-secondary flex items-center space-x-2"
          >
            <FaHospital />
            <span>View Requests</span>
          </button>
        </div>

        {/* Blood Request Form */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8 animate-fade-in-up">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Create Blood Donation Request
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Blood Group Required
                  </label>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  >
                    <option value="">Select Blood Group</option>
                    {bloodGroups.map(group => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Units Required
                  </label>
                  <input
                    type="number"
                    name="units"
                    min="1"
                    max="10"
                    value={formData.units}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Urgency Level
                  </label>
                  <select
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="emergency">Emergency</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Required Date
                  </label>
                  <input
                    type="date"
                    name="requiredDate"
                    value={formData.requiredDate}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Hospital Name
                  </label>
                  <input
                    type="text"
                    name="hospital"
                    value={formData.hospital}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Enter hospital name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Enter city"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Contact Person
                  </label>
                  <input
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Enter contact person name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Enter contact phone"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Reason for Blood Requirement
                </label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  className="input-field h-24 resize-none"
                  placeholder="Please describe the reason for blood requirement..."
                  required
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="spinner mr-2"></div>
                      Creating Request...
                    </div>
                  ) : (
                    'Create Request'
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Blood Requests List */}
        {!showForm && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
              Blood Donation Requests
            </h2>
            
            {requests.length === 0 ? (
              <div className="text-center py-12">
                <FaTint className="text-gray-400 text-6xl mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No blood requests found
                </h3>
                <p className="text-gray-500">
                  Be the first to create a blood donation request in your area.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {requests.map((request) => (
                  <div key={request._id} className="bg-white rounded-xl shadow-lg p-6 card-hover">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getUrgencyColor(request.urgency)}`}>
                          {request.urgency.toUpperCase()}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(request.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <FaTint className="text-red-500" />
                        <span className="font-semibold text-lg">{request.bloodGroup}</span>
                        <span className="text-gray-600">• {request.units} units</span>
                      </div>

                      <div className="flex items-center space-x-2 text-gray-600">
                        <FaHospital />
                        <span>{request.hospital}</span>
                      </div>

                      <div className="flex items-center space-x-2 text-gray-600">
                        <FaMapMarkerAlt />
                        <span>{request.city}</span>
                      </div>

                      <div className="flex items-center space-x-2 text-gray-600">
                        <FaCalendar />
                        <span>{new Date(request.requiredDate).toLocaleDateString()}</span>
                      </div>

                      <div className="flex items-center space-x-2 text-gray-600">
                        <FaUser />
                        <span>{request.contactPerson}</span>
                      </div>

                      <div className="flex items-center space-x-2 text-gray-600">
                        <FaPhone />
                        <span>{request.contactPhone}</span>
                      </div>

                      <p className="text-gray-700 text-sm mt-3">
                        {request.reason}
                      </p>
                    </div>

                    {user?.isBloodDonor && user?.bloodGroup === request.bloodGroup && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleResponse(request._id, 'accept')}
                            className="btn-success flex-1 text-sm py-2"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleResponse(request._id, 'reject')}
                            className="btn-danger flex-1 text-sm py-2"
                          >
                            Decline
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BloodDonation;