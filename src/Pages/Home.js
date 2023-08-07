import walletconnect from "../assets/walletconnect.png";
import luffy1 from "../assets/Luffy1.jpg";
import luffy3 from "../assets/Luffy3.jpg";
import luffy4 from "../assets/Luffy4.jpg";
import luffy5 from "../assets/Luffy5.jpg";
import luffy7 from "../assets/Luffy7.jpg";
import luffy8 from "../assets/Lufffy8.jpg";
import luffy9 from "../assets/Luffy9.jpg";
import { FormPopup } from "../Components/FormPopup";
import { ChangeTicketPrice } from "../Components/ChangeTicketPrice";
import { ChangeLotteryTimeLimit } from "../Components/ChangeLotteryTimeLimit";
import { ChangeMax } from "../Components/ChangeMax";
import { lotteryaddress, lotteryabi } from "../Components/constants";

import { ethers } from "ethers";

import { useConnectionStatus, useAddress } from "@thirdweb-dev/react";
import { useState, useEffect } from "react";

export const Home = () => {
  const address = useAddress();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [changeticketprice, setchangeticketprice] = useState(false);
  const [changeLotterytimelimit, setchangeLotterytimelimit] = useState(false);
  const [changemaxamount, setchangemaxamount] = useState(false);
  const [currenttime, setcurrenttime] = useState(0);
  const [lotterystartime, setlotterystarttime] = useState(0);
  const [lotteryendtime, setlotteryendtime] = useState(0);
  const [contractaddress, setcontractaddress] = useState("");
  const [winneraddress, setwinneraddress] = useState("");
  const [winnerticket, setwinnerticket] = useState(0);
  const [prizeamount, setprizeamount] = useState(0);
  const [ticketprice, setticketprice] = useState(0);
  const [contractowner, setowner] = useState("");
  const [ticketamount, getticketamount] = useState("");
  const [holdingticket, getholdingticket] = useState([]);
  const [lotterytime, getlotterytime] = useState(0);
  const [maxamount, getmaxamount] = useState(0);

  const truncateCaddress = `${winneraddress.slice(
    0,
    6
  )}...${winneraddress.slice(-6)}`;
  const truncateowner = `${contractowner.slice(0, 6)}...${contractowner.slice(
    -6
  )}`;

  const status = useConnectionStatus();

  const handleSubmitForm = (formData) => {
    if (currenttime > lotterystartime && currenttime < lotteryendtime) {
    } else {
      alert("Lottery is not active");
    }
    setIsFormOpen(false);
  };
  const handlechangeticketprice = (formData) => {
    setchangeticketprice(false);
  };
  const handlechangelotterytimelimit = (formData) => {
    setchangeLotterytimelimit(false);
  };
  const handlemaxamount = (formData) => {
    setchangemaxamount(false);
  };
  const createlottery = async () => {
    if (address === contractaddress) {
      try {
        if (window.ethereum) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            lotteryaddress,
            lotteryabi,
            signer
          );
          // const starttime = await contract.getstarttime();
          // const endtime = await contract.getendtime();

          const data = await contract.createLottery();
          await data.wait(1);
          alert("Lottery Created");
        } else {
          throw new Error("Please Connect Wallet");
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
      alert("Only Contract Owner can Call this function");
    }
  };
  const handlelotterywin = async () => {
    console.log(holdingticket);

    if (address === contractaddress) {
      try {
        if (window.ethereum) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            lotteryaddress,
            lotteryabi,
            signer
          );

          const amount = await contract.getprizeamount();

          const data = await contract.winner({
            value: amount.toString(),
          });
          await data.wait(1);
          alert("Winner Declared");
        } else {
          throw new Error("Please Connect Wallet");
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
      alert("Only Contract Owner can Call this function");
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
        const start = await contract.getstarttime();
        const end = await contract.getendtime();
        const addresss = await contract.owner();
        setowner(addresss);
        const wiaddress = await contract.getwinneraddress();
        setwinneraddress(wiaddress);
        const no = await contract.winnerticketNumber();
        setwinnerticket(no.toString());
        const pamount = await contract.getprizeamount();
        setprizeamount(ethers.utils.formatEther(pamount.toString()));
        const ticketp = await contract.getticketprice();

        setticketprice(ethers.utils.formatEther(ticketp.toString()));

        setcontractaddress(addresss);
        setlotterystarttime(start.toString());
        setlotteryendtime(end.toString());
        const blockNumber = await provider.getBlockNumber();
        const block = await provider.getBlock(blockNumber);
        const timestamp = block.timestamp;
        setcurrenttime(timestamp);
        const amount = await contract.amountofmyticket();
        getticketamount(amount.toString());
        const holding = await contract.myholdingtickets();
        getholdingticket([holding.toString()]);
        const time = await contract.getLotterytime();
        getlotterytime(time.toString());
        const max = await contract.getmaxamountofticket();
        getmaxamount(max.toString());
      } else {
        throw new Error("Please Connect Wallet");
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const fetchDataEveryThreeSeconds = async () => {
      fetchdata();
    };

    // Call the fetchDataEveryThreeSeconds function initially
    fetchDataEveryThreeSeconds();

    // Set up an interval to call the fetchDataEveryThreeSeconds function every 3 seconds
    const interval = setInterval(fetchDataEveryThreeSeconds, 3000);

    // Clean up the interval when the component unmounts to avoid memory leaks
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-column justify-center items-center ">
      {status === "undefined " ||
      status === "disconnected" ||
      status === "disconnected" ||
      status === "connecting" ? (
        <div className="flex items-center mt-32 justify-center m-5 mx-4 px-1 md:mx-16 rounded-lg transform transition-all duration-300 shadow-2xl shadow-cyan-400 hover:scale-105 mb-8">
          <div className="flex flex-col items-center m-5">
            <img
              src={walletconnect}
              alt="loading"
              className="w-60 h-60 object-cover rounded-full mb-4 transition-transform transform-gpu hover:scale-110"
            />
            <h1 className="text-3xl font-bold">Connect Wallet</h1>
            <h1 className="text-3xl font-bold">Use Mumbai Testnet</h1>
          </div>
        </div>
      ) : (
        <div className="flex flex-col mt-5 md:flex-row">
          <div className="md:w-2/3">
            <section
              className="flex flex-col  md:flex-row mt-20 m-5 items-center mx-4 px-1 md:mx-16 rounded-lg  md:p-8 mb-8 shadow-2xl shadow-cyan-800 cursor-pointer"
              onClick={createlottery}
            >
              <div className="md:w-1/3 mx-4">
                <img
                  src={luffy1}
                  alt="Clickable"
                  className="w-52 h-auto rounded-lg"
                />
              </div>
              <div className="md:w-2/3 mt-2 bg-gradient-to-br from-blue-200 to-blue-500 rounded-lg p-2">
                {/* Right side of the box with a different background */}
                <h2 className="text-2xl text-white font-semibold mb-4 text-center">
                  CREATE LOTTERY DRAW
                </h2>
                <p className="text-center">
                  Only Contract Owner can Call Create A new Lottery draw
                </p>
              </div>
            </section>
            <section
              className="flex flex-col md:flex-row m-5 items-center mx-4 px-1 md:mx-16 rounded-lg  md:p-8 mb-8 shadow-2xl shadow-cyan-800 cursor-pointer"
              onClick={() => setIsFormOpen(true)}
            >
              <div className="md:w-1/3 mx-4">
                {/* Left side of the box with the image */}
                <img
                  src={luffy3}
                  alt="Clickable"
                  className="w-52 h-auto rounded-lg"
                />
              </div>
              <div className="md:w-2/3 mt-2 bg-gradient-to-br from-blue-200 to-blue-500 rounded-lg p-2">
                {/* Right side of the box with a different background */}
                <h2 className="text-2xl  text-white font-semibold mb-4 text-center">
                  GET LOTTERY TICKETS
                </h2>
                <p className="text-center">
                  Buy Your Desired amount of lottery tickets
                </p>
              </div>
            </section>
            <section
              className="flex flex-col md:flex-row m-5 items-center mx-4 px-1 md:mx-16 rounded-lg  md:p-8 mb-8 shadow-2xl shadow-cyan-800 cursor-pointer"
              onClick={handlelotterywin}
            >
              <div className="md:w-1/3 mx-4">
                {/* Left side of the box with the image */}
                <img
                  src={luffy4}
                  alt="Clickable"
                  className="w-52 h-auto rounded-lg"
                />
              </div>
              <div className="md:w-2/3 mt-2 bg-gradient-to-br from-blue-200 to-blue-500 rounded-lg p-2">
                {/* Right side of the box with a different background */}
                <h2 className="text-2xl  text-white font-semibold mb-4 text-center">
                  GET WINNER
                </h2>
                <p className="text-center">Only Contract Owner can Call</p>
              </div>
            </section>
            <section
              className="flex flex-col md:flex-row m-5 items-center mx-4 px-1 md:mx-16 rounded-lg  md:p-8 mb-8 shadow-2xl shadow-cyan-800 cursor-pointer"
              onClick={() => setchangeticketprice(true)}
            >
              <div className="md:w-1/3 mx-4">
                {/* Left side of the box with the image */}
                <img
                  src={luffy7}
                  alt="Clickable"
                  className="w-52 h-auto rounded-lg"
                />
              </div>
              <div className="md:w-2/3 mt-2 bg-gradient-to-br from-blue-200 to-blue-500 rounded-lg p-2">
                {/* Right side of the box with a different background */}
                <h2 className="text-2xl  text-white font-semibold mb-4 text-center">
                  Change Ticket Price
                </h2>
                <p className="text-center">Only Contract Owner can Call</p>
              </div>
            </section>
            <section
              className="flex flex-col md:flex-row m-5 items-center mx-4 px-1 md:mx-16 rounded-lg  md:p-8 mb-8 shadow-2xl shadow-cyan-800 cursor-pointer"
              onClick={() => setchangeLotterytimelimit(true)}
            >
              <div className="md:w-1/3 mx-4">
                {/* Left side of the box with the image */}
                <img
                  src={luffy8}
                  alt="Clickable"
                  className="w-52 h-auto rounded-lg"
                />
              </div>
              <div className="md:w-2/3 mt-2 bg-gradient-to-br from-blue-200 to-blue-500 rounded-lg p-2">
                {/* Right side of the box with a different background */}
                <h2 className="text-2xl  text-white font-semibold mb-4 text-center">
                  Change Lottery Time Limit
                </h2>
                <p className="text-center">Only Contract Owner can Call</p>
              </div>
            </section>
            <section
              className="flex flex-col md:flex-row m-5 items-center mx-4 px-1 md:mx-16 rounded-lg  md:p-8 mb-8 shadow-2xl shadow-cyan-800 cursor-pointer"
              onClick={() => setchangemaxamount(true)}
            >
              <div className="md:w-1/3 mx-4">
                {/* Left side of the box with the image */}
                <img
                  src={luffy9}
                  alt="Clickable"
                  className="w-52 h-auto rounded-lg"
                />
              </div>
              <div className="md:w-2/3 mt-2 bg-gradient-to-br from-blue-200 to-blue-500 rounded-lg p-2">
                {/* Right side of the box with a different background */}
                <h2 className="text-2xl  text-white font-semibold mb-4 text-center">
                  Change max amount of Ticket User can hold
                </h2>
                <p className="text-center">Only Contract Owner can Call</p>
              </div>
            </section>

            {isFormOpen && (
              <FormPopup
                onClose={() => setIsFormOpen(false)}
                onClick={handleSubmitForm}
              />
            )}
            {changeticketprice && (
              <ChangeTicketPrice
                onClose={() => setchangeticketprice(false)}
                onClick={handlechangeticketprice}
              />
            )}
            {changeLotterytimelimit && (
              <ChangeLotteryTimeLimit
                onClose={() => setchangeLotterytimelimit(false)}
                onClick={handlechangelotterytimelimit}
              />
            )}
            {changemaxamount && (
              <ChangeMax
                onClose={() => setchangemaxamount(false)}
                onClick={handlemaxamount}
              />
            )}
          </div>
          <div
            className="md:w-1/3 mx-4 p-4 md:p-8 mt-16 bg-white rounded-lg shadow-md border border-gray-300 bg-cover bg-center"
            style={{
              backgroundImage: `url(${luffy5})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="relative z-10">
              <h2 className="text-2xl font-semibold mb-4 text-center text-black">
                Lottery
              </h2>
              <p className="font-bold text-black text-2xl bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-clip-text  rounded-lg optimicy-40 mb-4 backdrop-filter backdrop-blur-lg">
                Winner:{" "}
                <span className="text-red-950"> {truncateCaddress}</span>{" "}
              </p>
              <p className="font-bold text-black text-2xl bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-clip-text  rounded-lg optimicy-40 mb-4 backdrop-filter backdrop-blur-lg">
                Winning Ticket no:{" "}
                <span className="text-cyan-900"> {winnerticket}</span>
              </p>
              <p className="font-bold text-black text-2xl bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-clip-text  rounded-lg optimicy-40 mb-4 backdrop-filter backdrop-blur-lg">
                Total Prize:{" "}
                <span className="text-cyan-900"> {prizeamount}</span>{" "}
                <span className="text-blue-900">ETH</span>
              </p>
              <p className="font-bold text-black text-2xl bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-clip-text  rounded-lg optimicy-40 mb-4 backdrop-filter backdrop-blur-lg">
                Lottery Price:{" "}
                <span className="text-red-950"> {ticketprice}</span>{" "}
                <span className="text-blue-900">ETH</span>
              </p>
              <p className="font-bold text-black text-2xl bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-clip-text  rounded-lg optimicy-40 mb-4 backdrop-filter backdrop-blur-lg">
                Current Block:{" "}
                <span className="text-red-950"> {currenttime}</span>{" "}
              </p>
              <p className="font-bold text-black text-2xl bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-clip-text  rounded-lg optimicy-40 mb-4 backdrop-filter backdrop-blur-lg">
                Starting Block:{" "}
                <span className="text-cyan-700"> {lotterystartime}</span>{" "}
              </p>
              <p className="font-bold text-black text-2xl bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-clip-text  rounded-lg optimicy-40 mb-4 backdrop-filter backdrop-blur-lg">
                Ending Block:{" "}
                <span className="text-red-950"> {lotteryendtime}</span>{" "}
              </p>
              <p className="font-bold text-black text-2xl bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-clip-text  rounded-lg optimicy-40 mb-4 backdrop-filter backdrop-blur-lg">
                Owner: <span className="text-cyan-600"> {truncateowner}</span>{" "}
              </p>
              <p className="font-bold text-black text-2xl bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-clip-text  rounded-lg optimicy-40 mb-4 backdrop-filter backdrop-blur-lg">
                Amount Of My Tickets:{" "}
                <span className="text-cyan-600"> {ticketamount}</span>{" "}
              </p>
              <p className="font-bold text-black text-2xl bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-clip-text  rounded-lg optimicy-40 mb-4 backdrop-filter backdrop-blur-lg">
                Block limit:{" "}
                <span className="text-cyan-600"> {lotterytime}</span>{" "}
              </p>
              <p className="font-bold text-black text-2xl bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-clip-text  rounded-lg optimicy-40 mb-4 backdrop-filter backdrop-blur-lg">
                # Tickets user can hold :{" "}
                <span className="text-cyan-600"> {maxamount}</span>{" "}
              </p>
              <p className="font-bold text-black text-xl md:text-2xl lg:text-3xl xl:text-4xl bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-clip-text rounded-lg mb-4 backdrop-filter backdrop-blur-lg p-4 md:p-6 lg:p-8 xl:p-10 break-all">
                # Holding Tickets:{" "}
                <span className="text-cyan-600">{holdingticket}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
