import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Getqr = () => {
  const [accountQR, setAccountQR] = useState("");
  const navigate = useNavigate();

  const generateQR = async () => {
    const getQR = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${localStorage.getItem(
      "userId"
    )}`;

    setTimeout(() => setAccountQR(getQR), 1000);
  };

  const downloadQR = () => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = accountQR;

    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(image, 0, 0);

      const jpegDataUrl = canvas.toDataURL("image/jpeg", 1.0);

      const link = document.createElement("a");
      link.href = jpegDataUrl;
      link.download = `${localStorage.getItem("name")}QR_${localStorage.getItem(
        "userId"
      )}.jpg`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  };

  useEffect(() => {
    generateQR();
    if (!localStorage.getItem("userId")) {
      const theme = localStorage.getItem("theme");
      localStorage.clear();
      if (theme !== null) {
        localStorage.setItem("theme", theme);
      }
      navigate("/login");
    }
  }, []);

  return (
    <>
      <div className="h-screen w-screen bg-white dark:bg-black flex justify-center items-center flex-col gap-5">
        <div className="flex flex-col items-center justify-center">
          <h1 className="dark:text-white text-3xl font-bold">Get QR</h1>
          <p className="dark:text-white text-black text-[16px] sm:text-xl">
            Scan the QR code to get your wallet address
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-6 mt-7">
          <div className="border-2 border-gray-600 bg-white dark:bg-black rounded-xl w-[300px] h-[300px] flex justify-center items-center">
            {accountQR ? (
              <img
                src={accountQR}
                alt="qr"
                className="w-full h-full p-3 pointer-events-none"
              />
            ) : (
              <Loader />
            )}
          </div>

          <button
            className="bg-blue-500 dark:bg-yellow-600 text-white rounded-lg p-2 w-full font-semibold text-[17px]"
            onClick={downloadQR}
          >
            Download
          </button>
        </div>
      </div>
    </>
  );
};

export default Getqr;
