import React from "react";
import { IoFilterSharp } from "react-icons/io5";
import { useState } from "react";
//import { useNavigate } from "react-router-dom";
import Container from "../container/container";
import Inventories from "../composables/inventories";
import { IoMdSearch } from "react-icons/io";
import { BsArrowDownShort } from "react-icons/bs";
import RecordWidget from "../record/recordWidget";
import { useEffect } from "react";
import { getStat, allParticipants } from "../../Utils/api";
import { useSelector } from "react-redux";
import { LoaderIcon } from "lucide-react";
import empty from '../../assets/png/emptyorder.png'
const Landing = () => {
 // const navigate = useNavigate();
  const {token, currentUser} = useSelector((state) => state.user)
  const [data, setdata] = useState(null)
  const [pdata, setpdata] = useState([])
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setloading] = useState(false);
  const [currentPage, setcurrentPage] = useState(0);
  const [page, setPage] = useState(1);
  useEffect(() => {
    async function getStatistics() {
    
        await getStat(token)
        .then((res) => {
          console.log(res)
          setdata(res.data.data)
        })
        .catch((err) => {
          console.log(err)
        })
    
        
    }
    getStatistics()


  },[])

  useEffect(() => {
    async function getPart() {
      setloading(true)
      await allParticipants(token)
        .then((res) => {
          console.log(res)
          setloading(false)
          const {data} = res.data
          setpdata(data.data)
          const totalPage = Math.ceil(data?.paging?.totalItems / 10);
          console.log(totalPage);
          setcurrentPage(data?.paging?.currentPage);
       
          setTotalItems(totalPage);
        })
        .catch((err) => {
          console.log(err)
          setloading(false)
        })
    }
    getPart()
  },[])

  return (
    <Container>
      <div className="w-full mx-auto px-2  sm:px-6 py-4 h-fit">
        <div className="grid w-full items-center mb-4 sm:mb-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <Inventories title={"Total Events"} subtitle={`${data?.events || '0'} events`} />
          <Inventories
            title={"Total Participants"}
            subtitle={`${data?.participants || '0'} particpants`}
          />
          <Inventories title={"Total Categories"} subtitle={`${data?.categories || '0'} Categories`} />
        </div>

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
            <div className="grid grid-cols-8 bg-gray-200 text-gray-500 gap-6 rounded-t-lg border-b w-full items-center py-4 px-4">
              <div className="flex pl-3 col-span-2 items-center space-x-2">
                <p className="">Participants</p>
                <BsArrowDownShort className="text-[22px]" />
              </div>
              <div className="flex items-center space-x-2">
                <p className="">Events</p>
                <BsArrowDownShort className="text-[22px]" />
              </div>
              <div className="flex col-span-2 items-center space-x-2">
                <p className="">Category</p>
                <BsArrowDownShort className="text-[22px]" />
              </div>
              <div className="flex items-center space-x-2">
                <p className="">Votes</p>
                <BsArrowDownShort className="text-[22px]" />
              </div>
              <div className="flex items-center space-x-2">
                <p className="">Status</p>
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
            {!loading && pdata?.length === 0 && (
              <div className="w-full h-[300px] flex justify-center items-center">
                <span className="w-[200px] h-[200px]">
                  <img className="w-full h-full" src={empty} alt="" />
                </span>
              </div>
            )}
           {!loading && pdata?.length > 0 && pdata.map(({category, participant, event, status},j) => {
            return (
              <div key={j}>
              <RecordWidget
              name={`${participant?.firstName} ${participant?.lastName}`}
              image={participant?.profileImage?.url}
              email={participant?.email}
              event={event?.eventName}
              eventId={event?._id}
              status={status}
              votes={participant?.votes}
              category={category}
              id={participant?._id}
              />
              </div>
            )
           })}           
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

export default Landing;
