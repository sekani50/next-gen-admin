import React from "react";
import { MdOutlineDeleteForever } from "react-icons/md";
import austin from "../../assets/png/austin.png";

import { FiEdit2 } from "react-icons/fi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteEvent } from "../../Utils/api";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { LoaderIcon } from "lucide-react";
const EventWidget = ({ name, image, id, data }) => {
  const [isdelete, setdelete] = useState(false);
  const [loading, setloading] = useState(false)
  const {token} = useSelector((state) => state.user)
  const navigate = useNavigate();
  function deleteUser() {
    setdelete(!isdelete);
  }

  async function deletes() {
    setloading(true)
    await deleteEvent(token,id)
    .then((res) => {
      console.log(res);
      setloading(false)
      setdelete(!isdelete);
      window.location.reload()
      toast.success(`${name} is deleted`)
    })
    .catch((err) => {
      setloading(false)
      console.log(err);
      setdelete(!isdelete);
      toast.error(`${name} is not deleted`)
    })
  }
  return (
    <>
      <div className="grid grid-cols-8  gap-6 border-b w-full items-center py-3 px-4">
        <div className="col-span-2 gap-8 w-full items-center grid grid-cols-6">
          <div className="w-[40px] h-[40px] rounded-full">
            <img
              src={image || austin}
              alt=""
              className="w-full h-full rounded-full"
            />
          </div>
          <div className="col-span-5">
            <div className="text-ellipsis whitespace-nowrap w-full overflow-hidden">
              {name}
            </div>
          </div>
        </div>
        <div className="text-green-600">Shortlisted</div>
        <div
          onClick={() => {
            navigate(`/${id}`);
          }}
          className="cursor-pointer text-ellipsis whitespace-nowrap w-full overflow-hidden col-span-2"
        >
          view reg. participants
        </div>
        <div
          onClick={() => {
            navigate(`/${id}`);
          }}
          className="cursor-pointer text-ellipsis whitespace-nowrap w-full overflow-hidden col-span-2"
        >
          View Shorlisted
        </div>

        <div className=" flex items-center space-x-2">
          <div onClick={deleteUser} className="cursor-pointer">
            <MdOutlineDeleteForever className="text-[22px]" />
          </div>
          <div
          onClick={() => {
            navigate('/create-event', {
              state: {
                data
              }
            })
          }}
          className="cursor-pointer">
            <FiEdit2 className="text-[20px]" />
          </div>
        </div>
      </div>
      {isdelete && (
        <div className="w-full h-full inset-0 z-[50] bg-black bg-opacity-10 fixed ">
          <div className="w-[95%] sm:w-[350px] absolute inset-0 bg-white rounded-sm p-6 space-y-10">
            <p>Do you wisht to continue?</p>
            <div className="w-full items-center justify-between flex">
              <button
              onClick={deletes}
              className="w-[70px] h-[44px] flex items-center justify-center rounded-sm hover:bg-gray-200 text-center">
              {loading ? <LoaderIcon className="text-[22px] animate-spin"/> : '  Yes'}
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
