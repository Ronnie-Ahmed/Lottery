import React, { useEffect, useState } from "react";

import { ethers } from "ethers";
import { lotteryaddress, lotteryabi, lotterywalletaddress } from "./constants";
import { useAddress } from "@thirdweb-dev/react";

export const ChangeMax = ({ onClose, onSubmit }) => {
  const address = useAddress();
  const [currentprice, setcurrentprice] = useState(0);
  const [newPrice, setnewPrice] = useState("");
  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    // Use a regular expression to check for valid positive floating or integer value
    const isValidInput = /^(\d*\.?\d*)$/.test(inputValue);

    // Update the state only if the input value is valid or if it's an empty string (for clearing the input)
    if (isValidInput || inputValue === "") {
      setnewPrice(inputValue);
    }
  };

  const fetchdata = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          lotteryaddress,
          lotteryabi,
          signer
        );
        const data = await contract.getmaxamountofticket();
        setcurrentprice(data.toString());
      } else {
        throw new Error("Please Connect Wallet");
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchdata();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (address === lotterywalletaddress) {
      try {
        if (window.ethereum) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            lotteryaddress,
            lotteryabi,
            signer
          );
          const tx = await contract.changemaxamountofticket(newPrice);
          await tx.wait();
          alert("Changed Successfully");
        }
      } catch (err) {
        console.log(err);
        if (err.code === "ACTION_REJECTED") {
          alert("Transaction Rejected");
        } else if (err.reason === "execution reverted") {
          alert("Execution Reverted");
        } else if (
          err.message ===
          "MetaMask Tx Signature: User denied transaction signature."
        ) {
          alert("Transaction Rejected");
        }
      }
    } else {
      alert("You are not the owner of the contract");
    }
  };
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-600 bg-opacity-0">
      <div className="max-w-md w-full p-6 duration-300 bg-gradient-to-b bg-gray-600 rounded-lg shadow-2xl bg-opacity-80">
        <form onSubmit={handleSubmit}>
          <div className="mb-6 flex justify-center items-center">
            <label
              className="shadow appearance-none border text-center rounded w-full py-2 px-3 text-black bg-white leading-tight focus:outline-none focus:shadow-outline resize-both overflow-auto"
              htmlFor="name"
            >
              <span className="text-blue-800 font-bold">
                Max Amount of Tickets user can hold :
              </span>{" "}
              {currentprice}{" "}
              <span className="text-blue-800 font-bold">Tickets</span>
            </label>
          </div>
          <div className="mb-6">
            <label
              className="block text-black bg-gradient-to-r from-blue-500 to-blue-700 text-center text-sm font-bold mb-2 py-2 rounded-md"
              htmlFor="name"
            >
              Change
            </label>
            <input
              className="shadow text-center appearance-none border rounded w-full py-2 px-3 text-black bg-white leading-tight focus:outline-none focus:shadow-outline resize-both overflow-auto"
              type="text" // Use type="text" to accept both integer and decimal values
              onChange={handleInputChange}
              value={newPrice}
              required
            />
          </div>

          <div className="flex justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-full mr-4 transform hover:scale-110 transition-all duration-300"
              type="submit"
            >
              Proceed
            </button>

            <button
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-full transform hover:scale-110 transition-all duration-300"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
