import { LuGauge } from "react-icons/lu";
import React from "react";

function Inventories({ title, subtitle }) {
  return (
    <div className="rounded-sm grid grid-cols-6 items-center inventory p-[20px] font-medium text-black  bg-white">
      <LuGauge className="text-[#017297] text-[80px] col-span-2" />
      <div className="space-y-4 col-span-4">
        <h1 className=" uppercase text-center  text-gray-500"> {title} </h1>
        <p className=" uppercase text-center "> {subtitle} </p>
      </div>
    </div>
  );
}

export default Inventories;
