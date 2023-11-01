import React, { useState } from "react";
import { useSelector } from "react-redux";
import { changeStatus } from "../../../Utils/api";

import { LoaderIcon, toast } from "react-hot-toast";
import ChangeStage from "./changeStage";
export default function ToggleStatus({ status, id, catId }) {
  const { token } = useSelector((state) => state.user);
  const [loading, setloading] = useState(false);
  const [statuss, setStatus] = useState(status);
  const [isOpen, setOpen] = useState(false);
  const [stage, selectStage] = useState("");

  function onClose() {
    setOpen(!isOpen);
  }
  async function toggleStatus() {
    const payload = {
      stage: stage,
    };
    setloading(true);
    await changeStatus(catId, id, token, payload)
      .then((res) => {
        console.log(res);
        setloading(false);
        const { data } = res.data;

        setStatus(data?.status);
        onClose()
        toast.success(res?.data?.message);
        window.location.reload();
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
    <>
      <button disabled={loading} onClick={onClose} className="cursor-pointer">
        {loading && (
          <div
            className={`flex items-center justify-center w-[100px] h-[33px] ${
              statuss === "Joined"
                ? "text-red-700 bg-red-200 p-1 rounded-sm"
                : "text-green-700 bg-green-200 rounded-sm p-1"
            }`}
          >
            <LoaderIcon className="text-[25px] animate-spin" />
          </div>
        )}
        {!loading && (
          <div
            className={`flex items-center justify-center w-[100px] h-[33px] ${
              statuss === "Joined"
                ? "text-red-700 bg-red-200 p-1 rounded-sm"
                : "text-green-700 bg-green-200 rounded-sm p-1"
            }`}
          >
            {statuss}
          </div>
        )}
      </button>
      {isOpen && (
        <ChangeStage
          close={onClose}
          stage={stage}
          selectStage={selectStage}
          loading={loading}
          toggle={toggleStatus}
        />
      )}
    </>
  );
}
