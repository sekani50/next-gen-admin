import React from "react";
import user from "../../assets/png/customerpic.png";
import { useNavigate } from "react-router-dom";
import ToggleStatus from "../participants/actionbutton/toggleStatus";
const RecordWidget = ({
  id,
  catId,
  image,
  status,
  category,
  stage,
  email,
  name,
  votes,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="grid grid-cols-9  gap-6 border-b w-full items-center py-3 px-4">
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

        <div className="text-ellipsis whitespace-nowrap w-full overflow-hidden col-span-2">
          {category}
        </div>
        <div>{votes}</div>
        <div>{stage}</div>
        <ToggleStatus status={status} id={id} catId={catId} />

        <div
          onClick={() => {
            navigate(`/event/participant/${id}`, {
              state: {
                data: {
                  catId,
                },
              },
            });
          }}
          className="cursor-pointer whitespace-nowrap px-3 w-fit  py-2 text-center rounded-sm bg-gray-200 hover:bg-gray-300"
        >
          View Detail
        </div>
      </div>
    </>
  );
};

export default RecordWidget;
