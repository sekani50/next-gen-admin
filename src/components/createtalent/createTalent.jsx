import React from "react";
import { useState } from "react";
import { GiMusicSpell } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { LoaderIcon } from "lucide-react";
import { createTalent } from "../../Utils/api";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
export default function CreateTalent({ close }) {
  const [talent, setTalent] = useState({ name: "", description: "" });
  const { token } = useSelector((state) => state.user);
  const [loading, setloading] = useState(false);

  async function submit() {

    for (let i in talent) {
        if (talent[i] === "") {
          toast.error(`${i} is required`);
          return;
        }
      }
    setloading(true);
    await createTalent(token, talent)
      .then((res) => {
        //console.log(res)
        window.location.reload()
        setloading(false);
        toast.success("Talent created successfully");
      })
      .catch((err) => {
        // console.log(err)
        setloading(false);
      });
  }
  return (
    <div
      onClick={close}
      className="w-full h-full z-[60] bg-black bg-opacity-60 fixed inset-0"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="bg-white py-4 px-2 sm:px-4 flex  flex-col m-auto w-full absolute inset-0 sm:w-[500px] rounded-sm h-fit "
      >
        <div className="mb-3 sm:mb-4 w-full justify-between items-center flex">
          <div className="space-x-2 flex items-center">
            <GiMusicSpell className="text-xl sm:text-2xl" />
            <h2 className="font-semibold text-lg sm:text-xl">Create talent</h2>
          </div>
          <button onClick={close}>
            <MdClose className="text-[22px]" />
          </button>
        </div>
        <div className="form-group space-y-4 mb-3 sm:mb-4 w-full">
          <label className="block font-semibold " htmlFor="name">
            Name
          </label>
          <input
            className="block form__input border border-gray-200 focus:border-gray-500 hover:border-gray-500 rounded-sm focus:outline-none w-full h-11 px-4"
            type="name"
            placeholder="singing"
            name="name"
            value={talent.name}
            onChange={(e) => {
              setTalent({ ...talent, name: e.target.value });
            }}
          />
        </div>

        <div className="form-group space-y-4  mb-3 sm:mb-4  w-full">
          <label className="block font-semibold " htmlFor="name">
            Description
          </label>
          <input
            className="block form__input border border-gray-200 focus:border-gray-500 hover:border-gray-500 rounded-sm focus:outline-none w-full h-11 px-4"
            type="name"
            placeholder="decscription"
            name="name"
            value={talent.description}
            onChange={(e) => {
              setTalent({ ...talent, description: e.target.value });
            }}
          />
        </div>

        <button
          onClick={submit}
          className=" rounded-sm  flex items-center justify-center mb-3 sm:mb-4 h-11 w-full bg-[#017297] text-white font-semibold"
        >
          {loading ? (
            <LoaderIcon className="text-[22px] animate-spin" />
          ) : (
            "Create Talent"
          )}
        </button>
      </div>
    </div>
  );
}
