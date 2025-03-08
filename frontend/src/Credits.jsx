import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Credits = ({ userEmail }) => {
  const [credits, setCredits] = useState(0);

  useEffect(() => {
    fetchCredits();
  }, []);

  const fetchCredits = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/donate-blood`);
      const userDonation = res.data.find((donation) => donation.email === userEmail);
      if (userDonation) {
        setCredits(userDonation.credits);
      }
    } catch (error) {
      console.error('Error fetching credits:', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Blood Donation Credits</h2>
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <p className="text-lg">You have <span className="text-green-500 font-bold">{credits}</span> credits for donating blood.</p>
      </div>
    </div>
  );
};

export default Credits;
