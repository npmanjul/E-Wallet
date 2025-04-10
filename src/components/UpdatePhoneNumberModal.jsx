import React, { use, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useStore } from "../store/contextStore";

const UpdatePhoneNumberModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const { backendHostLink, phoneNumber } = useStore();

  const toggleModal = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      resetFields();
    }
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phone || phone.trim() === "") {
      setError("Phone number cannot be empty!");
      return;
    }

    try {
      const response = await fetch(
        `${backendHostLink}/profile/updatephone/${localStorage.getItem(
          "userId"
        )}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ phone }),
        }
      );

      const result = await response.json();
      if (response.status === 200) {
        setError("");
        toast.success(result.message);
        toggleModal();
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const resetFields = () => {
    setPhone("");
    setError("");
  };

  useEffect(() => {
    if (!phoneNumber) {
      const timer = setTimeout(() => {
        toggleModal();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [phoneNumber]);

  return (
    <div className="flex flex-col items-center justify-center sm:w-auto w-full">
      {/* <div
        className="dark:bg-slate-900 bg-slate-700 flex justify-center items-center gap-2 rounded-md py-2 px-4 w-full sm:w-auto h-auto cursor-pointer"
        onClick={toggleModal}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 24 24"
          width="96"
          height="96"
          fill="rgba(255,255,255,1)"
        >
          <path d="M22 12C22 17.5228 17.5229 22 12 22C6.4772 22 2 17.5228 2 12C2 6.47715 6.4772 2 12 2V4C7.5817 4 4 7.58172 4 12C4 16.4183 7.5817 20 12 20C16.4183 20 20 16.4183 20 12C20 9.25022 18.6127 6.82447 16.4998 5.38451L16.5 8H14.5V2L20.5 2V4L18.0008 3.99989C20.4293 5.82434 22 8.72873 22 12Z"></path>
        </svg>
        <span className="text-white font-bold text-[17px]">Update Phone</span>
      </div> */}

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-90 z-40"
            onClick={toggleModal}
          ></div>

          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="relative bg-white dark:bg-slate-800 rounded-lg shadow-lg w-full max-w-md p-6">
              <div className="flex justify-between items-center border-b pb-3 mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Add Your Phone Number
                </h3>
                <button
                  onClick={toggleModal}
                  className="text-gray-400 dark:text-gray-200 hover:text-gray-900"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="phone"
                    value={phone}
                    onChange={handlePhoneChange}
                    maxLength="15"
                    className="mt-1 block w-full p-2.5 bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white"
                    placeholder="Enter your new phone number"
                    autoComplete="off"
                    required
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-sm font-medium">{error}</p>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 bg-blue-700 text-white rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                  Update Phone Number
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UpdatePhoneNumberModal;
