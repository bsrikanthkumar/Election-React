import React, { useState, useEffect } from "react";
import axios from "axios";
import images from "../../images/index";

function getPartyClass(partyName) {
  switch (partyName) {
    case "BRS":
      return "brs";
    case "AIMIM":
      return "mim";
    case "others":
      return "others";
    case "OTH":
      return "others";
    case "INC":
      return "inc";
    case "BJP":
      return "bjp";
    // Add more cases for other parties if needed
    default:
      return ""; // No specific class for other parties
  }
}

const Datatable = () => {
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    axios
      .get("/json/five_states_common_tally.json")
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
          (item) => item.state_id === stateId && item.total_count !== undefined
        );
        const total_count = totalData ? totalData.total_count : 0;
        const total_seats = totalData ? totalData.total_seats : 0;
        return (
          <div key={stateId} className={`w-full md:w-[49%]`}>
            <table className="w-full mb-4">
              <thead>
                <tr className="px-1 py-2 flex items-center">
                <span className="md:text-base font-medium uppercase whitespace-nowrap">{`${stateName.state_name}`}</span>
                  <img
                    src={images.Rightarrow}
                    className="h-4 mx-3"
                    alt="Arrow Circle Right"
                  />
                  <span className="whitespace-nowrap text-[10px] font-medium mr-1">L+W </span>
                  <span className="md:text-base font-medium">{`${total_count}/${total_seats}`}</span>
                </tr>
              </thead>
              <tbody>
                <tr className="font-normal text-base items-center p-2">
                  {partyNames.map((partyName, index) => (
                    <td
                      key={index}
                      className={`${getPartyClass(partyName)} p-2  text-white font-medium`}
                    >
                      {partyName}
                    </td>
                  ))}
                </tr>
                <tr className="font-normal text-base items-center">
                  {totals.map((total, index) => (
                    <td key={index} className="p-2 font-medium">
                      {total}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};

export default Datatable;
