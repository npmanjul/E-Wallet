import React from "react";
import QRScanner from "../components/QRScanner";

const Scanqr = () => {
  return (
    <div className="h-screen w-screen dark:bg-black bg-white flex justify-center items-center pt-9">
      <QRScanner />
    </div>
  );
};

export default Scanqr;
