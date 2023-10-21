import React, { useEffect, useState } from "react";
import Container from "../container/container";
import { Link } from "react-router-dom";
import empty from "../../assets/png/emptyorder.png";
import { allCategories, deleteCategory } from "../../Utils/api";
import { useSelector } from "react-redux";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import { BsArrowDownShort } from "react-icons/bs";
import { LoaderIcon } from "lucide-react";
import DeleteData from "../deleteaction/deleteData";
import UpdateCategory from "../updateactions/updateCategory";
export default function Categories() {
  const { token } = useSelector((state) => state.user);
  const [loading, setloading] = useState(false);
  const [isdelete, setDelete] = useState(false);
  const [data, setdata] = useState([]);
  const [id, setId] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [toUpdate, setToUpdate] = useState(null);
  function update(id, data) {
    openUpdate();
    setId(id);
    setToUpdate(data);
  }

  function openUpdate() {
    setIsUpdate(!isUpdate);
  }

  useEffect(() => {
    async function allCats() {
      setloading(true);
      await allCategories(token)
        .then((res) => {
          console.log(res);
          const { data } = res.data.data;
          setdata(data);
          setloading(false);
        })
        .catch((err) => {
          console.log(err);
          setloading(false);
        });
    }
    allCats();
  }, []);

  function onClose() {
    setDelete(!isdelete);
  }

  function handleDelete(id) {
    setId(id);
    onClose();
  }

  return (
    <Container>
      <>
        <div className="w-full mx-auto px-2  sm:px-6 py-4 h-fit">
          <div className="w-full mb-3 sm:mb-5 flex justify-end items-end">
            <Link
              className="text-white font-medium text-center px-6 py-3 bg-[#017297] rounded-sm"
              to="/create-category"
            >
              Create Category
            </Link>
          </div>
          <div className="dashboard-scroll-style w-full h-fit overflow-y-hidden overflow-x-auto py-2">
            <div className="min-w-[750px] w-full  rounded-lg shadow-lg py-4">
              <div className="grid grid-cols-6 mb-3 bg-gray-200 text-gray-500 gap-6 rounded-t-lg border-b w-full items-center py-4 px-4">
                <div className="flex pl-3  items-center space-x-2">
                  <p className="">Name</p>
                  <BsArrowDownShort className="text-[22px]" />
                </div>
                <div className="flex  items-center space-x-2">
                  <p className="">Country</p>
                  <BsArrowDownShort className="text-[22px]" />
                </div>
                <div className="flex  items-center space-x-2">
                  <p className="">Event</p>
                  <BsArrowDownShort className="text-[22px]" />
                </div>
                <div className="flex items-center  space-x-2">
                  <p className="">Talent</p>
                  <BsArrowDownShort className="text-[22px]" />
                </div>

                <p className="w-1 h-1  "></p>
              </div>
              {loading && (
                <div className="w-full items-center justify-center flex h-[300px]">
                  <div className="justify-center flex w-fit h-fit items-center">
                    <LoaderIcon className="w-10 animate-spin text-[#005ABC]" />
                  </div>
                </div>
              )}
              {!loading && data?.length === 0 && (
                <div className="w-full h-[300px] flex justify-center items-center">
                  <span className="w-[200px] h-[200px]">
                    <img className="w-full h-full" src={empty} alt="" />
                  </span>
                </div>
              )}
              {!loading &&
                data.length > 0 &&
                data.map(({ name, talent, country, event, _id }, idx) => {
                  return (
                    <div
                      key={idx}
                      className="grid mb-3 sm:mb-4 grid-cols-6 gap-6 px-4 w-full items-center"
                    >
                      <p className="pl-3 w-full  whitespace-nowrap text-ellipsis overflow-hidden">
                        {name}
                      </p>
                      <p className="w-full   whitespace-nowrap text-ellipsis overflow-hidden">
                        {country}
                      </p>
                      <p className="w-full   whitespace-nowrap text-ellipsis overflow-hidden">
                        {event}
                      </p>
                      <p className="w-full  whitespace-nowrap text-ellipsis overflow-hidden">
                        {talent}
                      </p>
                      <div className=" flex items-center space-x-2">
                        <div
                          onClick={() => {
                            handleDelete(_id);
                          }}
                          className="cursor-pointer"
                        >
                          <MdOutlineDeleteForever className="text-[22px]" />
                        </div>
                        <button
                          onClick={() => {
                            update(_id, {
                              name,
                              talent,
                              country,
                              event,
                            });
                          }}
                          className="cursor-pointer"
                        >
                          <FiEdit2 className="text-[20px]" />
                        </button>
                      </div>
                      <Link
                        to={`/category/${_id}`}
                        className="bg-gray-200  w-fit rounded-sm px-2 sm:px-4 py-2"
                      >
                        View Detail
                      </Link>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        {isdelete && (
          <DeleteData close={onClose} id={id} deleteFunction={deleteCategory} />
        )}
        {isUpdate && (
          <UpdateCategory data={toUpdate} id={id} close={openUpdate} />
        )}
      </>
    </Container>
  );
}
