import React, { useState, useEffect, useRef } from "react";
import images from "../images/index";
import axios from "axios";
import * as d3 from "d3";
const Bharat = () => {
  return (
    <div className="mb-4">
      <img
        src={images.headerlogo}
        className="w-20 h-20 mt-2 mx-auto lg:mx-0"
        alt="headerlogo"
      />
      <div className="flex align-middle justify-center">
        <img src={images.BharatDecides} className="mx-auto" alt="BharatDecides" />
      </div>
    </div>
  );
};
// export default Bharat;

// const Progressbarchart = ({ bjpSeats, incSeats }) => {
//   const chartRef = useRef();

//   useEffect(() => {
//     if (bjpSeats && incSeats) {
//       drawChart();
//     }
//   }, [bjpSeats, incSeats]);

//   const drawChart = () => {
//     const totalSeats = bjpSeats + incSeats;
//     const bjpPercentage = (bjpSeats / totalSeats) * 100;
//     const incPercentage = (incSeats / totalSeats) * 100;

//     const height = 10;
//     const margin = { top: 5, right: 20, bottom: 5, left: 20 };

//     const svg = d3
//       .select(chartRef.current)
//       .attr("width", "100%") // Set width to 100% using CSS
//       .attr("height", height + margin.top + margin.bottom);

//     svg
//       .append("rect")
//       .attr("x", `${margin.left}%`)
//       .attr("y", margin.top)
//       .attr("width", `${bjpPercentage}%`)
//       .attr("height", height)
//       .attr("fill", "orange");

//     svg
//       .append("rect")
//       .attr("x", `${100 - incPercentage}%`)
//       .attr("y", margin.top)
//       .attr("width", `${incPercentage}%`)
//       .attr("height", height)
//       .attr("fill", "blue");

//     svg
//       .selectAll("text")
//       .data([
//         { party: "BJP", seats: bjpSeats },
//         { party: "INC", seats: incSeats },
//       ])
//       .enter()
//       .append("text")
//       .attr("x", (d) =>
//         d.party === "BJP"
//           ? `${margin.left + 10}%`
//           : `${100 - margin.right - 10}%`
//       )
//       .attr("y", margin.top + 20)
//       .attr("dy", "0.35em")
//       .attr("text-anchor", (d) => (d.party === "BJP" ? "start" : "end"))
//       .text((d) => `${d.party}: ${d.seats}`)
//       .style("fill", "black");

//     svg
//       .append("line")
//       .attr("x1", "50%")
//       .attr("y1", margin.top)
//       .attr("x2", "50%")
//       .attr("y2", margin.top + height)
//       .style("stroke", "black")
//       .style("stroke-width", 2);

//     svg
//       .append("text")
//       .attr("x", "50%")
//       .attr("y", margin.top + height + 20)
//       .attr("text-anchor", "middle")
//       .text("272 to win");
//   };

//   return <svg ref={chartRef}></svg>;
// };

function PartyTable() {
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    axios.get('/json/parties/supporting_parties.json')
      .then(response => {
        //console.log(response.data);
        setJsonData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  if (!jsonData) {
    return <div>Loading...</div>;
  }

  const stateIds = [...new Set(jsonData.totalresults.map(item => item.state_id))];

  return (
    <div className="flex flex-wrap">
      {stateIds.map(stateId => {
        const PartiesName = jsonData.totalresults.find(item => item.state_id === stateId && item.parties);
        const partyClassName = PartiesName ? 
        (PartiesName.parties.toLowerCase().includes("bjp") ? "bjp md:ml-0 mb-[6px]" :
        PartiesName.parties.toLowerCase().includes("inc") ? "inc md:mr-0 mt-[6px]" :
        PartiesName.parties.toLowerCase())
        : "";
        return (
          <div key={stateId} className={`w-full md:w-[32.5%] p-2 md:m-[6px] border ${partyClassName}`}>
            <table className="w-full">
              <thead>
                <tr className="">
                  {/* <th colSpan="2">{ `${bjpParties.parties} (${bjpParties.won_seats}/${bjpParties.total_seats})`}</th> */}
                  <th className="font-normal text-2xl pb-6" colSpan="2">{ `${PartiesName.parties}`}</th>
                </tr>
              </thead>
              <tbody>
                {jsonData.totalresults
                  .filter(item => item.state_id === stateId && item.party_name) // Filter out data without party_name
                  .map((party, index) => (
                    <tr key={index} className="font-normal text-xl flex justify-between items-center pl-16 pr-16">
                      <td>{party.party_name}</td>
                      <td>{party.total}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}

export { Bharat, PartyTable };
