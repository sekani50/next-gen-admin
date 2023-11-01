import React from "react";
import { useState } from "react";
import toast, { LoaderIcon } from "react-hot-toast";
import { setActiveStage } from "../../Utils/api";
import { useSelector } from "react-redux";

export default function CurrentStage({ close }) {
  const [stage, selectStage] = useState("");
  const { token } = useSelector((state) => state.user);
  const [loading, setloading] = useState(false);

  async function changeActiveStage() {
    if (stage === "" || stage > 3) {
      toast.error("Stage must be betweeen 1 to 3");
      return;
    }

    const payload = {
      stage: stage,
    };
    setloading(true);
    await setActiveStage(payload, token)
      .then((res) => {
        console.log(res);
        setloading(false);
        toast.success(res?.data?.message);
        close();
      })
      .catch((error) => {
        console.log(error);
        setloading(false);
        if (
          error.message === "Network Error" ||
          error.message === "timeout exceeded"
        ) {
          toast.error("Network Error");
        }
        const { error: err } = error.response.data;
        if (typeof err === "string") {
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
      });
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
        <div className="space-y-1 mb-4 sm:mb-8">
          <h2 className="text-base sm:text-xl font-semibold">Active Stage</h2>
          <p>Set the active stage for the active event</p>
        </div>
        <div className="form-group space-y-4 w-full">
          <label className="block font-semibold " htmlFor="number">
            Current Stage
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
          onClick={changeActiveStage}
          className="w-full h-11 flex items-center rounded-sm justify-center bg-[#017297] text-white font-medium"
        >
          {loading ? (
            <LoaderIcon className="text-[22px]" />
          ) : (
            " Change Active Stage"
          )}
        </button>
      </div>
    </div>
  );
}
