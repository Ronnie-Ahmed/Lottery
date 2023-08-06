// import React from "react";
// import { useState, useEffect } from "react";
// import { createClient } from "urql";
// import { Card } from "./Card";

// export const Cardpopup = ({ onClose }) => {
//   const [result, setresult] = useState([]);
//   const [proposal, setproposal] = useState("");
//   const graphrui =
//     "https://api.studio.thegraph.com/query/50179/governor/version/latest";
//   const query = `{
//    proposalCreateds(first: 10) {
//     proposalId
//     description
//     proposer
//   }
// }`;
//   const client = createClient({
//     url: graphrui,
//   });
//   const gettoken = async () => {
//     const { data } = await client.query(query).toPromise();

//     setresult(data.proposalCreateds);
//     console.log(data.proposalCreateds);
//   };
//   useEffect(() => {
//     gettoken();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//   };

//   return (
//     <div className=" top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-600 bg-opacity-0">
//       <div className="w-full h-full flex flex-col items-center justify-center">
//         <div className="max-w-3xl w-full max-h-full overflow-y-auto p-4 bg-white rounded-lg shadow-lg">
//           {result.map((item) => (
//             <Card
//               key={item.proposalId}
//               proposalId={item.proposalId}
//               proposer={item.proposer}
//               description={item.description}
//             />
//           ))}
//           <button
//             className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-full transform hover:scale-110 transition-all duration-300"
//             onClick={onClose}
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
