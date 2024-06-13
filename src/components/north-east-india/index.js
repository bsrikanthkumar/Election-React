import React, { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';
import { Pagination } from 'swiper/modules';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import "swiper/swiper-bundle.css";
import images from "../../images/index";

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

export const NorthEastIndia = () => {
  const [jsonData, setJsonData] = useState(null);
  useEffect(() => {
    axios
      .get("/json/north-east-india.json")
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
    <div>
      <span className=" mb-3 px-8  bg-[#cc0101] text-white text-sm md:text-xl lg:text-2xl font-[Jost] py-2 uppercase font-bold">
      NORTH EAST INDIA
      </span>
      <Swiper
        id="northEastIndia"
        spaceBetween={10}
        slidesPerView={5}
        navigation={{
          nextEl: "#northEastIndia .swiper-button-next",
          prevEl: "#northEastIndia .swiper-button-prev",
        }}
        //autoplay={{ delay: 2500, disableOnInteraction: false }}
        modules={[Autoplay,Pagination,Navigation]}
        breakpoints={{
          0: {
            slidesPerView: 1,
            pagination: {
              el: "#northEastIndia .swiper-pagination",
              clickable: true,
            },
            navigation: false,
          },
          768: {
            slidesPerView: 3,
            navigation: {
              nextEl: "#northEastIndia .swiper-button-next",
              prevEl: "#northEastIndia .swiper-button-prev",
            },
            pagination: false,
          },
          1024: {
            slidesPerView: 5,
            navigation: {
              nextEl: "#northEastIndia .swiper-button-next",
              prevEl: "#northEastIndia .swiper-button-prev",
            },
          },
        }}
      >

      {/* <div className="md:flex tborder border-t mt-1 border-black"> */}
        {stateIds.map((stateId) => {
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
            <SwiperSlide key={stateId}>
            <div className={`w-full mr-3 md:flex tborder`}>
              <table className="w-full mb-4 mt-3">
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
            </SwiperSlide>
          );
        })}        
      {/* </div> */}
      <div className="swiper-button-next"></div>
      <div className="swiper-button-prev"></div>
      <div className="swiper-pagination"></div>
      </Swiper>
      
    </div>
  );
};
