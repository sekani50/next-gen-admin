import React from "react";
import user from "../../assets/png/customerpic.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "../../Utils/useAxios"
import { LoaderIcon, toast } from "react-hot-toast";
const RecordWidget = ({
  id,
  eventId,
  image,
  status,
  category,
  email,
  event,
  name,
}) => {
  const navigate = useNavigate();
  const {token} = useSelector((state) => state.user)
  const [loading, setloading] = useState(false)
  const [statuss, setStatus] = useState(status)

  async function toggleStatus() {
    setloading(true)
    await axios.patch(`/events/${eventId}/shortlist/${id}`, null,{
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      console.log(res)
      setloading(false)
      const {data} = res.data
      setStatus(data?.status)
      toast.success('Status updated')
    })
    .catch((error) => {
      console.log(error)
      setloading(false)
      if (
        error.message === "Network Error" ||
        error.message === "timeout exceeded"
      ) {
        toast.error("Network Error");
      }
      const { error: err } = error.response.data;
      if (err) {
        toast.error(err.message);
      }
      const { message } = error.response.data.error;
      if (message) {
        toast.error(message);
      }
      const { message: mm } = error.response.data;
      if (mm) {
        toast.error(mm);
      }
    })
  }

  return (
    <>
      <div className="grid grid-cols-7  gap-6 border-b w-full items-center py-3 px-4">
        <div className="col-span-2 gap-8 w-full items-center grid grid-cols-6">
          <div className="w-[40px] h-[40px] rounded-full">
            <img
              src={image || user}
              alt=""
              className="w-full h-full rounded-full"
            />
          </div>
          <div className="col-span-5">
            <div className="text-ellipsis whitespace-nowrap w-full overflow-hidden">
              {name}
            </div>
            <div className="text-gray-500 text-ellipsis whitespace-nowrap w-full overflow-hidden">
              {email}
            </div>
          </div>
        </div>
        <div>{event}</div>
        <div className="text-ellipsis whitespace-nowrap w-full overflow-hidden col-span-2">
          {category}
        </div>
        <button
        disabled={loading}
        onClick={toggleStatus}
        className="cursor-pointer">
        {loading && <div
          className={`flex items-center justify-center w-[100px] h-[33px] ${
            statuss === "Joined"
              ? "text-red-700 bg-red-200 p-1 rounded-sm"
              : "text-green-700 bg-green-200 rounded-sm p-1"
          }`}
        >
          <LoaderIcon className="text-[25px] animate-spin"/>
        </div>}
       {!loading && <div
          className={`flex items-center justify-center w-[100px] h-[33px] ${
            statuss === "Joined"
              ? "text-red-700 bg-red-200 p-1 rounded-sm"
              : "text-green-700 bg-green-200 rounded-sm p-1"
          }`}
        >
          {statuss}
        </div>}
        </button>
       
        <div
          onClick={() => {
            navigate(`/event/participant/${id}`, {
              state: {
                data: {
                  event,
                  eventId,
                },
              },
            });
          }}
          className="cursor-pointer p-1 text-center rounded-sm bg-gray-200 hover:bg-gray-300"
        >
          View Detail
        </div>
      </div>
    </>
  );
};

export default RecordWidget;
