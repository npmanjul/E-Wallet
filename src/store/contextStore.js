import { createContext, useContext, useEffect, useState } from "react";

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [scanResult, setScanResult] = useState(null);

  // const backendHostLink = "http://localhost:8000/api/v1";
  const backendHostLink = "https://e-wallet-backend-gold.vercel.app/api/v1";

  return (
    <StoreContext.Provider
      value={{
        setScanResult,
        scanResult,
        backendHostLink,
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
