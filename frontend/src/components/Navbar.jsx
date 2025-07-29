import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { FaTint, FaCoins, FaUser, FaSignOutAlt, FaCalendar, FaCog } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const { token, userData, logout } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-200 bg-white shadow-sm sticky top-0 z-50">
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
          <li className="py-1 relative">HOME</li>
        </NavLink>

        <NavLink to="/doctors" className="hover:text-primary transition-colors duration-300">
          <li className="py-1 relative">ALL DOCTORS</li>
        </NavLink>

        <NavLink to="/blood-donation" className="hover:text-red-600 transition-colors duration-300">
          <li className="py-1 relative flex items-center gap-1">
            <FaTint className="text-red-500" />
            BLOOD DONATION
          </li>
        </NavLink>

        <NavLink to="/about" className="hover:text-primary transition-colors duration-300">
          <li className="py-1 relative">ABOUT</li>
        </NavLink>

        <NavLink to="/contact" className="hover:text-primary transition-colors duration-300">
          <li className="py-1 relative">CONTACT</li>
        </NavLink>
      </ul>

      {/* User Actions */}
      <div className="flex items-center gap-4">
        {token && userData ? (
          <div className="flex items-center gap-4">
            {/* Wallet Button */}
            <NavLink to="/wallet" className="hidden md:flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-4 py-2 rounded-full font-medium hover:shadow-lg transition-all duration-300">
              <FaCoins />
              <span>{userData.coins || 0}</span>
            </NavLink>

            {/* User Dropdown */}
            <div className="flex items-center gap-2 cursor-pointer group relative">
              <img className="w-8 h-8 rounded-full object-cover border-2 border-primary" src={userData.image} alt="User" />
              <img className="w-2.5" src={assets.dropdown_icon} alt="Dropdown" />

              {/* Dropdown Menu */}
              <div className="absolute top-0 right-0 pt-10 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
                <div className="min-w-56 bg-white rounded-xl shadow-2xl flex flex-col gap-1 p-4 border border-gray-100">
                  <div className="px-3 py-2 border-b border-gray-100 mb-2">
                    <p className="font-semibold text-gray-800">{userData.name}</p>
                    <p className="text-sm text-gray-500">{userData.email}</p>
                  </div>
                  
                  <NavLink
                    to="/my-profile"
                    className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors duration-300"
                  >
                    <FaUser className="text-primary" />
                    <span>My Profile</span>
                  </NavLink>
                  
                  <NavLink
                    to="/my-appointments"
                    className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors duration-300"
                  >
                    <FaCalendar className="text-primary" />
                    <span>My Appointments</span>
                  </NavLink>
                  
                  <NavLink
                    to="/wallet"
                    className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors duration-300 md:hidden"
                  >
                    <FaCoins className="text-yellow-500" />
                    <span>My Wallet</span>
                  </NavLink>
                  
                  <div className="border-t border-gray-100 mt-2 pt-2">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-3 py-2 hover:bg-red-50 rounded-lg transition-colors duration-300 w-full text-left"
                    >
                      <FaSignOutAlt className="text-red-500" />
                      <span className="text-red-600">Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="btn-primary hidden md:block"
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
        className={`fixed inset-0 z-50 bg-white transition-transform duration-300 ${
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

        <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
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
            to="/blood-donation"
            className="w-full text-center py-3 hover:bg-red-100 text-red-600 font-semibold rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
          >
            <FaTint />
            BLOOD DONATION
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

          {token && userData && (
            <>
              <NavLink
                onClick={() => setShowMenu(false)}
                to="/wallet"
                className="w-full text-center py-3 hover:bg-yellow-100 text-yellow-600 font-semibold rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <FaCoins />
                WALLET ({userData.coins || 0})
              </NavLink>
              <NavLink
                onClick={() => setShowMenu(false)}
                to="/my-profile"
                className="w-full text-center py-3 hover:bg-gray-100 rounded-lg transition-colors duration-300"
              >
                MY PROFILE
              </NavLink>
              <NavLink
                onClick={() => setShowMenu(false)}
                to="/my-appointments"
                className="w-full text-center py-3 hover:bg-gray-100 rounded-lg transition-colors duration-300"
              >
                MY APPOINTMENTS
              </NavLink>
              <button
                onClick={() => {
                  setShowMenu(false);
                  handleLogout();
                }}
                className="w-full text-center py-3 hover:bg-red-100 text-red-600 font-semibold rounded-lg transition-colors duration-300"
              >
                LOGOUT
              </button>
            </>
          )}

          {!token && (
            <button
              onClick={() => {
                setShowMenu(false);
                navigate('/login');
              }}
              className="w-full text-center py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors duration-300"
            >
              CREATE ACCOUNT
            </button>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
