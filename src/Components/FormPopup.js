import React, { useEffect, useState } from "react";

import { ethers } from "ethers";
import { lotteryaddress, lotteryabi } from "./constants";

export const FormPopup = ({ onClose, onSubmit }) => {
  const [lotteryamount, setlotteryamount] = useState(0);
  const [price, setPrice] = useState(0);
  const [currenttime, setcurrenttime] = useState(0);
  const [lotterystartime, setlotterystarttime] = useState(0);
  const [lotteryendtime, setlotteryendtime] = useState(0);

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
        const data = await contract.getticketprice();
        const totalprice = ethers.utils.formatEther(data) * lotteryamount;
        setPrice(totalprice);
        const start = await contract.getstarttime();
        const end = await contract.getendtime();
        setlotterystarttime(start.toString());
        setlotteryendtime(end.toString());
        const blockNumber = await provider.getBlockNumber();
        const block = await provider.getBlock(blockNumber);
        const timestamp = block.timestamp;
        setcurrenttime(timestamp);

        // console.log(contract);
      } else {
        throw new Error("Please Connect Wallet");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          lotteryaddress,
          lotteryabi,
          signer
        );
        if (currenttime > lotterystartime && currenttime < lotteryendtime) {
          const limit = await contract.getmaxamountofticket();

          const tickerPrice = await contract.getticketprice();
          const updatedPrice =
            ethers.utils.formatEther(tickerPrice.toString()) * lotteryamount;

          const data = await contract.getTickets(lotteryamount, {
            value: ethers.utils.parseEther(updatedPrice.toString()),
          });
          await data.wait(1);
          alert(`You bought ${limit} tickets`);
        } else {
          alert("Lottery is not active");
        }
      } else {
        throw new Error("Please Connect Wallet");
      }
    } catch (err) {
      console.log(err);
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
  };

  useEffect(() => {
    fetchdata();
    // Update the price lotteryamount whenever the amount of tickets (lotteryamount) changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lotteryamount]);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-600 bg-opacity-0">
      <div className="max-w-md w-full p-6 duration-300 bg-gradient-to-b bg-gray-600 rounded-lg shadow-2xl bg-opacity-80">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              className="block text-black bg-gradient-to-r from-blue-500 to-blue-700 text-center text-sm font-bold mb-2 py-2 rounded-md"
              htmlFor="name"
            >
              Amount of Tickets
            </label>
            <input
              className="shadow text-center appearance-none border rounded w-full py-2 px-3 text-black bg-white leading-tight focus:outline-none focus:shadow-outline resize-both overflow-auto"
              type="number" // Use type="number" to accept only numeric input
              min="0" // Set a minimum lotteryamount (optional, use any minimum you desire)
              step="1" // Set step="1" to allow only whole numbers (integer lotteryamounts)
              onChange={(e) => setlotteryamount(e.target.value)}
              required
            />
          </div>
          <div className="mb-6 flex justify-center items-center">
            <label
              className="shadow appearance-none border text-center rounded w-full py-2 px-3 text-black bg-white leading-tight focus:outline-none focus:shadow-outline resize-both overflow-auto"
              htmlFor="name"
            >
              <span className="text-blue-800 font-bold">Price:</span> {price}{" "}
              <span className="text-blue-800 font-bold">ETH</span>
            </label>
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
