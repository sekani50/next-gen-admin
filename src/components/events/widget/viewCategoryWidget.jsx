import React from "react";
import { useState } from "react";
import SetStage from "../actioncard/setStage";

export default function ViewCategoryWidget({
  idx,
  name,
  country,
  event,
  talent,
  id,
}) {
  const [isOPen, setOpen] = useState(false);

  function onclose() {
    setOpen(!isOPen);
  }

  return (
    <>
      <div
        key={idx}
        className="grid mb-3 sm:mb-4 grid-cols-5 gap-6 px-4 w-full items-center"
      >
        <p className="pl-3 w-full  whitespace-nowrap text-ellipsis overflow-hidden">
          {name}
        </p>
        <p className="w-full   whitespace-nowrap text-ellipsis overflow-hidden">
          {country?.name}
        </p>
        <p className="w-full   whitespace-nowrap text-ellipsis overflow-hidden">
          {event?.eventName}
        </p>
        <p className="w-full  whitespace-nowrap text-ellipsis overflow-hidden">
          {talent?.name}
        </p>

        <button
          onClick={onclose}
          className="bg-gray-200 overflow-hidden whitespace-nowrap w-fit rounded-sm px-2 sm:px-4 py-2"
        >
          View Shortlisted
        </button>
      </div>

      {isOPen && <SetStage id={id} name={name} close={onclose} />}
    </>
  );
}
