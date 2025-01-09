import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useStore } from "../store/contextStore";

const UpdateProfileModal = ({ modelname, modelphone, modelimage, fuctionCall }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    const { backendHostLink } = useStore();

    const toggleModal = () => {
        setIsOpen(!isOpen);
        if (!isOpen) resetFields();
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("phone", phone);
            if (image) {
                formData.append("image", image);
            }

            const response = await fetch(
                `${backendHostLink}/profile/updateprofile/${localStorage.getItem("userId")}`,
                {
                    method: "PATCH",
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: formData,
                }
            );

            const data = await response.json();
            if (response.ok) {
                toggleModal();
                fuctionCall();
                toast.success("Profile Updated Successfully");
            } else {
                toast.error(data.message || "Failed to update profile");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("An error occurred while updating your profile.");
        }
    };

    const resetFields = () => {
        setImage(null);
        setPreview(null);
        setName("");
        setPhone("");
    };

    useEffect(() => {
        if (isOpen) {
            setName(modelname || "");
            setPhone(modelphone || "");
            setImage(modelimage || "");
            setPreview(modelimage || null);
        }
    }, [isOpen, modelname, modelphone]);

    console.log(image)

    return (
        <div className="flex flex-col items-center justify-center ">
            {/* Modal Toggle Button */}

            <div onClick={toggleModal} className='absolute top-3 right-3 bg-slate-500 p-2 rounded-md cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(255,255,255,1)"><path d="M6.41421 15.89L16.5563 5.74785L15.1421 4.33363L5 14.4758V15.89H6.41421ZM7.24264 17.89H3V13.6473L14.435 2.21231C14.8256 1.82179 15.4587 1.82179 15.8492 2.21231L18.6777 5.04074C19.0682 5.43126 19.0682 6.06443 18.6777 6.45495L7.24264 17.89ZM3 19.89H21V21.89H3V19.89Z"></path></svg>
            </div>

            {/* Modal */}
            {isOpen && (
                <>
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40"
                        onClick={toggleModal}
                    ></div>

                    {/* Modal Content */}
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="relative bg-white dark:bg-slate-800 rounded-lg shadow-lg w-full max-w-md p-6">
                            {/* Modal Header */}
                            <div className="flex justify-between items-center border-b pb-3 mb-4">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Update Your Profile
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
                                {/* Image Upload with Preview */}
                                <div>
                                    <div className="flex justify-center items-center gap-4 flex-col sm:flex-row w-full">
                                        {preview && (
                                            <img
                                                src={preview}
                                                alt="Preview"
                                                className="mt-4 w-32 h-32 object-cover rounded-full border"
                                            />
                                        )}
                                    </div>
                                    <label
                                        htmlFor="imageUpload"
                                        className="block text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Upload Profile Picture
                                    </label>
                                    <input
                                        type="file"
                                        id="imageUpload"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="mt-1 block w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-600 p-3 rounded-lg cursor-pointer dark:text-white"
                                    />
                                </div>

                                {/* Name Input */}
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter your name"
                                        className="mt-1 block w-full p-2.5 bg-gray-50 dark:bg-gray-600 rounded-lg text-gray-900 dark:text-white"
                                    />
                                </div>

                                {/* Phone Number Input */}
                                <div>
                                    <label
                                        htmlFor="phone"
                                        className="block text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="Enter your phone number"
                                        className="mt-1 block w-full p-2.5 bg-gray-50 dark:bg-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"

                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full py-2.5 bg-blue-700 text-white rounded-lg hover:bg-blue-800 "
                                >
                                    Save Changes
                                </button>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default UpdateProfileModal;