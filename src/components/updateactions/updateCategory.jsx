import React from "react";
import { MdClose } from "react-icons/md";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getTalents,
  getEvents,
  getCountries,
  updateCategory,
} from "../../Utils/api";
import toast from "react-hot-toast";
import { LoaderIcon } from "react-hot-toast";
import DropDowns from "../createcategory/dropDowns";
export default function UpdateCategory({ id, close, data }) {
  const [category, setCategory] = useState({ name: "", description: "" });
  const [loading, setloading] = useState(false);
  const { token } = useSelector((state) => state.user);
  const [activeCountry, setActiveCountry] = useState("Countries");
  const [activeCountryId, setActiveCountryId] = useState(data?.country);
  const [availableDropDowns, getAvailableDropDowns] = useState({
    countries: [],
    events: [],
    talents: [],
  });

  const [activeTalent, setActiveTalent] = useState("Select a talent");
  const [activeTalentId, setActiveTalentId] = useState(data?.talent);
  const [activeEvent, setActiveEvent] = useState("Select a event");
  const [activeEventId, setActiveEventId] = useState(data?.event);

  
  useEffect(() => {
    async function getAllDropDowns() {
      try {
        const [allTalent, allEvents, allCountries] = await Promise.all([
          getTalents(token),
          getEvents(token),
          getCountries(token),
        ]);
        console.log(allTalent, allEvents, allCountries);
        getAvailableDropDowns({
          countries: allCountries?.data?.data?.data,
          events: allEvents.data.data.data,
          talents: allTalent?.data?.data?.data,
        });
      } catch (error) {
        console.log(error);
      }
    }
    getAllDropDowns();
  }, []);

  async function submit() {
    setloading(true);
    for (let cat in category) {
      if (category[cat] === "") {
        toast.error(`${cat} is required`);
        return;
      }
    }
    const payload = {
      ...category,
      eventId: activeEventId,
      talentId: activeTalentId,
      countryId: activeCountryId,
    };
    if (!activeEventId || !activeTalentId || !activeCountryId) {
      toast.error("Pls ensure to select all the required fields");
      return;
    }
    await updateCategory(token, id, payload)
      .then((res) => {
        console.log(res);
        setloading(false);
        window.location.reload();
        toast.success("categories updated successfully");
      })
      .catch((err) => {
        console.log(err);
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
          <div className="flex items-center">
            <h2 className="font-semibold text-lg sm:text-xl">
              Update Category
            </h2>
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
            placeholder="artsits"
            name="name"
            value={category.name}
            onChange={(e) => {
              setCategory({ ...category, name: e.target.value });
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
            value={category.description}
            onChange={(e) => {
              setCategory({ ...category, description: e.target.value });
            }}
          />
        </div>
        <DropDowns
          header={"Events"}
          data={availableDropDowns?.events}
          setActive={setActiveEvent}
          setActiveId={setActiveEventId}
          active={activeEvent}
        />
        <DropDowns
          header={"Talents"}
          data={availableDropDowns?.talents}
          setActive={setActiveTalent}
          setActiveId={setActiveTalentId}
          active={activeTalent}
        />
        <DropDowns
          header={"Country"}
          data={availableDropDowns?.countries}
          setActive={setActiveCountry}
          setActiveId={setActiveCountryId}
          active={activeCountry}
        />

        <button
          onClick={submit}
          className=" rounded-sm  flex items-center justify-center mb-3 sm:mb-4 h-11 w-full bg-[#017297] text-white font-semibold"
        >
          {loading ? (
            <LoaderIcon className="text-[22px] animate-spin" />
          ) : (
            "Update Category"
          )}
        </button>
      </div>
    </div>
  );
}
