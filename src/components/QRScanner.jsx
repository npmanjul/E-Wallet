import React, { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import { useStore } from "../store/contextStore.js";
import { useNavigate } from "react-router-dom";

const QRScanner = () => {
    const videoRef = useRef(null); // Reference to the video element
    const qrScannerRef = useRef(null); // Reference to the QR scanner instance
    const [error, setError] = useState(null); // Store any errors

    const { scanResult, setScanResult } = useStore(); // Store the scanned result

    const navigate = useNavigate();

    const startScanning = () => {
        if (videoRef.current) {
            // Initialize QR Scanner only if it hasn't been initialized
            if (!qrScannerRef.current) {
                qrScannerRef.current = new QrScanner(
                    videoRef.current,
                    (result) => {
                        console.log("QR Code Data:", result.data);
                        setScanResult(result.data);
                        navigate('/transfer-money')
                    },
                    {
                        onDecodeError: (decodeError) => setError(decodeError.message),
                        highlightScanRegion: true, // Optional: Highlight the scanned region
                        highlightCodeOutline: true, // Optional: Highlight the QR code outline
                    }
                );
            }

            // Start the QR Scanner
            qrScannerRef.current
                .start()
                .then(() => setError(null)) // Clear previous errors
                .catch((startError) => {
                    console.error("QR Scanner Error:", startError);
                    setError(startError.message);
                });
        }
    };

    useEffect(() => {
        // Cleanup when the component is unmounted
        return () => {
            if (qrScannerRef.current) {
                qrScannerRef.current.destroy();
                qrScannerRef.current = null;
            }
        };
    }, []);

    return (
        <div className="flex justify-center items-center flex-col gap-4" >
            <div className=" w-auto m-2 sm:w-[1000px] rounded-[17px] sm:border sm:border-black dark:sm:border-white  ">
                <video ref={videoRef} style={{ width: "100%" , borderRadius: "15px" ,border:"none" }} />
            </div>
            <button onClick={startScanning} className="bg-blue-500 text-white rounded-lg py-3 px-6 ">Click to Scan QR</button>
            {scanResult && <p>Scan Result: {scanResult}</p>}
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
        </div>
    );
};

export default QRScanner;