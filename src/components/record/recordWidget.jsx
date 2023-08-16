import React from "react";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import user from "../../assets/png/customerpic.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
        <div className="text-green-600">{status}</div>
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
