import React from "react";
import Container from "../container/container";
import { IoMdSearch } from "react-icons/io";
import { BsArrowDownShort } from "react-icons/bs";
import { IoFilterSharp } from "react-icons/io5";
import EventWidget from "../record/eventWidget";
import { useEffect } from "react";
import { allEvents } from "../../Utils/api";
import { useState } from "react";
import { useSelector } from "react-redux";
import empty from "../../assets/png/emptyorder.png";
import { LoaderIcon } from "lucide-react";
const Events = () => {
  const [page, setPage] = useState(1);
  const { token } = useSelector((state) => state.user);
  const [data, setdata] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setloading] = useState(false);
  const [currentPage, setcurrentPage] = useState(0);
  useEffect(() => {
    async function getAllEvents() {
      setloading(true);
      await allEvents(token, page)
        .then((res) => {
          console.log(res);
          setloading(false);
          const { data } = res.data;

          setdata(data.data);
          const totalPage = Math.ceil(data?.paging?.totalItems / 10);
          console.log(totalPage);
          setcurrentPage(data?.paging?.currentPage);
          //  const pageNumbers = [...Array(totalPage).keys()].map(
          //    (page) => page + 1
          //  );
          
          setTotalItems(totalPage);
        })
        .catch((err) => {
          console.error(err);
          setloading(false);
        });
    }
    getAllEvents();
  }, [page]);
  return (
    <Container>
      <div className="w-full mx-auto px-2  sm:px-6 py-4 h-fit">
        <div className="w-full hidden mb-2 justify-between items-center ">
          <div className="border text-gray-500 px-2  flex items-center justify-center space-x-2 border-gray-500 rounded-sm h-11">
            <IoFilterSharp className="text-[22px]" />
            <div>Filter</div>
          </div>

          <div className="w-[60%] relative sm:w-[40%] h-12">
            <input
              type="search"
              placeholder="search"
              className="border border-gray-500 focus:border-gray-700 hover:border-gray-700 rounded-sm focus:outline-none w-full h-11 pl-10 pr-4"
            />
            <div className="absolute h-fit w-fit top-3 left-3">
              <IoMdSearch className="text-[22px] text-gray-400" />
            </div>
          </div>
        </div>

        <div className="dashboard-scroll-style w-full h-fit overflow-y-hidden overflow-x-auto py-2">
          <div className="min-w-[1000px] w-full  rounded-lg shadow-lg py-4">
            <div className="grid grid-cols-7 bg-gray-200 text-gray-500 gap-6 rounded-t-lg border-b w-full items-center py-4 px-4">
              <div className="flex pl-3 col-span-2 items-center space-x-2">
                <p className="">Events Name</p>
                <BsArrowDownShort className="text-[22px]" />
              </div>
            
              <div className="flex col-span-2 items-center space-x-2">
                <BsArrowDownShort className="text-[22px]" />
              </div>
              <div className="flex items-center space-x-2">
                <BsArrowDownShort className="text-[22px]" />
              </div>

              <p className="w-1 h-1 "></p>
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
              data?.map(
                (
                  {
                    coverImage,
                    eventName,
                    _id,
                    categories,
                    video,
                    description,
                  },
                  j
                ) => {
                  return (
                    <div key={j}>
                      <EventWidget
                        name={eventName}
                        image={coverImage?.url}
                        id={_id}
                        data={{
                          coverImage,
                          eventName,
                          video,
                          description,
                          categories,
                          id:_id
                        }}
                      />
                    </div>
                  );
                }
              )}
          </div>
        </div>
        <div className="flex w-full my-3 justify-between items-center">
          {currentPage > 1 ? (
            <button
            onClick={() => {
              setPage(page -1)
            }}
            className="border border-[#017297] text-[#017297] rounded-lg px-4 py-2">
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
              setPage(page+1)
            }}
             className="bg-[#017297] text-white rounded-lg px-4 py-2">
              Next
            </button>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Events;
