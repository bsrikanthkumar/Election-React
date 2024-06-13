import React from "react";
import axios from "axios";
import { Bharat, PartyTable } from "../components/bharatdecides";
import Assemblyelections from "../components/assembly-results/four-states-assembly";
import { BjpVipCandidates } from "./vip-candidates/bjp-vip-cand";
import { IncVipCandidates } from "../components/vip-candidates/inc-vip-cand";
import { OthVipCandidates } from "../components/vip-candidates/oth-vip-cand";
import StateAndLoksabhaResult from "../components/constituency-wise-results/index";
import { BigImpactStates } from "../components/big-impact-states/index";
import {NorthernIndia} from "../components/northern-india/index";
import {WesternIndia} from "../components/western-india/index";
import {SouthernIndia} from "../components/southern-india/index";
import {NorthEastIndia} from "../components/north-east-india/index";
import {VVipCandidates} from "../components/vip-candidates/vvip-cand";
import {VipCandidates} from "../components/vip-candidates/vip-cand";
// import jsondata from  "../json/parties/supporting_parties.json";
import "./index.css";

function Mainpage() {
  // const test = axios.get("http://localhost/Headless_wordpress/server/wp-json/wp/v2/posts").then((response)=>{
  //     console.log(response);
  // });
  // const bjpSeats = 285;
  // const incSeats = 68;
  return (
    <>
      <section className="flex flex-col md:flex-row justify-between">
        <div className="left-side w-full md:w-[74%]">
          <Bharat />
          {/* <Progressbarchart bjpSeats={bjpSeats} incSeats={incSeats} /> */}
          <PartyTable />
          <Assemblyelections />
        </div>
        <div className="right-side w-full md:w-[25%]">
          <BjpVipCandidates />
          <IncVipCandidates />
          <OthVipCandidates />
        </div>
      </section>
      <section className="big-impact-states mb-4">
        <div className="md:flex">
        <div className="md:w-1/2 mt-8 md:mt-0 sm:bg-[#f7f7f7]">
          <BigImpactStates />
        </div>
        <div className="md:w-1/2">
        </div>
        </div>
      </section>
      <section className="northern-india">
        <NorthernIndia/>
      </section>
      <section className="western-india mt-4">
        <WesternIndia/>
      </section>
      <section className="southern-india mt-4">
        <SouthernIndia/>
      </section>
      <section className="north-east-india mt-4">
        <NorthEastIndia/>
      </section>
      <section className="vvip-candidates bg-[#d9d9d9] my-6 pt-8 pb-12">
        <VVipCandidates/>
      </section>
      <section className="vip-cand mt-6 pt-8 pb-12">
        <VipCandidates/>
      </section>
      <section className="">
        <div className="mx-[-1%] text-center lg:font-extrabold font-bold  bg-[#002a62] py-1 lg:py-6">
          <span className="uppercase text-xl lg:text-4xl   font-[Jost] text-white p-1">
            state wise & loksabha constituency wise results
          </span>
        </div>
        <StateAndLoksabhaResult />
      </section>
    </>
  );
}

export default Mainpage;
