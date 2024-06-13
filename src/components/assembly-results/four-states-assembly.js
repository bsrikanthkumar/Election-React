import React from "react";
import images from "../../images/index";
import Datatable from "../assembly-results/fourstates-table";
const Assemblyelections = () =>{
    return(
        <div className="md:flex md:my-6">
        <div className="md:w-1/3 sm:w-full md:my-0 my-4 mx-auto">
            <img src={images.Fourstates} className="md:ml-0 four-states-mbl-img mx-auto" alt="Fourstates" />
        </div>
        <div className="md:w-2/3 sm:w-full">
            <Datatable/>
        </div>
        </div>
    );
}

export default Assemblyelections;