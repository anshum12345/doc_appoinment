import { createContext, useEffect, useState } from "react";
 import axios from "axios";
 import { toast } from "react-toastify";
 
 export const AppContext = createContext();
 
 const AppContextProvider = ({ children }) => {
  //  const currencySymbol = "₹";
   const currencySymbol = "$";
   const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000"; // Fallback URL
   const [doctors, setDoctors] = useState([]);
   const [token, setToken] = useState(localStorage.getItem("token") || null);
   const[userData, setUserData] = useState(false);
 
 
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
 
     try {
 
       const { data } = await axios.get(backendUrl + '/api/user/get-profile', { headers: { token } })
 
       if (data.success) {
         setUserData(data.userData)
       } else {
         toast.error(data.message)
       }
 
     } catch (error) {
       console.log(error)
       toast.error(error.message)
     }
 
   }
 
 
   useEffect(() => {
     getDoctorsData();
   }, [backendUrl]); // Runs when backendUrl changes
 
   useEffect(() => {
     if (token) {
       loadUserProfileData()
     } else {
       setUserData(false)
     }
   }, [token])
 
 
   const value = {
     doctors, getDoctorsData,
     currencySymbol,
     token,
     setToken,
     backendUrl, 
     loadUserProfileData,
     userData,
     setUserData,
   };
 
   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
 };
 
 export default AppContextProvider;
 