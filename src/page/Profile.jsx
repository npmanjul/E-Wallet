import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import UpdatePinModal from "../components/Updatepinmodal";
import UpdateProfileModal from "../components/Updateprofilemodel";
import { useStore } from "../store/contextStore";
import Loader from "../components/Loader";

const Profile = () => {
  const [profile, setProfile] = useState([]);
  const { backendHostLink } = useStore();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);

  const getProfile = async () => {
    try {
      const response = await fetch(
        `${backendHostLink}/profile/getprofile/${localStorage.getItem(
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
      if (data.profile) {
        setTimeout(() => setLoader(false), 1000);
        setProfile(data.profile);
      } else {
        setLoader(true);
      }
      if (response.status === 401) {
        const theme = localStorage.getItem("theme");
        localStorage.clear();
        if (theme !== null) {
          localStorage.setItem("theme", theme);
        }
        navigate("/login");
      }
    } catch (error) {
      toast.error("Error Occured");
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <div className="h-screen w-screen bg-white dark:bg-black flex justify-center items-center flex-col gap-5">
        <h1 className="dark:text-white text-black text-center text-5xl font-bold mb-6">
          Profile
        </h1>
        <div className="dark:bg-slate-800 bg-slate-200 sm:p-9 p-4 flex justify-start items-start rounded-lg flex-col gap-4 sm:w-[500px] w-auto m-2">
          {loader ? (
            <div className="flex justify-center items-center w-full min-h-[200px]">
              <Loader
                height={"h-8"}
                width={"w-8"}
                color={"text-white"}
                bgColor={"fill-blue-500 dark:fill-yellow-500"}
              />
            </div>
          ) : (
            <>
              <div className="flex justify-center items-center flex-col gap-5 w-full">
                <div className="flex sm:justify-start justify-center items-center gap-5 w-full dark:bg-slate-700 bg-slate-300 p-4 rounded-lg flex-col sm:flex-row relative">
                  <UpdateProfileModal
                    modelname={profile.name}
                    modelphone={profile.phone}
                    modelimage={profile.image}
                    fuctionCall={getProfile}
                  />
                  <img
                    src={profile.image ? profile.image : ""}
                    alt="profile"
                    className="w-[70px] h-[70px] rounded-full"
                  />
                  <div className="flex flex-col justify-center sm:items-start items-center">
                    <span className="dark:text-white text-black text-center text-xl font-bold">
                      {profile.name ? profile.name : ""}
                    </span>
                    <span className="dark:text-gray-300 text-gray-700 text-center text-md font-bold">
                      {profile._id ? profile._id : ""}
                    </span>
                  </div>
                </div>
                <div className="flex justify-center items-start gap-1 flex-col dark:bg-slate-700 bg-slate-300 dark:text-white w-full p-4 rounded-lg font-bold">
                  <div>
                    Email :{" "}
                    <span className="dark:text-blue-100 text-gray-700">
                      {profile.email ? profile.email : ""}
                    </span>
                  </div>
                  <div>
                    Phone :{" "}
                    <span className="dark:text-blue-100 text-gray-700">
                      {profile.phone ? profile.phone : ""}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center w-full sm:flex-nowrap flex-wrap gap-3">
                <Link to="/get-qr">
                  <div className="dark:bg-slate-900 bg-slate-700 flex justify-center items-center gap-2 rounded-md py-2  sm:px-4 px-7 w-full ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 "
                      viewBox="0 0 24 24"
                      width="96"
                      height="96"
                      fill="rgba(255,255,255,1)"
                    >
                      <path d="M16 17V16H13V13H16V15H18V17H17V19H15V21H13V18H15V17H16ZM21 21H17V19H19V17H21V21ZM3 3H11V11H3V3ZM5 5V9H9V5H5ZM13 3H21V11H13V3ZM15 5V9H19V5H15ZM3 13H11V21H3V13ZM5 15V19H9V15H5ZM18 13H21V15H18V13ZM6 6H8V8H6V6ZM6 16H8V18H6V16ZM16 6H18V8H16V6Z"></path>
                    </svg>
                    <span className="text-white font-bold text-[17px]">
                      Get QR
                    </span>
                  </div>
                </Link>
                <Link to="/history">
                  <div className="dark:bg-slate-900 bg-slate-700 flex justify-center items-center gap-2 rounded-md py-2  sm:px-4 px-7 w-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 "
                      viewBox="0 0 24 24"
                      width="96"
                      height="96"
                      fill="rgba(255,255,255,1)"
                    >
                      <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12H4C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C9.25022 4 6.82447 5.38734 5.38451 7.50024L8 7.5V9.5H2V3.5H4L3.99989 5.99918C5.82434 3.57075 8.72873 2 12 2ZM13 7L12.9998 11.585L16.2426 14.8284L14.8284 16.2426L10.9998 12.413L11 7H13Z"></path>
                    </svg>
                    <span className="text-white font-bold text-[17px]">
                      History
                    </span>
                  </div>
                </Link>
                <UpdatePinModal />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
