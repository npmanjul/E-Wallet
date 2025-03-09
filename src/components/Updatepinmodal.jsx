import React, { useState } from "react";
import toast from "react-hot-toast";
import { useStore } from "../store/contextStore";

const UpdatePinModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState("");
  const { backendHostLink } = useStore();

  const toggleModal = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      resetFields();
    }
  };

  const handlePinChange = (e) => {
    setPin(e.target.value);
    setError("");
  };

  const handleConfirmPinChange = (e) => {
    setConfirmPin(e.target.value);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pin !== confirmPin) {
      setError("PINs do not match!");
      return;
    }

    try {
      const response = await fetch(`${backendHostLink}/auth/updatepin`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          userId: localStorage.getItem("userId"),
          pin,
        }),
      });

      if (response.ok) {
        setError("");
        toast.success("Pin Updated Successfully");
        toggleModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const resetFields = () => {
    setPin("");
    setConfirmPin("");
    setError("");
  };

  return (
    <div className="flex flex-col items-center justify-center sm:w-auto w-full">
      {/* Modal Toggle Button */}

      <div
        className="dark:bg-slate-900 bg-slate-700 flex justify-center items-center gap-2 rounded-md py-2  px-4 w-full sm:w-auto h-auto cursor-pointer"
        onClick={toggleModal}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 "
          viewBox="0 0 24 24"
          width="96"
          height="96"
          fill="rgba(255,255,255,1)"
        >
          <path d="M22 12C22 17.5228 17.5229 22 12 22C6.4772 22 2 17.5228 2 12C2 6.47715 6.4772 2 12 2V4C7.5817 4 4 7.58172 4 12C4 16.4183 7.5817 20 12 20C16.4183 20 20 16.4183 20 12C20 9.25022 18.6127 6.82447 16.4998 5.38451L16.5 8H14.5V2L20.5 2V4L18.0008 3.99989C20.4293 5.82434 22 8.72873 22 12Z"></path>
        </svg>
        <span className="text-white font-bold text-[17px]">Reset PIN</span>
      </div>

      {/* Modal */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-90 z-40"
            onClick={toggleModal}
          ></div>

          {/* Modal Content */}
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="relative bg-white dark:bg-slate-800 rounded-lg shadow-lg w-full max-w-md p-6">
              {/* Modal Header */}
              <div className="flex justify-between items-center border-b pb-3 mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Update Your PIN
                </h3>
                <button
                  onClick={toggleModal}
                  className="text-gray-400 dark:text-gray-200 hover:text-gray-900"
                >
                  ✕
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="pin"
                    className="block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Enter New PIN
                  </label>
                  <input
                    type="password"
                    id="pin"
                    value={pin}
                    onChange={handlePinChange}
                    maxLength="6"
                    className="mt-1 block w-full p-2.5 bg-gray-200 dark:bg-gray-700   rounded-lg text-gray-900 dark:text-white"
                    placeholder="Enter a 6-digit PIN"
                    autoComplete="off"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirm-pin"
                    className="block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm New PIN
                  </label>
                  <input
                    type="password"
                    id="confirm-pin"
                    value={confirmPin}
                    onChange={handleConfirmPinChange}
                    maxLength="6"
                    className="mt-1 block w-full p-2.5 bg-gray-200 dark:bg-gray-700   rounded-lg text-gray-900 dark:text-white"
                    placeholder="Re-enter the 6-digit PIN"
                    autoComplete="off"
                    required
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <p className="text-red-500 text-sm font-medium">{error}</p>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 bg-blue-700 text-white rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                  Update PIN
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UpdatePinModal;
