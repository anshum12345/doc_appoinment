import { createContext, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
export const AdminContext = createContext();

const AdminContextProvider = (props) => {

  const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '');

 const [doctors, setDoctors] = useState([]);

 const backendUrl = import.meta.env.VITE_BACKEND_URL;
 console.log(backendUrl);  // This should log 'http://localhost:4000'


  const getAllDoctors = async () => {
    try{
     const {data} = await axios.post(backendUrl + '/api/admin/all-doctors', {}, {headers: {aToken}})
      if(data.success){
        setDoctors(data.doctors)
        console.log(data.doctors)
      }
      else{
        toast.error(data.message);
      }
    }
    catch(error){
      toast.error(error.message);
    }
  }


  // for change availability

  // for change availability

  const changeAvailablity = async (docId) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/admin/change-availability',  // 🔴 FIXED ENDPOINT
        { docId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  

  const value = {
    aToken, // Corrected the typo here
    setAToken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvailablity
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children} {/* Destructured children for clarity */}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
