import React from "react";
import { MdOutlineDeleteForever } from "react-icons/md";
import austin from "../../assets/png/austin.png";

import { FiEdit2 } from "react-icons/fi";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { deleteEvent, toggleActiveEvent } from "../../Utils/api";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { LoaderIcon } from "lucide-react";
const EventWidget = ({ name, image, id, data, isActive }) => {
  const [isdelete, setdelete] = useState(false);
  const [loading, setloading] = useState(false);
  const [active, setactive] = useState(isActive)
  const { token } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [activeloading, setactiveloading] = useState(false);
  function deleteUser() {
    setdelete(!isdelete);
  }

  async function deletes() {
    setloading(true);
    await deleteEvent(token, id)
      .then((res) => {
       
        const {data} = res?.data
        setloading(false);
        setactive(data?.isActive)
        setdelete(!isdelete);
        window.location.reload();
        toast.success(`${name} is deleted`);
      })
      .catch((err) => {
        setloading(false);
        console.log(err);
        setdelete(!isdelete);
        toast.error(`${name} is not deleted`);
      });
  }

  async function toggleActive() {
    setactiveloading(true);
    await toggleActiveEvent(token, id)
      .then((res) => {
       
        const {data} = res?.data
        setactive(data?.isActive)
        setactiveloading(false);
      //  window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        setactiveloading(false);
      });
  }
  return (
    <>
      <div className="grid grid-cols-8 gap-6 border-b w-full items-center py-3 px-4">
        <div className="col-span-2 gap-12 w-full items-center grid grid-cols-6">
          <div className="w-[40px] h-[40px] rounded-full">
            <img
              src={image || austin}
              alt=""
              className="w-full h-full rounded-full"
            />
          </div>
          <div className="col-span-5 w-full">
            <div className="text-ellipsis whitespace-nowrap w-[100px] overflow-hidden">
              {name}
            </div>
          </div>
        </div>

        <div
          onClick={() => {
            navigate(`/event/categories/${id}`);
          }}
          className="cursor-pointer text-ellipsis whitespace-nowrap w-full overflow-hidden col-span-2"
        >
          View Categories
        </div>
        <button
          disabled={activeloading}
          onClick={toggleActive}
          className="cursor-pointer col-span-2"
        >
          {activeloading && (
            <div
              className={`flex items-center justify-center w-[100px] h-[33px] ${
                !active
                  ? "text-red-700 bg-red-200 p-1 rounded-sm"
                  : "text-green-700 bg-green-200 rounded-sm p-1"
              }`}
            >
              <LoaderIcon className="text-[25px] animate-spin" />
            </div>
          )}
          {!activeloading && (
            <div
              className={`flex items-center justify-center w-[100px] h-[33px] ${
                !active
                  ? "text-red-700 bg-red-200 p-1 rounded-sm"
                  : "text-green-700 bg-green-200 rounded-sm p-1"
              }`}
            >
              {active ? "Active" : "Not Active"}
            </div>
          )}
        </button>

        <div className=" flex items-center space-x-2">
          <div onClick={deleteUser} className="cursor-pointer">
            <MdOutlineDeleteForever className="text-[22px]" />
          </div>
          <div
            onClick={() => {
              navigate("/create-event", {
                state: {
                  data,
                },
              });
            }}
            className="cursor-pointer"
          >
            <FiEdit2 className="text-[20px]" />
          </div>
        </div>
      </div>
      {isdelete && (
        <div className="w-full h-full inset-0 z-[50] bg-black bg-opacity-10 fixed ">
          <div className="w-[95%] sm:w-[350px] h-fit m-auto absolute inset-0 bg-white rounded-sm p-6 space-y-10">
            <p>Do you wish to continue?</p>
            <div className="w-full items-center justify-between flex">
              <button
                onClick={deletes}
                className="w-[70px] h-[44px] flex items-center justify-center rounded-sm hover:bg-gray-200 text-center"
              >
                {loading ? (
                  <LoaderIcon className="text-[22px] animate-spin" />
                ) : (
                  "  Yes"
                )}
              </button>
              <button
                onClick={() => {
                  setdelete(!isdelete);
                }}
                className="w-[70px] h-[44px] flex items-center justify-center rounded-sm hover:bg-gray-200 text-center"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EventWidget;
