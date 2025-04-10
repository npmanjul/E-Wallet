import { createContext, useContext, useEffect, useState } from "react";

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [scanResult, setScanResult] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(false);

  // const backendHostLink = "http://localhost:8000/api/v1";
  const backendHostLink = "https://e-wallet-backend-gold.vercel.app/api/v1";

  const checkPhoneNumber = async () => {
    try {
      const response = await fetch(
        `${backendHostLink}/profile/checkphone/${localStorage.getItem(
          "userId"
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        setPhoneNumber(data.isPhoneNumber);
        console.log(data);
      } else {
        setPhoneNumber(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StoreContext.Provider
      value={{
        setScanResult,
        scanResult,
        backendHostLink,
        checkPhoneNumber,
        phoneNumber,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};
