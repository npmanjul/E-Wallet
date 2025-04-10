import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useStore } from "../store/contextStore";
import UpdatePhoneNumberModal from "../components/UpdatePhoneNumberModal";

const navigationCard = [
  {
    title: "Scan QR Code",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="120"
        height="120"
        fill="rgba(255,255,255,1)"
        className="h-[120px] text-gray-800 dark:text-white"
      >
        <path d="M15 3H21V8H19V5H15V3ZM9 3V5H5V8H3V3H9ZM15 21V19H19V16H21V21H15ZM9 21H3V16H5V19H9V21ZM3 11H21V13H3V11Z"></path>
      </svg>
    ),
    path: "/scan-qr",
  },
  {
    title: "Add Money",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="120"
        height="120"
        fill="rgba(255,255,255,1)"
      >
        <path d="M11 11V7H13V11H17V13H13V17H11V13H7V11H11ZM12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"></path>
      </svg>
    ),
    path: "/add-money",
  },
  {
    title: "Transfer Money",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="120"
        height="120"
        fill="rgba(255,255,255,1)"
      >
        <path d="M19.3788 15.1057C20.9258 11.4421 19.5373 7.11431 16.0042 5.0745C13.4511 3.60046 10.4232 3.69365 8.03452 5.0556L7.04216 3.31879C10.028 1.61639 13.8128 1.4999 17.0042 3.34245C21.4949 5.93513 23.2139 11.4848 21.1217 16.112L22.4635 16.8867L18.2984 19.1008L18.1334 14.3867L19.3788 15.1057ZM4.62961 8.89968C3.08263 12.5633 4.47116 16.8911 8.00421 18.9309C10.5573 20.4049 13.5851 20.3118 15.9737 18.9499L16.9661 20.6867C13.9803 22.389 10.1956 22.5055 7.00421 20.663C2.51357 18.0703 0.794565 12.5206 2.88672 7.89342L1.54492 7.11873L5.70999 4.90463L5.87505 9.61873L4.62961 8.89968ZM13.4184 14.8311L10.59 12.0027L7.76157 14.8311L6.34736 13.4169L10.59 9.17428L13.4184 12.0027L16.2469 9.17428L17.6611 10.5885L13.4184 14.8311Z"></path>
      </svg>
    ),
    path: "/transfer-money",
  },
  {
    title: "History",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="120"
        height="120"
        fill="rgba(255,255,255,1)"
      >
        <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12H4C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C9.25022 4 6.82447 5.38734 5.38451 7.50024L8 7.5V9.5H2V3.5H4L3.99989 5.99918C5.82434 3.57075 8.72873 2 12 2ZM13 7L12.9998 11.585L16.2426 14.8284L14.8284 16.2426L10.9998 12.413L11 7H13Z"></path>
      </svg>
    ),
    path: "/history",
  },
  {
    title: "Get QR Code",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="120"
        height="120"
        fill="rgba(255,255,255,1)"
      >
        <path d="M16 17V16H13V13H16V15H18V17H17V19H15V21H13V18H15V17H16ZM21 21H17V19H19V17H21V21ZM3 3H11V11H3V3ZM5 5V9H9V5H5ZM13 3H21V11H13V3ZM15 5V9H19V5H15ZM3 13H11V21H3V13ZM5 15V19H9V15H5ZM18 13H21V15H18V13ZM6 6H8V8H6V6ZM6 16H8V18H6V16ZM16 6H18V8H16V6Z"></path>
      </svg>
    ),
    path: "/get-qr",
  },
  {
    title: "Balance",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="120"
        height="120"
        fill="rgba(255,255,255,1)"
      >
        <path d="M20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12ZM22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM13.5003 8C13.8278 8.43606 14.0625 8.94584 14.175 9.5H16V11H14.175C13.8275 12.7117 12.3142 14 10.5 14H10.3107L14.0303 17.7197L12.9697 18.7803L8 13.8107V12.5H10.5C11.4797 12.5 12.3131 11.8739 12.622 11H8V9.5H12.622C12.3131 8.62611 11.4797 8 10.5 8H8V6.5H16V8H13.5003Z"></path>
      </svg>
    ),
    path: "/balance",
  },
  {
    title: "Profile",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="120"
        height="120"
        fill="rgba(255,255,255,1)"
      >
        <path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13Z"></path>
      </svg>
    ),
    path: "/profile",
  },
  {
    title: "Notification",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="120"
        height="120"
        fill="rgba(255,255,255,1)"
      >
        <path d="M22 20H2V18H3V11.0314C3 6.04348 7.02944 2 12 2C16.9706 2 21 6.04348 21 11.0314V18H22V20ZM5 18H19V11.0314C19 7.14806 15.866 4 12 4C8.13401 4 5 7.14806 5 11.0314V18ZM9.5 21H14.5C14.5 22.3807 13.3807 23.5 12 23.5C10.6193 23.5 9.5 22.3807 9.5 21Z"></path>
      </svg>
    ),
    path: "/notification",
  },
];

const Home = () => {
  const { checkPhoneNumber } = useStore();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);

  let name;
  try {
    name = localStorage.getItem("name").split(" ")[0].toLowerCase();
  } catch (error) {
    name = "Guest";
  }

  useEffect(() => {
    if (!localStorage.getItem("name")) {
      const theme = localStorage.getItem("theme");
      localStorage.clear();
      if (theme !== null) {
        localStorage.setItem("theme", theme);
      }
      navigate("/login");
    }
    checkPhoneNumber();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-black gap-12 py-6 px-2">
      {loader ? (
        <>
          <div className="flex justify-center items-center gap-4 flex-col ">
            <h1 className="text-[2rem] sm:text-[4.5rem] font-bold text-center text-gray-800 dark:text-white pt-[80px] sm:pt-[0px]">
              Welcome,{" "}
              <span className=" text-blue-600 dark:text-yellow-400">
                {name} :)
              </span>
            </h1>
          </div>
          <div className="flex justify-center items-center max-w-[900px] flex-wrap gap-4 dark:text-white text-black">
            {navigationCard.map((item, index) => (
              <Link to={item.path} key={index}>
                <div className="w-[160px] sm:w-[170px] py-5 bg-gray-200 dark:bg-gray-800 rounded-xl flex justify-center items-center flex-col gap-3 hover:translate-y-[-5px] transition-transform duration-300">
                  <div className="w-[100px] h-[100px] flex justify-center items-center invert-[80%] dark:invert-0">
                    {item.icon}
                  </div>
                  <div className="text-center text-[18px] font-bold">
                    {item.title}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <Loader />
      )}
      <UpdatePhoneNumberModal />
    </div>
  );
};

export default Home;
