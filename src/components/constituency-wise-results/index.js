import React, { useEffect, useState } from "react";
import axios from "axios";

function StateAndLoksabhaResult() {
  const [records, setRecords] = useState([]);
  const [selectedState, setSelectedState] = useState(null);

  useEffect(() => {
    axios
      .get("/json/constituency_wise_results/state-loksabha-wise results.json")
      .then((response) => {
        setRecords(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleToggle = (stateName) => {
    setSelectedState(stateName === selectedState ? null : stateName);
  };
  return (
    <div className="election-results m-auto">
      {Object.keys(records).map((stateName, index) => (
        <div key={index} className="mt-1">
          <button
            onClick={() => handleToggle(stateName)}
            className="w-full mt-2 bg-[#002a62] text-white text-sm md:text-xl lg:text-2xl font-[Jost] py-2 uppercase font-bold"
          >{stateName.replace(/_/g, ' ')}</button>
          {selectedState === stateName && (
            <table className="results-table font-[Jost] border-collapse w-full text-sm md:text-md lg:text-lg">
              <thead>
                <tr className="text-center text-[#002a62] bg-[#f2f2f2]">
                  <th className="border">No.</th>
                  <th className="border lg:p-2 md:p-1">Constituency Name</th>
                  <th className="border lg:p-2 md:p-1">Type</th>
                  <th className="border lg:p-2 md:p-1">Candidate</th>
                  <th className="border lg:p-2 md:p-1">Party</th>
                  <th className="border lg:p-2 md:p-1">Result</th>
                </tr>
              </thead>
              <tbody>
                {records[stateName].map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-[#ddd] text-center text-[#004aad]"
                  >
                    <td className="border lg:p-2 p-1">{index + 1}</td>
                    <td className="border lg:p-2 p-1 text-start lg:pl-[2rem] md:pl-[1rem] text-[#004aad]">
                      {item.const_name}
                    </td>
                    <td className="border lg:p-2 p-1">{item.type}</td>
                    <td className="border lg:p-2 p-1 text-start lg:pl-[2rem] md:pl-[1rem] text-[#004aad]">
                      {item.cand_name}
                    </td>
                    <td className="border lg:p-2 p-1">{item.party_name}</td>
                    <td className="border lg:p-2 p-1">{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ))}
    </div>
  );
}
export default StateAndLoksabhaResult;
