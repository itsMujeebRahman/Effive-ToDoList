import React from "react";
import Calender from "../components/EventComponents/Calender";
import Events from "../components/EventComponents/Events";

const page = () => {
  return (
    <div className="grid grid-cols-2 h-screen">
      <Calender />
      <Events />
    </div>
  );
};

export default page;
