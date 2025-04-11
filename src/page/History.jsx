import React, { useEffect, useState } from "react";
import Moneycredit from "../components/Moneycredit";
import Moneydebit from "../components/Moneydebit";
import { useStore } from "../store/contextStore";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const History = () => {
  const [transactionHistory, setTransactionHistory] = useState([]);
  const { backendHostLink } = useStore();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const [msg, setMsg] = useState("");

  const getTransactionHistory = async () => {
    const response = await fetch(
      `${backendHostLink}/transactionHistory/${localStorage.getItem("userId")}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = await response.json();
    if (data.transactions && data.transactions.length > 0) {
      setTransactionHistory(data.transactions);
      setLoader(false);
      //   setTimeout(() => setLoader(false), 2000);
    } else {
      if (data.transactions == null) {
        setMsg("No History Found");
      } else {
        setLoader(true);
      }
    }

    if (response.status === 401) {
      const theme = localStorage.getItem("theme");
      localStorage.clear();
      if (theme !== null) {
        localStorage.setItem("theme", theme);
      }
      navigate("/login");
    }
  };

  useEffect(() => {
    getTransactionHistory();
  }, []);
  return (
    <>
      <div className="dark:bg-black bg-white h-[100vh] w-screen flex justify-start items-center flex-col gap-4 ">
        <h1 className="dark:text-white text-blacktext-center text-5xl font-bold mb-6 mt-24">
          History
        </h1>

        {loader ? (
          <>
            {msg ? (
              <div className="dark:text-white text-black">{msg}</div>
            ) : (
              <>
                <div
                  role="status"
                  className="w-full flex justify-center items-center pt-4 "
                >
                  <Loader
                    height={"h-11"}
                    width={"w-11"}
                    color={"text-white"}
                    bgColor={"fill-blue-500 dark:fill-yellow-500"}
                  />
                  <span class="sr-only">Loading...</span>
                </div>
                <div className="dark:text-white text-black">
                  Loading History…
                </div>
              </>
            )}
          </>
        ) : (
          <div className="flex justify-start items-center gap-4 h-auto w-full flex-col mb-7 px-2 overflow-y-auto">
            {transactionHistory &&
              transactionHistory.map((transaction, index) => {
                if (transaction.to) {
                  return (
                    <Moneycredit
                      key={index}
                      id={transaction.transactionId}
                      name={transaction.to}
                      amount={transaction.amount}
                      timestamp={transaction.timestamp}
                    />
                  );
                } else if (transaction.from) {
                  return (
                    <Moneydebit
                      key={index}
                      id={transaction.transactionId}
                      name={transaction.from}
                      amount={transaction.amount}
                      timestamp={transaction.timestamp}
                    />
                  );
                }
              })}
          </div>
        )}
      </div>
    </>
  );
};

export default History;
