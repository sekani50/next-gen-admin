import React, { useEffect, useState } from "react";
import Container from "../container/container";
import { Link, useNavigate, useParams } from "react-router-dom";
import empty from "../../assets/png/emptyorder.png";
import { getEventCats } from "../../Utils/api";
import { useSelector } from "react-redux";
import { MdNavigateBefore } from "react-icons/md";
import { BsArrowDownShort } from "react-icons/bs";
import { LoaderIcon } from "lucide-react";
import ViewCategoryWidget from "./widget/viewCategoryWidget";

export default function ViewCategories() {
  const { id } = useParams();
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [data, setdata] = useState([]);
  const [currentPage, setcurrentPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    async function allCats() {
      setloading(true);
      await getEventCats(id)
        .then((res) => {
          const { data, paging } = res.data.data;
          setdata(data);
          const totalPage = Math.ceil(paging?.totalItems / 10);
          console.log(totalPage);
          setcurrentPage(paging?.currentPage);
          //  const pageNumbers = [...Array(totalPage).keys()].map(
          //    (page) => page + 1
          //  );

          setTotalItems(totalPage);
          setloading(false);
        })
        .catch((err) => {
          console.log(err);
          setloading(false);
        });
    }
    allCats();
  }, [page]);

  return (
    <Container>
      <>
        <div className="w-full mx-auto px-2  sm:px-6 py-4 h-fit">
          <div
            onClick={() => {
              navigate(-1);
            }}
            className="cursor-pointer mb-3 sm:mb-6 flex items-center gap-1"
          >
            <MdNavigateBefore className="text-[22px]" />
            <span>Back</span>
          </div>

          <div className="space-y-1 mb-2">
            <h2 className="text-base sm:text-xl font-semibold">Categories</h2>
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
                    <ViewCategoryWidget
                      name={name}
                      talent={talent}
                      country={country}
                      event={event}
                      idx={idx}
                      id={_id}
                    />
                  );
                })}
            </div>
          </div>

          <div className="flex w-full my-3 justify-between items-center">
            {currentPage > 1 ? (
              <button
                onClick={() => {
                  setPage(page - 1);
                }}
                className="border border-[#017297] text-[#017297] rounded-lg px-4 py-2"
              >
                Previous
              </button>
            ) : (
              <div className="w-1 h-1"></div>
            )}
            <p>{`page ${currentPage} of ${totalItems}`}</p>
            {currentPage === totalItems ? (
              <div className="w-1 h-1"></div>
            ) : (
              <button
                onClick={() => {
                  setPage(page + 1);
                }}
                className="bg-[#017297] text-white rounded-lg px-4 py-2"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </>
    </Container>
  );
}
