import { createContext, useState } from "react";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '');

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const value = {
    aToken, // Corrected the typo here
    setAToken,
    backendUrl,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children} {/* Destructured children for clarity */}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
