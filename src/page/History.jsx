import React, { useEffect, useState } from "react";
import Moneycredit from "../components/Moneycredit";
import Moneydebit from "../components/Moneydebit";
import { useStore } from "../store/contextStore";
import { useNavigate } from "react-router-dom";

const History = () => {
  const [transactionHistory, setTransactionHistory] = useState([]);
  const { backendHostLink } = useStore();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);

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
            <div
              role="status"
              className="w-full flex justify-center items-center pt-4 "
            >
              <svg
                aria-hidden="true"
                class="w-11 h-11 text-gray-200 animate-spin  fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
            <div className="dark:text-white text-black">Loading History…</div>
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
