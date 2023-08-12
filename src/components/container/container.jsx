import React, { useState } from "react";
import SideNav from "./sideNav";
import TopNav from "./topNav";
import austin from "../../assets/png/austin.png";
import next from "../../assets/png/next.png";
import { useNavigate } from "react-router-dom";
const Container = ({ children }) => {
  const [isNav, setisNav] = useState(false);
  const navigate = useNavigate()
  return (
    <>
       <div className="bg-[#051534] w-full flex justify-between items-center px-4 sm:px-10 py-2">
        <div
          onClick={() => {
            navigate("/");
          }}
          className="cursor-pointer w-[35px] sm:w-[50px] "
        >
          <img src={next} alt="dd" className="w-full h-full" />
        </div>
        <div className="space-x-2 items-center grid grid-cols-3 ">
          <div className="w-[35px] h-[35px] rounded-full sm:h-[50px] sm:w-[50px] ">
            <img
              src={austin}
              alt="w"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          <p className="w-full col-span-2 text-ellipsis whitespace-nowrap overflow-hidden text-white">
            Hello Admin
          </p>
        </div>
      </div>
    <div className="w-full h-full pb-[50px]  bg-white text-zinc-700">
      <TopNav isNav={isNav} setisNav={setisNav} />

      <div className="right min-[1010px]:float-right bg-white h-fit ">
        {children}
      </div>
      <SideNav isNav={isNav} setisNav={setisNav} />
    </div>
    
    </>
  );
};

export default Container;