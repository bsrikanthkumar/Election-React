import React, { useState , useEffect } from "react";
import axios from "axios";
import images from "../../images/index";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/swiper-bundle.css";
import { Autoplay } from 'swiper/modules';
import { Pagination } from 'swiper/modules';
import { Navigation } from 'swiper/modules';


export const VipCandidates = () => {
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
    <div>
    <span className=" mb-3 px-8  bg-[#cc0101] text-white text-sm md:text-xl lg:text-2xl font-[Jost] py-2 uppercase font-bold">
    VIP CANDIDATES
    </span>
      <Swiper
        id="vipSwiper"
        spaceBetween={10}
        slidesPerView={5}
        navigation={{
          nextEl: "#vipSwiper .swiper-button-next",
          prevEl: "#vipSwiper .swiper-button-prev",
        }}
        //autoplay={{ delay: 3500, disableOnInteraction: false }}
        modules={[Autoplay,Pagination,Navigation]}
        breakpoints={{
          0: {
            slidesPerView: 1,
            pagination: {
              el: "#vipSwiper .swiper-pagination",
              clickable: true,
            },
            navigation: false,
          },
          767: {
            slidesPerView: 3,
            navigation: {
              nextEl: "#vipSwiper .swiper-button-next",
              prevEl: "#vipSwiper .swiper-button-prev",
            },
            pagination: false,
          },
          1024: {
            slidesPerView: 5,
            navigation: {
              nextEl: "#vipSwiper .swiper-button-next",
              prevEl: "#vipSwiper .swiper-button-prev",
            },
          },
        }}
      >
        {/* <div ref={sliderRef} className="vip-slider"> */}
    { vipData.map(candidate => {
        let imageUrl = `https://elections2022.s3.ap-south-1.amazonaws.com/${candidate.cand_pic}`;
        return(
    <SwiperSlide key={candidate.cand_name}>
    <div className="card-background my-3 h-64 md:h-56 flex flex-col justify-between" key={candidate.cand_name}>
      <div className="p-3">
        <p className="text-lg md:text-lg md:min-h-10 text-left font-bold text-white uppercase mb-3 font-jost">
         {candidate.cand_name}
        </p>
        <p className="text-lg md:text-lg text-left font-bold text-white font-jost">
        {candidate.const_name}
        </p>
        <p className="text-xl text-[#00ab30] font-bold uppercase md:text-3xl text-left font-jost py-3 mt-2">
        {candidate.status}
        </p>
      </div>
      <div className="flex items-center  bottom-0 inset-x-0 relative bg-[#ff6100]">
        <p className="text-lg md:text-2xl sm:text-3xl text-left font-bold text-white font-jost pl-3 mr-10">
        {candidate.party_name}
        </p>
        <img className=" z-[1] h-16" src={images.NDAlogo} alt="Fourstates" />
        {/* <img className=" h-48 absolute right-0 bottom-0" src={candidate.cand_pic} alt="Fourstates" /> */}
        <img className="h-32 absolute right-0 bottom-0" src={imageUrl} alt="Fourstates" />
      </div>
    </div>
    </SwiperSlide>
   )})} 
  {/* </div> */}
  <div className="swiper-button-next"></div>
<div className="swiper-button-prev"></div>
<div className="swiper-pagination"></div>
  </Swiper>
  </div>
  );
};
