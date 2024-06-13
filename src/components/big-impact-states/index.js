import React, { useState, useEffect } from "react";
import axios from "axios";

function getPartyClass(partyName) {
  switch (partyName) {
    case "BRS":
      return "brs";
    case "AIMIM":
      return "mim";
      case "TMC":
      return "mim";
      case "RJD":
        return "mim";
    case "others":
      return "others";
    case "OTH":
      return "others";
    case "INC":
      return "inc";
    case "BJP":
      return "bjp";
    case "BJP+":
      return "bjp";
    case "SP":
      return "sp";
    case "SS":
      return "sp";
    default:
      return ""; // No specific class for other parties
  }
}

export const BigImpactStates = () => {
  const [jsonData, setJsonData] = useState(null);
  useEffect(() => {
    axios
      .get("/json/big_impact_states.json")
      .then((response) => {
        //console.log(response.data);
        setJsonData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  if (!jsonData) {
    return <div>Loading...</div>;
  }

  const stateIds = [
    ...new Set(jsonData.totalresults.map((item) => item.state_id)),
  ];
  return (
    <div className="big-impact-border p-5 md:p-0">
      <div className="w-full mb-3 bg-[#cc0101] text-white text-sm md:text-xl lg:text-2xl font-[Jost] py-2 uppercase font-bold">
        BIG IMPACT STATES
      </div>
      <div className="flex flex-wrap justify-between tborder">
        {stateIds.map((stateId) => {
          // console.log("Current stateId:", stateId);
          // console.log("totalresults:", jsonData.totalresults);
          const stateName = jsonData.totalresults.find(
            (item) => item.state_id === stateId && item.state_name
          );
          // Filter party names and totals
          const partyNames = jsonData.totalresults
            .filter((item) => item.state_id === stateId && item.party_name)
            .map((party) => party.party_name);

          const totals = jsonData.totalresults
            .filter((item) => item.state_id === stateId && item.total)
            .map((party) => party.total);
          const totalData = jsonData.totalresults.find(
            (item) =>
              item.state_id === stateId && item.total_count !== undefined
          );
          const total_count = totalData ? totalData.total_count : 0;
          const total_seats = totalData ? totalData.total_seats : 0;
          return (
            <div key={stateId} className={`w-full md:w-[49%]`}>
              <table className="w-full mb-4">
                <thead>
                  <tr className="items-center">
                    <td
                      colSpan="2"
                      className="text-center py-2 bg-[#002a62] text-white md:text-base font-medium uppercase whitespace-nowrap"
                    >{`${stateName.state_name}`}</td>
                  </tr>
                  <tr className="bg-[#e1e1e1]">
                    <td className="whitespace-nowrap md:text-base font-medium">
                      L+W
                    </td>
                    <td className="md:text-base font-medium">{`${total_count}/${total_seats}`}</td>
                  </tr>
                </thead>
                <tbody>
                  {partyNames.map((partyName, index) => (
                    <tr
                      key={index}
                      className="font-normal text-base items-center p-2"
                    >
                      <td
                        className={`${getPartyClass(
                          partyName
                        )} p-2 text-white font-medium`}
                      >
                        {partyName}
                      </td>
                      <td className="p-2 font-medium">{totals[index]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </div>
  );
};
