import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const currencySymbol = "$";
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [userData, setUserData] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getDoctorsData = async () => {
    if (!backendUrl) {
      console.error("Backend URL is missing.");
      return;
    }

    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/list`);
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
      toast.error(error.response?.data?.message || "Failed to fetch doctors.");
    }
  };

  const loadUserProfileData = async () => {
    if (!token) return;

    try {
      setIsLoading(true);
      const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, { 
        headers: { token } 
      });

      if (data.success) {
        setUserData(data.userData);
        setUser(data.userData);
      } else {
        toast.error(data.message);
        // If token is invalid, clear it
        if (data.message.includes('invalid') || data.message.includes('expired')) {
          localStorage.removeItem("token");
          setToken(null);
          setUserData(null);
          setUser(null);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      // Clear token on error
      localStorage.removeItem("token");
      setToken(null);
      setUserData(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUserData(null);
    setUser(null);
    toast.success("Logged out successfully");
  };

  useEffect(() => {
    getDoctorsData();
  }, [backendUrl]);

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(null);
      setUser(null);
    }
  }, [token]);

  const value = {
    doctors, 
    getDoctorsData,
    currencySymbol,
    token,
    setToken,
    backendUrl, 
    loadUserProfileData,
    userData,
    setUserData,
    user,
    setUser,
    isLoading,
    logout
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
 