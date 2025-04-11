import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useStore } from "../store/contextStore";
import Loader from "./Loader";

const PinVerificationModal = ({ functionCall }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pin, setPin] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);
  const [loader, setLoader] = useState(false);

  const { backendHostLink } = useStore();

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setPin(Array(6).fill("")); // Reset PIN inputs when modal closes
  };

  const handleInput = (value, index) => {
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      if (pin[index] === "" && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text").slice(0, 6);

    if (/^\d{6}$/.test(pastedText)) {
      const digits = pastedText.split("");
      setPin(digits);
      digits.forEach((digit, idx) => {
        if (inputRefs.current[idx]) {
          inputRefs.current[idx].value = digit;
        }
      });
      inputRefs.current[5].focus(); // Focus on the last input
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pinCode = pin.join("");
    setLoader(true);
    try {
      const response = await fetch(`${backendHostLink}/auth/verifypin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          userId: localStorage.getItem("userId"),
          pin: pinCode,
        }),
      });

      if (response.ok) {
        functionCall();
        closeModal();
      } else {
        toast.error("Invalid Pin , Try Again !!!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div>
      {/* Trigger Button */}
      <button
        onClick={openModal}
        className="px-4 py-2 bg-green-500 text-white rounded-lg h-[50px] hover:bg-green-600 w-full"
      >
        Send Money
      </button>

      {/* Modal */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={closeModal}
          ></div>

          {/* Modal Content */}
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full relative">
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 text-gray-400  hover:text-gray-600 dark:text-gray-300 "
              >
                ✕
              </button>

              {/* Modal Content */}
              <header className="text-center mb-6">
                <h2 className="text-xl font-bold dark:text-white">
                  Pin Verification
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Enter the 6-digit pin of your account.
                </p>
              </header>
              <form onSubmit={handleSubmit}>
                <div
                  className="flex justify-center gap-3 mb-4"
                  onPaste={handlePaste}
                >
                  {pin.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleInput(e.target.value, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="w-12 h-12 text-center text-2xl font-bold text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-white border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                      ref={(el) => (inputRefs.current[index] = el)}
                    />
                  ))}
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-600 transition-colors disabled:bg-indigo-400 disabled:cursor-not-allowed"
                  disabled={loader}
                >
                  {loader ? (
                    <Loader
                      height={"h-6"}
                      width={"w-6"}
                      color={"text-white"}
                      bgColor={"fill-indigo-700"}
                    />
                  ) : (
                    "Verify"
                  )}
                </button>
              </form>
              <p className="text-center text-sm text-gray-500 mt-4">
                Didn’t you have a PIN for your account?{" "}
                <Link to="/profile">
                  <button
                    type="button"
                    onClick={() => console.log("Resend Code")}
                    className="text-indigo-500 hover:underline"
                  >
                    Make it
                  </button>
                </Link>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PinVerificationModal;
