import React, { useState , useEffect } from "react";
import axios from "axios";
import images from "../../images/index";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

export const BjpVipCandidates = () => {
    const [vipData, setVipData] = useState([]);

    useEffect(() => {
      axios.get('/json/telangana/english/vipcandidates_wonlead_eng.json')
        .then(response => {
          //console.log(response.data);
          setVipData(response.data.results);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }, []);

    if (!vipData || vipData.length === 0) {
        return <div>Loading...</div>;
    }


  return (
    <Swiper
    spaceBetween={30}
    centeredSlides={true}
    autoplay={{
        delay: 3000,
        disableOnInteraction: false,
    }}
    // pagination={{
    //     clickable: true,
    // }}
    // navigation={true}
    modules={[Autoplay]}
    className="vipSwiper"
>
    {/* <div ref={sliderRef} className="vip-slider"> */}
    { vipData.map(candidate => {
      //console.log(candidate.cand_name);
      let imageUrl = `https://elections2022.s3.ap-south-1.amazonaws.com/${candidate.cand_pic}`;
      return(
        <SwiperSlide key={candidate.cand_name}>
    <div className="card-background mt-2 h-64 md:h-80 flex flex-col justify-between" key={candidate.cand_name}>
      <div className="p-3">
        <p className="text-lg md:text-2xl md:min-h-16 text-left font-bold text-white uppercase mb-3 font-jost">
         {candidate.cand_name}
        </p>
        <p className="text-lg md:text-2xl text-left font-bold text-white font-jost">
        {candidate.const_name}
        </p>
        <p className="text-lg text-[#00ab30] font-bold uppercase md:text-4xl text-left font-jost py-3 mt-2">
        {candidate.status}
        </p>
      </div>
      <div className="flex items-center bottom-0 inset-x-0 relative bg-[#ff6100]">
        <p className="text-lg md:text-3xl sm:text-3xl text-left font-bold text-white font-jost pl-3 mr-10">
        {candidate.party_name}
        </p>
        <img className=" z-[1] h-20" src={images.NDAlogo} alt="Fourstates" />
        <img className=" h-48 absolute right-0 bottom-0 swiper-lazy" src={imageUrl} alt="Fourstates" />
        {/* <img className=" h-48 absolute right-0 bottom-0" src={images.modi} alt="Fourstates" /> */}
      </div>
    </div>
    </SwiperSlide>
   )})} 
  {/* </div> */}
  </Swiper>
  );
};
