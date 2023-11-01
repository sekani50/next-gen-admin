import React from "react";
import { useState } from "react";
import toast, { LoaderIcon } from "react-hot-toast";
//import { useNavigate } from "react-router-dom";

export default function ChangeStage({ close, toggle,stage, selectStage, loading}) {

  //const navigate = useNavigate();

  function changeActiveStageShortlist() {
    if (stage === "" || stage > 3) {
      toast.error("Stage must be betweeen 1 to 3");
      return;
    }

    toggle()
    
  }
  return (
    <div
      onClick={close}
      className="w-full h-full inset-0 bg-black bg-opacity-50 fixed z-[80]"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="bg-white w-[95%] h-fit sm:w-[350px] flex flex-col items-center justify-center gap-3 m-auto py-4 px-3 sm:px-4 absolute rounded-sm inset-0 shadow-lg"
      >
        <div className="form-group space-y-4 w-full">
          <label className="block font-semibold " htmlFor="number">
            Change Stage
          </label>
          <input
            className="block form__input border border-gray-200 focus:border-gray-500 hover:border-gray-500 rounded-sm focus:outline-none w-full h-11 px-4"
            type="number"
            placeholder="e.g 1, 2 or 3"
            name="number"
            value={stage}
            onChange={(e) => {
              selectStage(e.target.value);
            }}
          />
        </div>

        <button
          onClick={changeActiveStageShortlist}
          className="w-full h-11 flex items-center rounded-sm justify-center bg-[#017297] text-white font-medium"
        >
         {loading ? <LoaderIcon/> :" Change Active Stage"}
        </button>
      </div>
    </div>
  );
}
