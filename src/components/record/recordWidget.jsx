import React from "react";
import { MdOutlineDeleteForever } from "react-icons/md";
import austin from "../../assets/png/austin.png";
import { FiEdit2 } from "react-icons/fi";
import { useState } from "react";
const RecordWidget = ({id, image, status, category,email, eventName, name}) => {
  const [isdelete, setdelete] = useState(false);

  function deleteUser() {
    setdelete(!isdelete);
  }
  return (
    <>
      <div className="grid grid-cols-7  gap-6 border-b w-full items-center py-3 px-4">
        <div className="col-span-2 gap-8 w-full items-center grid grid-cols-6">
          <div className="w-[40px] h-[40px] rounded-full">
            <img src={image} alt="" className="w-full h-full rounded-full" />
          </div>
          <div className="col-span-5">
            <div className="text-ellipsis whitespace-nowrap w-full overflow-hidden">{name}</div>
            <div className="text-gray-500 text-ellipsis whitespace-nowrap w-full overflow-hidden">{email}</div>
          </div>
        </div>
        <div>{eventName}</div>
        <div className="text-ellipsis whitespace-nowrap w-full overflow-hidden col-span-2">{category}</div>
        <div className="text-green-600">{status}</div>
        <div className=" flex items-center space-x-2">
          <div
          
          onClick={deleteUser} className="cursor-pointer">
            <MdOutlineDeleteForever className="text-[22px]" />
          </div>
          <div className="cursor-pointer">
            <FiEdit2 className="text-[20px]" />
          </div>
        </div>
      </div>
      {isdelete && (
        <div className="w-full h-full inset-0 z-[50] bg-black bg-opacity-10 fixed ">
          <div className="w-[95%] sm:w-[350px] bg-white rounded-sm p-6 space-y-10">
            <p>Do you wisht to continue?</p>
            <div className="w-full items-center justify-between flex">
              <button className="px-4 py-2 rounded-sm hover:bg-gray-200 text-center">
                Yes
              </button>
              <button
                onClick={() => {
                  setdelete(!isdelete);
                }}
                className="px-4 py-2 rounded-sm hover:bg-gray-200 text-center"
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

export default RecordWidget;
