import { createContext } from "react";
export const UserContext = createContext(null);
export const lotteryaddress = "0x4fC0ae08721110bA5b33B48829a081b205B89A40";
export const lotterywalletaddress =
  "0x6b4C988b9D993407D144F6dDcaa7D87c34F0d686";

export const lotteryabi = [
  {
    type: "constructor",
    name: "",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "error",
    name: "ExceededmaxamountofTicketPerson",
    inputs: [],
    outputs: [],
  },
  {
    type: "error",
    name: "NotEnoughMoneytoBuyTicket",
    inputs: [],
    outputs: [],
  },
  {
    type: "error",
    name: "NotEnoughTicket",
    inputs: [],
    outputs: [],
  },
  {
    type: "error",
    name: "NotInRightState",
    inputs: [],
    outputs: [],
  },
  {
    type: "event",
    name: "CreateLottery",
    inputs: [
      {
        type: "uint256",
        name: "startingtime",
        indexed: false,
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "endingtime",
        indexed: false,
        internalType: "uint256",
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: "event",
    name: "GetTicket",
    inputs: [
      {
        type: "uint256",
        name: "amount",
        indexed: false,
        internalType: "uint256",
      },
      {
        type: "address",
        name: "holder",
        indexed: true,
        internalType: "address",
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        type: "address",
        name: "previousOwner",
        indexed: true,
        internalType: "address",
      },
      {
        type: "address",
        name: "newOwner",
        indexed: true,
        internalType: "address",
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: "event",
    name: "winnerevent",
    inputs: [
      {
        type: "address",
        name: "winneraddress",
        indexed: true,
        internalType: "address",
      },
      {
        type: "uint256",
        name: "ticketnumber",
        indexed: false,
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "prizemoney",
        indexed: false,
        internalType: "uint256",
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: "function",
    name: "amountofmyticket",
    inputs: [],
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "changeLotterytime",
    inputs: [
      {
        type: "uint256",
        name: "_newblocktime",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "changemaxamountofticket",
    inputs: [
      {
        type: "uint256",
        name: "_newamount",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "changeticketprice",
    inputs: [
      {
        type: "uint256",
        name: "newprice",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "checkticketholder",
    inputs: [
      {
        type: "uint256",
        name: "ticketId",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        type: "address",
        name: "",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "createLottery",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getLotterytime",
    inputs: [],
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getMyTickets",
    inputs: [],
    outputs: [
      {
        type: "uint256[]",
        name: "",
        internalType: "uint256[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getTickets",
    inputs: [
      {
        type: "uint256",
        name: "amount",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "getcurrenttime",
    inputs: [],
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getendtime",
    inputs: [],
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getmaxamountofticket",
    inputs: [],
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getprizeamount",
    inputs: [],
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getstarttime",
    inputs: [],
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getticketprice",
    inputs: [],
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getwinneraddress",
    inputs: [],
    outputs: [
      {
        type: "address",
        name: "",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "myholdingtickets",
    inputs: [],
    outputs: [
      {
        type: "uint256[]",
        name: "",
        internalType: "uint256[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [
      {
        type: "address",
        name: "",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "renounceOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [
      {
        type: "address",
        name: "newOwner",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "winner",
    inputs: [],
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "winnerticketNumber",
    inputs: [],
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
];
