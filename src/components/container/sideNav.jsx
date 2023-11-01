import React from "react";
import { Link, useLocation } from "react-router-dom";
import { BiLogOutCircle } from "react-icons/bi";
import { TbCategory2 } from "react-icons/tb";
//import profile from "../../assets/png/hijaby.jpg";
import { GiMusicSpell } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoIosPeople, IoIosListBox } from "react-icons/io";
import { useState } from "react";
import {FaLevelUpAlt} from "react-icons/fa"
import { BsCalendarEvent } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import CurrentStage from "../stage/setCurrentStage";
const SideNav = ({ isNav, setisNav }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSub, showSub] = useState(false);

  function onClose() {
    showSub(!isSub);
  }
  function handleLogout() {
    dispatch({ type: "LOGOUT" });

    navigate("/");
  }

  return (
    <>
      <div
        onClick={(e) => {
          e.stopPropagation();
          setisNav(!isNav);
        }}
        className={`fixed top-[3.1rem] sm:top-[4.1rem] z-[37] inset-y-0 left-0 h-full let swipeInLeft ${
          isNav
            ? "w-full bg-black bg-opacity-50 min-[1024px]:w-[250px]"
            : "max-[1024px]:hidden w-[210px]  "
        }`}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className=" py-3  sm:py-4 flex flex-col relative items-center h-full w-[210px] sm:w-[250px] cursor-pointer shadow-md bg-gray-200"
        >
          <div className="my-1 justify-center  flex flex-col w-full ">
            <Link
              to="/dashboard"
              className={` hidden space-x-3 justify-start items-center font-medium sm:px-6 px-4 my-2 py-4 ${
                pathname.includes("dashboard")
                  ? "text-black border-r-2 bg-gray-50 border-[#017297]"
                  : "text-gray-400"
              } `}
            >
              <AiFillHome className="text-[25px] " />
              <span>Home</span>
            </Link>

            <Link
              to="/dashboard"
              className={` flex space-x-3 justify-start items-center font-medium sm:px-6 px-4 my-2 py-4  ${
                pathname.includes("dashboard")
                  ? "text-black border-r-2 bg-gray-50 border-[#017297]"
                  : "text-gray-400"
              } `}
            >
              <BsCalendarEvent className="text-[25px]" />
              <span>All Events</span>
            </Link>
            <Link
              to="/category"
              className={` flex space-x-3 justify-start items-center font-medium sm:px-6 px-4 my-2 py-4  ${
                pathname.includes("category")
                  ? "text-black border-r-2 bg-gray-50 border-[#017297]"
                  : "text-gray-400"
              } `}
            >
              <TbCategory2 className="text-[25px]" />
              <span>Category</span>
            </Link>

            <Link
              to="/talents"
              className={` flex space-x-3 justify-start items-center font-medium sm:px-6 px-4 my-2 py-4  ${
                pathname.includes("talents")
                  ? "text-black border-r-2 bg-gray-50 border-[#017297]"
                  : "text-gray-400"
              } `}
            >
              <GiMusicSpell className="text-[25px]" />
              <span>Talent</span>
            </Link>

            <Link
              to="/participants"
              className={` hidden space-x-3 justify-start items-center font-medium sm:px-6 px-4 my-2 py-4  ${
                pathname.includes("participants")
                  ? "text-black border-r-2 bg-gray-50 border-[#017297]"
                  : "text-gray-400"
              } `}
            >
              <IoIosPeople className="text-[25px]" />
              <span>All Participants</span>
            </Link>

            <Link
              to="/shortlisted"
              className={` hidden space-x-3 justify-start items-center font-medium sm:px-6 px-4 my-2 py-4 ${
                pathname.includes("shortlisted")
                  ? "text-black border-r-2 bg-gray-50 border-[#017297]"
                  : "text-gray-400"
              } `}
            >
              <IoIosListBox className="text-[25px]" />
              <span>Shortlisted</span>
            </Link>

            <div className="w-full px-3">
              <div
                onClick={handleLogout}
                className={`relative flex  space-x-3 justify-start items-center sm:px-4 px-2 my-2 py-4 font-medium bg-red-600 bg-opacity-[0.15] rounded-lg text-red-500`}
              >
                <BiLogOutCircle className="text-[25px] " />
                <span>Log out</span>
              </div>
            </div>

            <div className="w-full px-3 mt-10">
              <button
                onClick={() => {
                  navigate("/create-event");
                }}
                className="w-full py-3 mb-3 bg-[#017297] text-white flex items-center justify-center"
              >
                <span className="mr-3 text-lg">+</span>Create New Event
              </button>

              <Link
                to="/create-category"
                className={`w-full py-3 mb-3 gap-3 bg-[#017297] text-white hidden items-center justify-center `}
              >
                <TbCategory2 className="text-[25px]" />
                <span>Create Category</span>
              </Link>
              <div
                onClick={onClose}
                className={`w-full flex py-3 mb-3 gap-3 bg-[#017297] text-white items-center justify-center `}
              >
                <FaLevelUpAlt className="text-[25px]" />
                <span>Change Active Stage</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isSub && <CurrentStage close={onClose} />}
    </>
  );
};

export default SideNav;
