import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/contextStore";
import Loader from "../components/Loader";

const Addmoney = () => {
  const [money, setMoney] = useState("");
  const [accountDetailsList, setAccountDetailsList] = useState([]);
  const { backendHostLink } = useStore();

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "money") {
      if (value <= 100000) {
        setMoney(value);
      } else {
        toast.error("Amount should be less than 100000");
      }
    }
  };

  const getAccountDetails = async () => {
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
      setAccountDetailsList(data.profile);
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

  const AddMoney = async () => {
    try {
      const response = await fetch(`${backendHostLink}/transaction/addAmount`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          userId: localStorage.getItem("userId"),
          amount: money,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setMoney("");
        navigate("/balance");
        toast.success("Money Added Successfully");
      }
    } catch (error) {
      toast.error("Error Occured");
    }
  };

  useState(() => {
    getAccountDetails();
  }, []);

  return (
    <>
      <div className="h-screen w-screen bg-white dark:bg-black flex justify-center items-center flex-col gap-5">
        <h1 className="dark:text-white text-black text-center text-5xl font-bold mb-6">
          Add Money
        </h1>

        {accountDetailsList.image ? (
          <div className="dark:text-white text-black text-center text-xl font-bold mt-4 flex justify-between items-center gap-3 dark:bg-slate-700 bg-slate-200 px-7 py-4 rounded-lg">
            <img
              src={accountDetailsList.image ? accountDetailsList.image : ""}
              alt="profile"
              className="w-[60px] h-[60px] rounded-full"
            />
            <div className="flex flex-col justify-center items-start">
              <span>
                {accountDetailsList.name ? accountDetailsList.name : ""}
              </span>
              <span className="text-[15px]">
                {accountDetailsList._id ? accountDetailsList._id : ""}
              </span>
            </div>
          </div>
        ) : (
          <Loader />
        )}

        <div className="flex justify-center items-center gap-4 flex-col">
          <div className="sm:w-auto flex justify-center items-center flex-col gap-4 w-full">
            <div className="flex justify-center items-center">
              {money.length > 0 ? (
                <div className="dark:text-white text-black text-center sm:text-[150px] text-[50px]">
                  ₹
                </div>
              ) : null}
              <input
                type="number"
                value={money}
                onChange={handleChange}
                style={{
                  width: `${Math.max(3, money.length + 1)}ch`, // Adjust width based on length
                }}
                className="focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none h-[250px]  text-center rounded-lg dark:text-white text-black border-0  bg-transparent sm:text-[150px] text-[50px]"
                placeholder="₹ 0"
                name="money"
              />
            </div>
            <button
              className="bg-green-500 text-white rounded-lg py-3 px-6  sm:w-[500px] w-full"
              onClick={AddMoney}
            >
              Add Money
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Addmoney;
