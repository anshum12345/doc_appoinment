import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const GoToTop = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    showButton && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-5 right-5 bg-blue-600 text-white p-3 rounded-full shadow-md hover:bg-blue-700 transition duration-300"
      >
        <FaArrowUp size={20} />
      </button>
    )
  );
};

export default GoToTop;
