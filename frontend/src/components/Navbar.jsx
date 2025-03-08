import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    setToken(false);
    localStorage.removeItem('token');
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-200 bg-white shadow-sm">
      {/* Logo */}
      <img
        onClick={() => navigate('/')}
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt="Logo"
      />

      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-center gap-8 font-medium">
        <NavLink to="/" className="hover:text-primary transition-colors duration-300">
          <li className="py-1 relative">
            HOME
            <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden nav-link-underline" />
          </li>
        </NavLink>

        <NavLink to="/doctors" className="hover:text-primary transition-colors duration-300">
          <li className="py-1 relative">
            ALL DOCTORS
            <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden nav-link-underline" />
          </li>
        </NavLink>

        <NavLink to="/about" className="hover:text-primary transition-colors duration-300">
          <li className="py-1 relative">
            ABOUT
            <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden nav-link-underline" />
          </li>
        </NavLink>

        <NavLink to="/contact" className="hover:text-primary transition-colors duration-300">
          <li className="py-1 relative">
            CONTACT
            <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden nav-link-underline" />
          </li>
        </NavLink>
      </ul>

      {/* User Actions */}
      <div className="flex items-center gap-4">
        {token && userData ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-8 h-8 rounded-full object-cover" src={userData.image} alt="User" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="Dropdown" />

            {/* Dropdown Menu */}
            <div className="absolute top-0 right-0 pt-10 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-white rounded-lg shadow-lg flex flex-col gap-3 p-4">
                <p
                  onClick={() => navigate('/my-profile')}
                  className="hover:text-primary cursor-pointer transition-colors duration-300"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate('/my-appointments')}
                  className="hover:text-primary cursor-pointer transition-colors duration-300"
                >
                  My Appointments
                </p>
                <p
                  onClick={logout}
                  className="hover:text-primary cursor-pointer transition-colors duration-300"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="bg-primary text-white px-6 py-2 rounded-full font-medium hidden md:block hover:bg-primary-dark transition-colors duration-300"
          >
            Create Account
          </button>
        )}

        {/* Mobile Menu Toggle */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden cursor-pointer"
          src={assets.menu_icon}
          alt="Menu"
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-20 bg-white transition-transform duration-300 ${
          showMenu ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        <div className="flex items-center justify-between px-5 py-6 border-b border-b-gray-200">
          <img className="w-36" src={assets.logo} alt="Logo" />
          <img
            className="w-7 cursor-pointer"
            onClick={() => setShowMenu(false)}
            src={assets.cross_icon}
            alt="Close"
          />
        </div>

        <ul className="flex flex-col items-center gap-4 mt-5 px-5 text-lg font-medium">
          <NavLink
            onClick={() => setShowMenu(false)}
            to="/"
            className="w-full text-center py-3 hover:bg-gray-100 rounded-lg transition-colors duration-300"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setShowMenu(false)}
            to="/doctors"
            className="w-full text-center py-3 hover:bg-gray-100 rounded-lg transition-colors duration-300"
          >
            ALL DOCTORS
          </NavLink>
          <NavLink
            onClick={() => setShowMenu(false)}
            to="/about"
            className="w-full text-center py-3 hover:bg-gray-100 rounded-lg transition-colors duration-300"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setShowMenu(false)}
            to="/contact"
            className="w-full text-center py-3 hover:bg-gray-100 rounded-lg transition-colors duration-300"
          >
            CONTACT
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;